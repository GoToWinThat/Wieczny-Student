using Microsoft.AspNetCore.Mvc;
using Monopoly.Core.UseCases.MonopolyFields.Queries.GetFields;
using System.Threading.Tasks;

namespace Monopoly.WebApi.Controllers
{
    public class MonopolyHomeController : ApiControllerBase
    {
        [HttpGet]
        [Route("")]
        [Route("Monopoly")]
        [Route("Monopoly/Fields")]
        public async Task<ActionResult<FieldsVm>> GetFields()
        {
            return await Mediator.Send(new GetMonopolyFieldsQuery());
        }
    }
}
