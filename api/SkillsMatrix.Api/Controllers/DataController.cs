using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using ExRam.Gremlinq.Core;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using SkillsMatrix.Api.Extensions;
using SkillsMatrix.Api.Models;

namespace SkillsMatrix.Api.Controllers
{
    /// <summary>
    /// Data Controller
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class DataController : ControllerBase
    {
        private readonly IHostEnvironment _env;
        private readonly IGremlinQuerySource _querySource;

        /// <summary>
        /// Data Controller
        /// </summary>
        /// <param name="env"></param>
        /// <param name="querySource"></param>
        public DataController(IHostEnvironment env, IGremlinQuerySource querySource)
        {
            _env = env;
            _querySource = querySource;
        }

        /// <summary>
        /// Create Seed Data
        /// </summary>
        /// <returns></returns>
        [ProducesResponseType(200)]
        [HttpPut]
        public async Task<IActionResult> CreateData()
        {
            var inputString = await System.IO.File.ReadAllTextAsync(Path.Combine(_env.ContentRootPath, "Data/V2.tsv"));
            var importData = Core.IO.Import(inputString);
            var personCache = new Dictionary<string, Person>();
            var skillCache = new Dictionary<string, Skill>();
            foreach (var item in importData)
            {
                Person person;
                if (personCache.ContainsKey(item.PersonId))
                {
                    person = personCache[item.PersonId];
                }
                else
                {
                    var newPerson = new Person
                    {
                        Oid = item.PersonId,
                        Name = item.PersonName,
                    };

                    person = await _querySource.TryAddOrUpdate(newPerson, p => p.Oid == item.PersonId);
                    personCache.Add(item.PersonId, person);
                }

                Skill skill;
                if (skillCache.ContainsKey(item.SkillName))
                {
                    skill = skillCache[item.SkillName];
                }
                else
                {
                    var newSkill = new Skill
                    {
                        Name = item.SkillName,
                        Category = item.SkillCategory
                    };
                    skill = await _querySource.TryAddOrUpdate(newSkill, p => p.Name == item.SkillName);
                    skillCache.Add(item.SkillName, skill);
                }

                if (item.SkillLevel != null)
                    await _querySource.TryAdd(person, skill, new HasSkill {Level = (SkillLevel) item.SkillLevel});
            }

            return Ok();
        }
    }
}
