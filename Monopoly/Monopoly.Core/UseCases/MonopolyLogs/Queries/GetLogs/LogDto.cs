using Domain.Entities.Game;
using Monopoly.Core.Base.Mappings;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monopoly.Core.UseCases.MonopolyLogs.Queries.GetLogs
{
    public class LogDto:IMapFrom<Log>
    {
        public int Id { get; set; }
        public string LogInfo { get; set; }

        public  static void Mapping(MappingProfile profile)
        {
            profile.CreateMap<LogDto, Log>()
                .ForMember(d => d.Id, s => s.MapFrom(d => d.Id))
                .ForMember(d => d.LogInfo, s => s.MapFrom(d => d.LogInfo));
        }

    }
}
