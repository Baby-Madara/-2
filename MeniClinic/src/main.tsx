import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Register Service Worker for PWA (Progressive Web App)
if ('serviceWorker' in navigator && typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/MeniClinic/sw.js')
      .then((reg) => {
        // Automatically check for SW updates
        reg.addEventListener('updatefound', () => {
          const installingWorker = reg.installing;
          if (installingWorker) {
            installingWorker.addEventListener('statechange', () => {
              if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
                console.log('MeniClinic PWA updated. Ready for reload.');
              }
            });
          }
        });
      })
      .catch((err) => {
        console.warn('MeniClinic SW registration failed:', err);
      });
  });
}

createRoot(document.getElementById('root')!).render(<App />);
