namespace SkillsMatrix.Api.Models
{
    public class Experience : Vertex
    {
        public override string ToString()
        {
            return Name;
        }

        public string Category { get; set; }
    }
}
