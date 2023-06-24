let isFound = false;
let connection = null;
let passwordNode = null;
const connectToServer = async () => {
  const url = "https://192.168.0.102:7229/hubs/transport?amId=12345";

  try {
    connection = new signalR.HubConnectionBuilder()
      .withUrl(url, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .configureLogging(signalR.LogLevel.Information)
      .build();

    await connection.start();

    connection.on("GetCypherValue", (result) => {});

    await chrome.runtime.sendMessage({ type: "ADD_BADGE" });
  } catch (err) {
    console.error(err);
  }
};

const findDomNodes = () => {
  passwordNode = document.querySelector("input[type='password']");
  if (passwordNode !== null) {
    if (!Boolean(passwordNode.getAttribute("aria-hidden"))) {
      isFound = true;
      connectToServer();
    }
  }
};

const mutationObserver = new MutationObserver((mutations) => {
  for (let i = 0; i < mutations.length; i++) {
    if (
      mutations[i].nextSibling !== null &&
      !isFound &&
      mutations[i].previousSibling !== document.createElement("script")
    ) {
      findDomNodes();
      break;
    }
  }
});

mutationObserver.observe(document.documentElement, {
  attributes: false,
  characterData: false,
  childList: true,
  subtree: true,
  attributeOldValue: false,
  characterDataOldValue: false,
});

document.addEventListener(
  "visibilitychange",
  async () => {
    if (document.hidden && connection !== null) {
      await connection.stop();
      await chrome.runtime.sendMessage({ type: "REMOVE_BADGE" });
      return;
    }
    if (!document.hidden && connection !== null) {
      await connection.start();
      await chrome.runtime.sendMessage({ type: "ADD_BADGE" });
      return;
    }
  },
  false
);

// setTimeout(findDomNodes, 1000);
