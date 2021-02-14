using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using CsvHelper;
using CsvHelper.Configuration;

namespace SkillsMatrix.Core
{
    public static class IO
    {
        public static List<(string Person, string SkillName, int? SkillLevel)> Import(string inputString)
        {
            var config = new CsvConfiguration(CultureInfo.CurrentCulture);
            config.HasHeaderRecord = true;
            config.Delimiter = "\t";
            config.IgnoreBlankLines = true;
            config.MissingFieldFound = null;

            using var reader = new StringReader(inputString);
            using var csvReader = new CsvReader(reader, config);

            csvReader.Read();
            csvReader.ReadHeader();

            List<(string Person, string SkillName, int? SkillLevel)> data = new List<(string, string, int?)>();
            while (csvReader.Read())
            {
                var skillName = csvReader.GetField<string>(0);
                for (int i = 1; i < csvReader.HeaderRecord.Length; i++)
                {
                    var skillLevel = csvReader.GetField<int?>(i);
                    var person = csvReader.HeaderRecord[i];

                    data.Add((person.Trim(), skillName.Trim(), skillLevel));
                }
            }

            return data;
        }
    }
}
