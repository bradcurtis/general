namespace AngularJSAuthentication.API.Migrations
{
    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<AngularJSAuthentication.API.AuthContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(AngularJSAuthentication.API.AuthContext context)
        {

            //The UserStore is ASP Identity's data layer. Wrap context with the UserStore.
            UserStore<ApplicationUser> userStore = new UserStore<ApplicationUser>(context);

            //The UserManager is ASP Identity's implementation layer: contains the methods.
            //The constructor takes the UserStore: how the methods will interact with the database.
            UserManager<ApplicationUser> userManager = new UserManager<ApplicationUser>(userStore);

            //Add or Update the initial Users into the database as normal.
            context.Users.AddOrUpdate(
                x => x.Email,  //Using Email as the Unique Key: If a record exists with the same email, AddOrUpdate skips it.
                new ApplicationUser() { Email = "damo2@email.co.uk", UserName = "damo2@email.co.uk", PasswordHash = new PasswordHasher().HashPassword("Som3Pass!") },
                new ApplicationUser() { Email = "2ndUser@email.co.uk", UserName = "Jane Doe", PasswordHash = new PasswordHasher().HashPassword("MyPassword") }
            );

            //Save changes so the Id columns will auto-populate.
            context.SaveChanges();

            //ASP Identity User Id's are Guids stored as nvarchar(128), and exposed as strings.

            //Get the UserId only if the SecurityStamp is not set yet.
            string userId = context.Users.Where(x => x.Email == "damo2@email.co.uk" && string.IsNullOrEmpty(x.SecurityStamp)).Select(x => x.Id).FirstOrDefault();

            //If the userId is not null, then the SecurityStamp needs updating.
            if (!string.IsNullOrEmpty(userId)) userManager.UpdateSecurityStamp(userId);

            //Repeat for next user: good opportunity to make a helper method.
            userId = context.Users.Where(x => x.Email == "2ndUser@email.co.uk" && string.IsNullOrEmpty(x.SecurityStamp)).Select(x => x.Id).FirstOrDefault();

            if (!string.IsNullOrEmpty(userId)) userManager.UpdateSecurityStamp(userId);

            //Continue on with Seed.
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.
            //
            //    context.People.AddOrUpdate(
            //      p => p.FullName,
            //      new Person { FullName = "Andrew Peters" },
            //      new Person { FullName = "Brice Lambson" },
            //      new Person { FullName = "Rowan Miller" }
            //    );
            //
        }
    }
}
