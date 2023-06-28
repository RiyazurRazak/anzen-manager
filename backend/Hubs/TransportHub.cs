using Microsoft.AspNetCore.SignalR;
using StackExchange.Redis;

namespace backend.Hubs
{
    public class TransportHub: Hub
    {
        private readonly ILogger<TransportHub> _logger;
        private readonly IDatabase _database;

        public TransportHub(ILogger<TransportHub> logger, IConnectionMultiplexer connectionMultiplexer)
        {
            _logger = logger;
            _database = connectionMultiplexer.GetDatabase();
        }
        public override Task OnConnectedAsync()
        {
            var ConnectionId = Context.ConnectionId;
            var DeviceId = Context.GetHttpContext().Request.Query["amId"];
            _database.StringSet($"{DeviceId}", ConnectionId);
            _logger.LogInformation("device connected");
            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception? exception)
        {
            var DeviceId = Context.GetHttpContext().Request.Query["amId"];
            _database.KeyDelete($"{DeviceId}");
            _logger.LogInformation("device disconnected");
            return base.OnDisconnectedAsync(exception);
        }

        public async Task GetCypherValue(string extensionId, string cypher)
        {
            var extensionConnectionId =  _database.StringGet(extensionId);
            if (!extensionConnectionId.HasValue)
            {
                await Clients.Caller.SendAsync("GetCypherValue", "404");
                return;
            }
            await Clients.Client((string) extensionConnectionId).SendAsync("GetCypherValue", cypher);
        }
    }
}
