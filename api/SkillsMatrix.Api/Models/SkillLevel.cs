using System.ComponentModel;

namespace SkillsMatrix.Api.Models
{
    public enum SkillLevel
    {
        [Description("not interested")]
        NotInterested = 1,

        [Description("will learn")]
        WillLearn = 2,

        [Description("exposure but not proficient")]
        LimitedExposure = 3,

        [Description("proficient")]
        Proficient = 4,

        [Description("expert (can coach)")]
        Expert = 5
    }
}
