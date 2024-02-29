using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using SportsEvents.Hubs;

namespace SportsEvents.Controllers
{
    public class HubController : ControllerBase
    {
        private readonly IHubContext<ChatHub> _hubContext;
        public HubController(IHubContext<ChatHub> hubContext)
        {
            _hubContext = hubContext;
        }
        [HttpGet("watchChanges")]
        public async Task<IActionResult>WatchChanges()
        {
            await _hubContext.Clients.All.SendAsync("ReciveNotification");
            return Ok();
        }
    }
}
