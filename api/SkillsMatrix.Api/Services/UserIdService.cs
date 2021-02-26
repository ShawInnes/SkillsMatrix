using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using Microsoft.Identity.Web;

namespace SkillsMatrix.Api.Services
{
    public class UserIdService : IUserIdService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public UserIdService(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public string GetObjectId()
        {
            var claimsIdentity = _httpContextAccessor?.HttpContext?.User.Identity as ClaimsIdentity;
            var claim = claimsIdentity?.FindFirst(p => p.Type == ClaimConstants.ObjectId);
            return claim?.Value;
        }

        public string GetEmailAddress()
        {
            var claimsIdentity = _httpContextAccessor?.HttpContext?.User.Identity as ClaimsIdentity;
            var claim = claimsIdentity?.FindFirst(p => p.Type == ClaimTypes.Name);
            return claim?.Value;
        }

        public string GetName()
        {
            var claimsIdentity = _httpContextAccessor?.HttpContext?.User.Identity as ClaimsIdentity;
            var claim = claimsIdentity?.FindFirst(p => p.Type == ClaimConstants.Name);
            return claim?.Value;
        }
    }
}
