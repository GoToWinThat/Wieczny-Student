using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Monopoly.Core;
using Monopoly.WebApi.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace Monopoly.WebApi.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult MonopolyList()
        {
            var model = new MonopolyVM(new List<MonopolyCard> { new MonopolyCard("a", "b", "c", "d"),
            new MonopolyCard("a", "b", "c", "d"),
            new MonopolyCard("a", "b", "c", "d"),
            new MonopolyCard("a", "b", "c", "d")
            });
            return View(model);
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
