using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using ExRam.Gremlinq.Core;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using SkillsMatrix.Api.Extensions;
using SkillsMatrix.Api.Models;
using SkillsMatrix.Api.Services;

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
        private readonly IUserIdService _userId;
        private readonly IHostEnvironment _env;
        private readonly ILogger _logger;
        private readonly IGremlinQuerySource _querySource;

        /// <summary>
        /// Data Controller
        /// </summary>
        /// <param name="logger"></param>
        /// <param name="querySource"></param>
        public DataController(IUserIdService userId, IHostEnvironment env, ILogger<DataController> logger, IGremlinQuerySource querySource)
        {
            _userId = userId;
            _env = env;
            _logger = logger;
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
            var inputString = await System.IO.File.ReadAllTextAsync(Path.Combine(_env.ContentRootPath, "Data/SampleData.tsv"));
            var importData = Core.IO.Import(inputString);
            var personCache = new Dictionary<string, Person>();
            var skillCache = new Dictionary<string, Skill>();
            foreach (var item in importData)
            {
                Person person;
                if (personCache.ContainsKey(item.Person))
                {
                    person = personCache[item.Person];
                }
                else
                {
                    var newPerson = new Person
                    {
                        Oid = item.Person,
                        Name = item.Person,
                        Email = item.Person
                    };
                    person = await _querySource.TryAddOrUpdate(newPerson, p => p.Oid == item.Person);
                    personCache.Add(item.Person, person);
                }

                Skill skill;
                if (skillCache.ContainsKey(item.SkillName))
                {
                    skill = skillCache[item.SkillName];
                }
                else
                {
                    skill = await _querySource.TryAddOrUpdate(new Skill {Name = item.SkillName}, p => p.Name == item.SkillName);
                    skillCache.Add(item.SkillName, skill);
                }

                if (item.SkillLevel != null)
                    await _querySource.TryAdd(person, skill, new HasSkill {Level = (SkillLevel) item.SkillLevel});
            }

            return Ok();
        }
    }
}
