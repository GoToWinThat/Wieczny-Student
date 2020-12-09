using System;
using System.Collections.Generic;
using System.Linq;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Infrastructure.Persistance.Configuration
{
    public class PropertyFieldConfiguration : IEntityTypeConfiguration<PropertyField>
    {
        public void Configure(EntityTypeBuilder<PropertyField> builder)
        {
            var ListConverter = new ValueConverter<List<int>, string>
                (v => string.Join(";", v),  v => v.Split(new[] { ';' })
                .Select(x => Int32.Parse(x))
                .ToList());
            
            builder.Ignore(e => e.DomainEvents);    
            builder.Property(nameof(PropertyField.RentCosts)).HasConversion(ListConverter);
        }
    }
}
