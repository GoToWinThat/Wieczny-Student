using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Monopoly.Core.Base.Interfaces
{
    public interface IApplicationDbContext
    {
        DbSet<MonopolyField> MonopolyFields { get; set; }

        DbSet<MonopolyFieldList> MonopolyFieldLists { get; set; }

        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}
