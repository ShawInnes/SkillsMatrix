using System.IO;
using System.Reflection;
using FluentAssertions;
using Xunit;

namespace SkillsMatrix.Tests
{
    public class IOTests
    {
        [Fact]
        public void ImportTest()
        {
            var assembly = Assembly.GetExecutingAssembly();
            var assemblyName = assembly.GetName().Name;
            var resourceName = $"{assemblyName}.Data.V2.tsv";

            using var stream = assembly.GetManifestResourceStream(resourceName);
            using var reader = new StreamReader(stream);
            var inputString = reader.ReadToEnd();

            var importData = Core.IO.Import(inputString);
            importData.Count.Should().Be(1947);
        }
    }
}
