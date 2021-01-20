using Domain.Entities;
using Monopoly.Core.Base.Interfaces;
using System;
using System.Linq;
using System.Threading;
using Domain.Enums;
using Domain.Entities.Game;
using Domain.Entities.Cards;
using System.Collections.Generic;

namespace Monopoly.Core.MonopolyAI
{
    public static class MonopolyAI
    {
        /*
        private static List<int> BotPlayersIDs = new List<int>();

        public static void ProcessBot(int index, CancellationToken cancellationToken)
        {
            var players = _context.Players.ToList();
            var fields = _context.MonopolyFields.ToList();
           
            

            var dices = _context.Dices.FirstOrDefault();


            _context.SaveChangesAsync(cancellationToken);
            TriggedByNewPostion(index);
        }
        */

        public static void NewPositionAction(Player player, IApplicationDbContext _context, CancellationToken cancellationToken)
        {
            
            _context.SaveChangesAsync(cancellationToken);
            // New field:
            var newField = _context.MonopolyFields.Where(field => field.MonopolyID == player.Position).ToList()[0];
            MonopolyFieldType newFieldType = newField.Type;
            string newFieldName = newField.Name;
            int newFieldID = newField.MonopolyID;

            // Reward for this lap:
            var dicesCount = _context.Dices.FirstOrDefault().DiceValues[0] + _context.Dices.FirstOrDefault().DiceValues[1];
            if (player.Position < dicesCount) // THIS IF-STATEMENT NEEDS IS NOT PERFECT (BUGGY IN EVENTS)
            {
                player.Cash += 30;
                _context.Logs.Add(new Log { LogInfo = $"{player.Name} przechodzi przez portiernię. Otrzymuje 30 ECTS." });
            }


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
                                for (int i = 0; i < player.Cards.ToList().Count; i++)
                                {
                                    if (player.Cards.ToList().ElementAt(i).CardIdNumber == 1)
                                    {
                                        var xd = player.Cards.ToList();
                                        _context.Logs.Add(new Log
                                        {
                                            LogInfo = $"{player.Name} używa karty ${player.Cards.ToList().ElementAt(i).CardName.ToUpper()}"
                                        });
                                        player.Cards.ToList().Remove(player.Cards.ElementAt(i));
                                        break;

                                    }
                                }
                            }
                           
                            player.TurnsToWait += 2;
                            _context.Logs.Add(new Log { LogInfo = $"{player.Name} traci 2 kolejki i dostęp do telefonu!" });
                            break;

                        case "Stołówka studencka":
                            if(player.Cards != null)
                            {
                                for (int i = 0; i < player.Cards.ToList().Count; i++)
                                {
                                    if (player.Cards.ToList().ElementAt(i).CardIdNumber == 8)
                                    {
                                        _context.Logs.Add(new Log
                                        {
                                            LogInfo = $"{player.Name} używa karty ${player.Cards.ToList().ToList().ElementAt(i).CardName.ToUpper()}"
                                        });
                                        player.Cards.Remove(player.Cards.ToList().ElementAt(i));
                                        break;
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
                                    if (player.Cards.ToList().ElementAt(i).CardIdNumber == 8)
                                    {
                                        _context.Logs.Add(new Log
                                        {
                                            LogInfo = $"{player.Name} używa karty ${player.Cards.ToList().ElementAt(i).CardName.ToUpper()}"
                                        });
                                        player.Cards.ToList().Remove(player.Cards.ToList().ElementAt(i));
                                        break;
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

                        //po tym 
                        foreach(PropertyFieldInfo property in p.PropertyFieldInfos.ToList())
                        {
                            if(property.PropertyFieldId == newFieldID)
                            {
                                if (property.Mortgaged) break;
                                var cost = property.PropertyField.RentCosts.ToList()[property.EstateLevel];
                                player.Cash -= cost;
                                p.Cash += cost;
                                _context.Logs.Add(new Log { 
                                    LogInfo = $"{player.Name} płaci graczowi ${p.Name} kwotę ${cost} ECTS !" });
                            }
                        }

                    }
                    break;

                case MonopolyFieldType.company:
                    foreach (Player p in _context.Players.ToList())
                    {
                        if (p.Name == player.Name) continue;
                        foreach (PropertyFieldInfo property in p.PropertyFieldInfos.ToList())
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
                                    LogInfo = $"{player.Name} płaci graczowi ${p.Name} kwotę ${cost} ECTS." });
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
                            //card = _context.GainCards.ToList().ElementAt(rand.Next(0, _context.GainCards.ToList().Count()));
                            card = _context.GainCards.ToList().ElementAt(1);
                            _context.Logs.Add(new Log { 
                                LogInfo = $"{player.Name} otrzymuję kartę ${card.CardName.ToUpper()}." });

                           
                            DealWithEventCard(player, _context, cancellationToken, card);
                            break;

                        case "Karta straty":
                            //card = _context.LossCards.ToList().ElementAt(rand.Next(0, _context.LossCards.ToList().Count()));
                            card = _context.LossCards.ToList().ElementAt(0);
                            _context.Logs.Add(new Log { 
                                LogInfo = $"{player.Name} otrzymuję kartę ${card.CardName.ToUpper()}." });
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
                    foreach (Card element in activePlayer.Cards.ToList())
                    {
                        if (element.CardIdNumber == 0)
                        {
                            _context.Logs.Add(new Log {
                                LogInfo = $"{activePlayer.Name} wymienia duplikat na 20 ECTS!" });
                            activePlayer.Cash += 20;
                            break;
                        }
                    }
                    activePlayer.Cards.Add(card);
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
                    foreach (Card element in activePlayer.Cards.ToList())
                    {
                        if (element.CardIdNumber == 1)
                        {
                            _context.Logs.Add(new Log {
                                LogInfo = $"{activePlayer.Name} wymienia duplikat na 20 ECTS!" });
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
                    _context.Logs.Add(new Log {
                        LogInfo = $"{activePlayer.Name} ląduje na polu Portiernia." });
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
                    _context.Logs.Add(new Log {
                        LogInfo = $"{activePlayer.Name} ląduje na polu Dziekanat." });
                    NewPositionAction(activePlayer, _context, cancellationToken);
                    break;

                case "Douczanie się":
                    activePlayer.Position = 10;
                    _context.Logs.Add(new Log {
                        LogInfo = $"{ activePlayer.Name} ląduje na polu Konsulatacje." });
                    NewPositionAction(activePlayer, _context, cancellationToken);
                    break;

                case "Głód":
                    activePlayer.Position = 20;
                    _context.Logs.Add(new Log {
                        LogInfo = $"{ activePlayer.Name} ląduje na polu Stołówka."
                    });
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
