using Microsoft.AspNetCore.Mvc;

namespace Alkobaronas.Controllers
{
    public class CartContoller : Controller
    {
        // Existing Index action...
        public IActionResult Index()
        {
            return View();
        }

        // Add this Cart action to return Cart.cshtml
        [HttpGet]
        public IActionResult Cart()
        {
            return View();
        }
    }
}
