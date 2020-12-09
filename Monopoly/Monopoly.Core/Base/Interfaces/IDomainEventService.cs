using Domain.Base;
using System.Threading.Tasks;

namespace Monopoly.Core.Base.Interfaces
{
    public interface IDomainEventService
    {
        Task Publish(DomainEvent domainEvent);
    }
}
