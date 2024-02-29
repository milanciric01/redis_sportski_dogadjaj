using Microsoft.AspNetCore.Mvc;
using StackExchange.Redis;
using System.Threading.Tasks;
using Newtonsoft.Json;
using BCrypt.Net;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using System.Xml.Linq;
using SportsEvents.Hubs;
using Microsoft.AspNetCore.SignalR;

[Route("api/match")]
[ApiController]
public class MatchController : ControllerBase
{
    private readonly IDatabase _redisDb;
    private readonly IConfiguration _configuration;
    private readonly IHubContext<ChatHub> _hubContext;
    public MatchController(IConnectionMultiplexer redis, IConfiguration configuration, IHubContext<ChatHub> hubContext)
    {
        _redisDb = redis.GetDatabase();
        _configuration = configuration;
        _hubContext = hubContext;

    }

    [HttpPost("addMatch/{stadionID}")]
    public async Task<IActionResult> AddMatch([FromBody] Match match, [FromRoute] int stadionID)
    {
       
        var teamJsonSet = await _redisDb.SetMembersAsync("teams_set");

        var teamH = teamJsonSet
       .Select(json =>
       {
           var teamH = JsonConvert.DeserializeObject<Team>(json);
           Console.WriteLine($"Team Name: {match.HomeTeam}");
           return teamH;
       })
       .FirstOrDefault(t => t.Name.Equals(match.HomeTeam, StringComparison.OrdinalIgnoreCase));


        if (teamH == null)
        {
            return NotFound("Tim nije pronađen.");
        }
        var teamA = teamJsonSet
       .Select(json =>
       {
           var teamA = JsonConvert.DeserializeObject<Team>(json);
           Console.WriteLine($"Team Name: {match.AwayTeam}");
           return teamA;
       })
       .FirstOrDefault(t => t.Name.Equals(match.AwayTeam, StringComparison.OrdinalIgnoreCase));


        if (teamA == null)
        {
            return NotFound("Tim nije pronađen.");
        }

   


        var stadiumsJsonSet = await _redisDb.SetMembersAsync("stadium_set");
        Stadium? SelectedStadium = null;

        foreach (var stadiumJson in stadiumsJsonSet)
        {
            var stadium = JsonConvert.DeserializeObject<Stadium>(stadiumJson!);
            if (stadium!.ID == stadionID)
            {
                SelectedStadium = stadium;
                break;
            }
        } 

        if (SelectedStadium != null)
        {
            
            // Inkrementiramo i setujemo ID
            int nextId = (int)await _redisDb.StringIncrementAsync("next_match_id");
            match.ID = nextId;
            match.Stats.Stadium = SelectedStadium.Name;
            // Trenutni datum i vreme
            DateTime currentTime = DateTime.Now;

            // Oduzimanje trenutnog datuma i vremena od datuma i vremena početka utakmice
            TimeSpan timeUntilMatch = match.MatchDate - currentTime;

            // Vraćanje razlike u minutima
            int minutesUntilMatch = (int)timeUntilMatch.TotalMinutes;
            match.MatchTime = minutesUntilMatch;
            var matchJson = JsonConvert.SerializeObject(match);
            await _redisDb.SetAddAsync("matches_set", matchJson);
            await _hubContext.Clients.All.SendAsync("UpdatedStats");
            return Ok("Uspesno dodata utakmica");
        }
        return BadRequest("Izabrani stadion ne postoji!");
    }





