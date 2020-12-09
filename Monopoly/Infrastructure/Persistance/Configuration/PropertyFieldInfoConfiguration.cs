using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Domain.Entities.Game;
using Domain.Entities;

namespace Infrastructure.Persistance.Configuration
{
    public class PropertyFieldInfoConfiguration : IEntityTypeConfiguration<PropertyFieldInfo>
    {
        public void Configure(EntityTypeBuilder<PropertyFieldInfo> builder)
        {
            builder
                .HasOne(a => a.PropertyField)
                .WithOne(b => b.PropertyFieldInfo)
                .HasForeignKey<PropertyField>(p => p.PropertyFieldInfoRef);
        }
    }
}
