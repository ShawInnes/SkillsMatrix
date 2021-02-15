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
    /// Skill Controller
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class SkillController : ControllerBase
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly ILogger _logger;
        private readonly IGremlinQuerySource _querySource;

        /// <summary>
        /// Skill Controller
        /// </summary>
        /// <param name="httpContextAccessor"></param>
        /// <param name="logger"></param>
        /// <param name="querySource"></param>
        public SkillController(IHttpContextAccessor httpContextAccessor, ILogger<SkillController> logger, IGremlinQuerySource querySource)
        {
            _httpContextAccessor = httpContextAccessor;
            _logger = logger;
            _querySource = querySource;
        }

        /// <summary>
        /// Get All Skills
        /// </summary>
        /// <returns></returns>
        [ProducesResponseType(typeof(List<Skill>), 200)]
        [HttpGet]
        public async Task<IActionResult> Skills()
        {
            var query = await _querySource
                .V<Skill>()
                .ToArrayAsync();
            return Ok(query.ToList());
        }

        /// <summary>
        /// Get Skill
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [ProducesResponseType(typeof(Skill), 200)]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetSkill(long id)
        {
            var query = await _querySource
                .V<Skill>(id)
                .FirstOrDefaultAsync();

            return Ok(query);
        }

        /// <summary>
        /// Create Skill
        /// </summary>
        /// <returns></returns>
        [ProducesResponseType(typeof(Skill), 200)]
        [HttpPost]
        public async Task<IActionResult> CreateSkill(Skill skill)
        {
            var query = await _querySource
                .TryAdd(skill);

            return Ok(query);
        }

    }
}
