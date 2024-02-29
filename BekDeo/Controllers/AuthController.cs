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
public class AuthenticationController : ControllerBase
{
    private readonly IDatabase _redisDb;
    private readonly IConfiguration _configuration;
    public AuthenticationController(IConnectionMultiplexer redis,IConfiguration configuration)
    {
        _redisDb = redis.GetDatabase();
        _configuration = configuration;

    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] User user)
    {

        var userJson = JsonConvert.SerializeObject(user);
        await _redisDb.StringSetAsync($"user:{user.Email}", userJson);
        return Ok("Korisnik uspesno registrovan");
    }



    [HttpPost("login/{email}/{password}")]
    public async Task<IActionResult> Login([FromRoute]string email, string password)
    {
        var userJson = await _redisDb.StringGetAsync($"user:{email}");
        if (!userJson.HasValue)
        {
            return Unauthorized("Ne postoji korisnik sa datim mejlom");
        }

        var userJsonString = userJson.ToString();
        if (string.IsNullOrEmpty(userJsonString))
        {
            return BadRequest("Podaci nisu validni");
        }

        var user = JsonConvert.DeserializeObject<User>(userJsonString);
        if (user == null)
        {
            return BadRequest("Neuspesna deserializacija podataka korisnika !");
        }

        //// Kad dodam i hesiranje ovde ce se porede hesirane vrednosti lozinki
        //if (!VerifyPassword(password, user.Password))
        //{
        //    return Unauthorized("Pogresna sifra !");
        //}

        var token = GenerateJwtToken(user);
        return Ok(new { Token = token });
    }


private string HashPassword(string password)
{

    return BCrypt.Net.BCrypt.HashPassword(password);
}

private bool VerifyPassword(string password, string hashedPassword)
{
    return BCrypt.Net.BCrypt.Verify(password, hashedPassword);
}

private string GenerateJwtToken(User user)
{
    List<Claim> claims = new List<Claim> {
        new Claim(ClaimTypes.Name, user.First_Name)
    };

    var jwtKeyString = _configuration.GetSection("Jwt:Key").Value;
    if (string.IsNullOrEmpty(jwtKeyString))
    {
        throw new InvalidOperationException("Kljuc nije postavljen u konfiguraciji !.");
    }

    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKeyString));

    var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

    var token = new JwtSecurityToken(
        claims: claims,
        expires: DateTime.Now.AddDays(1),
        signingCredentials: creds
    );

    var jwt = new JwtSecurityTokenHandler().WriteToken(token);

    return jwt;
}

[Authorize]
[HttpGet("protected")]
public IActionResult ProtectedTestMethod()
{
    return Ok("Test autorizacije");
}

}
