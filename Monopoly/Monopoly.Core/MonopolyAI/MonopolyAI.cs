using Domain.Entities;
using Monopoly.Core.Base.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Monopoly.Core.MonopolyAI
{
    public static class MonopolyAI
    {
        private static IApplicationDbContext _context;
        private static List<int> BotPlayersIDs = new List<int>();
        public static void ProcessBot(int index, CancellationToken cancellationToken)
        {
            var players = _context.Players.ToList();
            var fields = _context.MonopolyFields.ToList();
           
            

            var dices = _context.Dices.FirstOrDefault();


            _context.SaveChangesAsync(cancellationToken);
            TriggedByNewPostion(index);
        }
        public static void TriggedByNewPostion(int position)
        {

        }
    }
}