    [HttpPut("updateMatchMinute/{matchID}")]
    public async Task<IActionResult> UpdateMatchMinute([FromRoute] int matchID)
    {
        // Dohvati sve vrednosti iz Redis skupa sa ključem "matches_set"
        var matchesJsonSet = await _redisDb.SetMembersAsync("matches_set");

        // Pronađi utakmicu sa datim ID-om
        var matchToUpdate = matchesJsonSet
            .Where(json => !string.IsNullOrEmpty(json))
            .Select(json => JsonConvert.DeserializeObject<Match>(json!)) 
            .FirstOrDefault(match => match?.ID == matchID);

        var matchToDelete = matchToUpdate;

        // Ako utakmica nije pronađena, vrati NotFound
        if (matchToUpdate == null)
        {
            return NotFound("Utakmica nije pronađena.");
        }

        // Ažuriraj minut utakmice
        matchToUpdate.MatchTime += 1 ;

        // Ažuriraj podatke utakmice u bazi
        var updatedMatchJson = JsonConvert.SerializeObject(matchToUpdate);
        await _redisDb.SetRemoveAsync("matches_set", JsonConvert.SerializeObject(matchToDelete));
        await _redisDb.SetAddAsync("matches_set", updatedMatchJson);

        return Ok("Podaci utakmice uspešno ažurirani.");
    }




