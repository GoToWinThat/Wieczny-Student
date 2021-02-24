using Domain.Entities;
using Domain.Entities.Cards;
using Domain.Entities.Game;
using Domain.Enums;
using Microsoft.EntityFrameworkCore;
using Monopoly.Core.Base.Interfaces;
using System.Collections.Generic;
using System.Reflection;
using System.Threading;
using System.Threading.Tasks;

namespace Infrastructure.Persistance.DatabaseContext
{
    public class ApplicationDbContext : DbContext, IApplicationDbContext
    {
        private readonly IDomainEventService _domainEventService;

        public ApplicationDbContext(DbContextOptions options, IDomainEventService domainEventService):base(options)
        {
            _domainEventService = domainEventService;
        }
        public DbSet<MonopolyField> MonopolyFields { get; set; }
        public DbSet<PropertyField> PropertyFields { get; set; }
        public DbSet<CornerField> CornerFields { get; set; }
        public DbSet<EventField> EventFields { get; set; }
        public DbSet<Player> Players { get; set; }
        public DbSet<PropertyFieldInfo> PropertyFieldInfos { get; set; }
        public DbSet<Card> Cards { get; set; }
        public DbSet<GainCard> GainCards { get ; set ; }
        public DbSet<LossCard> LossCards { get; set; }
        public DbSet<GameInfo> GameInfo { get; set; }
        public DbSet<Dices> Dices { get ; set; }
        public DbSet<Log> Logs { get; set; }
        public DbSet<TradeInfo> TradeInfos { get; set; }

        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = new CancellationToken())
        {
            var result = await base.SaveChangesAsync(cancellationToken);

            return result;
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
            modelBuilder.Seed();
        }
    }  
}
