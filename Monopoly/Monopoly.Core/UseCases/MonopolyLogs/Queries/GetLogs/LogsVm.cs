using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monopoly.Core.UseCases.MonopolyLogs.Queries.GetLogs
{
    public class LogsVm
    {
        public IList<LogDto> Logs { get; set; }
    }
}