    [HttpPut("updateMatchScore/{matchID}/{score}")]
    public async Task<IActionResult> UpdateMatchScore([FromRoute] int matchID, [FromRoute] string score , [FromRoute] int player_number)
    {
        // Dohvati sve vrednosti iz Redis skupa sa ključem "matches_set"
        var matchesJsonSet = await _redisDb.SetMembersAsync("matches_set");

        // Pronađi utakmicu sa datim ID-om
        var matchToUpdate = matchesJsonSet
            .Where(json => !string.IsNullOrEmpty(json))
            .Select(json => JsonConvert.DeserializeObject<Match>(json!)) 
            .FirstOrDefault(match => match?.ID == matchID);

        var matchToDelete = matchToUpdate;

        // Ako utakmica nije pronađena, vrati NotFound
        if (matchToUpdate == null)
        {
            return NotFound("Utakmica nije pronađena.");
        }

        // Ažuriraj rezultat
        matchToUpdate.Score = score;
      

        var teamJsonSet = await _redisDb.SetMembersAsync("teams_set");
        List<Team> teams = new List<Team>();

        bool found = false;
        Player? playerscored = null;

        var hometeam = teamJsonSet
            .Where(json => !string.IsNullOrEmpty(json))
            .Select(json => JsonConvert.DeserializeObject<Team>(json!)) 
            .FirstOrDefault(team => team!.Name == matchToUpdate.HomeTeam);
        
        foreach (Player pl in hometeam!.players)
        {
            if(pl.Jersey_number == player_number)
            {
                playerscored = pl;
                found = true;
            }
        }

        var awayteam = teamJsonSet
            .Where(json => !string.IsNullOrEmpty(json))
            .Select(json => JsonConvert.DeserializeObject<Team>(json!)) 
            .FirstOrDefault(team => team!.Name == matchToUpdate.AwayTeam);

        if (!found)
        {
            foreach (Player pl in awayteam!.players)
            {
                if(pl.Jersey_number == player_number)
                {
                    playerscored = pl;
                }
            }
        }

        if (playerscored != null)
        {
            playerscored.GoalsScored++; 

            var updatedTeamJson = JsonConvert.SerializeObject(found ? hometeam : awayteam);
            await _redisDb.SetRemoveAsync("teams_set", JsonConvert.SerializeObject(found ? hometeam : awayteam));
            await _redisDb.SetAddAsync("teams_set", updatedTeamJson);
        }

       

    
        // Ažuriraj podatke utakmice u bazi
        var updatedMatchJson = JsonConvert.SerializeObject(matchToUpdate);
        await _redisDb.SetRemoveAsync("matches_set", JsonConvert.SerializeObject(matchToDelete));
        await _redisDb.SetAddAsync("matches_set", updatedMatchJson);
        await _hubContext.Clients.All.SendAsync("UpdatedStats");
        return Ok("Podaci utakmice uspešno ažurirani.");
    }




    
    [HttpPut("AddShot/{matchID}/{onTarget}/{home}")]
    public async Task<IActionResult> AddShot([FromRoute] int matchID,[FromRoute] bool onTarget,[FromRoute] bool home)
    {
        // Dohvati sve vrednosti iz Redis skupa sa ključem "matches_set"
        var matchesJsonSet = await _redisDb.SetMembersAsync("matches_set");

        // Pronađi utakmicu sa datim ID-om
        var matchToUpdate = matchesJsonSet
            .Select(json => JsonConvert.DeserializeObject<Match>(json))
            .FirstOrDefault(match => match.ID == matchID);
        var matchToDelete = matchesJsonSet
         .Select(json => JsonConvert.DeserializeObject<Match>(json))
         .FirstOrDefault(match => match.ID == matchID);

        // Ako utakmica nije pronađena, vrati NotFound
        if (matchToUpdate == null)
        {
            return NotFound("Utakmica nije pronađena.");
        }

       if(home)
        {
            if(onTarget)
                matchToUpdate.Stats.ShotsOnGoalHome += 1;

            matchToUpdate.Stats.ShotsHome +=1;
        
        }
       else
        {
            if (onTarget)
                matchToUpdate.Stats.ShotsOnGoalAway += 1;

            matchToUpdate.Stats.ShotsAway += 1;

        }
       
        // Ažuriraj ažurirane podatke utakmice u Redis bazi
        var updatedMatchJson = JsonConvert.SerializeObject(matchToUpdate);
        await _redisDb.SetRemoveAsync("matches_set", JsonConvert.SerializeObject(matchToDelete));
        await _redisDb.SetAddAsync("matches_set", updatedMatchJson);
        await _hubContext.Clients.All.SendAsync("UpdatedStats");
        return Ok("Podaci utakmice uspešno ažurirani.");
    }
    [HttpPut("SubShot/{matchID}/{onTarget}/{home}")]
    public async Task<IActionResult> SubShot([FromRoute] int matchID, [FromRoute] bool onTarget, [FromRoute] bool home)
    {
        // Dohvati sve vrednosti iz Redis skupa sa ključem "matches_set"
        var matchesJsonSet = await _redisDb.SetMembersAsync("matches_set");

        // Pronađi utakmicu sa datim ID-om
        var matchToUpdate = matchesJsonSet
            .Select(json => JsonConvert.DeserializeObject<Match>(json))
            .FirstOrDefault(match => match.ID == matchID);
        var matchToDelete = matchesJsonSet
         .Select(json => JsonConvert.DeserializeObject<Match>(json))
         .FirstOrDefault(match => match.ID == matchID);

        // Ako utakmica nije pronađena, vrati NotFound
        if (matchToUpdate == null)
        {
            return NotFound("Utakmica nije pronađena.");
        }


        if (home)
        {
            if (onTarget)
                matchToUpdate.Stats.ShotsOnGoalHome -= 1;

            matchToUpdate.Stats.ShotsHome -= 1;

        }
        else
        {
            if (onTarget)
                matchToUpdate.Stats.ShotsOnGoalAway -= 1;

            matchToUpdate.Stats.ShotsAway -= 1;

        }

        // Ažuriraj ažurirane podatke utakmice u Redis bazi
        var updatedMatchJson = JsonConvert.SerializeObject(matchToUpdate);
        await _redisDb.SetRemoveAsync("matches_set", JsonConvert.SerializeObject(matchToDelete));
        await _redisDb.SetAddAsync("matches_set", updatedMatchJson);
        await _hubContext.Clients.All.SendAsync("UpdatedStats");
        return Ok("Podaci utakmice uspešno ažurirani.");
    }



