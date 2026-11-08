using Microsoft.AspNetCore.Mvc;

namespace Alkobaronas.Models
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
    }
}
