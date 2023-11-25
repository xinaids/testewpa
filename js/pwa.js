
window.onload = async () => {
  if ('serviceWorker' in navigator) {
    const rgSW = await navigator.serviceWorker.register('./sw.js');
    rgSW.ready
        .then(registration => registration.sync.register('syncAttendees'))
        .then(() => console.log("Registered background sync"))
        .catch(err => console.error("Error registering background sync", err));
  }
};
