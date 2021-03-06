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
    /// Skill Controller
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class SkillController : ControllerBase
    {
        private readonly IGremlinQuerySource _querySource;

        /// <summary>
        /// Skill Controller
        /// </summary>
        /// <param name="querySource"></param>
        public SkillController(IGremlinQuerySource querySource)
        {
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
        /// Get All Skill Categories
        /// </summary>
        /// <returns></returns>
        [ProducesResponseType(typeof(List<string>), 200)]
        [HttpGet("categories")]
        public async Task<IActionResult> GetCategories()
        {
            var query = await _querySource
                .V<Skill>()
                .Values(p => p.Category)
                .Dedup()
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
        public async Task<IActionResult> GetSkill(string id)
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
                .TryAddOrUpdate(skill, p => p.Name == skill.Name);

            return Ok(query);
        }

        /// <summary>
        /// Delete Skill
        /// </summary>
        /// <returns></returns>
        [ProducesResponseType(typeof(Skill), 200)]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSkill(string id)
        {
            await _querySource
                .V<Skill>(id)
                .Drop();

            return Ok();
        }
    }
}
