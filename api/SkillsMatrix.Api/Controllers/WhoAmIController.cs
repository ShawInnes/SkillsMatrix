using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace SkillsMatrix.Api.Controllers
{
    /// <summary>
    /// Data Controller
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class WhoAmIController : ControllerBase
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public WhoAmIController(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        [ProducesResponseType(200)]
        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetWhoAmI()
        {
            var identity = _httpContextAccessor?.HttpContext?.User.Identity;
            return await Task.FromResult(Ok(identity));
        }
    }
}
