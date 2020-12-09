using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistance.Configuration
{
    public class MonopolyFieldConfiguration : IEntityTypeConfiguration<MonopolyField>
    {
        public void Configure(EntityTypeBuilder<MonopolyField> builder)
        {
            builder.Property(t => t.Name)
                .HasMaxLength(200)
                .IsRequired();
        }
    }
}

