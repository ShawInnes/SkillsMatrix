namespace SkillsMatrix.Api.Options
{
    public class GremlinDbOptions
    {
        public static string SectionName = "Gremlin";

        public bool UseGremlinServer { get; set; }
        public string Host { get; set; }
        public string PrimaryKey { get; set; }
        public string DatabaseName { get; set; }
        public string ContainerName { get; set; }
    }
}
