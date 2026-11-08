using Alkobaronas.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace Alkobaronas.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        // Add this Cart action to return Cart.cshtml
        [HttpGet]
        public IActionResult Cart()
        {
            return View();
        }
    }
}