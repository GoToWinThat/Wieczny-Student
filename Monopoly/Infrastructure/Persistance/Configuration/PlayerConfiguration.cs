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
            //Player with propertyinfos
            builder
                .HasMany(o => o.PropertyFieldInfos)
                .WithOne(p => p.Player)
                .HasForeignKey(p => p.PlayerId)
                .OnDelete(DeleteBehavior.SetNull);

            //Player with cards
            builder
                .HasMany(o => o.Cards)
                .WithMany(p => p.Players);

            var ListConverter = new ValueConverter<List<int>, string>
                   (v => string.Join(";", v), v => v.Split(new[] { ';' })
                  .Select(x => Int32.Parse(x))
                  .ToList());

            builder.Property(nameof(Player.ThrownDices)).HasConversion(ListConverter);

            builder.Property(p => p.Signature)
                .HasMaxLength(40)
                .IsRequired();
        }
    }
}
