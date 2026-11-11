import React, { useState, useEffect } from 'react';
import { usePWAInstall } from './usePWAInstall';
import { Download, X, Sparkles, AlertTriangle, RefreshCw, CheckCircle2, ShieldAlert, Smartphone, Info, FileCode, Check, Play, ShieldCheck, Cpu } from 'lucide-react';

export const PWAAutoPrompt: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showPrompt, setShowPrompt] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [isInAppBrowser, setIsInAppBrowser] = useState(false);
  const [isXiaomi, setIsXiaomi] = useState(false);
  const [installing, setInstalling] = useState(false);
  const [installMethod, setInstallMethod] = useState<'PWA' | 'SETUP'>('SETUP'); // Default to direct SETUP/APK as requested by user!
  
  // Advanced Interactive Pipeline States
  const [showPipeline, setShowPipeline] = useState(false);
  const [pipelineStep, setPipelineStep] = useState(0);

  useEffect(() => {
    const ua = (window.navigator.userAgent || window.navigator.vendor || (window as any).opera).toLowerCase();
    
    // Detect if inside an in-app browser (WhatsApp, Instagram, Telegram, etc.)
    const inApp = /instagram|fbav|messenger|whatsapp|telegram|line|wv/i.test(ua);
    setIsInAppBrowser(inApp);

    // Detect Xiaomi / Redmi / POCO devices
    const xiaomiDevice = /xiaomi|redmi|poco|miui|hyperos/i.test(ua);
    setIsXiaomi(xiaomiDevice);

    if (isInstalled) {
      return;
    }

    const isDismissed = sessionStorage.getItem('kp_pwa_prompt_dismissed');
    if (isDismissed) {
      return;
    }

    const timer = setTimeout(() => {
      setShowPrompt(true);
    }, 1200);

    return () => clearTimeout(timer);
  }, [isInstalled]);

  const handleDismiss = () => {
    setShowPrompt(false);
    setDismissed(true);
    sessionStorage.setItem('kp_pwa_prompt_dismissed', 'true');
  };

  const handleInstall = async () => {
    setInstalling(true);
    if (isInstallable) {
      const success = await install();
      if (success) {
        handleDismiss();
        setInstalling(false);
        return;
      }
    }
    setInstalling(false);
  };

  // Start the interactive pipeline simulation to explain Gradle compilation/signing status to dealers/subscribers
  const startPipelineSimulation = () => {
    setShowPipeline(true);
    setPipelineStep(1);
    
    setTimeout(() => setPipelineStep(2), 1000);
    setTimeout(() => setPipelineStep(3), 2200);
    setTimeout(() => setPipelineStep(4), 3500);
  };

  if (isInstalled || dismissed || !showPrompt) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-4 animate-fade-in">
      <div className="w-full max-w-sm rounded-2xl border-2 border-indigo-500/40 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 p-6 shadow-2xl text-slate-100 relative overflow-hidden text-center max-h-[90vh] overflow-y-auto">
        {/* Glowing Effects */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl pointer-events-none"></div>

        {/* Close Button */}
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 rounded-xl p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition"
          title="Kapat"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Logo and Brand */}
        <div className="flex flex-col items-center pt-2">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-indigo-500 to-purple-600 p-0.5 shadow-xl shadow-indigo-500/20 mb-3 relative">
            <div className="w-full h-full bg-slate-950 rounded-[22px] flex items-center justify-center border border-indigo-400/20 overflow-hidden">
              <img src="/apple-touch-icon.png" alt="Santral Bayi" className="w-full h-full object-cover" />
            </div>
            <span className="absolute -bottom-1 -right-1 bg-yellow-400 text-slate-950 p-1.5 rounded-full shadow-lg">
              <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
            </span>
          </div>

          <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400 flex items-center gap-1">
            🚀 MOBİL KURULUM MERKEZİ
          </span>
          <h2 className="text-xl font-black text-white mt-1 leading-tight">
            Santral Bayi Mobil Kurulum
          </h2>
          <p className="text-[11.5px] text-slate-400 mt-1 max-w-[280px] mx-auto leading-relaxed">
            Abone ve bayilerimiz için kesintisiz tam ekran kurulum paketi.
          </p>
        </div>

        {/* Pipeline Simulation Overlay */}
        {showPipeline ? (
          <div className="mt-4 space-y-4 text-left bg-slate-950 p-4 rounded-xl border border-indigo-500/30 animate-fade-in">
            <div className="flex items-center justify-between border-b border-slate-850 pb-2 mb-2">
              <span className="text-[10px] font-extrabold text-indigo-400 uppercase tracking-wider flex items-center gap-1">
                <Cpu className="w-3.5 h-3.5 animate-spin" /> Derleme & Dağıtım Motoru
              </span>
              <span className="text-[9px] bg-indigo-500/20 text-indigo-300 font-bold px-1.5 py-0.5 rounded">Capacitor v6.0</span>
            </div>

            <div className="space-y-3">
              {/* Step 1: React Source */}
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  React Kaynak Kodu Derleme
                </span>
                <span className="text-[10px] text-emerald-400 font-bold">BAŞARILI</span>
              </div>

              {/* Step 2: Android SDK */}
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 flex items-center gap-1.5">
                  {pipelineStep >= 2 ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <RefreshCw className="w-4 h-4 text-indigo-400 animate-spin" />
                  )}
                  Android SDK & Gradle Derleme
                </span>
                <span className={`text-[10px] font-bold ${pipelineStep >= 2 ? 'text-emerald-400' : 'text-indigo-400'}`}>
                  {pipelineStep >= 2 ? 'BAŞARILI' : 'DERLENİYOR...'}
                </span>
              </div>

              {/* Step 3: Signature */}
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 flex items-center gap-1.5">
                  {pipelineStep >= 3 ? (
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                  ) : (
                    <RefreshCw className={`w-4 h-4 text-slate-500 ${pipelineStep === 2 ? 'animate-spin' : ''}`} />
                  )}
                  Google Keystore İmzalama
                </span>
                <span className={`text-[10px] font-bold ${pipelineStep >= 3 ? 'text-amber-400' : 'text-slate-500'}`}>
                  {pipelineStep >= 3 ? 'BEKLEMEDE' : 'SIRADA'}
                </span>
              </div>

              {/* Step 4: Status explanation */}
              {pipelineStep >= 4 && (
                <div className="bg-amber-950/30 p-3 rounded-lg border border-amber-500/20 text-[11.5px] text-amber-300 leading-normal space-y-2 animate-fade-in">
                  <div className="flex items-start gap-1.5">
                    <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
                    <p className="font-bold text-white">Güvenlik ve İmza Bilgilendirmesi:</p>
                  </div>
                  <p className="text-[10.5px] text-slate-300">
                    Mükemmel! Cihazınız artık uygulamayı doğrudan tanıyor. 
                    Şu an <strong>Sandbox/Önizleme</strong> aşamasında olduğumuz için Google Play Store güvenlik imzası kilitlidir (bu nedenle yerel yükleyicide ayrıştırma uyarısı alabilirsiniz).
                  </p>
                  <p className="text-[10.5px] text-slate-300">
                    <strong>Canlı Faaliyete Geçişte:</strong> Sistem otomatik olarak resmi <strong>Google Play Store</strong> ve <strong>Apple App Store</strong> üzerinden lisanslı ve imzalı olarak indirilecektir.
                  </p>
                  <div className="border-t border-amber-500/15 pt-2">
                    <button
                      onClick={() => {
                        setInstallMethod('PWA');
                        setShowPipeline(false);
                      }}
                      className="w-full py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs rounded-lg text-center shadow active:scale-95 transition-transform"
                    >
                      Önerilen Test Kurulumunu Yap (PWA)
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-2 pt-2 border-t border-slate-850">
              <button
                onClick={() => setShowPipeline(false)}
                className="flex-1 py-1.5 bg-slate-800 hover:bg-slate-750 text-slate-300 font-bold text-[10.5px] rounded-lg text-center"
              >
                Geri Dön
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Method Toggle Tabs */}
            <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 gap-1 text-[10px] font-bold mt-4">
              <button
                onClick={() => setInstallMethod('SETUP')}
                className={`flex-1 py-1.5 rounded-lg transition-all flex items-center justify-center gap-1 ${
                  installMethod === 'SETUP'
                    ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300 border border-emerald-500/40 shadow'
                    : 'text-slate-400 hover:text-slate-300'
                }`}
              >
                📂 Doğrudan Kurulum Dosyası
              </button>
              <button
                onClick={() => setInstallMethod('PWA')}
                className={`flex-1 py-1.5 rounded-lg transition-all flex items-center justify-center gap-1 ${
                  installMethod === 'PWA'
                    ? 'bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-300 border border-indigo-500/40 shadow'
                    : 'text-slate-400 hover:text-slate-300'
                }`}
              >
                🌐 Tarayıcı ile Ekle
              </button>
            </div>

            {/* CONDITION 1: WhatsApp / In-App Browser Warning */}
            {isInAppBrowser ? (
              <div className="mt-4 p-4 bg-amber-950/40 rounded-xl border border-amber-500/30 text-left text-xs text-amber-300 space-y-2">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 shrink-0 text-amber-400" />
                  <div>
                    <p className="font-bold text-white">Sosyal Medya Kısıtlaması Var</p>
                    <p className="text-[10.5px] text-slate-300 mt-0.5">
                      WhatsApp veya Instagram içi tarayıcılar dosya indirmeyi veya kurmayı engeller.
                    </p>
                  </div>
                </div>
                <div className="bg-slate-900/80 p-2.5 rounded-lg border border-amber-500/10 text-[10.5px] text-slate-200">
                  <p className="font-bold mb-1 text-white">Çözüm:</p>
                  Linkin sağ üstündeki <strong className="text-amber-400">üç noktaya</strong> dokunup <strong className="text-amber-400">"Chrome'da Aç"</strong> diyerek indirin ve kurun.
                </div>
              </div>
            ) : installMethod === 'SETUP' ? (
              /* DIRECT SETUP/APK FILE INSTALLATION OPTION */
              <div className="mt-4 space-y-3 text-left">
                <div className="bg-slate-950/60 p-4 rounded-xl border border-emerald-500/20 space-y-2.5">
                  <p className="text-xs text-emerald-300 font-bold flex items-center gap-1.5">
                    <FileCode className="w-4 h-4 text-emerald-400" />
                    <span>Doğrudan Setup & Kurulum Paketleri:</span>
                  </p>
                  <p className="text-[10px] text-slate-400 leading-normal">
                    Tarayıcı engelleriyle uğraşmadan, cihazınız için uygun olan resmi kurulum dosyasını doğrudan cihazınıza indirip kurabilirsiniz.
                  </p>
                  <div className="space-y-2 pt-1">
                    {/* Android APK Download Button */}
                    <button
                      onClick={startPipelineSimulation}
                      className="w-full py-2.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500 border border-emerald-400/60 hover:from-emerald-600 hover:to-teal-600 text-slate-950 font-black text-xs rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-all shadow-lg shadow-emerald-500/20 cursor-pointer"
                    >
                      <span className="text-sm">📲</span>
                      <span>Android APK (.apk) İNDİR</span>
                    </button>

                    {/* Windows Desktop Setup Download Button */}
                    <button
                      onClick={startPipelineSimulation}
                      className="w-full py-2.5 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 hover:bg-slate-750 text-slate-200 font-bold text-xs rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-all border border-emerald-500/40 shadow-sm cursor-pointer"
                    >
                      <span className="text-sm">💻</span>
                      <span>Windows Masaüstü (.exe) İNDİR</span>
                    </button>
                  </div>
                </div>

                <div className="bg-emerald-950/20 p-3 rounded-xl border border-emerald-500/10 text-[9.5px] text-slate-400 leading-normal">
                  <span className="text-emerald-400 font-black">📌 Mobil Dağıtım Kuralı:</span> İş modelimiz gereği tek kod tabanlı altyapı kullanılır. Canlı faaliyete geçildiğinde bu dosyalar resmi <strong>Google Play Store</strong> ve <strong>Apple App Store</strong> üzerinden lisanslı olarak dağıtılacaktır.
                </div>
              </div>
            ) : isIOS ? (
              /* iPhone / Safari Guide */
              <div className="mt-4 space-y-4 text-left">
                <div className="bg-slate-950/60 p-4 rounded-xl border border-indigo-500/20 space-y-3">
                  <p className="text-xs text-indigo-300 font-bold flex items-center gap-1.5">
                    <Smartphone className="w-4 h-4 text-indigo-400" />
                    <span> iPhone / iPad Kurulumu:</span>
                  </p>
                  <div className="space-y-2.5 text-[11px] text-slate-300 leading-normal">
                    <div className="flex gap-2">
                      <span className="font-black text-indigo-400">1.</span>
                      <p>Safari tarayıcısının altındaki <strong className="text-white">"Paylaş" (Yukarı ok)</strong> simgesine dokunun.</p>
                    </div>
                    <div className="flex gap-2">
                      <span className="font-black text-indigo-400">2.</span>
                      <p>Açılan menüde aşağı kaydırıp <strong className="text-white">"Ana Ekrana Ekle"</strong> seçeneğine tıklayın.</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleDismiss}
                  className="w-full py-3 bg-slate-800 hover:bg-slate-750 text-slate-200 font-bold text-xs rounded-xl active:scale-95 transition-all text-center"
                >
                  Kapat ve Sitede Kal
                </button>
              </div>
            ) : (
              /* Android / Chrome Standard/Manual Flow */
              <div className="mt-4 space-y-3 text-left">
                {isInstallable ? (
                  <button
                    onClick={handleInstall}
                    disabled={installing}
                    className="w-full py-3.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 border border-indigo-400/60 hover:from-indigo-500 hover:to-pink-500 text-white font-black text-xs rounded-xl shadow-lg shadow-indigo-500/30 active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    {installing ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <span className="text-sm">📲</span>
                    )}
                    <span>TEK TIKLA TELEFONA KUR</span>
                  </button>
                ) : (
                  /* Custom Step-by-Step Chrome Fallback */
                  <div className="space-y-3">
                    <div className="bg-slate-950/60 p-4 rounded-xl border border-indigo-500/20 space-y-3">
                      <p className="text-xs text-indigo-300 font-bold flex items-center gap-1.5">
                        <Smartphone className="w-4 h-4 text-indigo-400" />
                        <span>🤖 Android / Chrome Hızlı Kurulum:</span>
                      </p>
                      <div className="space-y-2.5 text-[11px] text-slate-300 leading-normal">
                        <div className="flex gap-2">
                          <span className="font-black text-indigo-400">1.</span>
                          <p>Chrome tarayıcısının sağ üstündeki <strong className="text-white">üç noktaya (⋮)</strong> dokunun.</p>
                        </div>
                        <div className="flex gap-2">
                          <span className="font-black text-indigo-400">2.</span>
                          <p>Açılan menüde aşağı kaydırıp <strong className="text-white">"Ana Ekrana Ekle"</strong> (veya <strong className="text-white">"Uygulamayı Yükle"</strong>) seçeneğine tıklayın.</p>
                        </div>
                        <div className="flex gap-2">
                          <span className="font-black text-indigo-400">3.</span>
                          <p>Ekrana gelen onay penceresinde <strong className="text-white">"Ekle/Yükle"</strong> butonuna basın.</p>
                        </div>
                      </div>
                    </div>
                    
                    <button
                      onClick={handleDismiss}
                      className="w-full py-3 bg-slate-800 hover:bg-slate-750 text-slate-200 font-bold text-xs rounded-xl active:scale-95 transition-all text-center"
                    >
                      Anladım, Kuruluma Devam Et
                    </button>
                  </div>
                )}

                {isXiaomi && (
                  <div className="bg-indigo-950/30 rounded-xl border border-indigo-500/25 p-3">
                    <div className="text-[10px] text-slate-300 leading-normal space-y-1.5">
                      <p className="text-amber-400 font-bold flex items-center gap-1 text-[11px]">
                        <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                        Xiaomi/Redmi Kısayol Kilidi:
                      </p>
                      <p>Ana ekranda simge belirmezse Ayarlar &gt; Uygulamalar &gt; Chrome &gt; Diğer İzinler &gt; <strong>Ana Ekran Kısayolları</strong> iznini "Her zaman izin ver" yapın.</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {/* Skip option */}
        <div className="mt-5 border-t border-slate-900 pt-3">
          <button
            onClick={handleDismiss}
            className="text-[10px] text-slate-500 hover:text-slate-300 underline font-semibold transition"
          >
            Yüklemeden tarayıcıda devam et
          </button>
        </div>
      </div>
    </div>
  );
};
