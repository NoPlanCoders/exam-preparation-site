import { initApp } from './app.js';

initApp();

if (
  'serviceWorker' in navigator &&
  location.hostname !== 'localhost' &&
  location.hostname !== '127.0.0.1'
) {
  navigator.serviceWorker.register('./sw.js').catch(() => {
    // The app remains usable when service workers are unavailable.
  });
}
