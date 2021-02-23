using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using ExRam.Gremlinq.Core;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using SkillsMatrix.Api.Extensions;
using SkillsMatrix.Api.Models;

namespace SkillsMatrix.Api.Controllers
{
    /// <summary>
    /// Data Controller
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class DataController : ControllerBase
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IHostEnvironment _env;
        private readonly ILogger _logger;
        private readonly IGremlinQuerySource _querySource;

        /// <summary>
        /// Data Controller
        /// </summary>
        /// <param name="httpContextAccessor"></param>
        /// <param name="logger"></param>
        /// <param name="querySource"></param>
        public DataController(IHttpContextAccessor httpContextAccessor, IHostEnvironment env, ILogger<DataController> logger, IGremlinQuerySource querySource)
        {
            _httpContextAccessor = httpContextAccessor;
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
                    person = await _querySource.TryAdd(new Person {Name = item.Person});
                    personCache.Add(item.Person, person);
                }

                Skill skill;
                if (skillCache.ContainsKey(item.SkillName))
                {
                    skill = skillCache[item.SkillName];
                }
                else
                {
                    skill = await _querySource.TryAdd(new Skill {Name = item.SkillName});
                    skillCache.Add(item.SkillName, skill);
                }

                if (item.SkillLevel != null)
                    await _querySource.TryAdd(person, skill, new HasSkill {Level = (SkillLevel) item.SkillLevel});
            }

            return Ok();
        }
    }
}
