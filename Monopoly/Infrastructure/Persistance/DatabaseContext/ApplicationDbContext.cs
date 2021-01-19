using Domain.Entities;
using Domain.Entities.Cards;
using Domain.Entities.Game;
using Domain.Enums;
using Microsoft.EntityFrameworkCore;
using Monopoly.Core.Base.Interfaces;
using System.Collections.Generic;
using System.Reflection;
using System.Threading;
using System.Threading.Tasks;

namespace Infrastructure.Persistance.DatabaseContext
{
    public class ApplicationDbContext : DbContext, IApplicationDbContext
    {
        private readonly IDomainEventService _domainEventService;

        public ApplicationDbContext(DbContextOptions options, IDomainEventService domainEventService):base(options)
        {
            _domainEventService = domainEventService;
        }
        public DbSet<MonopolyField> MonopolyFields { get; set; }
        public DbSet<PropertyField> PropertyFields { get; set; }
        public DbSet<CornerField> CornerFields { get; set; }
        public DbSet<EventField> EventFields { get; set; }
        public DbSet<Player> Players { get; set; }
        public DbSet<PropertyFieldInfo> PropertyFieldInfos { get; set; }
        public DbSet<Card> Cards { get; set; }
        public DbSet<GainCard> GainCards { get ; set ; }
        public DbSet<LossCard> LossCards { get; set; }
        public DbSet<GameInfo> GameInfo { get; set; }
        public DbSet<Dices> Dices { get ; set; }
        public DbSet<Log> Logs { get; set; }

        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = new CancellationToken())
        {
            var result = await base.SaveChangesAsync(cancellationToken);

            return result;
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
            #region players
            modelBuilder.Entity<Player>().HasData(
              new Player
              {
                  Id = 1,
                  Cash = 500,
                  Signature = "",
                  Color = "",
                  Name = "",
                  Position = 0,
                  TurnsToWait = 0,
                  IsInJail = false,
                  IsBankrupt = false,
                  IsLogged = false
              },
              new Player
              {
                  Id = 2,
                  Cash = 500,
                  Signature = "",
                  Color = "",
                  Name = "",
                  Position = 0,
                  TurnsToWait = 0,
                  IsInJail = false,
                  IsBankrupt = false,
                  IsLogged = false
              },
              new Player
              {
                  Id = 3,
                  Cash = 500,
                  Signature = "",
                  Color = "",
                  Name = "",
                  Position = 0,
                  TurnsToWait = 0,
                  IsInJail = false,
                  IsBankrupt = false,
                  IsLogged = false
              },
              new Player
              {
                  Id = 4,
                  Cash = 500,
                  Signature = "",
                  Color = "",
                  Name = "",
                  Position = 0,
                  TurnsToWait = 0,
                  IsInJail = false,
                  IsBankrupt = false,
                  IsLogged = false
              });
            #endregion
            #region propertyfields
            modelBuilder.Entity<PropertyField>().HasData(
           new PropertyField
           {
               Id = 2,
               Name = "Laboratorium nr 308 (MS)",
               Color = MonopolyColor.lightpink,
               Price = 15,
               RentCosts = new List<int> { 1, 4, 12, 36, 90 },
               EstatePrice = 10,
               Mortgage = 6,
               Purchased = false,
               MonopolyID = 1
           },


           new PropertyField
           {
               Id = 4,
               Name = "Laboratorium nr 309 (MS)",
               Color = MonopolyColor.lightpink,
               Price = 15,
               MonopolyID = 3,
               RentCosts = new List<int> { 1, 4, 12, 36, 90 },
               EstatePrice = 10,
               Mortgage = 6,
               Purchased = false
           },

                       new PropertyField
                       {
                           Id = 5,
                           Name = "Winda",
                           Type = MonopolyFieldType.company,
                           Color = MonopolyColor.lightpink,
                           Price = 40,
                           MonopolyID = 4,
                           RentCosts = new List<int> { 0 },
                           EstatePrice = 0,
                           Mortgage = 20,
                           Purchased = false
                       },

                       new PropertyField
                       {
                           Id = 6,
                           Name = "Toalety",
                           Type = MonopolyFieldType.company,
                           Color = MonopolyColor.yellow,
                           Price = 50,
                           MonopolyID = 5,
                           RentCosts = new List<int> { 0 },
                           EstatePrice = 0,
                           Mortgage = 20,
                           Purchased = false
                       },

                       new PropertyField
                       {
                           Id = 7,
                           Name = "Laboratorium nr 401 (MS)",
                           Color = MonopolyColor.lightblue,
                           Price = 20,
                           MonopolyID = 6,
                           RentCosts = new List<int> { 3, 12, 35, 90, 150 },
                           EstatePrice = 20,
                           Mortgage = 15,
                           Purchased = false
                       },

                       new PropertyField
                       {
                           Id = 8,
                           Name = "Sala wykładowa nr 402 (MS)",
                           Color = MonopolyColor.lightblue,
                           Price = 35,
                           MonopolyID = 7,
                           RentCosts = new List<int> { 3, 16, 44, 160, 200 },
                           EstatePrice = 20,
                           Mortgage = 20,
                           Purchased = false
                       },

                       new PropertyField
                       {
                           Id = 10,
                           Name = "Laboratorium nr 406 (MS)",
                           Color = MonopolyColor.lightgreen,
                           Price = 22,
                           MonopolyID = 9,
                           RentCosts = new List<int> { 1, 6, 18, 54, 90 },
                           EstatePrice = 10,
                           Mortgage = 10,
                           Purchased = false
                       },



                       new PropertyField
                       {
                           Id = 12,
                           Name = "Sala wykładowa nr 408 (MS)",
                           Color = MonopolyColor.lightgreen,
                           Price = 30,
                           MonopolyID = 11,
                           RentCosts = new List<int> { 2, 8, 20, 60, 100 },
                           EstatePrice = 10,
                           Mortgage = 12,
                           Purchased = false
                       },

                       new PropertyField
                       {
                           Id = 13,
                           Name = "Laboratorium nr 409 (MS)",
                           Color = MonopolyColor.lightgreen,
                           Price = 35,
                           MonopolyID = 12,
                           RentCosts = new List<int> { 3, 10, 25, 70, 125 },
                           EstatePrice = 20,
                           Mortgage = 15,
                           Purchased = false
                       },


                       new PropertyField
                       {
                           Id = 15,
                           Name = "Laboratorium nr 412 (MS)",
                           Color = MonopolyColor.lightgray,
                           Price = 35,
                           MonopolyID = 14,
                           RentCosts = new List<int> { 1, 12, 22, 100, 120 },
                           EstatePrice = 20,
                           Mortgage = 14,
                           Purchased = false
                       },

                       new PropertyField
                       {
                           Id = 16,
                           Name = "Toalety",
                           Type = MonopolyFieldType.company,
                           Color = MonopolyColor.yellow,
                           Price = 50,
                           MonopolyID = 15,
                           RentCosts = new List<int> { 0 },
                           EstatePrice = 0,
                           Mortgage = 20,
                           Purchased = false
                       },

                       new PropertyField
                       {
                           Id = 18,
                           Name = "Laboratorium nr 415 (MS)",
                           Color = MonopolyColor.lightgray,
                           Price = 39,
                           MonopolyID = 17,
                           RentCosts = new List<int> { 2, 12, 22, 100, 130 },
                           EstatePrice = 20,
                           Mortgage = 14,
                           Purchased = false
                       },
                       new PropertyField
                       {
                           Id = 19,
                           Name = "Laboratorium nr 416 (MS)",
                           Color = MonopolyColor.lightgray,
                           Price = 42,
                           MonopolyID = 18,
                           RentCosts = new List<int> { 3, 15, 25, 100, 150 },
                           EstatePrice = 20,
                           Mortgage = 14,
                           Purchased = false
                       },

                       new PropertyField
                       {
                           Id = 20,
                           Name = "Sala nr 507 (MS)",
                           Color = MonopolyColor.brown,
                           Price = 42,
                           MonopolyID = 19,
                           RentCosts = new List<int> { 3, 15, 45, 110, 180 },
                           EstatePrice = 20,
                           Mortgage = 22,
                           Purchased = false
                       },

                       new PropertyField
                       {
                           Id = 22,
                           Name = "Laboratorium nr 510 (MS)",
                           Color = MonopolyColor.brown,
                           Price = 42,
                           MonopolyID = 21,
                           RentCosts = new List<int> { 3, 15, 45, 110, 180 },
                           EstatePrice = 20,
                           Mortgage = 22,
                           Purchased = false
                       },

                       new PropertyField
                       {
                           Id = 25,
                           Name = "Sala nr 310 (LB)",
                           Color = MonopolyColor.darkorchid,
                           Price = 45,
                           MonopolyID = 24,
                           RentCosts = new List<int> { 3, 18, 50, 140, 210 },
                           EstatePrice = 20,
                           Mortgage = 25,
                           Purchased = false
                       },

                       new PropertyField
                       {
                           Id = 26,
                           Name = "Toalety",
                           Type = MonopolyFieldType.company,
                           Color = MonopolyColor.yellow,
                           Price = 50,
                           MonopolyID = 25,
                           RentCosts = new List<int> { 0 },
                           EstatePrice = 0,
                           Mortgage = 20,
                           Purchased = false
                       },

                       new PropertyField
                       {
                           Id = 27,
                           Name = "Sala nr 315 (LB)",
                           Color = MonopolyColor.darkorchid,
                           Price = 50,
                           MonopolyID = 26,
                           RentCosts = new List<int> { 3, 20, 60, 150, 230 },
                           EstatePrice = 20,
                           Mortgage = 25,
                           Purchased = false
                       },
                       new PropertyField
                       {
                           Id = 28,
                           Name = "Sala nr 425 (LB)",
                           Color = MonopolyColor.indianred,
                           Price = 50,
                           MonopolyID = 27,
                           RentCosts = new List<int> { 3, 14, 40, 110, 150 },
                           EstatePrice = 20,
                           Mortgage = 18,
                           Purchased = false
                       },
                       new PropertyField
                       {
                           Id = 29,
                           Name = "Sala nr 426 (LB)",
                           Color = MonopolyColor.indianred,
                           Price = 50,
                           MonopolyID = 28,
                           RentCosts = new List<int> { 3, 14, 40, 110, 150 },
                           EstatePrice = 20,
                           Mortgage = 18,
                           Purchased = false
                       },
                       new PropertyField
                       {
                           Id = 30,
                           Name = "Sala nr 427 (LB)",
                           Color = MonopolyColor.indianred,
                           Price = 60,
                           MonopolyID = 29,
                           RentCosts = new List<int> { 3, 15, 45, 120, 170 },
                           EstatePrice = 20,
                           Mortgage = 30,
                           Purchased = false
                       },

                       new PropertyField
                       {
                           Id = 32,
                           Name = "Aula C (CEK)",
                           Color = MonopolyColor.steelblue,
                           Price = 60,
                           MonopolyID = 31,
                           RentCosts = new List<int> { 5, 30, 90, 200, 280 },
                           EstatePrice = 40,
                           Mortgage = 30,
                           Purchased = false
                       },
                       new PropertyField
                       {
                           Id = 33,
                           Name = "Aula A (CNT)",
                           Color = MonopolyColor.steelblue,
                           Price = 60,
                           MonopolyID = 32,
                           RentCosts = new List<int> { 6, 38, 92, 190, 250 },
                           EstatePrice = 40,
                           Mortgage = 27,
                           Purchased = false
                       },
                       new PropertyField
                       {
                           Id = 34,
                           Name = "Pracownia fizyczna nr 2 (CNT)",
                           Color = MonopolyColor.steelblue,
                           Price = 60,
                           MonopolyID = 33,
                           RentCosts = new List<int> { 6, 40, 95, 250, 350 },
                           EstatePrice = 40,
                           Mortgage = 27,
                           Purchased = false
                       },
                       new PropertyField
                       {
                           Id = 36,
                           Name = "Toalety",
                           Type = MonopolyFieldType.company,
                           Color = MonopolyColor.yellow,
                           Price = 50,
                           MonopolyID = 35,
                           RentCosts = new List<int> { 0 },
                           EstatePrice = 0,
                           Mortgage = 20,
                           Purchased = false
                       },
                       new PropertyField
                       {
                           Id = 37,
                           Name = "Winda",
                           Type = MonopolyFieldType.company,
                           Color = MonopolyColor.orange,
                           Price = 40,
                           MonopolyID = 36,
                           RentCosts = new List<int> { 0 },
                           EstatePrice = 0,
                           Mortgage = 20,
                           Purchased = false
                       },
                       new PropertyField
                       {
                           Id = 39,
                           Name = "Biblioteka wydziałowa",
                           Color = MonopolyColor.sandybrown,
                           Price = 80,
                           MonopolyID = 38,
                           RentCosts = new List<int> { 7, 30, 100, 200, 350 },
                           EstatePrice = 40,
                           Mortgage = 35,
                           Purchased = false
                       },
                       new PropertyField
                       {
                           Id = 40,
                           Name = "Pracownia fizyczna nr 2 (CNT)",
                           Color = MonopolyColor.steelblue,
                           Price = 80,
                           MonopolyID = 39,
                           RentCosts = new List<int> { 10, 35, 110, 250, 400 },
                           EstatePrice = 40,
                           Mortgage = 45,
                           Purchased = false
                       });
            #endregion propertyfields

            #region eventfield
            modelBuilder.Entity<EventField>().HasData(

                        new EventField { Id = 3, Name = "Karta zysku", Color = MonopolyColor.white, MonopolyID = 2 },


                        new EventField { Id = 9, Name = "Karta straty", Color = MonopolyColor.white, MonopolyID = 8 },


                        new EventField { Id = 14, Name = "Karta zysku", Color = MonopolyColor.white, MonopolyID = 13 },


                        new EventField { Id = 17, Name = "Karta straty", Color = MonopolyColor.white, MonopolyID = 16 },


                        new EventField { Id = 23, Name = "Karta zysku", Color = MonopolyColor.white, MonopolyID = 22 },
                        new EventField { Id = 24, Name = "Karta straty", Color = MonopolyColor.white, MonopolyID = 23 },


                        new EventField { Id = 35, Name = "Karta straty", Color = MonopolyColor.white, MonopolyID = 34 },


                        new EventField { Id = 38, Name = "Karta zysku", Color = MonopolyColor.white, MonopolyID = 37 });
            #endregion

            #region corner
            modelBuilder.Entity<CornerField>().HasData(
                new CornerField { Name = "Portiernia", Color = MonopolyColor.seagreen, MonopolyID = 0, Id = 1 },



                        new CornerField { Id = 11, Name = "Konsultacje", Color = MonopolyColor.seagreen, MonopolyID = 10 },


                        new CornerField { Id = 21, Name = "Stołówka studencka", Color = MonopolyColor.seagreen, MonopolyID = 20 },



                        new CornerField { Id = 31, Name = "Dziekanat", Color = MonopolyColor.seagreen, MonopolyID = 30 });

            #endregion

            #region infos
            modelBuilder.Entity<PropertyFieldInfo>().HasData(
                new PropertyFieldInfo
                {
                    PropertyFieldId = 2,
                    EstateLevel = 0,
                    Mortgaged = false,
                    Id = 1
                },
                new PropertyFieldInfo
                {
                    PropertyFieldId = 4,
                    EstateLevel = 0,
                    Mortgaged = false,
                    Id = 2
                },
                new PropertyFieldInfo
                {
                    PropertyFieldId = 5,
                    EstateLevel = 0,
                    Mortgaged = false,
                    Id = 3
                },
                new PropertyFieldInfo
                {
                    PropertyFieldId = 6,
                    EstateLevel = 0,
                    Mortgaged = false,
                    Id = 4
                },
                new PropertyFieldInfo
                {
                    PropertyFieldId = 7,
                    EstateLevel = 0,
                    Mortgaged = false,
                    Id = 5
                },
                new PropertyFieldInfo
                {
                    PropertyFieldId = 8,
                    EstateLevel = 0,
                    Mortgaged = false,
                    Id = 6
                },
                new PropertyFieldInfo
                {
                    PropertyFieldId = 10,
                    EstateLevel = 0,
                    Mortgaged = false,
                    Id = 7
                },
                new PropertyFieldInfo
                {
                    PropertyFieldId = 12,
                    EstateLevel = 0,
                    Mortgaged = false,
                    Id = 8
                },
                new PropertyFieldInfo
                {
                    PropertyFieldId = 13,
                    EstateLevel = 0,
                    Mortgaged = false,
                    Id = 9
                },
                new PropertyFieldInfo
                {
                    PropertyFieldId = 15,
                    EstateLevel = 0,
                    Mortgaged = false,
                    Id = 10
                }, new PropertyFieldInfo
                {
                    PropertyFieldId = 16,
                    EstateLevel = 0,
                    Mortgaged = false,
                    Id = 11
                },
                new PropertyFieldInfo
                {
                    PropertyFieldId = 18,
                    EstateLevel = 0,
                    Mortgaged = false,
                    Id = 12
                },
                new PropertyFieldInfo
                {
                    PropertyFieldId = 19,
                    EstateLevel = 0,
                    Mortgaged = false,
                    Id = 13
                },
                new PropertyFieldInfo
                {
                    PropertyFieldId = 20,
                    EstateLevel = 0,
                    Mortgaged = false,
                    Id = 14
                },
                new PropertyFieldInfo
                {
                    PropertyFieldId = 22,
                    EstateLevel = 0,
                    Mortgaged = false,
                    Id = 15
                },
                new PropertyFieldInfo
                {
                    PropertyFieldId = 25,
                    EstateLevel = 0,
                    Mortgaged = false,
                    Id = 16
                },
                new PropertyFieldInfo
                {
                    PropertyFieldId = 26,
                    EstateLevel = 0,
                    Mortgaged = false,
                    Id = 17
                },
                new PropertyFieldInfo
                {
                    PropertyFieldId = 27,
                    EstateLevel = 0,
                    Mortgaged = false,
                    Id = 18
                },
                new PropertyFieldInfo
                {
                    PropertyFieldId = 28,
                    EstateLevel = 0,
                    Mortgaged = false,
                    Id = 19
                },
                new PropertyFieldInfo
                {
                    PropertyFieldId = 29,
                    EstateLevel = 0,
                    Mortgaged = false,
                    Id = 20
                },
                new PropertyFieldInfo
                {
                    PropertyFieldId = 30,
                    EstateLevel = 0,
                    Mortgaged = false,
                    Id = 21
                },
                new PropertyFieldInfo
                {
                    PropertyFieldId = 32,
                    EstateLevel = 0,
                    Mortgaged = false,
                    Id = 22
                },
                new PropertyFieldInfo
                {
                    PropertyFieldId = 33,
                    EstateLevel = 0,
                    Mortgaged = false,
                    Id = 23
                },
                new PropertyFieldInfo
                {
                    PropertyFieldId = 34,
                    EstateLevel = 0,
                    Mortgaged = false,
                    Id = 24
                },
                new PropertyFieldInfo
                {
                    PropertyFieldId = 36,
                    EstateLevel = 0,
                    Mortgaged = false,
                    Id = 25
                },
                new PropertyFieldInfo
                {
                    PropertyFieldId = 37,
                    EstateLevel = 0,
                    Mortgaged = false,
                    Id = 26
                },
                new PropertyFieldInfo
                {
                    PropertyFieldId = 39,
                    EstateLevel = 0,
                    Mortgaged = false,
                   Id = 27
                });
            #endregion
            modelBuilder.Entity<GameInfo>().HasData(new GameInfo { Id = 1, ActivePlayerIndex = 0, GameState = "waiting" });
            modelBuilder.Entity<Dices>().HasData(new Dices { Id = 1, DiceValues = new List<int> { 1, 1 } });
            modelBuilder.Entity<Log>().HasData(new Log { Id = 1, LogInfo = "Zaczynamy gre" });

            #region loss
            modelBuilder.Entity<LossCard>().HasData(
                   new LossCard
                   {
                       Id = 11,
                       Type = "Loss",
                       CardIdNumber = 10,
                       CardName = "Zapomniany klucz",
                       Description = "Prowadzący zapomniał zabrać klucza z portierni. Poprosił Cię o zejście na dół i przyniesienie go. Wracasz na pole PORTIERNIA."
                   },
                   new LossCard
                   {
                       Id = 12,
                       Type = "Loss",
                       CardIdNumber = 11,
                       CardName = "Zapłata rachunków",
                       Description = "Musisz zapłacić za prąd, internet i licencje programów. Za każde posiadane pole płacisz 10 ECTS."
                   },
                   new LossCard
                   {
                       Id = 13,
                       Type = "Loss",
                       CardIdNumber = 12,
                       CardName = "Warunek",
                       Description = "W tym semestrze nie szło Ci zbyt dobrze w nauce i musisz zapłacić za zaliczenie warunkowe. Płacisz 30 ECTS."
                   },
                   new LossCard
                   {
                       Id = 14,
                       Type = "Loss",
                       CardIdNumber = 13,
                       CardName = "Formalności",
                       Description = "Zaszła potrzeba wyjaśnienia przez Ciebie pewnej sytuacji. Niezwłocznie się udajesz się na pole DZIEKANAT."
                   },
                   new LossCard
                   {
                       Id = 15,
                       Type = "Loss",
                       CardIdNumber = 14,
                       CardName = "Douczanie się",
                       Description = "Niestety materiał na wykładzie okazał się być zbyt trudny i musisz udać się na pole KONSULTACJE."
                   },
                   new LossCard
                   {
                       Id = 16,
                       Type = "Loss",
                       CardIdNumber = 15,
                       CardName = "Głód",
                       Description = "Dopadł Cię głód. Niezwłocznie udajesz się na pole STOŁÓWKA STUDENCKA."
                   },
                   new LossCard
                   {
                       Id = 17,
                       Type = "Loss",
                       CardIdNumber = 16,
                       CardName = "Spłata pożyczki",
                       Description = "W poprzednim semestrze znajomy pomógł Ci, pożyczając pewną sumę ECTSów. Teraz musisz mu wszystko oddać. Płacisz 20 ECTS."
                   },
                   new LossCard
                   {
                       Id = 18,
                       Type = "Loss",
                       CardIdNumber = 17,
                       CardName = "Gdybym był bogaty",
                       Description = "Uznałeś / Uznałaś, że masz za dużo ECTSów i oddajesz każdemu nietracącemu kolejki graczowi kwotę 5 ECTS."
                   },
                   new LossCard
                   {
                       Id = 19,
                       Type = "Loss",
                       CardIdNumber = 18,
                       CardName = "Dziura w kieszeni",
                       Description = "Niedawno zarobione pieniądze wkładasz do kieszeni. Niestety ta okazuje się posiadać dziurę w sobie. Tracisz 5 ECTS."
                   },
                   new LossCard
                   {
                       Id = 20,
                       Type = "Loss",
                       CardIdNumber = 19,
                       CardName = "Spóźnienie",
                       Description = "Zajęcia trwały zbyt długo i odjechał Ci autobus. Tracisz kolejkę."
                   });
            #endregion

            #region gain
            modelBuilder.Entity<GainCard>().HasData(
                   new GainCard
                   {
                       Id = 1,
                       Type = "Gain",
                       CardIdNumber = 0,
                       CardName = "Pierwszeństwo w dziekanacie",
                       Description = "Masz przy sobie bardzo ważne dokumenty. Przy użyciu tej karty możesz od razu wyjść z dziekanatu nie tracąc żadnej kolejki."
                   },
                   new GainCard
                   {
                       Id = 2,
                       Type = "Gain",
                       CardIdNumber = 1,
                       CardName = "Oświecenie na konsultacjach",
                       Description = "Pokazujesz się z dobrej strony już na początku konsultacji. Przy użyciu tej karty możesz od razu z nich wyjść, nie tracąc żadnej kolejki."
                   },
                   new GainCard
                   {
                       Id = 3,
                       Type = "Gain",
                       CardIdNumber = 2,
                       CardName = "Wygrana w konkursie",
                       Description = "Reprezentujesz uczelnię na konkursie i wygrywasz go. Prowadzący postanowili zaliczyć Ci cały semestr. Otrzymujesz 50 ECTS."
                   },
                   new GainCard
                   {
                       Id = 4,
                       Type = "Gain",
                       CardIdNumber = 3,
                       CardName = "ECTSobranie",
                       Description = "Grozi Ci warunek, więc jak zwykle wybierasz się na poszukiwanie ECTSów w lesie. Udaje Ci się znaleźć aż 30 ECTS!"
                   },
                   new GainCard
                   {
                       Id = 5,
                       Type = "Gain",
                       CardIdNumber = 4,
                       CardName = "Miss RMS / Mister RMS",
                       Description = "Zyskałaś tytuł najpiękniejszej studentki / zyskałeś tytuł najprzystojniejszego studenta! Otrzymujesz w nagrodę 10 ECTS."
                   },
                   new GainCard
                   {
                       Id = 6,
                       Type = "Gain",
                       CardIdNumber = 5,
                       CardName = "Urodziny",
                       Description = "Masz urodziny i pozostali gracze życzą Ci zdania studiów. Dostajesz od każdego z nich 5 ECTS w prezencie."
                   },
                   new GainCard
                   {
                       Id = 7,
                       Type = "Gain",
                       CardIdNumber = 6,
                       CardName = "Wyróżnienie przez dziekana",
                       Description = "Za wyróżnianie się w nauce dziekan uznał, że zasługujesz na 100 ECTS - właśnie tyle wpływa na Twoje konto."
                   },
                   new GainCard
                   {
                       Id = 8,
                       Type = "Gain",
                       CardIdNumber = 7,
                       CardName = "Szczęśliwy traf",
                       Description = "Samorząd Wydziału zorganizował grę losową, w której do wygrania było 20 ECTS. Udało Ci się je wygrać!"
                   },
                   new GainCard
                   {
                       Id = 9,
                       Type = "Gain",
                       CardIdNumber = 8,
                       CardName = "Znajomości na stołówce",
                       Description = "Znajomy pracujący na stołówce studenckiej obiecał Ci, że obsłuży Cię bez kolejki, więc nie musisz tam czekać."
                   },
                   new GainCard
                   {
                       Id = 10,
                       Type = "Gain",
                       CardIdNumber = 9,
                       CardName = "O, pinć ECTSów!",
                       Description = "Idziesz sobie po korytarzu aż nagle zauważasz, że na podłodze leży 5 ECTSów. Nikogo w pobliżu nie ma, więc bierzesz je dla siebie."
                   });
            #endregion




        }
    }  
}
