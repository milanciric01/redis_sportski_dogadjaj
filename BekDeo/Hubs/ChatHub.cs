using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace SportsEvents.Hubs
{
    public class ChatHub : Hub
    {
        public async Task NotifyClientsAboutMessageChange()
        {
            await Clients.All.SendAsync("MessageSetChanged");
        }
        public async Task NotifyClientsAboutUpdates()
        {
            await Clients.All.SendAsync("UpdatedStats");
        }
    }
}
