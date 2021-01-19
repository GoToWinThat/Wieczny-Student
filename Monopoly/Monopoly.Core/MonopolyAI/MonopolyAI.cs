using Domain.Entities;
using Monopoly.Core.Base.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Domain.Enums;
using Domain.Entities.Game;
using Domain.Entities.Cards;

namespace Monopoly.Core.MonopolyAI
{
    public static class MonopolyAI
    {
        private static IApplicationDbContext _context;
        private static List<int> BotPlayersIDs = new List<int>();

        public static void ProcessBot(int index, CancellationToken cancellationToken)
        {
            var players = _context.Players.ToList();
            var fields = _context.MonopolyFields.ToList();
           
            

            var dices = _context.Dices.FirstOrDefault();


            _context.SaveChangesAsync(cancellationToken);
            TriggedByNewPostion(index);
        }
        public static void NewPositionAction(Player player, IApplicationDbContext _context)
        {
            var newField = _context.MonopolyFields.ToList()[player.Position];
            MonopolyFieldType newFieldType = newField.Type;
            var newFieldName = newField.Name;
            switch (newFieldType)
            {
                case MonopolyFieldType.corner:

                    switch (newFieldName)
                    {
                        case "Konsultacje":
                            for (int i = 0; i < player.Cards.Count; i++)
                            {
                                if(player.Cards.ElementAt(i).CardIdNumber == 1)
                                {
                                    _context.Logs.Add(new Domain.Entities.Game.Log { LogInfo = $"{player.Name} używa karty ${player.Cards.ElementAt(i).CardName.ToUpper()}" });
                                    player.Cards.Remove(player.Cards.ElementAt(i));
                                    break;
                                }
                            }
                            player.TurnsToWait += 2;
                            _context.Logs.Add(new Domain.Entities.Game.Log { LogInfo = $"{player.Name} traci 2 kolejki i dostęp do telefonu!" });

                            break;

                        case "Stołówka studencka":
                            for (int i = 0; i < player.Cards.Count; i++)
                            {
                                if(player.Cards.ElementAt(i).CardIdNumber == 8)
                                {
                                    _context.Logs.Add(new Domain.Entities.Game.Log { LogInfo = $"{player.Name} używa karty ${player.Cards.ElementAt(i).CardName.ToUpper()}" });
                                    player.Cards.Remove(player.Cards.ElementAt(i));
                                }
                            }

                            player.TurnsToWait += 2;
                            _context.Logs.Add(new Domain.Entities.Game.Log { LogInfo = $"{player.Name} traci 2 kolejki i dostęp do telefonu!" });

                            break;

                        case "Dziekanat":
                            for (int i = 0; i < player.Cards.Count; i++)
                            {
                                if (player.Cards.ElementAt(i).CardIdNumber == 8)
                                {
                                    _context.Logs.Add(new Domain.Entities.Game.Log { LogInfo = $"{player.Name} używa karty ${player.Cards.ElementAt(i).CardName.ToUpper()}" });
                                    player.Cards.Remove(player.Cards.ElementAt(i));
                                }
                            }
                            player.TurnsToWait += 3;
                            _context.Logs.Add(new Domain.Entities.Game.Log { LogInfo = $"{player.Name} traci 3 kolejki i dostęp do telefonu!" });
                            break;

                        default:
                            break;
                    }
                    break;

                case MonopolyFieldType.property:
                    var PropertyID = newField.MonopolyID;
                    foreach(Player p in _context.Players)
                    {
                        if (p == player) continue;

                        foreach(PropertyFieldInfo property in p.PropertyFieldInfos)
                        {
                            if(property.PropertyFieldId == PropertyID)
                            {
                                if (property.Mortgaged) break;

                                var cost = property.PropertyField.RentCosts[property.EstateLevel];
                                player.Cash -= cost;
                                p.Cash += cost;

                                _context.Logs.Add(new Log { LogInfo = $"{player.Name} płaci graczowi ${p.Name} kwotę ${cost} ECTS !" });
                            }
                        }

                    }
                    break;

                case MonopolyFieldType.company:
                    var companyID = newField.MonopolyID;
                    var companyName = newField.Name;

                    foreach (Player p in _context.Players)
                    {
                        if (p.Name == player.Name) continue;

                        foreach (PropertyFieldInfo property in p.PropertyFieldInfos)
                        {
                            if(property.PropertyFieldId == companyID)
                            {
                                if (property.Mortgaged) break;

                                int ownedCompanies = 0;

                                foreach(PropertyFieldInfo property1 in p.PropertyFieldInfos)
                                {
                                    var fieldName = property1.PropertyField.Name;
                                    if (fieldName == companyName) ownedCompanies++;
                                }

                                var dicesCount = _context.Dices.FirstOrDefault().DiceValues[0] + _context.Dices.FirstOrDefault().DiceValues[1];
                                int cost = (int)(dicesCount * Math.Pow(3,  ownedCompanies - 1));

                                player.Cash -= cost;
                                p.Cash += cost;

                                _context.Logs.Add(new Log { LogInfo = $"{player.Name} płaci graczowi ${p.Name} kwotę ${cost} ECTS." });
                                break;
                            }
                        }
                    }
                    break;

                case MonopolyFieldType.@event:
                    Card card = null;
                    var rand = new Random();
                    
                    switch (newField.Name)
                    {
                        case "Karta zysku":
                            card = _context.GainCards.ElementAt(rand.Next(0, _context.GainCards.Count()));
                            _context.Logs.Add(new Log { LogInfo = $"{player.Name} otrzymuję kartę ${card.CardName.ToUpper()}." });
                            break;

                        case "Karta straty":
                            card = _context.GainCards.ElementAt(rand.Next(0, _context.LossCards.Count()));
                            _context.Logs.Add(new Log { LogInfo = $"{player.Name} otrzymuję kartę ${card.CardName.ToUpper()}." });
                            break;
                    }

                    break;

                default:
                    break;
            }
        }

