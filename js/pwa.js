window.onload = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js');
    navigator.serviceWorker.ready
          .then(registration => registration.sync.register('syncAttendees'))
          .then(() => console.log("Registered background sync"))
          .catch(err => console.error("Error registering background sync", err));

  }
};
