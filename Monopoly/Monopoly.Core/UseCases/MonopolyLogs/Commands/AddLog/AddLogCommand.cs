using Domain.Entities.Game;
using MediatR;
using Monopoly.Core.Base.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Monopoly.Core.UseCases.MonopolyLogs.Commands.AddLog
{
    public class AddLogCommand : IRequest
    {
        public string NewLog { get; set; }
    }
    public class AddLogCommandHandler : IRequestHandler<AddLogCommand>
    {
        private IApplicationDbContext _context;

        public AddLogCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<Unit> Handle(AddLogCommand request, CancellationToken cancellationToken)
        {
            var entity = new Log
            {
                LogInfo=request.NewLog
            };

            _context.Logs.Add(entity);

            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