    [HttpPut("AddPossesion/{matchID}/{possesionHome}")]
    public async Task<IActionResult> AddPossesion([FromRoute] int matchID, [FromRoute] bool possesionHome)
    {
        // Dohvati sve vrednosti iz Redis skupa sa ključem "matches_set"
        var matchesJsonSet = await _redisDb.SetMembersAsync("matches_set");

        // Pronađi utakmicu sa datim ID-om
        var matchToUpdate = matchesJsonSet
            .Select(json => JsonConvert.DeserializeObject<Match>(json))
            .FirstOrDefault(match => match.ID == matchID);
        var matchToDelete = matchesJsonSet
         .Select(json => JsonConvert.DeserializeObject<Match>(json))
         .FirstOrDefault(match => match.ID == matchID);

        // Ako utakmica nije pronađena, vrati NotFound
        if (matchToUpdate == null)
        {
            return NotFound("Utakmica nije pronađena.");
        }


        if (possesionHome)
        {
            if (matchToUpdate.Stats.PossesionHome + 1 < 100)
            {
                matchToUpdate.Stats.PossesionHome += 1;
               
            }

        }
        else
        {
            if (matchToUpdate.Stats.PossesionHome - 1 > 0)
            {
                matchToUpdate.Stats.PossesionHome -= 1;

            }

        }

        // Ažuriraj ažurirane podatke utakmice u Redis bazi
        var updatedMatchJson = JsonConvert.SerializeObject(matchToUpdate);
        await _redisDb.SetRemoveAsync("matches_set", JsonConvert.SerializeObject(matchToDelete));
        await _redisDb.SetAddAsync("matches_set", updatedMatchJson);
        await _hubContext.Clients.All.SendAsync("UpdatedStats");
        return Ok("Podaci utakmice uspešno ažurirani.");
    }
    [HttpPut("SubPossesion/{matchID}/{possesionHome}")]
    public async Task<IActionResult> SubPossesion([FromRoute] int matchID, [FromRoute] bool possesionHome)
    {
        // Dohvati sve vrednosti iz Redis skupa sa ključem "matches_set"
        var matchesJsonSet = await _redisDb.SetMembersAsync("matches_set");

        // Pronađi utakmicu sa datim ID-om
        var matchToUpdate = matchesJsonSet
            .Select(json => JsonConvert.DeserializeObject<Match>(json))
            .FirstOrDefault(match => match.ID == matchID);
        var matchToDelete = matchesJsonSet
         .Select(json => JsonConvert.DeserializeObject<Match>(json))
         .FirstOrDefault(match => match.ID == matchID);

        // Ako utakmica nije pronađena, vrati NotFound
        if (matchToUpdate == null)
        {
            return NotFound("Utakmica nije pronađena.");
        }


        if (possesionHome)
        {
            if (matchToUpdate.Stats.PossesionHome - 1 > 0)
            {
                matchToUpdate.Stats.PossesionHome -= 1;

            }

        }
        else
        {
            if (matchToUpdate.Stats.PossesionHome + 1 < 100)
            {
                matchToUpdate.Stats.PossesionHome += 1;

            }

        }

        // Ažuriraj ažurirane podatke utakmice u Redis bazi
        var updatedMatchJson = JsonConvert.SerializeObject(matchToUpdate);
        await _redisDb.SetRemoveAsync("matches_set", JsonConvert.SerializeObject(matchToDelete));
        await _redisDb.SetAddAsync("matches_set", updatedMatchJson);
        await _hubContext.Clients.All.SendAsync("UpdatedStats");
        return Ok("Podaci utakmice uspešno ažurirani.");
    }


    [HttpPut("SetPasses/{matchID}/{add}/{home}")]
    public async Task<IActionResult> SetPases([FromRoute] int matchID, [FromRoute] bool add,[FromRoute] bool home)
    {
        // Dohvati sve vrednosti iz Redis skupa sa ključem "matches_set"
        var matchesJsonSet = await _redisDb.SetMembersAsync("matches_set");

        // Pronađi utakmicu sa datim ID-om
        var matchToUpdate = matchesJsonSet
            .Select(json => JsonConvert.DeserializeObject<Match>(json))
            .FirstOrDefault(match => match.ID == matchID);
        var matchToDelete = matchesJsonSet
         .Select(json => JsonConvert.DeserializeObject<Match>(json))
         .FirstOrDefault(match => match.ID == matchID);

        // Ako utakmica nije pronađena, vrati NotFound
        if (matchToUpdate == null)
        {
            return NotFound("Utakmica nije pronađena.");
        }


        if (home)
        {
            if (add)
            {
                matchToUpdate.Stats.PassesHome += 1;
               

            }
            else
            {
                matchToUpdate.Stats.PassesHome -= 1;
                
            }


        }
        else
        {
            if (add)
            {
                matchToUpdate.Stats.PassesAway += 1;
               
            }
            else
            {
                matchToUpdate.Stats.PassesAway -= 1;
              

            }

        }

        // Ažuriraj ažurirane podatke utakmice u Redis bazi
        var updatedMatchJson = JsonConvert.SerializeObject(matchToUpdate);
        await _redisDb.SetRemoveAsync("matches_set", JsonConvert.SerializeObject(matchToDelete));
        await _redisDb.SetAddAsync("matches_set", updatedMatchJson);
        await _hubContext.Clients.All.SendAsync("UpdatedStats");
        return Ok("Podaci utakmice uspešno ažurirani.");

    }


