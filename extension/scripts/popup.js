const content = document.getElementById("content");
const linkedTitle = document.getElementById("linked-title");
const registrationTemplate = document.getElementById("anzen-registration");
const loggedInTemplate = document.getElementById("anzen-loggedin");
const keyShareTemplate = document.getElementById("anzen-key-share");
let connection = null;
const baseUrl = "https://192.168.0.102:7229/hubs";

/**
 * connect to the signalr server and listen to the methods
 * @param {string} id - unique extension id
 */
const connectToServer = async (id) => {
  const url = `${baseUrl}/connection?amId=${id}`;
  try {
    // initialize the signalr connection
    connection = new signalR.HubConnectionBuilder()
      .withUrl(url, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .configureLogging(signalR.LogLevel.Information)
      .build();

    await connection.start();

    // listen to the methods
    connection.on("OnLink", async (result) => {
      // store the mobile device name
      await chrome.storage.local.set({ linkDevice: result });
      keysGeneration();
    });
    connection.on("VerifyHandshake", verifyHandshake);
  } catch (err) {
    console.error(err);
  }
};

/**
 * verify handshake between the mobile app and extension after the sharing of public key.
 * This fn confirms that the public key in the client belongs to this extension.
 * @param {string} encodedText - cypher text from the mobile app
 */
const verifyHandshake = async (encodeText) => {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  const payload = encoder.encode(encodeText);
  const { anzenCode } = await chrome.storage.local.get("anzenCode");
  const { anzenKey } = await chrome.storage.local.get("anzenKey");
  const privateKey = await window.crypto.subtle.importKey(
    "jwk",
    JSON.parse(anzenKey),
    {
      name: "RSA-OAEP",
      hash: "SHA-256",
    },
    true,
    ["decrypt"]
  );
  const decryptToken = await window.crypto.subtle.decrypt(
    {
      name: "RSA-OAEP",
    },
    privateKey,
    payload
  );
  if (decoder.decode(decryptToken) === anzenCode) {
    await chrome.storage.local.set({ isLinked: true });
    checkRegistrationStatus();
  } else {
    alert("Invalid Handshake Try Again");
    keysGeneration();
  }
};

/**
 * generates a keypair and exports the public key via qrcode and stores the private key
 */
const keysGeneration = async () => {
  content.innerHTML = "Key Generation Process Initiated.......";
  const keyPair = await window.crypto.subtle.generateKey(
    {
      name: "RSA-OAEP",
      modulusLength: 4096,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: "SHA-256",
    },
    true,
    ["encrypt", "decrypt"]
  );
  const publicKey = await window.crypto.subtle.exportKey(
    "jwk",
    keyPair.publicKey
  );
  const privateKey = await window.crypto.subtle.exportKey(
    "jwk",
    keyPair.privateKey
  );
  await chrome.storage.local.set({
    anzenKey: JSON.stringify(privateKey),
  });
  content.innerHTML = "";
  content.appendChild(keyShareTemplate.content.cloneNode(true));
  const verifyCode = self.crypto.randomUUID();
  await chrome.storage.local.set({ anzenCode: verifyCode });
  new QRCode("key-code", {
    text: JSON.stringify({ c: publicKey, v: verifyCode }),
    width: 200,
    height: 200,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.L,
  });
};

/**
 * genrates the unique id for the extension and initialize handshake bw clients via qrcode
 */
const initializeRegistration = async () => {
  try {
    const extensionId = self.crypto.randomUUID();
    await chrome.storage.local.set({ anzenId: extensionId });
    new QRCode("registration-code", {
      text: extensionId,
      width: 200,
      height: 200,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H,
    });
    connectToServer(extensionId);
  } catch (err) {
    alert("Something Went Wrong!");
  }
};

/**
 * check if the extension already linked it or not.
 * render the template appropriate to the linking status
 */
const checkRegistrationStatus = async () => {
  const { anzenId } = await chrome.storage.local.get("anzenId");
  const { linkDevice } = await chrome.storage.local.get("linkDevice");
  if (anzenId && linkDevice) {
    linkedTitle.innerText = `Linked with ${linkDevice}`;
    content.innerHTML = "";
    content.appendChild(loggedInTemplate.content.cloneNode(true));
  } else {
    content.innerHTML = "";
    content.appendChild(registrationTemplate.content.cloneNode(true));
    initializeRegistration();
  }
};

checkRegistrationStatus();
