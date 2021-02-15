using System.Linq;
using System.Threading.Tasks;
using ExRam.Gremlinq.Core;
using Serilog;
using SkillsMatrix.Api.Models;

namespace SkillsMatrix.Api.Controllers
{
    /// <summary>
    /// Helper Methods for Vertex Manipulation
    /// </summary>
    public static class VertexExtensions
    {
        public static async Task<HasSkill> TryAdd(this IGremlinQuerySource querySource, long fromPersonId, long toSkillId, SkillLevel skillLevel)
        {
            var query = (await querySource
                .V<Person>(fromPersonId)
                .As((a, person) => a
                    .V<Skill>(toSkillId)
                    .As((b, skill) => b
                        .Select(person, skill))
                    .Dedup()
                )).SingleOrDefault();

            return await TryAdd<Person, Skill>(querySource, query.Item1, query.Item2, new HasSkill {Level = skillLevel});
        }

        public static async Task<HasSkill> TryAdd<U, V>(this IGremlinQuerySource querySource, U fromVertex, V toVertex, HasSkill edge)
            where U : Vertex
            where V : Vertex
        {
            var newEdge = (await querySource
                .V<U>(fromVertex.Id!)
                .As((a, fromLabel) => a
                    .OutE<HasSkill>()
                    .As((b, edgeLabel) => b
                        .InV<V>()
                        .Where(p => p.Id == toVertex.Id!)
                        .As((c, toLabel) => c.Select(edgeLabel)))
                )).FirstOrDefault();

            if (newEdge == null)
            {
                Log.Debug("Adding new {Type} {@Item}", nameof(HasSkill), edge);
                newEdge = await querySource
                    .V(fromVertex.Id!)
                    .AddE(edge)
                    .To(p => p.V(toVertex.Id!))
                    .FirstAsync();
            }
            else
            {
                if (edge.Level != newEdge.Level)
                {
                    Log.Debug("Modifying Existing {Type} {@Item}", nameof(HasSkill), edge);
                    edge.Id = newEdge.Id;
                    newEdge = await querySource
                        .ReplaceE(edge)
                        .FirstOrDefaultAsync();
                }
            }

            return newEdge;
        }

        public static async Task<T> TryAdd<T>(this IGremlinQuerySource querySource, T item) where T : Vertex
        {
            var newItem = await querySource.V<T>().Where(p => p.Name == item.Name).SingleOrDefaultAsync();
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
