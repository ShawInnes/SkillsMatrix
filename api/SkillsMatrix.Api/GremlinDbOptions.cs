namespace SkillsMatrix.Api
{
    public class GremlinDbOptions
    {
        public static string SectionName = "Gremlin";

        public string Host { get; }
        public string PrimaryKey { get; }
        public string DatabaseName { get; }
        public string ContainerName { get; }
    }
}