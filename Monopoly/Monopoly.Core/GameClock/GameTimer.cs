using Domain.Entities.Static_Data;
using Microsoft.AspNetCore.SignalR;
using Monopoly.Core.Base.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Timers;

namespace Monopoly.Core.GameClock
{
    public static class GameTimer
    {
        static System.Timers.Timer timerclock;
        static IApplicationDbContext _context;
        static CancellationToken _cancellationToken;

        public static void SetGameTimer(IApplicationDbContext context, CancellationToken cancellationToken)
        {
            _cancellationToken = cancellationToken;
            _context = context;
            timerclock = new System.Timers.Timer(1200000);
            timerclock.Elapsed += OnTimedEvent;
            timerclock.AutoReset = true;
            timerclock.Enabled = true;
        }

        private async static void OnTimedEvent(Object source, ElapsedEventArgs e)
        {
            var gameInfo = _context.GameInfo.First();
            gameInfo.GameState = MonopolyGameData.GameStates[2];
            await _context.SaveChangesAsync(_cancellationToken);     
        }
    }
}
