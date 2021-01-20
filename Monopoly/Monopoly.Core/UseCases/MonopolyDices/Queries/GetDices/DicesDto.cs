using Domain.Entities.Game;
using Monopoly.Core.Base.Mappings;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monopoly.Core.UseCases.MonopolyDices.Queries.GetDices
{
    public class DicesDto : IMapFrom<Dices>
    {
        public List<int> Dices { get; set; }
        public static void Mapping(MappingProfile profile)
        {
            profile.CreateMap<Dices, DicesDto>()
               .ForMember(d => d.Dices, opt => opt.MapFrom(s => s.DiceValues));
        }
    }
}