    [HttpPut("Fouls/{matchID}/{Foul}/{YellowCard}/{RedCard}/{home}/{add}")]
    public async Task<IActionResult> FoulOrCard([FromRoute] int matchID, [FromRoute] bool Foul
                                               ,[FromRoute] bool YellowCard, [FromRoute] bool RedCard, [FromRoute]bool home, [FromRoute]bool add)
    {

        // Dohvati sve vrednosti iz Redis skupa sa ključem "matches_set"
        var matchesJsonSet = await _redisDb.SetMembersAsync("matches_set");

        // Pronađi utakmicu sa datim ID-om
        var matchToUpdate = matchesJsonSet
            .Select(json => JsonConvert.DeserializeObject<Match>(json))
            .FirstOrDefault(match => match.ID == matchID);
        var matchToDelete = matchesJsonSet
         .Select(json => JsonConvert.DeserializeObject<Match>(json))
         .FirstOrDefault(match => match.ID == matchID);

        // Ako utakmica nije pronađena, vrati NotFound
        if (matchToUpdate == null)
        {
            return NotFound("Utakmica nije pronađena.");
        }


        if (home)
        {
            if(add)
            {
                if(Foul)
                    matchToUpdate.Stats.FoulsHome += 1;
                if(YellowCard)
                    matchToUpdate.Stats.YellowHome += 1;
                if (RedCard)
                    matchToUpdate.Stats.RedHome += 1;

            }
            else
            {
                if(Foul)
                    matchToUpdate.Stats.FoulsHome -= 1;
                if (YellowCard)
                    matchToUpdate.Stats.YellowHome -= 1;
                if (RedCard)
                    matchToUpdate.Stats.RedHome -= 1;

            }


        }
        else
        {
            if (add)
            {
                if(Foul)
                    matchToUpdate.Stats.FoulsAway += 1;
                if (YellowCard)
                    matchToUpdate.Stats.YellowAway += 1;
                if (RedCard)
                    matchToUpdate.Stats.RedAway += 1;

            }
            else
            {
                if(Foul)
                    matchToUpdate.Stats.FoulsAway -= 1;
                if (YellowCard)
                    matchToUpdate.Stats.YellowAway -= 1;
                if (RedCard)
                    matchToUpdate.Stats.RedAway -= 1;

            }

        }

        // Ažuriraj ažurirane podatke utakmice u Redis bazi
        var updatedMatchJson = JsonConvert.SerializeObject(matchToUpdate);
        await _redisDb.SetRemoveAsync("matches_set", JsonConvert.SerializeObject(matchToDelete));
        await _redisDb.SetAddAsync("matches_set", updatedMatchJson);
        await _hubContext.Clients.All.SendAsync("UpdatedStats");
        return Ok("Podaci utakmice uspešno ažurirani.");
    }



