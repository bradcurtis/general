using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(ASPLogins.Startup))]
namespace ASPLogins
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
