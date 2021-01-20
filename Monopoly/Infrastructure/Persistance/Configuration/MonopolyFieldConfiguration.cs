using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistance.Configuration
{
    public class MonopolyFieldConfiguration : IEntityTypeConfiguration<MonopolyField>
    {
        public void Configure(EntityTypeBuilder<MonopolyField> builder)
        {
        }
    }
}

