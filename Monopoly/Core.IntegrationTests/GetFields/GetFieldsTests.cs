using Domain.Entities;
using Domain.Entities.Game;
using Domain.Enums;
using FluentAssertions;
using Monopoly.Core.UseCases.MonopolyFields.Queries.GetFields;
using NUnit.Framework;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.IntegrationTests.GetFields
{
    using static TestSetup;
    public class GetFieldsTests
    {
       [Test]
        public async Task ShouldReturnAllItemsInList()
        {
            await AddAsync(new CornerField { Name = "Dziekanat" });


            var query = new GetMonopolyFieldsQuery();

            var result = await SendAsync(query);

            result.MonopolyFields.FirstOrDefault().Name.Should().Be("Dziekanat");
        }
    }
}
