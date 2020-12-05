using Domain.Entities;
using Domain.Enums;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace Infrastructure.Persistance.DatabaseContext
{
    public static class ApplicationDbContextSeed
    {
        public static async Task SeedSampleDataAsync(ApplicationDbContext context)
        {
            // Seed, if necessary
            if (!context.MonopolyFieldLists.Any())
            {
                context.MonopolyFieldLists.Add(new MonopolyFieldList
                {
                    Id = "MonopolyFields",
                    Fields =
                    {
                        new CornerField { Name="Stołówka"},
                        new CornerField { Name="Dziekanat"},
                        new CornerField { Name="Dziekanat"},
                        new CornerField { Name="Dziekanat"},

                        new PropertyField { Name="Laboratorium 303(MS)",
                            Color=PropertyColor.Green, 
                            Price=200, Mortage=120, EstatePrice=150, 
                            RentCosts = new List<int>{20,100,300,750,925,1100}, Purschased=false },
                        new PropertyField { Name="Laboratorium 303(MS)",
                            Color=PropertyColor.Green,
                            Price=200, Mortage=120, EstatePrice=150,
                            RentCosts = new List<int>{20,100,300,750,925,1100}, Purschased=false },
                        new PropertyField { Name="Laboratorium 303(MS)",
                            Color=PropertyColor.Green,
                            Price=200, Mortage=120, EstatePrice=150,
                            RentCosts = new List<int>{20,100,300,750,925,1100}, Purschased=false },
                        new PropertyField { Name="Laboratorium 303(MS)",
                            Color=PropertyColor.Green,
                            Price=200, Mortage=120, EstatePrice=150,
                            RentCosts = new List<int>{20,100,300,750,925,1100}, Purschased=false },

                        new PropertyField { Name="Sala Wykładowa 404(CNT)",
                            Color=PropertyColor.Yellow,
                            Price=150, Mortage=70, EstatePrice=100,
                            RentCosts = new List<int>{10,50,150,450,625,750}, Purschased=false },
                        new PropertyField { Name="Sala Wykładowa 404(CNT)",
                            Color=PropertyColor.Yellow,
                            Price=150, Mortage=70, EstatePrice=100,
                            RentCosts = new List<int>{10,50,150,450,625,750}, Purschased=false },
                        new PropertyField { Name="Sala Wykładowa 404(CNT)",
                            Color=PropertyColor.Yellow,
                            Price=150, Mortage=70, EstatePrice=100,
                            RentCosts = new List<int>{10,50,150,450,625,750}, Purschased=false },
                        new PropertyField { Name="Sala Wykładowa 404(CNT)",
                            Color=PropertyColor.Yellow,
                            Price=150, Mortage=70, EstatePrice=100,
                            RentCosts = new List<int>{10,50,150,450,625,750}, Purschased=false },

                        new PropertyField { Name="Laboratorium Budo",
                            Color=PropertyColor.Blue,
                            Price=300, Mortage=150, EstatePrice=175,
                            RentCosts = new List<int>{80,140,300,600,1000,1500}, Purschased=false },
                        new PropertyField { Name="Laboratorium Budo",
                            Color=PropertyColor.Blue,
                            Price=300, Mortage=150, EstatePrice=175,
                            RentCosts = new List<int>{80,140,300,600,1000,1500}, Purschased=false },
                        new PropertyField { Name="Laboratorium Budo",
                            Color=PropertyColor.Blue,
                            Price=300, Mortage=150, EstatePrice=175,
                            RentCosts = new List<int>{80,140,300,600,1000,1500}, Purschased=false },

                       new PropertyField { Name="Toalety",
                            Color=PropertyColor.None,
                            Price=400, Mortage=200, EstatePrice=0,
                            RentCosts = new List<int>{50 }, Purschased=false },
                        new PropertyField { Name="Toalety",
                            Color=PropertyColor.None,
                            Price=200, Mortage=100, EstatePrice=0,
                            RentCosts = new List<int>{50}, Purschased=false },

                        new EventField { Name="Loss Field"},
                        new EventField { Name="Loss Field"},
                        new EventField { Name="Profit Field"},
                        new EventField { Name="Profit Field"},
                    }
                });

                await context.SaveChangesAsync();
            }
        }
    }
}
