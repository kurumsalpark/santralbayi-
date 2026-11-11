import React, { useState } from 'react';
import { usePWAInstall } from './usePWAInstall';
import { Download, X } from 'lucide-react';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // If already installed and running standalone, hide the button
  if (isInstalled) {
    return null;
  }

  // Chromium / Android / Desktop flow
  if (isInstallable) {
    return (
      <button
         onClick={install}
         className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 border border-indigo-400/60 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-indigo-500/30 hover:from-indigo-500 hover:to-purple-500 active:scale-95 transition duration-200"
      >
        <span className="text-sm">📲</span>
        <span>Uygulamayı İndir (Ana Ekrana Ekle)</span>
      </button>
    );
  }

  // iOS Safari flow (beforeinstallprompt is not supported by WebKit)
  if (isIOS) {
    return (
      <>
        <button
          onClick={() => setShowIOSGuide(true)}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 border border-indigo-400/60 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-indigo-500/30 hover:from-indigo-500 hover:to-purple-500 active:scale-95 transition duration-200"
        >
          <span className="text-sm">📲</span>
          <span>iOS Kurulum Kılavuzu</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
            <div className="w-full max-w-sm rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl text-slate-100">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-md font-bold text-white flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-500/10 text-indigo-400"></span>
                  iPhone / iPad Kurulumu
                </h3>
                <button
                  onClick={() => setShowIOSGuide(false)}
                  className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="mt-4 space-y-3.5 text-sm text-slate-300">
                <p>Santral Bayi uygulamasını telefonunuzun ana ekranına eklemek için:</p>
                <div className="flex items-start gap-3 rounded-lg bg-slate-950/40 p-3 border border-slate-800/50">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-xs font-bold text-white">1</div>
                  <p>Safari tarayıcısının altındaki <strong className="text-white">"Paylaş" (Share)</strong> butonuna dokunun.</p>
                </div>
                <div className="flex items-start gap-3 rounded-lg bg-slate-950/40 p-3 border border-slate-800/50">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-xs font-bold text-white">2</div>
                  <p>Açılan menüyü aşağı kaydırıp <strong className="text-white">"Ana Ekrana Ekle" (Add to Home Screen)</strong> seçeneğine dokunun.</p>
                </div>
                <div className="flex items-start gap-3 rounded-lg bg-slate-950/40 p-3 border border-slate-800/50">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-xs font-bold text-white">3</div>
                  <p>Sağ üstteki <strong className="text-white">"Ekle" (Add)</strong> butonuna basarak kurulumu bitirin.</p>
                </div>
              </div>
              <button
                onClick={() => setShowIOSGuide(false)}
                className="mt-6 w-full rounded-xl bg-slate-800 py-2.5 text-sm font-semibold text-slate-200 hover:bg-slate-700 hover:text-white transition"
              >
                Anladım, Kapat
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  // Fallback for browsers/devices where we can't trigger native install and isn't iOS (shows beautiful manual guide)
  return (
    <>
      <button
        onClick={() => setShowIOSGuide(true)}
        className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-indigo-500/20 hover:from-indigo-600 hover:to-purple-700 hover:scale-102 transition duration-200"
      >
        <Download className="w-4 h-4 animate-bounce" />
        <span>Telefona Yükle</span>
      </button>

      {showIOSGuide && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl text-slate-100">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-md font-bold text-white flex items-center gap-2">
                Mobil Kurulum Kılavuzu
              </h3>
              <button
                onClick={() => setShowIOSGuide(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="mt-4 space-y-3 text-sm text-slate-300">
              <p>Santral Bayi uygulamasını telefonunuzda kullanmak için:</p>
              <div className="rounded-lg bg-slate-950/40 p-3 border border-slate-800/50 space-y-1.5">
                <p className="font-semibold text-white">Apple iOS (Safari):</p>
                <p className="text-xs">Safari Paylaş butonuna basıp "Ana Ekrana Ekle" seçeneğini kullanın.</p>
              </div>
              <div className="rounded-lg bg-slate-950/40 p-3 border border-slate-800/50 space-y-1.5">
                <p className="font-semibold text-white">Android (Chrome / Samsung):</p>
                <p className="text-xs">Tarayıcı adres çubuğundaki "Yükle" simgesine dokunun ya da sağ üstteki üç noktadan "Ana ekrana ekle"yi seçin.</p>
              </div>
            </div>
            <button
              onClick={() => setShowIOSGuide(false)}
              className="mt-6 w-full rounded-xl bg-slate-800 py-2.5 text-sm font-semibold text-slate-200 hover:bg-slate-700 hover:text-white transition"
            >
              Kapat
            </button>
          </div>
        </div>
      )}
    </>
  );
};
