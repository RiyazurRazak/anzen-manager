importScripts("lib/signalr.js");
(async () => {
  const url = "https://localhost:7229/hubs/extension?ext=12345;";

  try {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(url, { logger: signalR.LogLevel.Information })
      .build();

    await connection.start();

    connection.on("OnLink", (result) => {
      console.log(result);
    });
  } catch (err) {
    console.error(err);
  }
})();
