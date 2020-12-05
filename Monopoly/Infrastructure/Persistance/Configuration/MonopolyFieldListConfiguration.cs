using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistance.Configuration
{
    public class MonopolyFieldListConfiguration : IEntityTypeConfiguration<MonopolyFieldList>
    {
        public void Configure(EntityTypeBuilder<MonopolyFieldList> builder)
        {
            builder.Property(t => t.Id)
                .HasMaxLength(200)
                .IsRequired();
        }
    }
}
