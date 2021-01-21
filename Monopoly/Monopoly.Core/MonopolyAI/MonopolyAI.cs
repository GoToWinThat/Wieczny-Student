using Domain.Entities;
using Monopoly.Core.Base.Interfaces;
using System;
using System.Linq;
using System.Threading;
using Domain.Enums;
using Domain.Entities.Game;
using Domain.Entities.Cards;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Monopoly.Core.MonopolyAI
{
    public static class MonopolyAI
    {
        //public static void ProcessBot(int playerIndex, IApplicationDbContext _context, CancellationToken cancellationToken)
        //{
        //    AutoThrow(playerIndex, _context, cancellationToken);

        //    // Buying, etc.
        //}

        public static void AutoThrow(Player player, IApplicationDbContext _context, CancellationToken cancellationToken)
        {
            // Throwing dices:
            var rand = new Random();
            int firstNumber = rand.Next(1, 7);
            int secondNumber = rand.Next(1, 7);
            var dices = _context.Dices.First();
            dices.DiceValues = new List<int> { firstNumber, secondNumber };

            // Moving pawn:
            player.Position = (player.Position + firstNumber + secondNumber) % 40;

            _context.SaveChangesAsync(cancellationToken);
            NewPositionAction(player, _context, cancellationToken);

            _context.SaveChangesAsync(cancellationToken);
        }

        public static void NewPositionAction(Player player, IApplicationDbContext _context, CancellationToken cancellationToken)
        {
            var dicesCount = _context.Dices.FirstOrDefault().DiceValues[0] + _context.Dices.FirstOrDefault().DiceValues[1];

            _context.SaveChangesAsync(cancellationToken);
            // New field:
            var newField = _context.MonopolyFields.Where(field => field.MonopolyID == player.Position).ToList()[0];
            MonopolyFieldType newFieldType = newField.Type;
            string newFieldName = newField.Name;
            int newFieldID = newField.MonopolyID + 1;

            _context.Logs.Add(new Log
            {
                LogInfo = $"{player.Name} ląduje na polu {newFieldName}."
            });


            // Specific field action:
            switch (newFieldType)
            {
                case MonopolyFieldType.corner:
                    //tu
                    switch (newFieldName)
                    {
                        case "Konsultacje":
                            if (player.Cards != null)
                            {
                                for (int i = 0; i < player.Cards.Count; i++)
                                {
                                    if (player.Cards.ElementAt(i).CardIdNumber == 1)
                                    {
                                        
                                        _context.Logs.Add(new Log
                                        {
                                            LogInfo = $"{player.Name} używa karty {player.Cards.ElementAt(i).CardName.ToUpper()}."
                                        });
                                        player.Cards.Remove(player.Cards.ElementAt(i));
                                        return;

                                    }
                                }

                            }
                           
                            player.TurnsToWait += 2;
                            _context.Logs.Add(new Log { LogInfo = $"{player.Name} traci 2 kolejki i dostęp do telefonu!" });
                            break;

                        case "Stołówka studencka":
                            if(player.Cards != null)
                            {
                                for (int i = 0; i < player.Cards.Count; i++)
                                {
                                    if (player.Cards.ElementAt(i).CardIdNumber == 8)
                                    {
                                        _context.Logs.Add(new Log
                                        {
                                            LogInfo = $"{player.Name} używa karty {player.Cards.ToList().ToList().ElementAt(i).CardName.ToUpper()}."
                                        });
                                        player.Cards.Remove(player.Cards.ElementAt(i));
                                        return;
                                    }
                                }
                            }
                            
                            player.TurnsToWait += 2;
                            _context.Logs.Add(new Log { LogInfo = $"{player.Name} traci 2 kolejki!" });
                            break;

                        case "Dziekanat":
                            if (player.Cards != null)
                            {
                                for (int i = 0; i < player.Cards.ToList().Count; i++)
                                {
                                    if (player.Cards.ElementAt(i).CardIdNumber == 0)
                                    {
                                        _context.Logs.Add(new Log
                                        {
                                            LogInfo = $"{player.Name} używa karty {player.Cards.ElementAt(i).CardName.ToUpper()}."
                                        });
                                        player.Cards.Remove(player.Cards.ElementAt(i));
                                        return;
                                    }
                                }
                            }
                            
                            player.TurnsToWait += 3;
                            _context.Logs.Add(new Log { 
                                LogInfo = $"{player.Name} traci 3 kolejki i dostęp do telefonu!" });
                            break;

                        default:
                            break;
                    }
                    break;

                case MonopolyFieldType.property: 
                    foreach(Player p in _context.Players.ToList())
                    {
                        if (p == player) continue;
                        //xD
                        var prop =  _context.PropertyFieldInfos.Include(xd => xd.PropertyField).Where(pp => pp.PlayerId == p.Id).ToList();
                        //po tym 
                        foreach (PropertyFieldInfo property in prop)
                        {
                            if(property.PropertyFieldId == newFieldID)
                            {
                                if (property.Mortgaged) break;
                                var cost = property.PropertyField.RentCosts.ToList()[property.EstateLevel];
                                player.Cash -= cost;
                                p.Cash += cost;
                                _context.Logs.Add(new Log { 
                                    LogInfo = $"{player.Name} płaci graczowi {p.Name} kwotę {cost} ECTS." });
                            }
                        }

                    }
                    break;

                case MonopolyFieldType.company:
                    foreach (Player p in _context.Players.ToList())
                    {
                        if (p.Name == player.Name) continue;

                        var prop = _context.PropertyFieldInfos.Include(xd => xd.PropertyField).Where(pp => pp.PlayerId == p.Id).ToList();

                        foreach (PropertyFieldInfo property in prop)
                        {
                            if(property.PropertyFieldId == newFieldID)
                            {
                                if (property.Mortgaged) break;

                                int ownedCompanies = 0;

                                foreach(PropertyFieldInfo property1 in p.PropertyFieldInfos.ToList())
                                {
                                    var fieldName = property1.PropertyField.Name;
                                    if (fieldName == newFieldName) ownedCompanies++;
                                }

                                int cost = (int)(dicesCount * Math.Pow(3,  ownedCompanies - 1));

                                player.Cash -= cost;
                                p.Cash += cost;

                                _context.Logs.Add(new Log { 
                                    LogInfo = $"{player.Name} płaci graczowi {p.Name} kwotę {cost} ECTS." });
                                break;
                            }
                        }
                    }
                    break;

                case MonopolyFieldType.@event:
                    Card card = null;
                    var rand = new Random();     
                    switch (newFieldName)
                    {
                        case "Karta zysku":
                            card = _context.GainCards.ToList().ElementAt(rand.Next(0, _context.GainCards.ToList().Count()));
                            //card = _context.GainCards.ToList().ElementAt(1);
                            _context.Logs.Add(new Log { 
                                LogInfo = $"{player.Name} otrzymuję kartę {card.CardName.ToUpper()}." });

                           
                            DealWithEventCard(player, _context, cancellationToken, card);
                            break;

                        case "Karta straty":
                            card = _context.LossCards.ToList().ElementAt(rand.Next(0, _context.LossCards.ToList().Count()));
                            //card = _context.LossCards.ToList().ElementAt(0);
                            _context.Logs.Add(new Log { 
                                LogInfo = $"{player.Name} otrzymuję kartę {card.CardName.ToUpper()}." });
                            DealWithEventCard(player, _context, cancellationToken, card);
                            break;
                    }
                    break;

                default:
                    break;
            }
            _context.SaveChangesAsync(cancellationToken);
        }

        private static void DealWithEventCard(Player activePlayer, IApplicationDbContext _context, CancellationToken cancellationToken, Card card)
        {
            switch (card.CardName)
            {
                // GAIN CARDS:
                case "Pierwszeństwo w dziekanacie":
                    if (activePlayer.Cards != null)
                    {
                        foreach (Card element in activePlayer.Cards.ToList())
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
                    }
                    else
                    {
                        activePlayer.Cards = new List<Card> { card };
                    }
                    break;

                case "Oświecenie na konsultacjach":
                    if(activePlayer.Cards != null)
                    {
                        foreach (Card element in activePlayer.Cards.ToList())
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
                    }
                    else
                    {
                        activePlayer.Cards = new List<Card> { card };
                    }

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
                    foreach (Player player in _context.Players.ToList())
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
                    if (activePlayer.Cards != null)
                    {
                        foreach (Card element in activePlayer.Cards.ToList())
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
                    }
                    else
                    {
                        activePlayer.Cards = new List<Card> { card };
                    }
                    break;

                case "O, pinć ECTSów!":
                    activePlayer.Cash += 5;
                    break;

                // LOSS CARDS:
                case "Zapomniany klucz":
                    activePlayer.Position = 0;
                    //_context.Logs.Add(new Log {
                    //    LogInfo = $"{activePlayer.Name} ląduje na polu Portiernia." });
                    NewPositionAction(activePlayer, _context, cancellationToken);
                    break;

                case "Zapłata rachunków":
                    foreach (PropertyFieldInfo field in activePlayer.PropertyFieldInfos.ToList())
                    {
                        activePlayer.Cash -= 10;
                    }
                    break;

                case "Warunek":
                    activePlayer.Cash -= 30;
                    break;

                case "Formalności":
                    activePlayer.Position = 30;
                    //_context.Logs.Add(new Log {
                    //    LogInfo = $"{activePlayer.Name} ląduje na polu Dziekanat." });
                    NewPositionAction(activePlayer, _context, cancellationToken);
                    break;

                case "Douczanie się":
                    activePlayer.Position = 10;
                    //_context.Logs.Add(new Log {
                    //    LogInfo = $"{ activePlayer.Name} ląduje na polu Konsulatacje." });
                    NewPositionAction(activePlayer, _context, cancellationToken);
                    break;

                case "Głód":
                    activePlayer.Position = 20;
                    //_context.Logs.Add(new Log {
                    //    LogInfo = $"{ activePlayer.Name} ląduje na polu Stołówka."
                    //});
                    NewPositionAction(activePlayer, _context, cancellationToken);
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
                    activePlayer.TurnsToWait = 1;
                    break;

                default:
                    break;
            }
        }
    }
}
