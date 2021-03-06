using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ExRam.Gremlinq.Core;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Serilog;
using SkillsMatrix.Api.Extensions;
using SkillsMatrix.Api.Models;
using SkillsMatrix.Api.Services;

namespace SkillsMatrix.Api.Controllers
{
    [Route("api")]
    [ApiController]
    [Authorize]
    public class PersonController : ControllerBase
    {
        private readonly IUserIdService _userId;
        private readonly IGremlinQuerySource _querySource;

        public PersonController(IUserIdService userId, IGremlinQuerySource querySource)
        {
            _userId = userId;
            _querySource = querySource;
        }

        /// <summary>
        /// Get Person List
        /// </summary>
        /// <returns></returns>
        [ProducesResponseType(typeof(List<Person>), 200)]
        [HttpGet("people")]
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
        /// <returns></returns>
        [ProducesResponseType(typeof(Person), 200)]
        [HttpGet("person")]
        public async Task<IActionResult> GetPerson()
        {
            var objectId = _userId.GetObjectId();
            var emailAddress = _userId.GetEmailAddress();
            var name = _userId.GetName();

            var query = await _querySource
                .V<Person>()
                .Where(p => p.Oid == objectId)
                .FirstOrDefaultAsync();

            if (query == null)
            {
                Log.Information("Adding New Person");
                var newPerson = await _querySource
                    .AddV(new Person
                    {
                        Oid = objectId,
                        Email = emailAddress,
                        Name = name
                    })
                    .FirstOrDefaultAsync();
                return Ok(newPerson);
            }

            if (query.Email != emailAddress || query.Name != name)
            {
                Log.Information("Updating Existing Person");
                query.Email = emailAddress;
                query.Name = name;
                var updatedPerson = await _querySource
                    .ReplaceV(query)
                    .FirstOrDefaultAsync();
                return Ok(updatedPerson);
            }

            Log.Information("Returning Existing Person");
            return Ok(query);
        }

        /// <summary>
        /// Get Person
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [ProducesResponseType(typeof(Person), 200)]
        [HttpGet("person/{id}")]
        public async Task<IActionResult> GetPerson(string id)
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
        [HttpPost("person")]
        public async Task<IActionResult> CreatePerson(Person person)
        {
            var query = await _querySource
                .TryAddOrUpdate(person, p => p.Name == person.Name);

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
        [HttpPost("person/skill")]
        public async Task<IActionResult> AddSkill([FromQuery] string personId, [FromQuery] string skillId, [FromQuery] SkillLevel skillLevel)
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
        [HttpGet("person/skills/{id}")]
        public async Task<IActionResult> GetPersonSkills(string id)
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

            return Ok(query.Select(p => new PersonSkill {SkillId = p.Item3.Id, SkillName = p.Item3.Name, SkillCategory = p.Item3.Category, SkillLevel = p.Item2.Level}));
        }

        /// <summary>
        /// Get a list of Skills which this person is not associated with
        /// </summary>
        /// <returns></returns>
        [ProducesResponseType(typeof(List<PersonSkill>), 200)]
        [HttpGet("person/missingskills/{id}")]
        public async Task<IActionResult> GetMissingSkills(string id)
        {
            var query = await _querySource
                .V<Skill>()
                .Not(p => p.InE<HasSkill>().OutV<Person>().Where(q => q.Id == id))
                .ToArrayAsync();

            return Ok(query.Select(p => new PersonSkill {SkillId = p.Id, SkillName = p.Name, SkillCategory = p.Category}));
        }


        /// <summary>
        /// Add Experience to Person
        /// </summary>
        /// <param name="personId"></param>
        /// <param name="experienceId"></param>
        /// <param name="experienceLevel"></param>
        /// <returns></returns>
        [ProducesResponseType(typeof(PersonExperience), 200)]
        [HttpPost("person/experience")]
        public async Task<IActionResult> AddExperience([FromQuery] string personId, [FromQuery] string experienceId, [FromQuery] ExperienceLevel experienceLevel)
        {
            var query = await _querySource
                .TryAdd(personId, experienceId, experienceLevel);

            return Ok(query);
        }

        /// <summary>
        /// Get All Experiences for a Person
        /// </summary>
        /// <returns></returns>
        [ProducesResponseType(typeof(List<PersonExperience>), 200)]
        [ProducesResponseType(typeof(ProblemDetails), 503)]
        [ProducesResponseType(typeof(ProblemDetails), 404)]
        [HttpGet("person/experiences/{id}")]
        public async Task<IActionResult> GetPersonExperiences(string id)
        {
            var query = await _querySource
                .V<Person>(id)
                .As((a, person) => a
                    .OutE<HasExperience>()
                    .As((b, hasExperience) => b
                        .InV<Experience>()
                        .As((c, experience) => c.Select(person, hasExperience, experience)))
                )
                .ToArrayAsync();

            return Ok(query.Select(p => new PersonExperience {ExperienceId = p.Item3.Id, ExperienceName = p.Item3.Name, ExperienceLevel = p.Item2.Level}));
        }
    }
}
