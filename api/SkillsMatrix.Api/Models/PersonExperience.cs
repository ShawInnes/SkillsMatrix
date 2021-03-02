namespace SkillsMatrix.Api.Models
{
    public class PersonExperience
    {
        public string Person { get; set; }
        public string ExperienceId { get; set; }
        public string ExperienceName { get; set; }
        public ExperienceLevel? ExperienceLevel { get; set; }
    }
}
