using sampleapp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace sampleapp.Controllers
{
    public class DataEntryFormController : Controller
    {
        //
        // GET: /DataEntryForm/
        public ActionResult Index()
        {
            return View();
        }

        // GET: /Student/  


        public ActionResult Form()
        {
            DataEntryForm objFormModel = new DataEntryForm();

            List<SelectListItem> names = new List<SelectListItem>();
            names.Add(new SelectListItem { Text = "Sourabh", Value = "1" });
            names.Add(new SelectListItem { Text = "Surbhee", Value = "2" });

            objFormModel.MyChoices = names;

            return View(objFormModel);
        }
    }

	
}