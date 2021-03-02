namespace SkillsMatrix.Api.Models
{
    public class Skill : Vertex
    {
        public override string ToString()
        {
            return Name;
        }

        public string Category { get; set; }
    }
}
