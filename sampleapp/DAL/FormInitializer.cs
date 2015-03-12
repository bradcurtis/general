using sampleapp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace sampleapp.DAL
{
    public class FormInitializer : System.Data.Entity.DropCreateDatabaseIfModelChanges<FormContext>
    {
        protected override void Seed(FormContext context)
        {
            var persons = new List<Person>
            {
            new Person{FirstMidName="Carson",LastName="Alexander"},
             new Person{FirstMidName="Carson",LastName="Alexander"},
              new Person{FirstMidName="bill",LastName="dave"}
            
            };

            persons.ForEach(s => context.Persons.Add(s));
            context.SaveChanges();
        }
    }

}