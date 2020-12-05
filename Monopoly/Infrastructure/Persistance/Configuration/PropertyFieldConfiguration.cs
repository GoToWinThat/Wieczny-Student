using Domain.Entities;
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
    public class PropertyFieldConfiguration : IEntityTypeConfiguration<PropertyField>
    {
        public void Configure(EntityTypeBuilder<PropertyField> builder)
        {
            builder.Ignore(e => e.DomainEvents);
            var ListConverter = new ValueConverter<List<int>, string>(v => string.Join(";", v), v => v.Split(new[] { ';' }).Select(x => Int32.Parse(x)).ToList());
            builder.Property(nameof(PropertyField.RentCosts)).HasConversion(ListConverter);
        }
    }
}
