using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(SimpleMVC.Startup))]
namespace SimpleMVC
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
