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

[Route("api/[controller]")]
[ApiController]
public class TeamController : ControllerBase
{
    private readonly IDatabase _redisDb;
    private readonly IConfiguration _configuration;
    public TeamController(IConnectionMultiplexer redis, IConfiguration configuration)
    {
        _redisDb = redis.GetDatabase();
        _configuration = configuration;

    }

    [HttpPost("addTeam")]
    public async Task<IActionResult> Add([FromBody] Team team)
    {
        var existingTeamJson = await _redisDb.SetMembersAsync("teams_set");
        if (existingTeamJson != null)
            {
                foreach (var json in existingTeamJson)
                {
                    var existingTeam = JsonConvert.DeserializeObject<Team>(json!);
                    if (existingTeam != null && existingTeam.Name == team.Name)
                    {
                        return BadRequest("Tim sa zadatim imenom vec postoji!");
                    }
                }
            }

        var teamJson = JsonConvert.SerializeObject(team);
        await _redisDb.SetAddAsync("teams_set", teamJson);
        return Ok("Uspesno dodat tim");
    }



    [HttpGet("GetTeam/{Name}")]
    public async Task<IActionResult> ReadTeam(string Name)
    {
        // Dohvati sve vrednosti iz Redis liste sa ključem "teams"
        var teamJsonSet = await _redisDb.SetMembersAsync("teams_set");

        var team = teamJsonSet
            .Where(json => !string.IsNullOrEmpty(json)) 
            .Select(json =>
            {
                var team = JsonConvert.DeserializeObject<Team>(json!);
                Console.WriteLine($"Team Name: {team?.Name}");
                return team;
            })
            .FirstOrDefault(t => t != null && t.Name.Equals(Name, StringComparison.OrdinalIgnoreCase));

        if (team == null)
        {
            return NotFound("Tim nije pronađen.");
        }

        return Ok(team);
    }


    [HttpPut("UpdateTeam/{teamName}")]
    public async Task<IActionResult> UpdateTeam(string teamName, [FromBody] Team updatedTeam)
    {

        var teamJsonSet = await _redisDb.SetMembersAsync("teams_set");
    
        Team? existingTeam = null;
        string? existingTeamJson = null;
    
        foreach (var teamJson in teamJsonSet)
        {
            if (!string.IsNullOrEmpty(teamJson))
            {
                var team = JsonConvert.DeserializeObject<Team>(teamJson!);
                if (team != null && team.Name.Equals(teamName, StringComparison.OrdinalIgnoreCase))
                {
                    existingTeam = team;
                    existingTeamJson = teamJson!;
                    break;
                }
            }
        }
    
        if (existingTeam == null)
        {
            return NotFound("Tim nije pronađen.");
        }
        existingTeam.Name = updatedTeam.Name;
        existingTeam.Played_Games = updatedTeam.Played_Games;
        existingTeam.Points = updatedTeam.Points;


        var updatedTeamJson = JsonConvert.SerializeObject(existingTeam);
        if (existingTeamJson != null)
        {
            await _redisDb.SetRemoveAsync("teams_set", existingTeamJson);
        }
        await _redisDb.SetAddAsync("teams_set", updatedTeamJson);
    
        return Ok("Tim je uspešno ažuriran.");
    }



