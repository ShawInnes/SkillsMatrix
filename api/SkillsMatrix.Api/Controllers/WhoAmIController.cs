using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SkillsMatrix.Api.Services;

namespace SkillsMatrix.Api.Controllers
{
    /// <summary>
    /// Data Controller
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class WhoAmIController : ControllerBase
    {
        private readonly IUserIdService _userId;

        public WhoAmIController(IUserIdService userId)
        {
            _userId = userId;
        }

        [ProducesResponseType(200)]
        [HttpGet]
        public async Task<IActionResult> GetWhoAmI()
        {
            return await Task.FromResult(Ok(new
            {
                ObjectId = _userId.GetObjectId(),
                Name  = _userId.GetName(),
                Email = _userId.GetEmailAddress()
            }));
        }
    }
}
