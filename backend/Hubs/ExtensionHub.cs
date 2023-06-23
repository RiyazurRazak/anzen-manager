using Microsoft.AspNetCore.SignalR;
using StackExchange.Redis;

namespace backend.Hubs
{
    public class ExtensionHub : Hub
    {
        private readonly ILogger<ExtensionHub> _logger;
        private readonly IDatabase _database;

        public ExtensionHub(ILogger<ExtensionHub> logger, IConnectionMultiplexer connectionMultiplexer)
        {
            _logger = logger;
            _database = connectionMultiplexer.GetDatabase();
        }
        public override Task OnConnectedAsync()
        {
            var ConnectionId = Context.ConnectionId;
            var ExtensionId = Context.GetHttpContext().Request.Query["ext"];
            _database.StringSet($"{ExtensionId}", ConnectionId);
            _logger.LogInformation("Browser extension connected");
            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception? exception)
        {
            var ExtensionId = Context.GetHttpContext().Request.Query["ext"];
            _database.KeyDelete($"{ExtensionId}");
            _logger.LogInformation("Browser extension disconnected");
            return base.OnDisconnectedAsync(exception);
        }

    }
}
