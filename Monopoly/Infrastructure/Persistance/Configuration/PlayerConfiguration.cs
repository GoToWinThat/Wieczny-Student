using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistance.Configuration
{
    public class PlayerConfiguration : IEntityTypeConfiguration<Player>
    {
        public void Configure(EntityTypeBuilder<Player> builder)
        {
            builder
                .HasMany(o => o.PropertyFieldInfos)
                .WithOne(p => p.Player)
                .HasForeignKey(p => p.PlayerId);
            builder.Property(p => p.Signature)
                .HasMaxLength(40)
                .IsRequired();
        }
    }
}
