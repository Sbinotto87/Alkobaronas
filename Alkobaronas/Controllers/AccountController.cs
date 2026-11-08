using Microsoft.AspNetCore.Mvc;

namespace Alkobaronas.Controllers
{
    public class AccountController : Controller
    {
        // GET: /Account/Register
        [HttpGet]
        public IActionResult Register()
        {
            return View();
        }

        // POST: /Account/Register
        [HttpPost]
        public IActionResult Register(string firstName, string lastName, string email, string phone, string birthDate, string password)
        {
            ViewBag.SuccessMessage = $"Registration successful for {firstName} {lastName}! Welcome to Alkobaronas.";
            return View();
        }

        // GET: /Account/Login
        [HttpGet]
        public IActionResult Login()
        {
            return View();
        }

        // POST: /Account/Login
        [HttpPost]
        public IActionResult Login(string username, string password)
        {
            if (string.IsNullOrEmpty(username))
            {
                ViewBag.ErrorMessage = "Please enter a username.";
                return View();
            }

            string normalizedUser = username.Trim().ToLower();

            // Prototype checks based on username
            if (normalizedUser == "user")
            {
                // Regular user goes straight to the homepage
                return RedirectToAction("Index", "Home");
            }
            else if (normalizedUser == "admin")
            {
                ViewBag.Message = "Logged in as Admin (Dashboard coming soon)";
                return View();
            }
            else if (normalizedUser == "provider")
            {
                return RedirectToAction("Index", "HomeProvider");
            }
            else
            {
                // Fallback for custom entries
                ViewBag.Message = $"Logged in as {username} (Standard User view)";
                return RedirectToAction("Index", "Home");
            }
        }
        // GET: /Account/Manage
        [HttpGet]
        public IActionResult Manage()
        {
            // Prototype data display
            ViewBag.Email = "user@alkobaronas.com";
            ViewBag.IsEmailVerified = false;
            return View();
        }

        // POST: /Account/UpdateAddress
        [HttpPost]
        public IActionResult UpdateAddress(string street, string city, string postalCode, string country)
        {
            ViewBag.Email = "user@alkobaronas.com";
            ViewBag.IsEmailVerified = false;
            ViewBag.AddressMessage = "Delivery address updated successfully!";
            return View("Manage");
        }

        // POST: /Account/VerifyEmail
        [HttpPost]
        public IActionResult VerifyEmail()
        {
            ViewBag.Email = "user@alkobaronas.com";
            ViewBag.IsEmailVerified = true;
            ViewBag.EmailMessage = "Verification link sent! (Simulated: Email verified successfully)";
            return View("Manage");
        }

        // POST: /Account/DeleteAccount
        [HttpPost]
        public IActionResult DeleteAccount()
        {
            // Prototype action: Clear data / session and redirect to Login
            return RedirectToAction("Login", "Account");
        }
    }
}
