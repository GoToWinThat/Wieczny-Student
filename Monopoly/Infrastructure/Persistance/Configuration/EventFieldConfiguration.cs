using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistance.Configuration
{
    public class EventFieldConfiguration : IEntityTypeConfiguration<EventField>
    {
        public void Configure(EntityTypeBuilder<EventField> builder)
        {
        }
    }
}