        public static void DealWithEventCard(Player activePlayer, IApplicationDbContext _context, Card card)
        {

            switch (card.CardName)
            {
                // GAIN CARDS:
                case "Pierwszeństwo w dziekanacie":
                    foreach (Card element in activePlayer.Cards)
                    {
                        if (element.CardIdNumber == 0)
                        {
                            _context.Logs.Add(new Log
                            {
                                LogInfo = $"{activePlayer.Name} wymienia duplikat na 20 ECTS!"
                            });
                            activePlayer.Cash += 20;
                            break;
                        }
                    }
                    activePlayer.Cards.Add(card);
                    break;

                case "Oświecenie na konsultacjach":
                    foreach (Card element in activePlayer.Cards)
                    {
                        if (element.CardIdNumber == 1)
                        {
                            _context.Logs.Add(new Log
                            {
                                LogInfo = $"{activePlayer.Name} wymienia duplikat na 20 ECTS!"
                            });
                            activePlayer.Cash += 20;
                            break;
                        }
                    }
                    activePlayer.Cards.Add(card);
                    break;

                case "Wygrana w konkursie":
                    activePlayer.Cash += 50;
                    break;

                case "ECTSobranie":
                    activePlayer.Cash += 30;
                    break;

                case "Miss RMS / Mister RMS":
                    activePlayer.Cash += 20;
                    break;

                case "Urodziny":
                    foreach (Player player in _context.Players)
                    {
                        if (player == activePlayer ||
                            player.IsInJail ||
                            player.IsBankrupt) continue;
                        player.Cash -= 5;
                        activePlayer.Cash += 5;
                    }
                    break;

                case "Wyróżnienie przez dziekana":
                    activePlayer.Cash += 100;
                    break;

                case "Szczęśliwy traf":
                    activePlayer.Cash += 20;
                    break;

                case "Znajomości na stołówce":
                    foreach (Card element in activePlayer.Cards)
                    {
                        if (element.CardIdNumber == 1)
                        {
                            _context.Logs.Add(new Log
                            {
                                LogInfo = $"{activePlayer.Name} wymienia duplikat na 20 ECTS!"
                            });
                            activePlayer.Cash += 20;
                            break;
                        }
                    }
                    activePlayer.Cards.Add(card);
                    break;

                case "O, pinć ECTSów!":
                    activePlayer.Cash += 5;
                    break;

                // LOSS CARDS:
                case "Zapomniany klucz":
                    activePlayer.Position = 0;
                    _context.Logs.Add(new Log
                    {
                        LogInfo = $"{ activePlayer.Name} ląduje na polu Portiernia."
                    });
                    NewPositionAction(activePlayer, _context);
                    break;

                case "Zapłata rachunków":
                    foreach (PropertyFieldInfo field in activePlayer.PropertyFieldInfos)
                    {
                        activePlayer.Cash -= 10;
                    }
                    break;

                case "Warunek":
                    activePlayer.Cash -= 30;
                    break;

                case "Formalności":
                    activePlayer.Position = 30;
                    _context.Logs.Add(new Log
                    {
                        LogInfo = $"{ activePlayer.Name} ląduje na polu Dziekanat."
                    });
                    NewPositionAction(activePlayer, _context);
                    break;

                case "Douczanie się":
                    activePlayer.Position = 10;
                    _context.Logs.Add(new Log
                    {
                        LogInfo = $"{ activePlayer.Name} ląduje na polu Konsulatacje."
                    });
                    NewPositionAction(activePlayer, _context);
                    break;

                case "Głód":
                    activePlayer.Position = 20;
                    _context.Logs.Add(new Log
                    {
                        LogInfo = $"{ activePlayer.Name} ląduje na polu Stołówka."
                    });
                    NewPositionAction(activePlayer, _context);
                    break;

                case "Spłata pożyczki":
                    activePlayer.Cash -= 20;
                    break;

                case "Gdybym był bogaty":
                    foreach (Player player in _context.Players)
                    {
                        if (player == activePlayer ||
                            player.IsInJail ||
                            player.IsBankrupt) continue;
                        player.Cash += 5;
                        activePlayer.Cash -= 5;
                    }
                    break;

                case "Dziura w kieszeni":
                    activePlayer.Cash -= 5;
                    break;

                case "Spóźnienie":
                    activePlayer.TurnsToWait++;
                    break;

                default:
                    break;
            }
        }

        public static void TriggedByNewPostion(int position)
        {

        }
    }
}
