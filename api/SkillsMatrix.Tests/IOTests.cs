using System;
using FluentAssertions;
using Xunit;

namespace SkillsMatrix.Tests
{
    public class IOTests
    {
        [Fact]
        public void ImportTest()
        {
            var inputString = @"Tech	Bill	Bjorn	Burhaan	Chris	Colin	Darren	David	Delan	Dylan	Gert	Isaac	James	Luke	Megan	Michael	Moses	Patrick	Quinten	Rob	Shaw	Steve	Tony
HTML	1	5			4	4	4	4		4			5		4	5		4	5	5		5
CSS	1	5			2	2	2	2		1			5		2	4		3	4	4		4
JavaScript	1	5			4	4	4	4		4			5		4	4		3	4	4		5
UI/UX Theory & Practice	1	4			4	2	2						4		2	2		4	4	2
";

            var importData = Core.IO.Import(inputString);
            importData.Count.Should().Be(88);
        }
    }
}
