using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ExRam.Gremlinq.Core;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SkillsMatrix.Api.Extensions;
using SkillsMatrix.Api.Models;
using SkillsMatrix.Api.Services;

namespace SkillsMatrix.Api.Controllers
{
    /// <summary>
    /// Experience Controller
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ExperienceController : ControllerBase
    {
        private readonly IUserIdService _userId;
        private readonly ILogger _logger;
        private readonly IGremlinQuerySource _querySource;

        /// <summary>
        /// Experience Controller
        /// </summary>
        /// <param name="httpContextAccessor"></param>
        /// <param name="logger"></param>
        /// <param name="querySource"></param>
        public ExperienceController(IUserIdService userId, ILogger<ExperienceController> logger, IGremlinQuerySource querySource)
        {
            _userId = userId;
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
        public async Task<IActionResult> GetExperience(string id)
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
                .TryAddOrUpdate(experience, p => p.Name == experience.Name);

            return Ok(query);
        }
    }
}
