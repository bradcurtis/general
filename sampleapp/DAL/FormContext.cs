using sampleapp.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;
using System.Web;

namespace sampleapp.DAL
{
    public class FormContext: DbContext
    {

        public FormContext(): base("FormContext")
        {
        }
        
        public DbSet<Person> Persons { get; set; }
        public DbSet<Alert> Alerts { get; set; }

        public DbSet<DataEntryForm> Forms { get; set; }
        

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }
    }

}