using Microsoft.AspNetCore.Mvc;

namespace Alkobaronas.Controllers
{
    public class UserController : Controller
    {
        // GET: /User/Manage
        [HttpGet]
        public IActionResult Manage()
        {
            ViewBag.Email = "user@alkobaronas.com";
            ViewBag.IsEmailVerified = false;
            return View();
        }

        // POST: /User/UpdateAddress
        [HttpPost]
        public IActionResult UpdateAddress(string street, string city, string postalCode, string country)
        {
            ViewBag.Email = "user@alkobaronas.com";
            ViewBag.IsEmailVerified = false;
            ViewBag.AddressMessage = "Delivery address updated successfully!";
            return View("Manage");
        }

        // POST: /User/VerifyEmail
        [HttpPost]
        public IActionResult VerifyEmail()
        {
            ViewBag.Email = "user@alkobaronas.com";
            ViewBag.IsEmailVerified = true;
            ViewBag.EmailMessage = "Verification link sent! (Simulated: Email verified successfully)";
            return View("Manage");
        }

        // POST: /User/DeleteAccount
        [HttpPost]
        public IActionResult DeleteAccount()
        {
            // Redirect back to login page on deletion
            return RedirectToAction("Login", "Auth");
        }
    }
}