using System.Linq;
using System.Threading.Tasks;
using ExRam.Gremlinq.Core;
using Serilog;
using SkillsMatrix.Api.Models;

namespace SkillsMatrix.Api.Extensions
{
    /// <summary>
    /// Helper Methods for Vertex Manipulation
    /// </summary>
    public static class SkillVertexExtensions
    {
        public static async Task<HasSkill> TryAdd(this IGremlinQuerySource querySource, string fromPersonId, string toSkillId, SkillLevel skillLevel)
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
    }
}
