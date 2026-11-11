import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Capacitor, SystemBars, SystemBarsStyle } from '@capacitor/core';
import App from './App.tsx';
import './index.css';

declare const __APP_BUILD_TIMESTAMP__: number;

const LIVE_OTA_BASE_URL = 'https://kurumsalpark.github.io/santralbayi-/';

// Canlı OTA Güncelleme Aktarımı: Cihazdaki giriş oturumunu koruyarak en güncel sürümü açar
try {
  const urlObj = new URL(window.location.href);
  const incomingSession = urlObj.searchParams.get('sb_ota_session');
  if (incomingSession) {
    if (!localStorage.getItem('sb_active_auth_session_v1')) {
      localStorage.setItem('sb_active_auth_session_v1', decodeURIComponent(incomingSession));
    }
    urlObj.searchParams.delete('sb_ota_session');
    window.history.replaceState({}, '', urlObj.toString());
  }
} catch {}

const checkAndApplyLiveUpdate = () => {
  const currentBuildTime = typeof __APP_BUILD_TIMESTAMP__ === 'number' ? __APP_BUILD_TIMESTAMP__ : 0;
  fetch(`${LIVE_OTA_BASE_URL}build-meta.json?t=${Date.now()}`, { cache: 'no-store' })
    .then((res) => (res.ok ? res.json() : null))
    .then((meta) => {
      if (meta && typeof meta.buildTime === 'number' && meta.buildTime > currentBuildTime + 5000) {
        const savedSession = localStorage.getItem('sb_active_auth_session_v1');
        const sessionParam = savedSession
          ? `&sb_ota_session=${encodeURIComponent(savedSession)}`
          : '';
        window.location.replace(`${LIVE_OTA_BASE_URL}?v=${meta.buildTime}${sessionParam}`);
      }
    })
    .catch(() => {
      // Çevrimdışı veya henüz canlı sunucu aktif değilse mevcut sürüm kesintisiz çalışır
    });
};

if (Capacitor.isNativePlatform()) {
  SystemBars.setStyle({ style: SystemBarsStyle.Dark }).catch(() => {});
  SystemBars.show().catch(() => {});

  checkAndApplyLiveUpdate();
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      SystemBars.setStyle({ style: SystemBarsStyle.Dark }).catch(() => {});
      checkAndApplyLiveUpdate();
    }
  });
}

const rootEl = document.getElementById('root');
if (rootEl) {
  createRoot(rootEl).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
