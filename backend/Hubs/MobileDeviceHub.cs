using Microsoft.AspNetCore.SignalR;
using StackExchange.Redis;

namespace backend.Hubs
{
    public class MobileDeviceHub: Hub
    {
        private readonly ILogger<MobileDeviceHub> _logger;
        private readonly IDatabase _database;

        public MobileDeviceHub(ILogger<MobileDeviceHub> logger, IConnectionMultiplexer connectionMultiplexer)
        {
            _logger = logger;
            _database = connectionMultiplexer.GetDatabase();
        }
        public override Task OnConnectedAsync()
        {
            var ConnectionId = Context.ConnectionId;
            var DeviceId = Context.GetHttpContext().Request.Query["mbl"];
            _database.StringSet($"{DeviceId}", ConnectionId);
            _logger.LogInformation("mobile device connected");
            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception? exception)
        {
            var DeviceId = Context.GetHttpContext().Request.Query["mbl"];
            _database.KeyDelete($"{DeviceId}");
            _logger.LogInformation("mobile device disconnected");
            return base.OnDisconnectedAsync(exception);
        }

        public async Task OnLink(string extensionId)
        {
            var extensionConnectionId = _database.StringGet(extensionId);
            if(!extensionConnectionId.HasValue)
            {
                await Clients.Caller.SendAsync("OnLink", "404");
                return;
            }
            await Clients.Client(extensionConnectionId).SendAsync("OnLink", "200");
        }
    }
}