    [HttpPut("IncrementOffsides/{matchID}/{home}/{add}")]
    public async Task<IActionResult> IncrementOffsides([FromRoute] int matchID,[FromRoute] bool home, [FromRoute] bool add)
    {

        // Dohvati sve vrednosti iz Redis skupa sa ključem "matches_set"
        var matchesJsonSet = await _redisDb.SetMembersAsync("matches_set");

        // Pronađi utakmicu sa datim ID-om
        var matchToUpdate = matchesJsonSet
            .Select(json => JsonConvert.DeserializeObject<Match>(json))
            .FirstOrDefault(match => match.ID == matchID);
        var matchToDelete = matchesJsonSet
         .Select(json => JsonConvert.DeserializeObject<Match>(json))
         .FirstOrDefault(match => match.ID == matchID);

        // Ako utakmica nije pronađena, vrati NotFound
        if (matchToUpdate == null)
        {
            return NotFound("Utakmica nije pronađena.");
        }


        if (home)
        {
            if (add)
                matchToUpdate.Stats.OffsidesHome += 1;
            else
                matchToUpdate.Stats.OffsidesHome -= 1;

        }
        else
        {
            if (add)
                matchToUpdate.Stats.OffsidesAway += 1;
            else
                matchToUpdate.Stats.OffsidesAway -= 1;

        }

        // Ažuriraj ažurirane podatke utakmice u Redis bazi
        var updatedMatchJson = JsonConvert.SerializeObject(matchToUpdate);
        await _redisDb.SetRemoveAsync("matches_set", JsonConvert.SerializeObject(matchToDelete));
        await _redisDb.SetAddAsync("matches_set", updatedMatchJson);
        await _hubContext.Clients.All.SendAsync("UpdatedStats");
        return Ok("Podaci utakmice uspešno ažurirani.");
    }

    [HttpPut("IncrementCorners/{matchID}/{home}/{add}")]
    public async Task<IActionResult> IncrementCorners([FromRoute] int matchID,[FromRoute] bool home, [FromRoute] bool add)
    {

        // Dohvati sve vrednosti iz Redis skupa sa ključem "matches_set"
        var matchesJsonSet = await _redisDb.SetMembersAsync("matches_set");

        // Pronađi utakmicu sa datim ID-om
        var matchToUpdate = matchesJsonSet
            .Select(json => JsonConvert.DeserializeObject<Match>(json))
            .FirstOrDefault(match => match.ID == matchID);
        var matchToDelete = matchesJsonSet
         .Select(json => JsonConvert.DeserializeObject<Match>(json))
         .FirstOrDefault(match => match.ID == matchID);

        // Ako utakmica nije pronađena, vrati NotFound
        if (matchToUpdate == null)
        {
            return NotFound("Utakmica nije pronađena.");
        }


        if (home)
        {
            if (add)
                matchToUpdate.Stats.CornersHome += 1;
            else
                matchToUpdate.Stats.CornersHome -= 1;

        }
        else
        {
            if (add)
                matchToUpdate.Stats.CornersAway += 1;
            else
                matchToUpdate.Stats.CornersAway -= 1;

        }

        // Ažuriraj ažurirane podatke utakmice u Redis bazi
        var updatedMatchJson = JsonConvert.SerializeObject(matchToUpdate);
        await _redisDb.SetRemoveAsync("matches_set", JsonConvert.SerializeObject(matchToDelete));
        await _redisDb.SetAddAsync("matches_set", updatedMatchJson);
        await _hubContext.Clients.All.SendAsync("UpdatedStats");
        return Ok("Podaci utakmice uspešno ažurirani.");
    }
    [HttpPut("UpdateScore/{matchID}/{score}")]
    public async Task<IActionResult> UpdateScore([FromRoute] int matchID, [FromRoute] string score)
    {

        // Dohvati sve vrednosti iz Redis skupa sa ključem "matches_set"
        var matchesJsonSet = await _redisDb.SetMembersAsync("matches_set");

        // Pronađi utakmicu sa datim ID-om
        var matchToUpdate = matchesJsonSet
            .Select(json => JsonConvert.DeserializeObject<Match>(json))
            .FirstOrDefault(match => match.ID == matchID);
        var matchToDelete = matchesJsonSet
         .Select(json => JsonConvert.DeserializeObject<Match>(json))
         .FirstOrDefault(match => match.ID == matchID);

        // Ako utakmica nije pronađena, vrati NotFound
        if (matchToUpdate == null)
        {
            return NotFound("Utakmica nije pronađena.");
        }


        
         matchToUpdate.Score = score;
        

        // Ažuriraj ažurirane podatke utakmice u Redis bazi
        var updatedMatchJson = JsonConvert.SerializeObject(matchToUpdate);
        await _redisDb.SetRemoveAsync("matches_set", JsonConvert.SerializeObject(matchToDelete));
        await _redisDb.SetAddAsync("matches_set", updatedMatchJson);
        await _hubContext.Clients.All.SendAsync("UpdatedStats");
        return Ok("Podaci utakmice uspešno ažurirani.");
    }





