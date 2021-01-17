using Domain.Entities;
using Domain.Entities.Cards;
using Domain.Entities.Game;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Monopoly.Core.Base.Interfaces
{
    public interface IApplicationDbContext
    {
        public DbSet<MonopolyField> MonopolyFields { get; set; }
        public DbSet<PropertyField> PropertyFields { get; set; }
        public DbSet<CornerField> CornerFields { get; set; }
        public DbSet<EventField> EventFields { get; set; }
        public DbSet<Player> Players { get; set; }
        public DbSet<PropertyFieldInfo> PropertyFieldInfos { get; set; }
        public DbSet<Card> Cards { get; set; }
        public DbSet<GainCard> GainCards { get; set; }
        public DbSet<LossCard> LossCards { get; set; }
        public DbSet<GameInfo> GameInfo { get; set; }
        public DbSet<Dices> Dices { get; set; }
        public DbSet<Log> Logs { get; set; }

        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}
