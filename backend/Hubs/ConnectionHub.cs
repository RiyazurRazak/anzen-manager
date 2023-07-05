using Microsoft.AspNetCore.SignalR;
using StackExchange.Redis;

namespace backend.Hubs
{
    public class ConnectionHub : Hub
    {
        private readonly ILogger<ConnectionHub> _logger;
        private readonly IDatabase _database;

        public ConnectionHub(ILogger<ConnectionHub> logger, IConnectionMultiplexer connectionMultiplexer)
        {
            _logger = logger;
            _database = connectionMultiplexer.GetDatabase();
        }
        public override Task OnConnectedAsync()
        {
            var ConnectionId = Context.ConnectionId;
            var DeviceId = Context.GetHttpContext().Request.Query["amId"];
            _database.StringSet($"{DeviceId}", ConnectionId);
            _logger.LogInformation($"device connected");
            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception? exception)
        {
            var DeviceId = Context.GetHttpContext().Request.Query["amId"];
            _database.KeyDelete($"{DeviceId}");
            _logger.LogInformation("device disconnected");
            return base.OnDisconnectedAsync(exception);
        }

        public async Task OnLink(string extensionId, string deviceName, string deviceId)
        {
            var extensionConnectionId = _database.StringGet(extensionId);
            if (!extensionConnectionId.HasValue)
            {
                await Clients.Caller.SendAsync("OnLink", "404");
                return;
            }
            await Clients.Client((string)extensionConnectionId).SendAsync("OnLink", deviceName, deviceId);
        }

        public async Task VerifyHandshake(string extensionId, string handshakeCypher)
        {
            var extensionConnectionId = _database.StringGet(extensionId);
            if (!extensionConnectionId.HasValue)
            {
                await Clients.Caller.SendAsync("VerifyHandshake", "404");
                return;
            }
            await Clients.Client(extensionConnectionId).SendAsync("VerifyHandshake", handshakeCypher);
        }


    }
}
