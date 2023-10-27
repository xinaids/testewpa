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
