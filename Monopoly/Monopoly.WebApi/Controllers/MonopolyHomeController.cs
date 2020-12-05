using Microsoft.AspNetCore.Mvc;
using Monopoly.Core.UseCases.MonopolyFields.Queries.GetFields;
using System.Threading.Tasks;

namespace Monopoly.WebApi.Controllers
{
    public class MonopolyHomeController : ApiControllerBase
    {
        [HttpPost] //Change to get to simple check json in browser
        public async Task<ActionResult<FieldsVm>> PostFields()
        {
            return await Mediator.Send(new GetMonopolyFieldsQuery());
        }
    }
}
