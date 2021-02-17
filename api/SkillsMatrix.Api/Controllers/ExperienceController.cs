using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ExRam.Gremlinq.Core;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SkillsMatrix.Api.Extensions;
using SkillsMatrix.Api.Models;

namespace SkillsMatrix.Api.Controllers
{
    /// <summary>
    /// Experience Controller
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class ExperienceController : ControllerBase
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly ILogger _logger;
        private readonly IGremlinQuerySource _querySource;

        /// <summary>
        /// Experience Controller
        /// </summary>
        /// <param name="httpContextAccessor"></param>
        /// <param name="logger"></param>
        /// <param name="querySource"></param>
        public ExperienceController(IHttpContextAccessor httpContextAccessor, ILogger<ExperienceController> logger, IGremlinQuerySource querySource)
        {
            _httpContextAccessor = httpContextAccessor;
            _logger = logger;
            _querySource = querySource;
        }

        /// <summary>
        /// Get All Experiences
        /// </summary>
        /// <returns></returns>
        [ProducesResponseType(typeof(List<Experience>), 200)]
        [HttpGet]
        public async Task<IActionResult> Experiences()
        {
            var query = await _querySource
                .V<Experience>()
                .ToArrayAsync();
            return Ok(query.ToList());
        }

        /// <summary>
        /// Get Experience
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [ProducesResponseType(typeof(Experience), 200)]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetExperience(long id)
        {
            var query = await _querySource
                .V<Experience>(id)
                .FirstOrDefaultAsync();

            return Ok(query);
        }

        /// <summary>
        /// Create Experience
        /// </summary>
        /// <returns></returns>
        [ProducesResponseType(typeof(Experience), 200)]
        [HttpPost]
        public async Task<IActionResult> CreateExperience(Experience experience)
        {
            var query = await _querySource
                .TryAdd(experience);

            return Ok(query);
        }
    }
}
