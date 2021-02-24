using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistance.Configuration
{
    public class CornerFieldConfiguration : IEntityTypeConfiguration<CornerField>
    {
        public void Configure(EntityTypeBuilder<CornerField> builder)
        {
            builder.Property(t => t.Name)
                .HasMaxLength(200)
                .IsRequired();
        }
    }
}
