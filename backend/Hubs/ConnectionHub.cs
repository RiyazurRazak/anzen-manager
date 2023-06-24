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

        public async Task OnLink(string msg)
        {
            await Clients.Caller.SendAsync(msg);
        }

    }
}
