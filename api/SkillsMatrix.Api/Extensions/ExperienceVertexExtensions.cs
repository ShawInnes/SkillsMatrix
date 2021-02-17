using System.Linq;
using System.Threading.Tasks;
using ExRam.Gremlinq.Core;
using Serilog;
using SkillsMatrix.Api.Models;

namespace SkillsMatrix.Api.Extensions
{
    public static class ExperienceVertexExtensions
    {
        public static async Task<HasExperience> TryAdd(this IGremlinQuerySource querySource, long fromPersonId, long toExperienceId, ExperienceLevel experienceLevel)
        {
            var query = (await querySource
                .V<Person>(fromPersonId)
                .As((a, person) => a
                    .V<Experience>(toExperienceId)
                    .As((b, experience) => b
                        .Select(person, experience))
                    .Dedup()
                )).SingleOrDefault();

            return await TryAdd<Person, Experience>(querySource, query.Item1, query.Item2, new HasExperience {Level = experienceLevel});
        }

        public static async Task<HasExperience> TryAdd<U, V>(this IGremlinQuerySource querySource, U fromVertex, V toVertex, HasExperience edge)
            where U : Vertex
            where V : Vertex
        {
            var newEdge = (await querySource
                .V<U>(fromVertex.Id!)
                .As((a, fromLabel) => a
                    .OutE<HasExperience>()
                    .As((b, edgeLabel) => b
                        .InV<V>()
                        .Where(p => p.Id == toVertex.Id!)
                        .As((c, toLabel) => c.Select(edgeLabel)))
                )).FirstOrDefault();

            if (newEdge == null)
            {
                Log.Debug("Adding new {Type} {@Item}", nameof(HasExperience), edge);
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
                    Log.Debug("Modifying Existing {Type} {@Item}", nameof(HasExperience), edge);
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