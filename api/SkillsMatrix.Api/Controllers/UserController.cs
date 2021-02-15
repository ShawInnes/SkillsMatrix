using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ExRam.Gremlinq.Core;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SkillsMatrix.Api.Models;

namespace SkillsMatrix.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonController : ControllerBase
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly ILogger _logger;
        private readonly IGremlinQuerySource _querySource;

        public PersonController(IHttpContextAccessor httpContextAccessor, ILogger<PersonController> logger, IGremlinQuerySource querySource)
        {
            _httpContextAccessor = httpContextAccessor;
            _logger = logger;
            _querySource = querySource;
        }

        /// <summary>
        /// Get Person List
        /// </summary>
        /// <returns></returns>
        [ProducesResponseType(typeof(List<Person>), 200)]
        [HttpGet]
        public async Task<IActionResult> GetPersonList()
        {
            var query = await _querySource
                .V<Person>()
                .ToArrayAsync();
            return Ok(query.ToList());
        }

        /// <summary>
        /// Get Person
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [ProducesResponseType(typeof(Person), 200)]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPerson(long id)
        {
            var query = await _querySource
                .V<Person>(id)
                .FirstOrDefaultAsync();

            return Ok(query);
        }

        /// <summary>
        /// New Person
        /// </summary>
        /// <returns></returns>
        [ProducesResponseType(typeof(Person), 200)]
        [HttpPost]
        public async Task<IActionResult> CreatePerson(Person person)
        {
            var query = await _querySource
                .TryAdd(person);

            return Ok(query);
        }

        /// <summary>
        /// Add Skill to Person
        /// </summary>
        /// <param name="personId"></param>
        /// <param name="skillId"></param>
        /// <param name="skillLevel"></param>
        /// <returns></returns>
        [ProducesResponseType(typeof(PersonSkill), 200)]
        [HttpPost("skill")]
        public async Task<IActionResult> AddSkill([FromQuery] long personId, [FromQuery] long skillId, [FromQuery] SkillLevel skillLevel)
        {
            var query = await _querySource
                .TryAdd(personId, skillId, skillLevel);

            return Ok(query);
        }

        /// <summary>
        /// Get All Skills for a Person
        /// </summary>
        /// <returns></returns>
        [ProducesResponseType(typeof(List<PersonSkill>), 200)]
        [ProducesResponseType(typeof(ProblemDetails), 503)]
        [ProducesResponseType(typeof(ProblemDetails), 404)]
        [HttpGet("skills/{id}")]
        public async Task<IActionResult> GetPersonSkills(long id)
        {
            var query = await _querySource
                .V<Person>(id)
                .As((a, person) => a
                    .OutE<HasSkill>()
                    .As((b, hasSkill) => b
                        .InV<Skill>()
                        .As((c, skill) => c.Select(person, hasSkill, skill)))
                )
                .ToArrayAsync();

            return Ok(query.Select(p => new PersonSkill {SkillId = p.Item3.Id, SkillName = p.Item3.Name, SkillLevel = p.Item2.Level}));
        }

        /// <summary>
        /// Get a list of Skills which this person is not associated with
        /// </summary>
        /// <returns></returns>
        [ProducesResponseType(typeof(List<PersonSkill>), 200)]
        [HttpGet("missingskills/{id}")]
        public async Task<IActionResult> GetMissingSkills(long id)
        {
            var query = await _querySource
                .V<Skill>()
                .Not(p => p.InE<HasSkill>().OutV<Person>().Where(q => q.Id == id))
                .ToArrayAsync();

            return Ok(query.Select(p => new PersonSkill {SkillId = p.Id, SkillName = p.Name}));
        }
    }
}
