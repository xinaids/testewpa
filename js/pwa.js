window.onload = async () => {
  const registration = await navigator.serviceWorker.register('./sw.js');
};
