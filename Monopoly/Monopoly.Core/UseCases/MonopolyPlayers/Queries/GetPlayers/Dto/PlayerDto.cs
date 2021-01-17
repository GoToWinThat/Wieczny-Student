using Domain.Entities;
using Domain.Entities.Game;
using Domain.Enums;
using Monopoly.Core.Base.Mappings;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monopoly.Core.UseCases.MonopolyPlayers.Queries.GetPlayers.Dto
{
    public class PlayerDto : IMapFrom<Player>
    {
        public string Name { get; set; }
        public int Cash { get; set; }
        public string Signature { get; set; }
        public MonopolyColor Color { get; set; }
        public ICollection<PropertyFieldInfoDto> PropertyFieldInfos { get; set; }
        public int Position { get; set; }
        public bool IsInJail { get; set; }
        public int TurnsToWait { get; set; }

        public static void Mapping(MappingProfile profile)
        {
            profile.CreateMap<Player, PlayerDto>()
                .ForMember(d => d.Name, opt => opt.MapFrom(s => s.Name))
                .ForMember(d => d.Cash, opt => opt.MapFrom(s => s.Cash))
                .ForMember(d => d.PropertyFieldInfos, opt => opt.MapFrom(s => s.PropertyFieldInfos))
                .ForMember(d => d.Signature, opt => opt.MapFrom(s => s.Signature))
                .ForMember(d => d.Position, opt => opt.MapFrom(s => s.Position))
                .ForMember(d => d.IsInJail, opt => opt.MapFrom(s => s.IsInJail))
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
                .ForMember(d => d.FieldID, opt => opt.MapFrom(s => s.PropertyFieldId))
                .ForMember(d => d.EstateLevel, opt => opt.MapFrom(s => s.EstateLevel))
                .ForMember(d => d.Mortgaged, opt => opt.MapFrom(s => s.Mortgaged));
        }
    }

}
