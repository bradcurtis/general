using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace sampleapp.Models
{
    public class Person
    {
       
            public int ID { get; set; }
            public string LastName { get; set; }
            public string FirstMidName { get; set; }


            public virtual ICollection<Alert> Alerts { get; set; }
        }

    
}