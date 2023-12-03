let onlineStatusElement = null;
let intervalId = null;

window.onload = function () {
  intervalId = setInterval(checkOnlineStatus, 5000);
};

function checkOnlineStatus() {
  onlineStatusElement = document.querySelector("span[title='online']");
  
  if (onlineStatusElement) {
    clearInterval(intervalId);
    let currentTime = new Date();
    let onlineTime = currentTime.toLocaleTimeString();

    chrome.runtime.sendMessage({ online: true, time: onlineTime });
    showNotification("Online", "It's online now.");
  } else {
    chrome.runtime.sendMessage({ online: false });
    showNotification("Offline", "It's offline now.");
  }
}

function showNotification(title, message) {
  if (title === "Çevrimiçi") {
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'icon.png',
      title: title,
      message: message
    });
  }
}
