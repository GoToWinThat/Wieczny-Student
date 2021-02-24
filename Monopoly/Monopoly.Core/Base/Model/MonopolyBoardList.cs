using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monopoly.Core.Base.Model
{
    public class MonopolyBoardList<T>
    {
        public List<T> Fields { get; }
        public int TotalCount { get; }
        public MonopolyBoardList(List<T> fields, int count)
        {
            Fields = fields;
            TotalCount = count;
        }
        public static async Task<MonopolyBoardList<T>> CreateAsync(IQueryable<T> source)
        {
            var count = await source.CountAsync();
            var items = await source.ToListAsync();

            return new MonopolyBoardList<T>(items, count);
        }
    }
}
