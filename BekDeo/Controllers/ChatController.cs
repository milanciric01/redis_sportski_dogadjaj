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
public class ChatController : ControllerBase
{
    private readonly IDatabase _redisDb;
    private readonly IConfiguration _configuration;
    private readonly IHubContext<ChatHub> _hubContext;
    public ChatController(IConnectionMultiplexer redis, IConfiguration configuration,IHubContext<ChatHub>hubContext)
    {
        _redisDb = redis.GetDatabase();
        _configuration = configuration;
        _hubContext = hubContext;

    }

   
    [HttpPost("SendMessage")]
    public async Task<IActionResult> SendMessage( [FromBody] Chat message)
    {
        var messageJson = JsonConvert.SerializeObject(message);
        await _redisDb.ListRightPushAsync("messages_list", messageJson);
        await _hubContext.Clients.All.SendAsync("MessageSetChanged");
        return Ok("Uspesno dodata poruka");

    }

    
    [HttpGet("ReadConversation/{ID}")]
    public async Task<IActionResult> ReadConversation([FromRoute] int ID)
    {
        
        var messagesJsonList = await _redisDb.ListRangeAsync("messages_list", start: 0, stop: -1);

        var messages = messagesJsonList
            .Select(json => JsonConvert.DeserializeObject<Chat>(json))
            .Where(message => message != null && message.IDMeca == ID)
            .ToList();

        if (messages.Count == 0)
        {
            return NotFound($"Nema poruka za {ID}.");
        }

        return Ok(messages);
    }


}
