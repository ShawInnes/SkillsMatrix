namespace SkillsMatrix.Api.Models
{
    public class Person : Vertex
    {
        public override string ToString()
        {
            return Name;
        }

        public string Email { get; set; }
        public string Oid { get; set; }
    }
}
