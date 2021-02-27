namespace SkillsMatrix.Api.Models
{
    public class PersonSkill
    {
        public string Person { get; set; }
        public string SkillId { get; set; }
        public string SkillName { get; set; }
        public string SkillCategory { get; set; }
        public SkillLevel? SkillLevel { get; set; }
    }
}
