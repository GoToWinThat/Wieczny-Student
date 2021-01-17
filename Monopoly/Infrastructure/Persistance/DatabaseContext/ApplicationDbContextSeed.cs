using Domain.Entities;
using Domain.Entities.Cards;
using Domain.Entities.Game;
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
            if (!context.MonopolyFields.Any())
            {
                context.MonopolyFields.AddRange(

                        new CornerField { Name = "Portiernia", Color = MonopolyColor.seagreen, MonopolyID=0},

                        new PropertyField
                        {
                            Name = "Laboratorium nr 308 (MS)",
                            Color = MonopolyColor.lightpink,
                            Price = 15,
                            RentCosts = new List<int> { 1, 4, 12, 36, 90 },
                            EstatePrice = 10,
                            Mortage = 6,
                            Purschased = false,
                            MonopolyID = 1,
                            PropertyFieldInfo = new PropertyFieldInfo
                            {
                                EstateLevel = 0,
                            }
                        },

                        new EventField { Name = "Karta zysku", Color = MonopolyColor.white,MonopolyID =2  },

                        new PropertyField
                        {
                            Name = "Laboratorium nr 309 (MS)",
                            Color = MonopolyColor.lightpink,
                            Price = 15,
                            MonopolyID = 3,
                            RentCosts = new List<int> { 1, 4, 12, 36, 90 },
                            EstatePrice = 10,
                            Mortage = 6,
                            Purschased = false,
                            PropertyFieldInfo = new PropertyFieldInfo
                            {
                                EstateLevel = 0,
                            }
                        },

                        new PropertyField
                        {
                            Name = "Winda",
                            Type= MonopolyFieldType.company,
                            Color = MonopolyColor.lightpink,
                            Price = 40,
                            MonopolyID = 4,
                            RentCosts = new List<int> { 0 },
                            EstatePrice = 0,
                            Mortage = 20,
                            Purschased = false,
                            PropertyFieldInfo = new PropertyFieldInfo
                            {
                                EstateLevel = 0,
                            }
                        },

                        new PropertyField
                        {
                            Name = "Toalety",
                            Type = MonopolyFieldType.company,
                            Color = MonopolyColor.yellow,
                            Price = 50,
                            MonopolyID = 5,
                            RentCosts = new List<int> { 0 },
                            EstatePrice = 0,
                            Mortage = 20,
                            Purschased = false,
                            PropertyFieldInfo = new PropertyFieldInfo
                            {
                                EstateLevel = 0,
                            }
                        },

                        new PropertyField
                        {
                            Name = "Laboratorium nr 401 (MS)",
                            Color = MonopolyColor.lightblue,
                            Price = 20,
                            MonopolyID = 6,
                            RentCosts = new List<int> { 3, 12, 35, 90, 150 },
                            EstatePrice = 20,
                            Mortage = 15,
                            Purschased = false,
                            PropertyFieldInfo = new PropertyFieldInfo
                            {
                                EstateLevel = 0,
                            }
                        },

                        new PropertyField
                        {
                            Name = "Sala wykładowa nr 402 (MS)",
                            Color = MonopolyColor.lightblue,
                            Price = 35,
                            MonopolyID = 7,
                            RentCosts = new List<int> { 3, 16, 44, 160, 200 },
                            EstatePrice = 20,
                            Mortage = 20,
                            Purschased = false,
                            PropertyFieldInfo = new PropertyFieldInfo
                            {
                                EstateLevel = 0,
                            }
                        },

                        new EventField { Name = "Karta straty", Color = MonopolyColor.white, MonopolyID = 8 },

                        new PropertyField
                        {
                            Name = "Laboratorium nr 406 (MS)",
                            Color = MonopolyColor.lightgreen,
                            Price = 22,
                            MonopolyID = 9,
                            RentCosts = new List<int> { 1, 6, 18, 54, 90 },
                            EstatePrice = 10,
                            Mortage = 10,
                            Purschased = false,
                            PropertyFieldInfo = new PropertyFieldInfo
                            {
                                EstateLevel = 0,
                            }
                        },

                        new CornerField { Name = "Konsultacje", Color = MonopolyColor.seagreen, MonopolyID = 10 },

                        new PropertyField
                        {
                            Name = "Sala wykładowa nr 408 (MS)",
                            Color = MonopolyColor.lightgreen,
                            Price = 30,
                            MonopolyID =11,
                            RentCosts = new List<int> { 2, 8, 20, 60, 100 },
                            EstatePrice = 10,
                            Mortage = 12,
                            Purschased = false,
                            PropertyFieldInfo = new PropertyFieldInfo
                            {
                                EstateLevel = 0,
                            }
                        },

                        new PropertyField
                        {
                            Name = "Laboratorium nr 409 (MS)",
                            Color = MonopolyColor.lightgreen,
                            Price = 35,
                            MonopolyID =12,
                            RentCosts = new List<int> { 3, 10, 25, 70, 125 },
                            EstatePrice = 20,
                            Mortage = 15,
                            Purschased = false,
                            PropertyFieldInfo = new PropertyFieldInfo
                            {
                                EstateLevel = 0,
                            }
                        },

                        new EventField { Name = "Karta zysku", Color = MonopolyColor.white, MonopolyID = 13 },

                        new PropertyField
                        {
                            Name = "Laboratorium nr 412 (MS)",
                            Color = MonopolyColor.lightgray,
                            Price = 35,
                            MonopolyID =14,
                            RentCosts = new List<int> { 1, 12, 22, 100, 120 },
                            EstatePrice = 20,
                            Mortage = 14,
                            Purschased = false,
                            PropertyFieldInfo = new PropertyFieldInfo
                            {
                                EstateLevel = 0,
                            }
                        },

                        new PropertyField
                        {
                            Name = "Toalety",
                            Type = MonopolyFieldType.company,
                            Color = MonopolyColor.yellow,
                            Price = 50,
                            MonopolyID =15,
                            RentCosts = new List<int> { 0 },
                            EstatePrice = 0,
                            Mortage = 20,
                            Purschased = false,
                            PropertyFieldInfo = new PropertyFieldInfo
                            {
                                EstateLevel = 0,
                            }
                        },
                        new EventField { Name = "Karta straty", Color = MonopolyColor.white, MonopolyID = 16 },

                        new PropertyField
                        {
                            Name = "Laboratorium nr 415 (MS)",
                            Color = MonopolyColor.lightgray,
                            Price = 39,
                            MonopolyID =17,
                            RentCosts = new List<int> { 2, 12, 22, 100, 130 },
                            EstatePrice = 20,
                            Mortage = 14,
                            Purschased = false,
                            PropertyFieldInfo = new PropertyFieldInfo
                            {
                                EstateLevel = 0,
                            }
                        },
                        new PropertyField
                        {
                            Name = "Laboratorium nr 416 (MS)",
                            Color = MonopolyColor.lightgray,
                            Price = 42,
                            MonopolyID =18,
                            RentCosts = new List<int> { 3, 15, 25, 100, 150 },
                            EstatePrice = 20,
                            Mortage = 14,
                            Purschased = false,
                            PropertyFieldInfo = new PropertyFieldInfo
                            {
                                EstateLevel = 0,
                            }
                        },

                        new PropertyField
                        {
                            Name = "Sala nr 507 (MS)",
                            Color = MonopolyColor.brown,
                            Price = 42,
                            MonopolyID =19,
                            RentCosts = new List<int> { 3, 15, 45, 110, 180 },
                            EstatePrice = 20,
                            Mortage = 22,
                            Purschased = false,
                            PropertyFieldInfo = new PropertyFieldInfo
                            {
                                EstateLevel = 0,
                            }
                        },
                        new CornerField { Name = "Stołówka studencka", Color = MonopolyColor.seagreen, MonopolyID =20 },
                        
                        new PropertyField
                        {
                            Name = "Laboratorium nr 510 (MS)",
                            Color = MonopolyColor.brown,
                            Price = 42,
                            MonopolyID =21,
                            RentCosts = new List<int> { 3, 15, 45, 110, 180 },
                            EstatePrice = 20,
                            Mortage = 22,
                            Purschased = false,
                            PropertyFieldInfo = new PropertyFieldInfo
                            {
                                EstateLevel = 0,
                            }
                        },
                        new EventField { Name = "Karta zysku", Color = MonopolyColor.white, MonopolyID = 22},
                        new EventField { Name = "Karta straty", Color = MonopolyColor.white, MonopolyID = 23 },
                        
                        new PropertyField
                        {
                            Name = "Sala nr 310 (LB)",
                            Color = MonopolyColor.darkorchid,
                            Price = 45,
                            MonopolyID =24,
                            RentCosts = new List<int> { 3, 18, 50, 140, 210 },
                            EstatePrice = 20,
                            Mortage = 25,
                            Purschased = false,
                            PropertyFieldInfo = new PropertyFieldInfo
                            {
                                EstateLevel = 0,
                            }
                        },
                      
                        new PropertyField
                        {
                            Name = "Toalety",
                            Type = MonopolyFieldType.company,
                            Color = MonopolyColor.yellow,
                            Price = 50,
                            MonopolyID =25,
                            RentCosts = new List<int> { 0 },
                            EstatePrice = 0,
                            Mortage = 20,
                            Purschased = false,
                            PropertyFieldInfo = new PropertyFieldInfo
                            {
                                EstateLevel = 0,
                            }
                        },

                        new PropertyField
                        {
                            Name = "Sala nr 315 (LB)",
                            Color = MonopolyColor.darkorchid,
                            Price = 50,
                            MonopolyID =26,
                            RentCosts = new List<int> { 3, 20, 60, 150, 230 },
                            EstatePrice = 20,
                            Mortage = 25,
                            Purschased = false,
                            PropertyFieldInfo = new PropertyFieldInfo
                            {
                                EstateLevel = 0,
                            }
                        },
                        new PropertyField
                        {
                            Name = "Sala nr 425 (LB)",
                            Color = MonopolyColor.indianred,
                            Price = 50,
                            MonopolyID =27,
                            RentCosts = new List<int> { 3, 14, 40, 110, 150 },
                            EstatePrice = 20,
                            Mortage = 18,
                            Purschased = false,
                            PropertyFieldInfo = new PropertyFieldInfo
                            {
                                EstateLevel = 0,
                            }
                        },
                        new PropertyField
                        {
                            Name = "Sala nr 426 (LB)",
                            Color = MonopolyColor.indianred,
                            Price = 50,
                            MonopolyID =28,
                            RentCosts = new List<int> { 3, 14, 40, 110, 150 },
                            EstatePrice = 20,
                            Mortage = 18,
                            Purschased = false,
                            PropertyFieldInfo = new PropertyFieldInfo
                            {
                                EstateLevel = 0,
                            }
                        },
                        new PropertyField
                        {
                            Name = "Sala nr 427 (LB)",
                            Color = MonopolyColor.indianred,
                            Price = 60,
                            MonopolyID =29,
                            RentCosts = new List<int> { 3, 15, 45, 120, 170 },
                            EstatePrice = 20,
                            Mortage = 30,
                            Purschased = false,
                            PropertyFieldInfo = new PropertyFieldInfo
                            {
                                EstateLevel = 0,
                            }
                        },

                        new CornerField { Name = "Dziekanat", Color = MonopolyColor.seagreen, MonopolyID = 30 },
                        
                        new PropertyField
                        {
                            Name = "Aula C (CEK)",
                            Color = MonopolyColor.steelblue,
                            Price = 60,
                            MonopolyID =31,
                            RentCosts = new List<int> { 5, 30, 90, 200, 280 },
                            EstatePrice = 40,
                            Mortage = 30,
                            Purschased = false,
                            PropertyFieldInfo = new PropertyFieldInfo
                            {
                                EstateLevel = 0,
                            }
                        },
                        new PropertyField
                        {
                            Name = "Aula A (CNT)",
                            Color = MonopolyColor.steelblue,
                            Price = 60,
                            MonopolyID =32,
                            RentCosts = new List<int> { 6, 38, 92, 190, 250 },
                            EstatePrice = 40,
                            Mortage = 27,
                            Purschased = false,
                            PropertyFieldInfo = new PropertyFieldInfo
                            {
                                EstateLevel = 0,
                            }
                        },
                        new PropertyField
                        {
                            Name = "Pracownia fizyczna nr 2 (CNT)",
                            Color = MonopolyColor.steelblue,
                            Price = 60,
                            MonopolyID =33,
                            RentCosts = new List<int> { 6, 40, 95, 250, 350 },
                            EstatePrice = 40,
                            Mortage = 27,
                            Purschased = false,
                            PropertyFieldInfo = new PropertyFieldInfo
                            {
                                EstateLevel = 0,
                            }
                        },
                        new EventField { Name = "Karta straty", Color = MonopolyColor.white, MonopolyID = 34 },
                        new PropertyField
                        {
                            Name = "Toalety",
                            Type = MonopolyFieldType.company,
                            Color = MonopolyColor.yellow,
                            Price = 50,
                            MonopolyID =35,
                            RentCosts = new List<int> { 0 },
                            EstatePrice = 0,
                            Mortage = 20,
                            Purschased = false,
                            PropertyFieldInfo = new PropertyFieldInfo
                            {
                                EstateLevel = 0,
                            }
                        },
                        new PropertyField
                        {
                            Name = "Winda",
                            Type = MonopolyFieldType.company,
                            Color = MonopolyColor.orange,
                            Price = 40,
                            MonopolyID =36,
                            RentCosts = new List<int> { 0 },
                            EstatePrice = 0,
                            Mortage = 20,
                            Purschased = false,
                            PropertyFieldInfo = new PropertyFieldInfo
                            {
                                EstateLevel = 0,
                            }
                        },
                        new EventField { Name = "Karta zysku", Color = MonopolyColor.white, MonopolyID = 37 },
                        new PropertyField
                        {
                            Name = "Biblioteka wydziałowa",
                            Color = MonopolyColor.sandybrown,
                            Price = 80,
                            MonopolyID =38,
                            RentCosts = new List<int> { 7, 30, 100, 200, 350 },
                            EstatePrice = 40,
                            Mortage = 35,
                            Purschased = false,
                            PropertyFieldInfo = new PropertyFieldInfo
                            {
                                EstateLevel = 0,
                            }
                        },
                        new PropertyField
                        {
                            Name = "Pracownia fizyczna nr 2 (CNT)",
                            Color = MonopolyColor.steelblue,
                            Price = 80,
                            MonopolyID =39,
                            RentCosts = new List<int> { 10, 35, 110, 250, 400 },
                            EstatePrice = 40,
                            Mortage = 45,
                            Purschased = false,
                            PropertyFieldInfo = new PropertyFieldInfo
                            {
                                EstateLevel = 0,
                            }
                        });      
            }
            if(!context.Cards.Any())
            {
                context.Cards.AddRange(
                    new GainCard 
                    { 
                        Type="Gain", 
                        CardName= "Pierwszeństwo w dziekanacie",
                        Description= "Masz przy sobie bardzo ważne dokumenty. Przy użyciu tej karty możesz od razu wyjść z dziekanatu nie tracąc żadnej kolejki."
                    },
                    new GainCard
                    {
                        Type = "Gain",
                        CardName = "Oświecenie na konsultacjach",
                        Description = "Pokazujesz się z dobrej strony już na początku konsultacji. Przy użyciu tej karty możesz od razu z nich wyjść, nie tracąc żadnej kolejki."
                    },
                    new GainCard
                    {
                        Type = "Gain",
                        CardName = "Wygrana w konkursie",
                        Description = "Reprezentujesz uczelnię na konkursie i wygrywasz go. Prowadzący postanowili zaliczyć Ci cały semestr. Otrzymujesz 50 ECTS."
                    },
                    new GainCard
                    {
                        Type = "Gain",
                        CardName = "ECTSobranie",
                        Description = "Grozi Ci warunek, więc jak zwykle wybierasz się na poszukiwanie ECTSów w lesie. Udaje Ci się znaleźć aż 30 ECTS!"
                    },
                    new GainCard
                    {
                        Type = "Gain",
                        CardName = "Miss RMS / Mister RMS",
                        Description = "Zyskałaś tytuł najpiękniejszej studentki / zyskałeś tytuł najprzystojniejszego studenta! Otrzymujesz w nagrodę 10 ECTS."
                    },
                    new GainCard
                    {
                        Type = "Gain",
                        CardName = "Urodziny",
                        Description = "Masz urodziny i pozostali gracze życzą Ci zdania studiów. Dostajesz od każdego z nich 5 ECTS w prezencie."
                    },
                    new GainCard
                    {
                        Type = "Gain",
                        CardName = "Wyróżnienie przez dziekana",
                        Description = "Za wyróżnianie się w nauce dziekan uznał, że zasługujesz na 100 ECTS - właśnie tyle wpływa na Twoje konto."
                    },
                    new GainCard
                    {
                        Type = "Gain",
                        CardName = "Szczęśliwy traf",
                        Description = "Samorząd Wydziału zorganizował grę losową, w której do wygrania było 20 ECTS. Udało Ci się je wygrać!"
                    },
                    new GainCard
                    {
                        Type = "Gain",
                        CardName = "Znajomości na stołówce",
                        Description = "Znajomy pracujący na stołówce studenckiej obiecał Ci, że obsłuży Cię bez kolejki, więc nie musisz tam czekać."
                    },
                    new GainCard
                    {
                        Type = "Gain",
                        CardName = "O, pinć ECTSów!",
                        Description = "Idziesz sobie po korytarzu aż nagle zauważasz, że na podłodze leży 5 ECTSów. Nikogo w pobliżu nie ma, więc bierzesz je dla siebie."
                    });

            }
            if (!context.Cards.Any())
            {
                context.Cards.AddRange(
                    new LossCard
                    {
                        Type="Loss",
                        CardName= "Zapomniany klucz",
                        Description= "Prowadzący zapomniał zabrać klucza z portierni. Poprosił Cię o zejście na dół i przyniesienie go. Wracasz na pole PORTIERNIA."
                    },
                    new LossCard
                    {
                        Type = "Loss",
                        CardName = "Zapłata rachunków",
                        Description = "Musisz zapłacić za prąd, internet i licencje programów. Za każde posiadane pole płacisz 10 ECTS."
                    },
                    new LossCard
                    {
                        Type = "Loss",
                        CardName = "Warunek",
                        Description = "W tym semestrze nie szło Ci zbyt dobrze w nauce i musisz zapłacić za zaliczenie warunkowe. Płacisz 30 ECTS."
                    },
                    new LossCard
                    {
                        Type = "Loss",
                        CardName = "Formalności",
                        Description = "Zaszła potrzeba wyjaśnienia przez Ciebie pewnej sytuacji. Niezwłocznie się udajesz się na pole DZIEKANAT."
                    },
                    new LossCard
                    {
                        Type = "Loss",
                        CardName = "Douczanie się",
                        Description = "Niestety materiał na wykładzie okazał się być zbyt trudny i musisz udać się na pole KONSULTACJE."
                    },
                    new LossCard
                    {
                        Type = "Loss",
                        CardName = "Głód",
                        Description = "Dopadł Cię głód. Niezwłocznie udajesz się na pole STOŁÓWKA STUDENCKA."
                    },
                    new LossCard
                    {
                        Type = "Loss",
                        CardName = "Spłata pożyczki",
                        Description = "W poprzednim semestrze znajomy pomógł Ci, pożyczając pewną sumę ECTSów. Teraz musisz mu wszystko oddać. Płacisz 20 ECTS."
                    },
                    new LossCard
                    {
                        Type = "Loss",
                        CardName = "Gdybym był bogaty",
                        Description = "Uznałeś / Uznałaś, że masz za dużo ECTSów i oddajesz każdemu nietracącemu kolejki graczowi kwotę 5 ECTS."
                    },
                    new LossCard
                    {
                        Type = "Loss",
                        CardName = "Dziura w kieszeni",
                        Description = "Niedawno zarobione pieniądze wkładasz do kieszeni. Niestety ta okazuje się posiadać dziurę w sobie. Tracisz 5 ECTS."
                    },
                    new LossCard
                    {
                        Type = "Loss",
                        CardName = "Spóźnienie",
                        Description = "Zajęcia trwały zbyt długo i odjechał Ci autobus. Tracisz kolejkę."                   
                    }
                    );
            }
            if(!context.Players.Any())
            {
                context.Players.AddRange(
                    new Player
                    {
                        Cash = 1000,
                        Signature="0000",
                        Color=MonopolyColor.blue,
                        Position=0,
                        IsInJail=false,
                        TurnsToWait=0,
                        IsBrankrupt=false,
                        IsLogged=false,
                    },
                    new Player
                    {
                        Cash = 1000,
                        Signature = "1111",
                        Color = MonopolyColor.red,
                        Position = 0,
                        IsInJail = false,
                        TurnsToWait = 0,
                        IsBrankrupt = false,
                        IsLogged = false
                    },
                    new Player
                    {
                        Cash = 1000,
                        Signature = "2222",
                        Color = MonopolyColor.orange,
                        Position = 0,
                        IsInJail = false,
                        TurnsToWait = 0,
                        IsBrankrupt = false,
                        IsLogged = false
                    },
                    new Player
                    {
                        Cash = 1000,
                        Signature = "3333",
                        Color = MonopolyColor.green,
                        Position = 0,
                        IsInJail = false,
                        TurnsToWait = 0,
                        IsBrankrupt = false,
                        IsLogged = false
                    }
                    );
            }
            context.GameInfo.Add(new GameInfo { ActivePlayerIndex = 1 }); ;
            context.Dices.Add(new Dices { DiceValues = new List<int> { 1, 1 } });
            await context.SaveChangesAsync();
            if(context.PropertyFieldInfos.Any()&&context.MonopolyFields.Any())
            {
                int i = 0;
                foreach(var infos in context.PropertyFieldInfos)
                {
                    infos.PropertyField = (PropertyField)context.MonopolyFields.Where(f => f.MonopolyID == i).First();
                }
            }
            //Do testowania
            if(context.Players.Any())
            {
                context.Cards.First().Player= context.Players.First();
                context.Cards.OrderBy(c=>c.Id).Last().Player = context.Players.First();
            }
            //Do testowania
            await context.SaveChangesAsync();
        }
    }
}
