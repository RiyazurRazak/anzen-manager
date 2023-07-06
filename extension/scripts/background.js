/**
 * listeaner function
 */
chrome.runtime.onMessage.addListener(async function (
  message,
  sender,
  sendResponse
) {
  if (message.type === "INIT") {
    console.log("kk");
    const id = await chrome.storage.local.get("anzenId");
    await sendResponse({ type: "ID", msg: id });
  }

  if (message.type === "ADD_BADGE") {
    // add active badge to the icon
    await chrome.action.setBadgeText({ text: "✔" });
    return;
  }
  if (message.type === "REMOVE_BADGE") {
    //remove the active badge from the icon
    await chrome.action.setBadgeText({ text: "" });
    return;
  }
});

/**
 * 2 way communication channel bw service worker and content script
 */
chrome.runtime.onConnect.addListener(async (port) => {
  port.onMessage.addListener(async (msg) => {
    if (msg.type === "INIT") {
      // get the extension id from storage
      const id = await chrome.storage.local.get("anzenId");
      port.postMessage({ type: "INIT", msg: id });
    }
    if (msg.type === "DECRYPT") {
      try {
        const { anzenKey } = await chrome.storage.local.get("anzenKey");
        port.postMessage({ type: "DECRYPT", value: msg.value, key: anzenKey });
      } catch (err) {
        console.log(err);
        port.postMessage({ type: "DECRYPT", value: "", key: false });
      }
    }
  });
});
