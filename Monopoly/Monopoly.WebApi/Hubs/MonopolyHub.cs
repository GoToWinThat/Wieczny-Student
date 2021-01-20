using Microsoft.AspNetCore.SignalR;
using Monopoly.Core.Base.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Monopoly.WebApi.Hubs
{
    public static class ConnectedUser
    {
        public static List<string> Ids = new List<string>();
    }
    public class MonopolyHub:Hub
    {
        private IApplicationDbContext _context;
        public MonopolyHub(IApplicationDbContext context)
        {
            _context = context;
        }
        public override Task OnConnectedAsync()
        {
            ConnectedUser.Ids.Add(Context.ConnectionId);
            
            return base.OnConnectedAsync();
        }
        public Task GetId()
        {
            return Clients.Caller.SendAsync("GetId",Context.ConnectionId);
        }
        public override Task OnDisconnectedAsync(Exception exception)
        {
            var player = _context.Players.Where(p => p.HubConnectionId == Context.ConnectionId).FirstOrDefault();
            player.HubConnectionId = "";
            player.IsLogged = false;
            var token = new CancellationToken();
            _context.SaveChangesAsync(token);
            ConnectedUser.Ids.Remove(Context.ConnectionId);
            return base.OnDisconnectedAsync(exception);
        }
        public Task GetActivePlayerIndex(string message)
        {
            return Clients.All.SendAsync("GetActivePlayerIndex", message);
        }
        public Task GetPlayers(string message)
        {
            return Clients.All.SendAsync("GetPlayers", message);
        }
        public Task GetDices(string message)
        {
            return Clients.All.SendAsync("GetDices", message);
        }
        public Task GetLogs(string message)
        {
            return Clients.All.SendAsync("GetLogs", message);
        }
        public Task GetGameState(string message)
        {
            return Clients.All.SendAsync("GetGameState", message);
        }
        public Task GetTrade(string message)
        {
            return Clients.All.SendAsync("GetTrade", message);
        }
    }
}
