using Domain.Entities;
using Domain.Entities.Cards;
using Domain.Entities.Game;
using Domain.Enums;
using Monopoly.Core.Base.Mappings;
using System.Collections.Generic;

namespace Monopoly.Core.UseCases.MonopolyPlayers.Queries.GetPlayers.Dto
{
    public class PlayerDto : IMapFrom<Player>
    {
        public int Cash { get; set; }
        public string Signature { get; set; }
        public string Color { get; set; }
        public string Name { get; set; }
        public int Position { get; set; }
        public int TurnsToWait { get; set; }
        public bool IsInJail { get; set; }
        public bool IsBankrupt { get; set; }
        public bool IsLogged { get; set; }
        public bool IsReady { get; set; }
        public List<int> ThrownDices { get; set; }
        public ICollection<PropertyFieldInfoDto> Properties { get; set; }
        public ICollection<EventCardDto> EventCards { get; set; }

        public static void Mapping(MappingProfile profile)
        {
            profile.CreateMap<Player, PlayerDto>()
                .ForMember(d => d.Name, opt => opt.MapFrom(s => s.Name))
                .ForMember(d => d.Cash, opt => opt.MapFrom(s => s.Cash))
                .ForMember(d => d.Color, opt => opt.MapFrom(s => s.Color))
                .ForMember(d => d.Properties, opt => opt.MapFrom(s => s.PropertyFieldInfos))
                .ForMember(d => d.EventCards, opt => opt.MapFrom(s => s.Cards))
                .ForMember(d => d.Signature, opt => opt.MapFrom(s => s.Signature))
                .ForMember(d => d.Position, opt => opt.MapFrom(s => s.Position))
                .ForMember(d => d.IsInJail, opt => opt.MapFrom(s => s.IsInJail))
                .ForMember(d => d.IsLogged, opt=>opt.MapFrom(s=>s.IsLogged))
                .ForMember(d => d.IsReady, opt => opt.MapFrom(s => s.IsReady))
                .ForMember(d => d.ThrownDices, opt => opt.MapFrom(s => s.ThrownDices))
                .ForMember(d => d.IsBankrupt, opt => opt.MapFrom(s => s.IsBankrupt))
                .ForMember(d => d.TurnsToWait, opt => opt.MapFrom(s => s.TurnsToWait));
        }

    }

    public class PropertyFieldInfoDto : IMapFrom<PropertyFieldInfo>
    {
        public int FieldID { get; set; }
        public int EstateLevel { get; set; }
        public bool Mortgaged { get; set; }

        public static void Mapping(MappingProfile profile)
        {
            profile.CreateMap<PropertyFieldInfo, PropertyFieldInfoDto>()
                .ForMember(d => d.FieldID, opt => opt.MapFrom(s => s.PropertyField.MonopolyID))
                .ForMember(d => d.EstateLevel, opt => opt.MapFrom(s => s.EstateLevel))
                .ForMember(d => d.Mortgaged, opt => opt.MapFrom(s => s.Mortgaged));
        }
    }
    public class EventCardDto : IMapFrom<Card>
    {
        public string CardID { get; set; }
        public string Description { get; set; }

        public static void Mapping(MappingProfile profile)
        {
            profile.CreateMap<Card, EventCardDto>()
                .ForMember(d => d.CardID, opt => opt.MapFrom(s => s.CardIdNumber));//statycznie numerowane card id od zera
        }
    }



}
