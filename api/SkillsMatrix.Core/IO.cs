using System;
using System.Collections.Generic;
using System.Linq;
using Serilog;

namespace SkillsMatrix.Core
{
    public static class IO
    {
        public static List<(string PersonName, string PersonId, string PersonEmail, string SkillCategory, string SkillName, int? SkillLevel)> Import(string inputString)
        {
            var data = new List<(string PersonName, string PersonId, string PersonEmail, string SkillCategory, string SkillName, int? SkillLevel)>();

            var lines = inputString.Split(Environment.NewLine).ToList();
            lines.RemoveAll(string.IsNullOrWhiteSpace);

            Log.Debug("Importing {Count} Lines", lines.Count());

            var personNames = lines[0].Split("\t").Skip(2).ToList();
            var personIds = lines[1].Split("\t").Skip(2).ToList();
            var personEmails = lines[2].Split("\t").Skip(2).ToList();

            if (personIds.Count() != personNames.Count() || personEmails.Count() != personNames.Count())
                throw new InvalidOperationException("Row 0, Row 1 and Row 2 must contain the same number of records");

            Log.Debug("Importing {Count} People", personNames.Count());

            var currentSkillCategory = string.Empty;
            foreach (var line in lines.Skip(3)) // skip header rows
            {
                var row = line.Split("\t").ToList();
                var skillCategory = string.IsNullOrWhiteSpace(row[0]) ? currentSkillCategory : row[0].Trim();
                var skillName = row[1].Trim();

                foreach (var skill in row.Skip(2).Select((skill, index) => new {skill, index}))
                {
                    var personId = personIds[skill.index].Trim();
                    var personName = personNames[skill.index].Trim();
                    var personEmail = personEmails[skill.index].Trim();
                    int.TryParse(skill.skill, out int skillLevel);

                    if (!string.IsNullOrWhiteSpace(personId))
                    {
                        Log.Debug("Adding {Person} {Id} {Email} {Category} {Skill} {Level}", personName, personId, personEmail, skillCategory, skillName, skillLevel);
                        data.Add((personName, personId, personEmail, skillCategory, skillName, skillLevel));
                    }
                    else
                    {
                        Log.Warning("Skipping {Person} due to missing Id", personName);
                    }
                }

                currentSkillCategory = skillCategory;
            }

            return data;
        }
    }
}
