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

[Route("api/match")]
[ApiController]
public class AdditionalController : ControllerBase
{
    private readonly IDatabase _redisDb;
    private readonly IConfiguration _configuration;
    public AdditionalController(IConnectionMultiplexer redis, IConfiguration configuration)
    {
        _redisDb = redis.GetDatabase();
        _configuration = configuration;

    }

   [HttpPost("DodajStadion")]
   public async Task<ActionResult> DodajStadion([FromBody] Stadium stadion)
   {
        if (stadion == null)
        {
            return BadRequest("Objekat stadion je null.");
        }

        if (string.IsNullOrWhiteSpace(stadion.Name))
        {
            return BadRequest("Stadion nema ime.");
        }

        if (string.IsNullOrWhiteSpace(stadion.Location))
        {
            return BadRequest("Nije upisana lokacija stadiona.");
        }

        if (stadion.Capacity <= 0)
        {
            return BadRequest("Kapacitet stadiona mora biti veći od nule.");
        }

        int nextId = (int)await _redisDb.StringIncrementAsync("next_stadium_id");
        stadion.ID = nextId;

        var stadionJson = JsonConvert.SerializeObject(stadion);
        await _redisDb.SetAddAsync("stadium_set", stadionJson);
        return Ok("Uspesno dodat stadion!");
    }

    [HttpGet("VratiStadione")]
    public async Task<ActionResult> VratiStadione()
    {
        var stadiumsJson = await _redisDb.SetMembersAsync("stadium_set");

        var stadiums = stadiumsJson
            .Where(json => !string.IsNullOrEmpty(json))
            .Select(json => {
                var stadium = JsonConvert.DeserializeObject<Stadium>(json!);
                return stadium;
            })
            .ToList();

        if (!stadiums.Any())
        {
            return NotFound("Stadioni nisu pronadjeni!");
        }

        return Ok(stadiums);
    }

    
    [HttpDelete("ObrisiStadion/{stadiumID}")]
    public async Task<ActionResult> ObrisiStadion([FromRoute] int stadiumID)
    {

        // Vracamo sve stadione
        var stadiumsJsonSet = await _redisDb.SetMembersAsync("stadium_set");


        foreach (var stadiumJson in stadiumsJsonSet)
        {
            var stadium = JsonConvert.DeserializeObject<Stadium>(stadiumJson!);
            if (stadium!.ID == stadiumID)
            {
                await _redisDb.SetRemoveAsync("stadium_set", stadiumJson);
                return Ok($"Stadion sa ID-em'{stadiumID}'je obrisan.");
            }
        }

        return NotFound($"Stadion sa ID-em'{stadiumID}' nije pronađen.");
          
    }



    [HttpPost("DodajIgraca")]
    public async Task<ActionResult> DodajIgraca ([FromBody] Player player)
    {
        var existingPlayerJson = await _redisDb.SetMembersAsync("players_set");
        if (existingPlayerJson != null)
            {
                foreach (var json in existingPlayerJson)
                {
                    var existingPlayer = JsonConvert.DeserializeObject<Player>(json!);
                    if (existingPlayer != null && existingPlayer.Full_Name == player.Full_Name 
                                               && existingPlayer.Jersey_number == player.Jersey_number)
                    {
                        return BadRequest("Igrac sa zadatim imenom i brojem dresa vec postoji!");
                    }
                }
            }
            
        int nextId = (int)await _redisDb.StringIncrementAsync("next_player_id");
            player.ID = nextId;

        var playerJson = JsonConvert.SerializeObject(player);
        await _redisDb.SetAddAsync("players_set", playerJson);
        return Ok(player.ID);
    }

}
