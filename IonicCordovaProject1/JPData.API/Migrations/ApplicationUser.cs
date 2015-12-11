using Microsoft.AspNet.Identity.EntityFramework;

namespace AngularJSAuthentication.API.Migrations
{
    public class ApplicationUser : IdentityUser
    {
    }

    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext()
            : base("DefaultConnection")
        {

        }
    }
}