let logMessages = JSON.parse(localStorage.getItem('logMessages')) || []; 
let lastLog = null;

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  const statusElement = document.getElementById('status');
  const timeElement = document.getElementById('time');

  if (message.online) {
    if (lastLog !== 'online') {
      statusElement.textContent = "Online";
      timeElement.textContent = "Last time online: " + message.time;

      if (logMessages.length > 0 && logMessages[logMessages.length - 1].online) {
        const lastOnlineTime = new Date(logMessages[logMessages.length - 1].timestamp);
        const currentTime = new Date();
        const diff = (currentTime - lastOnlineTime) / 1000;
        logMessages[logMessages.length - 1].duration = diff;
      }

      message.timestamp = new Date();
      logMessages.push(message);
      lastLog = 'online';
    }
  } else {
    if (lastLog !== 'offline') {
      statusElement.textContent = "Offline";
      timeElement.textContent = "";

      message.timestamp = new Date();
      logMessages.push(message);
      lastLog = 'offline';

      if (logMessages.length > 1 && !logMessages[logMessages.length - 2].online) {
        const lastOfflineTime = new Date(logMessages[logMessages.length - 2].timestamp);
        const currentTime = new Date();
        const diff = (currentTime - lastOfflineTime) / 1000;
        logMessages[logMessages.length - 2].duration = diff;
      }
    }
  }

  const logElement = document.getElementById('log');

  logElement.innerHTML = "";

  for (let i = logMessages.length - 1; i >= 0; i--) {
    const log = logMessages[i];
    const logItem = document.createElement('p');
    if (log.online) {
      logItem.textContent = `It happened online: ${log.timestamp.toLocaleString()}`;
    } else {
      logItem.textContent = `It went offline: ${log.timestamp.toLocaleString()}`;
    }
    logElement.appendChild(logItem);
  }

  localStorage.setItem('logMessages', JSON.stringify(logMessages));
});
