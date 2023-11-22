
window.addEventListener('appinstalled', (evt) => {
  console.log("appinstalled fired", evt);
});

window.onload = () => {
  'use strict';
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js');
    navigator.serviceWorker.ready
            .then(registration => registration.sync.register('syncAttendees'))
            .then(() => console.log("Registered background sync"))
            .catch(err => console.error("Error registering background sync", err));

  }
};

function registerNotification() {
  Notification.requestPermission(permission => {
    if (permission === 'granted') {
      registerBackgroundSync();
    } else
      console.error("Permission was not granted.");
  });
}

function registerBackgroundSync() {
  if (!navigator.serviceWorker) {
    return console.error("Service Worker not supported");
  }

  navigator.serviceWorker.ready
          .then(registration => registration.sync.register('syncAttendees'))
          .then(() => console.log("Registered background sync"))
          .catch(err => console.error("Error registering background sync", err));
}
