using System.Collections.Generic;

namespace Monopoly.Core.UseCases.MonopolyLogs.Queries.GetLogs
{
    public class LogsVm
    {
        public IList<LogDto> Logs { get; set; }
    }
}
