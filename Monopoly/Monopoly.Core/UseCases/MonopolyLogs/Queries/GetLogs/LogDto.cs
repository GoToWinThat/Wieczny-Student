using Domain.Entities.Game;
using Monopoly.Core.Base.Mappings;

namespace Monopoly.Core.UseCases.MonopolyLogs.Queries.GetLogs
{
    public class LogDto:IMapFrom<Log>
    {
        public int Id { get; set; }
        public string LogInfo { get; set; }

        public static void Mapping(MappingProfile profile)
        {
            profile.CreateMap<Log, LogDto>()
                .ForMember(d => d.Id, s => s.MapFrom(d => d.Id))
                .ForMember(d => d.LogInfo, s => s.MapFrom(d => d.LogInfo));
        }

    }
}
