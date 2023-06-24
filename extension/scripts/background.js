chrome.runtime.onMessage.addListener(async function (
  message,
  sender,
  sendResponse
) {
  if (message.type === "ADD_BADGE") {
    await chrome.action.setBadgeText({ text: "✔" });
    return;
  }
  if (message.type === "REMOVE_BADGE") {
    await chrome.action.setBadgeText({ text: "" });
    return;
  }
});
