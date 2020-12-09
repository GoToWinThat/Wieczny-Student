using NUnit.Framework;
using System.Threading.Tasks;

namespace Core.IntegrationTests.Base
{
    using static TestSetup;
    public class TestBase
    {
        [SetUp]
        public async Task TestSetUp()
        {
            await ResetState();
        }
    }
}
