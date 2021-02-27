using System.Text.Json.Serialization;

namespace SkillsMatrix.Api.Models
{
    public abstract class Vertex
    {
        public string Id { get; set; }
        [JsonIgnore]
        public string Company { get; set; } = "SixPivot";
        public string Name { get; set; }
    }
}
