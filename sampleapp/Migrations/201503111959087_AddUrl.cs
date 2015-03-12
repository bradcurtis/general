namespace sampleapp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddUrl : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Alert",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        FormName = c.String(),
                        Person_ID = c.Int(),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("dbo.Person", t => t.Person_ID)
                .Index(t => t.Person_ID);
            
            CreateTable(
                "dbo.Person",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        LastName = c.String(),
                        FirstMidName = c.String(),
                    })
                .PrimaryKey(t => t.ID);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Alert", "Person_ID", "dbo.Person");
            DropIndex("dbo.Alert", new[] { "Person_ID" });
            DropTable("dbo.Person");
            DropTable("dbo.Alert");
        }
    }
}
