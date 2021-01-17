using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Monopoly.WebApi.Hubs
{
    public class MonopolyHub:Hub
    {
        public Task SendActivePlayerIndex(int Index)
        {
            return Clients.Others.SendAsync("ActivePlayerIndexMessage", Index);
        }
    }
}
