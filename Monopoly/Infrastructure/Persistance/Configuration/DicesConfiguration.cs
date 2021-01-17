using Domain.Entities.Game;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Persistance.Configuration
{
    public class DicesConfiguration : IEntityTypeConfiguration<Dices>
    {
        public void Configure(EntityTypeBuilder<Dices> builder)
        {
            var ListConverter = new ValueConverter<List<int>, string>
                (v => string.Join(";", v), v => v.Split(new[] { ';' })
               .Select(x => Int32.Parse(x))
               .ToList());

            builder.Property(nameof(Dices.DiceValues)).HasConversion(ListConverter);
        }
    }
}
