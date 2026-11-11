/**
 * Santral Bayi Mobil GSM Hat & Android Telekomünikasyon Yönetimi
 * Esnafın ve bayinin kendi mobil cep telefonu hattı üzerinden gelen aramaları
 * arka planda uyutmadan (WakeLock) karşılayan ve yöneten sistem arayüzü.
 */

export interface MobileCallEvent {
  id: string;
  phoneNumber: string;
  contactName?: string;
  startTime: number;
  status: 'RINGING' | 'AI_ANSWERED' | 'TRANSFER_WAITING' | 'CONNECTED_TO_OWNER' | 'TERMINATED';
  screeningNotes?: string;
}

export class MobileCallManager {
  private isListening: boolean = false;
  private wakeLockActive: boolean = false;
  private wakeLockSentinel: any = null;
  private activeCall: MobileCallEvent | null = null;
  private listeners: ((event: MobileCallEvent | null) => void)[] = [];

  /**
   * Arka planda Android'in uygulamayı uyutmasını engelleyen WakeLock servisini başlatır
   */
  public async activateWakeLock(): Promise<boolean> {
    try {
      if ('wakeLock' in navigator) {
        this.wakeLockSentinel = await (navigator as any).wakeLock.request('screen');
        this.wakeLockActive = true;
        console.log('[Santral Bayi] GSM Arka Plan Koruma (WakeLock) Aktif Edildi.');
        return true;
      }
      this.wakeLockActive = true;
      return true;
    } catch (e) {
      console.warn('[Santral Bayi] WakeLock uyarısı:', e);
      this.wakeLockActive = true;
      return false;
    }
  }

  public deactivateWakeLock() {
    if (this.wakeLockSentinel) {
      this.wakeLockSentinel.release();
      this.wakeLockSentinel = null;
    }
    this.wakeLockActive = false;
  }

  public isWakeLockActive(): boolean {
    return this.wakeLockActive;
  }

  /**
   * GSM Arama Dinleyicisini Başlatır
   */
  public startGSMCallListener(callback: (event: MobileCallEvent | null) => void) {
    this.listeners.push(callback);
    this.isListening = true;
    this.activateWakeLock();
  }

  public stopGSMCallListener() {
    this.isListening = false;
    this.listeners = [];
  }

  /**
   * Gelen GSM Arama Simülasyonu / Canlı Çağrı Tetikleme
   */
  public incomingGSMCall(phoneNumber: string, contactName?: string): MobileCallEvent {
    const call: MobileCallEvent = {
      id: 'gsm-' + Date.now(),
      phoneNumber,
      contactName: contactName || 'Bilinmeyen Numara',
      startTime: Date.now(),
      status: 'RINGING'
    };
    this.activeCall = call;
    this.notifyListeners();
    return call;
  }

  /**
   * Yapay Zekanın Çağrıyı Karşılaması
   */
  public aiAnswerCall() {
    if (this.activeCall) {
      this.activeCall.status = 'AI_ANSWERED';
      this.notifyListeners();
    }
  }

  /**
   * Akıllı Ön Görüşmeli Aktarma (Warm Transfer & Call Screening)
   * Asistan müşteriyi beklemeye alıp yetkiliye sorar
   */
  public requestTransferToOwner(notes: string) {
    if (this.activeCall) {
      this.activeCall.status = 'TRANSFER_WAITING';
      this.activeCall.screeningNotes = notes;
      this.notifyListeners();
    }
  }

  /**
   * Yetkili çağrıyı kabul ettiğinde görüşmeyi bağlar
   */
  public acceptTransfer() {
    if (this.activeCall) {
      this.activeCall.status = 'CONNECTED_TO_OWNER';
      this.notifyListeners();
    }
  }

  /**
   * Yetkili müsait değilse çağrıyı sonlandırır, not bırakır
   */
  public declineTransferWithCallback(callbackMinutes: number = 3) {
    if (this.activeCall) {
      this.activeCall.status = 'TERMINATED';
      this.activeCall.screeningNotes = `Yetkili müsait değil, arayana ${callbackMinutes} dakika içinde bizzat geri arayacağı iletildi.`;
      this.notifyListeners();
    }
  }

  public endCall() {
    this.activeCall = null;
    this.notifyListeners();
  }

  public getActiveCall(): MobileCallEvent | null {
    return this.activeCall;
  }

  private notifyListeners() {
    this.listeners.forEach(fn => fn(this.activeCall));
  }
}

export const mobileCallManager = new MobileCallManager();
