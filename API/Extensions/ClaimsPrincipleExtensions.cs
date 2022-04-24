using System.Security.Claims;

namespace API.Extensions
{
    public static class ClaimsPrincipleExtensions
    {
        //ClaimTypes.Name => JwtRegisteredClaimNames.UniqueName
        //ClaimTypes.NameIdentifier => JwtRegisteredClaimNames.NameId
        public static string GetUsername(this ClaimsPrincipal user)
        {
            return user.FindFirst(ClaimTypes.Name)?.Value; ////takes the value from the token
        }

        public static int GetUserId(this ClaimsPrincipal user)
        {
            return int.Parse(user.FindFirst(ClaimTypes.NameIdentifier)?.Value); ////takes the value from the token
        }
    }
}