    [HttpGet("Getmatch/{ID}")]
    public async Task<IActionResult> ReadMatch(int ID)
    {
        // Dohvati sve vrednosti iz Redis liste sa ključem "teams"
        var matchJsonSet = await _redisDb.SetMembersAsync("matches_set");

        var match = matchJsonSet
            .Where(json => !string.IsNullOrEmpty(json)) 
            .Select(json => JsonConvert.DeserializeObject<Match>(json!))
            .FirstOrDefault(m => m?.ID == ID); 


        if (match == null)
        {
            return NotFound("Utakmica nije pronađena.");
        }

        return Ok(match);
    }



    [HttpGet("GetMatchesInFixture/{kolo}")]
    public async Task<IActionResult> ReadMatches([FromRoute] string kolo)
    {
        // Dohvati sve vrednosti iz Redis skupa sa ključem "matches_set"
        var matchesJsonSet = await _redisDb.SetMembersAsync("matches_set");

        // Pretvori JSON zapise u objekte tipa Match
        var matches = matchesJsonSet
            .Select(json => JsonConvert.DeserializeObject<Match>(json))
            .Where(match => match.Fixture == kolo)  // Filtriraj mečeve prema unetom kolu
            .ToList();

        if (matches.Count == 0)
        {
            return NotFound($"Nema mečeva za kolo {kolo}.");
        }

        return Ok(matches);
    }

   
    [HttpGet("TimeUntilMatch/{id}")]
    public async Task<IActionResult> TimeUntilMatch([FromRoute]int id)
    {
        // Dohvati sve vrednosti iz Redis skupa sa ključem "matches_set"
        var matchesJsonSet = await _redisDb.SetMembersAsync("matches_set");

        // Pronađi utakmicu sa datim ID-om
        var matchToUpdate = matchesJsonSet
            .Select(json => JsonConvert.DeserializeObject<Match>(json))
            .FirstOrDefault(match => match.ID == id);
        var matchToDelete = matchesJsonSet
         .Select(json => JsonConvert.DeserializeObject<Match>(json))
         .FirstOrDefault(match => match.ID == id);

        // Ako utakmica nije pronađena, vrati NotFound
        if (matchToUpdate == null)
        {
            return NotFound("Utakmica nije pronađena.");
        }



       

        

        // Trenutni datum i vreme
        DateTime currentTime = DateTime.Now;

        // Oduzimanje trenutnog datuma i vremena od datuma i vremena početka utakmice
        TimeSpan timeUntilMatch = matchToUpdate.MatchDate - currentTime;

        // Vraćanje razlike u minutima
        int minutesUntilMatch = (int)timeUntilMatch.TotalMinutes;
        matchToUpdate.MatchTime = minutesUntilMatch;
        // Ažuriraj ažurirane podatke utakmice u Redis bazi
        var updatedMatchJson = JsonConvert.SerializeObject(matchToUpdate);
        await _redisDb.SetRemoveAsync("matches_set", JsonConvert.SerializeObject(matchToDelete));
        await _redisDb.SetAddAsync("matches_set", updatedMatchJson);
        return Ok(minutesUntilMatch);
    }

}
