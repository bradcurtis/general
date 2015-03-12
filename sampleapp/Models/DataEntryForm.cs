using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace sampleapp.Models
{
    public class DataEntryForm
    {

        public int ID { get; set; }
        public virtual Person Person { get; set; }

        public IList<SelectListItem> MyChoices { get; set; }  
    }
}