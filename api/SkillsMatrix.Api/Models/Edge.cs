using ExRam.Gremlinq.Core.GraphElements;

namespace SkillsMatrix.Api.Models
{
    public class Edge
    {
        public long? Id { get; set; }

        public override string ToString()
        {
            return Id.ToString();
        }
    }
}
