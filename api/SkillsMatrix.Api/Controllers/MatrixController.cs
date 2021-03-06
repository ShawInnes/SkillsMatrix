using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ExRam.Gremlinq.Core;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SkillsMatrix.Api.Models;

namespace SkillsMatrix.Api.Controllers
{
    /// <summary>
    /// Matrix Controller
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class MatrixController : ControllerBase
    {
        private readonly IGremlinQuerySource _querySource;

        /// <summary>
        /// Data Controller
        /// </summary>
        /// <param name="querySource"></param>
        public MatrixController( IGremlinQuerySource querySource)
        {
            _querySource = querySource;
        }

        [ResponseCache(Duration = 30, Location = ResponseCacheLocation.Any)]
        [ProducesResponseType(typeof(List<PersonSkill>), 200)]
        [HttpGet("dashboard")]
        public async Task<IActionResult> GetDashboardData()
        {
            var query = await _querySource
                .V<Person>()
                .As((a, person) => a
                    .OutE<HasSkill>()
                    .As((b, hasSkill) => b
                        .InV<Skill>()
                        .As((c, skill) => c.Select(person, hasSkill, skill)))
                )
                .ToArrayAsync();

            return Ok(query.Select(p => new PersonSkill {Person = p.Item1.Name, SkillId = p.Item3.Id, SkillName = p.Item3.Name, SkillCategory = p.Item3.Category, SkillLevel = p.Item2.Level}));
        }
    }
}
