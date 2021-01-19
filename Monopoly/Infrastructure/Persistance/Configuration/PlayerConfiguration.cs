using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Infrastructure.Persistance.Configuration
{
    public class PlayerConfiguration : IEntityTypeConfiguration<Player>
    {
        public void Configure(EntityTypeBuilder<Player> builder)
        {
            builder
                .HasMany(o => o.PropertyFieldInfos)
                .WithOne(p => p.Player)
                .HasForeignKey(p => p.PlayerId)
                .OnDelete(DeleteBehavior.SetNull);

            builder
                .HasMany(o => o.Cards)
                .WithMany(p => p.Players);
        }
    }
}
