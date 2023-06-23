using Microsoft.AspNetCore.SignalR;

namespace backend.Hubs
{
    public class MobileDeviceHub: Hub
    {
        private readonly ILogger<MobileDeviceHub> _logger;

        public MobileDeviceHub(ILogger<MobileDeviceHub> logger)
        {
            _logger = logger;
        }
        public override Task OnConnectedAsync()
        {
            var ConnectionId = Context.ConnectionId;
            var ExtensionId = Context.GetHttpContext().Request.Query["ext"];
            _logger.LogInformation("Browser extension connected");
            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception? exception)
        {
            var ConnectionId = Context.ConnectionId;
            var ExtensionId = Context.GetHttpContext().Request.Query["ext"];
            _logger.LogInformation("Browser extension disconnected");
            return base.OnDisconnectedAsync(exception);
        }
    }
}
