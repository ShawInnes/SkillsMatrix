using System.Diagnostics;

namespace SkillsMatrix.Api.Models
{
    public class HasSkill : Edge
    {
        public SkillLevel Level { get; set; }
    }
}
