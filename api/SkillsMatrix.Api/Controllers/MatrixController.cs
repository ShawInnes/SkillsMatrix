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
    /// <summary>
    /// Matrix Controller
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class MatrixController : ControllerBase
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly ILogger _logger;
        private readonly IGremlinQuerySource _querySource;

        /// <summary>
        /// Data Controller
        /// </summary>
        /// <param name="httpContextAccessor"></param>
        /// <param name="logger"></param>
        /// <param name="querySource"></param>
        public MatrixController(IHttpContextAccessor httpContextAccessor, ILogger<MatrixController> logger, IGremlinQuerySource querySource)
        {
            _httpContextAccessor = httpContextAccessor;
            _logger = logger;
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

            return Ok(query.Select(p => new PersonSkill {Person = p.Item1.Name, SkillId = p.Item3.Id, SkillName = p.Item3.Name, SkillLevel = p.Item2.Level}));
        }
    }
}
