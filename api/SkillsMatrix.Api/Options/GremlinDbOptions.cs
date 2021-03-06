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

    public class AzureAdOptions
    {
        public static string SectionName = "AzureAd";

        public string Instance { get; set; }
        public string Domain { get; set; }
        public string TenantId { get; set; }
        public string ClientId { get; set; }
        public string SwaggerRedirectUrl { get; set; }
    }
}
