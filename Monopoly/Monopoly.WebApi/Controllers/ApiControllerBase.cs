using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.DependencyInjection;
using Monopoly.WebApi.Hubs;

namespace Monopoly.WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public abstract class ApiControllerBase : Controller
    {
        private ISender _mediator;

        protected ISender Mediator => _mediator ??= HttpContext.RequestServices.GetService<ISender>();

        private IHubContext<MonopolyHub> _hub;

        protected IHubContext<MonopolyHub> Hub => _hub ??= HttpContext.RequestServices.GetService<IHubContext<MonopolyHub>>();
    }
}
