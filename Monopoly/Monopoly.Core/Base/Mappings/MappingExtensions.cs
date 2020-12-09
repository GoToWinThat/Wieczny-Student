using Monopoly.Core.Base.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monopoly.Core.Base.Mappings
{
    public static class MappingExtensions
    {
        public static Task<MonopolyBoardList<TDestination>> MonopolyBoardListAsync<TDestination>(this IQueryable<TDestination> queryable)
            => MonopolyBoardList<TDestination>.CreateAsync(queryable);
    }
}
