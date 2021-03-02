using System;
using System.Linq.Expressions;
using System.Threading.Tasks;
using ExRam.Gremlinq.Core;
using Serilog;
using SkillsMatrix.Api.Models;

namespace SkillsMatrix.Api.Extensions
{
    public static class VertexExtensions
    {
        public static async Task<T> TryAddOrUpdate<T>(this IGremlinQuerySource querySource, T item, Expression<Func<T, bool>> query)
            where T : Vertex
        {
            if (item.Id != null)
            {
                item.Company = null;
                return await querySource
                    .V<T>(item.Id)
                    .Update(item)
                    .FirstOrDefaultAsync();
            }

            var newItem = await querySource
                .V<T>()
                .Where(query)
                .SingleOrDefaultAsync();

            if (newItem == null)
            {
                Log.Debug("Adding new {Type} {@Item}", typeof(T).Name, item);
                newItem = await querySource
                    .AddV(item)
                    .FirstAsync();
            }

            return newItem;
        }
    }
}
