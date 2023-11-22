window.onload = () => {
  'use strict';
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js');
    navigator.serviceWorker.ready
            .then(registration => registration.sync.register('syncAttendees'))
            .then(() => console.log("Registered background sync"))
            .catch(err => console.error("Error registering background sync", err));

  }
  /*
   window.setInterval(function () {
   notificar("Titulo", "Mensagem", "#");
   }, 50000);*/
};
/*
 function notificar(titulo, msg, link) {
 Notification.requestPermission(function () {
 var notification = new Notification(titulo, {
 icon: 'https://cinco.cotriba.com.br/favicon.png',
 body: msg
 });
 
 notification.onclick = function () {
 window.open(link);
 };
 });
 }
 */

function installApp() {
  // Show the prompt
  deferredPrompt.prompt();
  setupButton.disabled = true;
  // Wait for the user to respond to the prompt
  deferredPrompt.userChoice
          .then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
              console.log('PWA setup accepted');
              // hide our user interface that shows our A2HS button
              setupButton.style.display = 'none';
            } else {
              console.log('PWA setup rejected');
            }
            deferredPrompt = null;
          });
}

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
