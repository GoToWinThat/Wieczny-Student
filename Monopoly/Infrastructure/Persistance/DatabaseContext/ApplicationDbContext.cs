using Domain.Base;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Monopoly.Core.Base.Interfaces;
using System.Linq;
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
        public DbSet<MonopolyFieldList> MonopolyFieldLists { get; set; }

        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = new CancellationToken())
        {
            var result = await base.SaveChangesAsync(cancellationToken);

            return result;
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

            base.OnModelCreating(builder);
        }
    }
   
}
