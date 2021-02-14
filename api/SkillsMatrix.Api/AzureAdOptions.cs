using System;

namespace SkillsMatrix.Api
{
    public class AzureAdOptions
    {
        public static string SectionName = "AzureAd";

        public Uri Instance { get; }
        public string Domain { get; }
        public string TenantId { get; }
        public string ClientId { get; }
        public string CallbackPath { get; }
    }
}
