using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Monopoly.WebApi.Hubs
{
    public class MonopolyHub:Hub
    {
        public Task GetActivePlayerIndex(string message)
        {
            return Clients.Others.SendAsync("GetActivePlayerIndex", message);
        }
        public Task GetPlayers(string message)
        {
            return Clients.Others.SendAsync("GetPlayers", message);
        }
        public Task GetDices(string message)
        {
            return Clients.Others.SendAsync("GetDices", message);
        }
        public Task GetLogs(string message)
        {
            return Clients.All.SendAsync("GetLogs", message);
        }
    }
}
