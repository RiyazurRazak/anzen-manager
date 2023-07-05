let isFound = false;
let connection = null;
let passwordNode = null;
// port for communication to the service worker
const port = chrome.runtime.connect({ name: "anzen" });

/**
 * connect to the signalr server and listen to the methods
 * @param {string} id - unique extension id
 */
const connectToServer = async (id) => {
  const url = `https://api-anzen.azurewebsites.net/hubs/transport?amId=${id}`;

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

/**
 * find the password input in the webpage loaded
 */
const findDomNodes = () => {
  passwordNode = document.querySelector("input[type='password']");
  if (passwordNode !== null) {
    if (!Boolean(passwordNode.getAttribute("aria-hidden"))) {
      isFound = true;
      port.postMessage({ type: "INIT" });
      port.onMessage.addListener(function (res) {
        if (res.type === "INIT") {
          const id = res.msg?.anzenId;
          if (id) {
            connectToServer(id);
          }
        }
      });
    }
  }
};

/**
 * initialize the mutation observer to listen the changes of dom in webpage
 */
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

/**
 * observe the entire dom tree for changes
 */
mutationObserver.observe(document.documentElement, {
  attributes: false,
  characterData: false,
  childList: true,
  subtree: true,
  attributeOldValue: false,
  characterDataOldValue: false,
});

/**
 * observe the visibility status to track the current active tab in the window
 */
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
