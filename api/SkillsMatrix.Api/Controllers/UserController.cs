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
    public class UserController : ControllerBase
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly ILogger _logger;
        private readonly IGremlinQuerySource _querySource;

        public UserController(IHttpContextAccessor httpContextAccessor, ILogger<UserController> logger, IGremlinQuerySource querySource)
        {
            _httpContextAccessor = httpContextAccessor;
            _logger = logger;
            _querySource = querySource;
        }

        /// <summary>
        /// Get User List
        /// </summary>
        /// <returns></returns>
        [ProducesResponseType(typeof(List<Person>), 200)]
        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var query = await _querySource
                .V<Person>()
                .ToArrayAsync();
            return Ok(query.ToList());
        }

        /// <summary>
        /// Get Individual User
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [ProducesResponseType(typeof(Person), 200)]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(long id)
        {
            var query = await _querySource
                .V<Person>(id)
                .FirstOrDefaultAsync();

            return Ok(query);
        }

        /// <summary>
        /// Get All Skills for this user
        /// </summary>
        /// <returns></returns>
        [ProducesResponseType(typeof(List<PersonSkillList>), 200)]
        [ProducesResponseType(typeof(ProblemDetails), 503)]
        [ProducesResponseType(typeof(ProblemDetails), 404)]
        [HttpGet("skills/{id}")]
        public async Task<IActionResult> GetUserSkills(long id)
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

            return Ok(query.Select(p => new PersonSkillList {SkillId = p.Item3.Id, SkillName = p.Item3.Name, SkillLevel = p.Item2.Level}));
        }

        /// <summary>
        /// Get a list of Skills which this person is not associated with
        /// </summary>
        /// <returns></returns>
        [ProducesResponseType(typeof(List<PersonSkillList>), 200)]
        [HttpGet("missingskills/{id}")]
        public async Task<IActionResult> GetMissingSkills(long id)
        {
            var query = await _querySource
                .V<Skill>()
                .Not(p => p.InE<HasSkill>().OutV<Person>().Where(q => q.Id == id))
                .ToArrayAsync();

            return Ok(query.Select(p => new PersonSkillList {SkillId = p.Id, SkillName = p.Name}));
        }
    }
}
