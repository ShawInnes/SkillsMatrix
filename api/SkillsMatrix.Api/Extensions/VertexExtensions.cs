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
        public static async Task<T> TryAdd<T>(this IGremlinQuerySource querySource, T item, Expression<Func<T, bool>> query)
            where T : Vertex
        {
            var newItem = await querySource.V<T>().Where(query).SingleOrDefaultAsync();
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
