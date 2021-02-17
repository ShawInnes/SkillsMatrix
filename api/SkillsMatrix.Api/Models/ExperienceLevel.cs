using System.ComponentModel;

namespace SkillsMatrix.Api.Models
{
    public enum ExperienceLevel
    {
        [Description("not interested")]
        NotInterested = 1,

        [Description("have experience")]
        Proficient = 2,

        [Description("expert")]
        Expert = 3
    }
}