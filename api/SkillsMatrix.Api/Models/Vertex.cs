using System.Text.Json.Serialization;
using ExRam.Gremlinq.Core.GraphElements;

namespace SkillsMatrix.Api.Models
{
    public abstract class Vertex
    {
        public long? Id { get; set; }
        [JsonIgnore]
        public string Company { get; set; } = "SixPivot";
        public string Name { get; set; }
    }
}