    [HttpPut("updatePlayer/{playerId}")]
    public async Task<IActionResult> UpdatePlayer(int playerId, [FromBody] Player updatedPlayer)
    {

        var playerJsonSet = await _redisDb.SetMembersAsync("players_set");

        Player? existingPlayer = null;
        string? existingPlayerJson = null;

        foreach (var playerJson in playerJsonSet)
        {
            if (!string.IsNullOrEmpty(playerJson))
            {
                var player = JsonConvert.DeserializeObject<Player>(playerJson!);
                if (player != null && player.ID == playerId)
                {
                    existingPlayer = player;
                    existingPlayerJson = playerJson;
                    break;
                }
            }
        }

        if (existingPlayer == null)
        {
            return NotFound("Player not found.");
        }

      
        
        var updatedPlayerJson = JsonConvert.SerializeObject(existingPlayer);
        if (existingPlayerJson != null)
        {
            await _redisDb.SetRemoveAsync("players_set", existingPlayerJson);
        }
        await _redisDb.SetAddAsync("players_set", updatedPlayerJson);
        var teamJsonSet = await _redisDb.SetMembersAsync("teams_set");

        Team? existingTeam = null;
        string? existingTeamJson = null;

        foreach (var teamJson in teamJsonSet)
        {
            if (!string.IsNullOrEmpty(teamJson))
            {
                var team = JsonConvert.DeserializeObject<Team>(teamJson!);
                if (team != null && team.Name.Equals(existingPlayer.Tim, StringComparison.OrdinalIgnoreCase))
                {
                    existingTeam = team;
                    existingTeamJson = teamJson!;
                    break;
                }
            }
        }

        if (existingTeam == null)
        {
            return NotFound("Tim nije pronađen.");
        }
        if(existingPlayer.Tim!=null&&existingPlayer.Tim!=updatedPlayer.Tim)
        {

               existingTeam.players.Remove(existingPlayer);
            var updatedTeamJson = JsonConvert.SerializeObject(existingTeam);
            if (existingTeamJson != null)
            {
                await _redisDb.SetRemoveAsync("teams_set", existingTeamJson);
            }
            await _redisDb.SetAddAsync("teams_set", updatedTeamJson);
            var teamJsonSetNew = await _redisDb.SetMembersAsync("teams_set");
            Team? existingTeamNew = null;
            string? existingTeamJsonNew = null;

            foreach (var teamJson in teamJsonSetNew)
            {
                if (!string.IsNullOrEmpty(teamJson))
                {
                    var team = JsonConvert.DeserializeObject<Team>(teamJson!);
                    if (team != null && team.Name.Equals(updatedPlayer.Tim, StringComparison.OrdinalIgnoreCase))
                    {
                        existingTeamNew = team;
                        existingTeamJsonNew = teamJson!;
                        break;
                    }
                }
            }

            if (existingTeamNew == null)
            {
                return NotFound("Tim nije pronađen.");
            }
            existingTeamNew.players.Add(updatedPlayer);
            var updatedTeamJsonNew = JsonConvert.SerializeObject(existingTeamNew);
            if (existingTeamJsonNew != null)
            {
                await _redisDb.SetRemoveAsync("teams_set", existingTeamJsonNew);
            }
            await _redisDb.SetAddAsync("teams_set", updatedTeamJsonNew);
        }
        return Ok("Igrac azuriran!.");
    }

    // Za tabelu
    [HttpGet("GetSortedTeams")]
    public async Task<IActionResult> GetSortedTeams()
    {
        var teamJsonSet = await _redisDb.SetMembersAsync("teams_set");
        if (teamJsonSet.Length == 0)
        {
            return NotFound("U bazi nema nema timova.");
        }

        
        var teams = teamJsonSet.Where(json => !string.IsNullOrEmpty(json))
                               .Select(json => JsonConvert.DeserializeObject<Team>(json!))
                               .Where(team => team != null)
                               .ToList();


        var sortedTeams = teams.OrderByDescending(team => team!.Points).ToList();

        return Ok(sortedTeams);
    }
    [HttpPut("addPlayer/{playerId}/{teamName}")]
    public async Task<IActionResult> AddPlayerToTheTeam([FromRoute]int playerId,string teamName)
    {

        var playerJsonSet = await _redisDb.SetMembersAsync("players_set");

        Player? existingPlayer = null;
        string? existingPlayerJson = null;

        foreach (var playerJson in playerJsonSet)
        {
            if (!string.IsNullOrEmpty(playerJson))
            {
                var player = JsonConvert.DeserializeObject<Player>(playerJson!);
                if (player != null && player.ID == playerId)
                {
                    existingPlayer = player;
                    existingPlayerJson = playerJson;
                    break;
                }
            }
        }

        if (existingPlayer == null)
        {
            return NotFound("Player with id:"+playerId+" is not found");
        }
        var teamJsonSet = await _redisDb.SetMembersAsync("teams_set");

        Team? existingTeam = null;
        string? existingTeamJson = null;

        foreach (var teamJson in teamJsonSet)
        {
            if (!string.IsNullOrEmpty(teamJson))
            {
                var team = JsonConvert.DeserializeObject<Team>(teamJson!);
                if (team != null && team.Name.Equals(teamName, StringComparison.OrdinalIgnoreCase))
                {
                    existingTeam = team;
                    existingTeamJson = teamJson!;
                    break;
                }
            }
        }

        if (existingTeam == null)
        {
            return NotFound("Tim nije pronađen.");
        }
        List<Player> lista = existingTeam.players;
        lista.Add(existingPlayer);
        existingTeam.players= lista;

        var updatedTeamJson = JsonConvert.SerializeObject(existingTeam);
        if (existingTeamJson != null)
        {
            await _redisDb.SetRemoveAsync("teams_set", existingTeamJson);
        }
        await _redisDb.SetAddAsync("teams_set", updatedTeamJson);

        return Ok("Tim je uspešno ažuriran.");
       
    }



}
