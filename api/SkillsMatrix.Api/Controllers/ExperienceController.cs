using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ExRam.Gremlinq.Core;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SkillsMatrix.Api.Extensions;
using SkillsMatrix.Api.Models;

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
        private readonly IGremlinQuerySource _querySource;

        /// <summary>
        /// Experience Controller
        /// </summary>
        /// <param name="querySource"></param>
        public ExperienceController(IGremlinQuerySource querySource)
        {
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
        /// Get All Experience Categories
        /// </summary>
        /// <returns></returns>
        [ProducesResponseType(typeof(List<string>), 200)]
        [HttpGet("categories")]
        public async Task<IActionResult> GetCategories()
        {
            var query = await _querySource
                .V<Experience>()
                .Values(p => p.Category)
                .Dedup()
                .ToArrayAsync();

            return Ok(query.ToList());
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
