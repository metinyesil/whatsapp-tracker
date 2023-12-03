let onlineStatusElement = null;
let intervalId = null;

window.onload = function () {
  intervalId = setInterval(checkOnlineStatus, 5000);
};

function checkOnlineStatus() {
  onlineStatusElement = document.querySelector("span[title='çevrimiçi']");
  
  if (onlineStatusElement) {
    clearInterval(intervalId);
    let currentTime = new Date();
    let onlineTime = currentTime.toLocaleTimeString();

    chrome.runtime.sendMessage({ online: true, time: onlineTime });
    showNotification("Çevrimiçi", "Şu anda çevrimiçi.");
  } else {
    chrome.runtime.sendMessage({ online: false });
    showNotification("Çevrimdışı", "Şu anda çevrimdışı.");
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
