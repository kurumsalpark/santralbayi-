/**
 * Santral Bayi Canlı Gemini Multimodal & Ses Karşılama Servisi
 * Türkçe anlama (STT), düşünme (LLM) ve Türkçe seslendirme (TTS) motoru.
 * Tüm Gemini API çağrıları sunucu tarafı (/api/gemini/generate) üzerinden yürütülür.
 */

export interface CallHandlingResult {
  transcript: { speaker: 'AI' | 'CALLER'; text: string }[];
  summary: string;
  extractedNotes: string;
  appointmentBooked?: string;
  priceQuoted?: string;
  transferRequested?: boolean;
  transferReason?: string;
}

async function callServerGemini(params: {
  prompt: string;
  systemInstruction?: string;
  responseMimeType?: string;
  timeoutMs?: number;
}): Promise<string> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), params.timeoutMs ?? 1800);
  try {
    const response = await fetch('/api/gemini/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
      signal: controller.signal,
    });
    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.error || `Server error: ${response.status}`);
    }
    const data = await response.json();
    return data.text || '';
  } finally {
    clearTimeout(timer);
  }
}

export class GeminiCallAssistantService {
  /**
   * Esnafın mobil hattına gelen çağrıyı Gemini ile analiz eder ve canlı yanıt üretir.
   */
  public async generateVoiceResponse(params: {
    callerSpeech: string;
    businessName: string;
    agentName: string;
    knowledgeBase: string;
    persuasionTone?: 'COURTEOUS' | 'PERSUASIVE' | 'SALES_FOCUSED';
    warmTransferEnabled?: boolean;
    callerName?: string;
  }): Promise<{ replyText: string; shouldTransfer: boolean; transferNotes?: string }> {
    try {
      const systemPrompt = `
Sen Türkiye'deki bir esnafın ("${params.businessName}") resmi telefon yapay zeka asistanısın.
Adın: ${params.agentName}
Diksiyonun: Son derece nazik, akıcı, güven veren ve kurumsal bir İstanbul Türkçesi.

ESNAF BİLGİ BANKASI / ÇALIŞMA ŞARTLARI:
${params.knowledgeBase || 'Detaylı bilgi için yetkiliye aktarabilirsiniz.'}

KURALLAR:
1. Kesinlikle robot gibi konuşma, canlı ve samimi bir sekreter gibi konuş.
2. Arayan yetkiliyle veya departmanla doğrudan görüşmek isterse, onu beklemeye alacağını söyle.
3. 0850'li numara veya dış hatlardan asla bahsetme; işletmenin doğrudan kendi mobil hattı üzerinden konuştuğunu bil.
4. Cümlen kısa, anlaşılır ve telefonda dinlemesi kolay olsun (maksimum 2-3 cümle).
`;

      const text = await callServerGemini({
        prompt: `${systemPrompt}\n\nArayan Müşteri Dedi Ki: "${params.callerSpeech}"\n\nNasıl cevap vermelisin? (Cevap metnini doğrudan ver):`,
      });

      const replyText = text.trim() || 'Sizi anladım, yetkilimize hemen iletiyorum.';
      const shouldTransfer = replyText.toLowerCase().includes('aktar') || 
                             params.callerSpeech.toLowerCase().includes('yetkili') || 
                             params.callerSpeech.toLowerCase().includes('görüşmek');

      return {
        replyText,
        shouldTransfer,
        transferNotes: shouldTransfer ? 'Arayan yetkiliyle görüşmek istedi.' : undefined
      };
    } catch (err) {
      console.error('Gemini Voice Assistant Error:', err);
      return {
        replyText: `Merhaba, ben ${params.businessName} dijital asistanı ${params.agentName}. Size nasıl yardımcı olabilirim?`,
        shouldTransfer: false
      };
    }
  }

  /**
   * Görüşme tamamlandığında görüşmenin özetini ve esnafa sunulacak notu çıkartır.
   */
  public async summarizeCall(params: {
    dialogue: { speaker: string; text: string }[];
    businessName: string;
  }): Promise<{ summary: string; extractedNotes: string; customerLeadQuality: 'HOT' | 'WARM' | 'INFO' }> {
    try {
      const formattedDialogue = params.dialogue
        .map(d => `${d.speaker === 'AI' ? 'Asistan' : 'Müşteri'}: ${d.text}`)
        .join('\n');

      const prompt = `
Aşağıdaki telefon görüşmesini analiz et ve esnaf için 1 satırlık Türkçe net özet ve esnafın aksiyon alması gereken notu JSON formatında çıkar:
İşletme: ${params.businessName}

Diyalog:
${formattedDialogue}

Çıktı Formatı SADECE geçerli JSON olmalıdır:
{
  "summary": "Özet cümle",
  "extractedNotes": "Esnaf için net not",
  "customerLeadQuality": "HOT" | "WARM" | "INFO"
}
`;

      const text = await callServerGemini({
        prompt,
        responseMimeType: 'application/json',
      });

      const parsed = JSON.parse(text || '{}');
      return {
        summary: parsed.summary || 'Çağrı tamamlandı.',
        extractedNotes: parsed.extractedNotes || 'Kayıt alındı.',
        customerLeadQuality: parsed.customerLeadQuality || 'WARM'
      };
    } catch (err) {
      return {
        summary: 'Çağrı kaydedildi.',
        extractedNotes: 'Görüşme detayları sistemde.',
        customerLeadQuality: 'INFO'
      };
    }
  }

  /**
   * WhatsApp Business AI Asistanı için gelen müşteri mesajını analiz edip
   * santral, randevu ve yetkili aktarımıyla uyumlu akıllı yanıt üretir.
   */
  public async generateWhatsAppResponse(params: {
    userMessage: string;
    businessName: string;
    contactName: string;
    catalogEnabled: boolean;
    bookingEnabled: boolean;
    transferEnabled: boolean;
    offHoursEnabled: boolean;
    workHours: string;
    address: string;
  }): Promise<{
    replyText: string;
    actionType: 'CATALOG' | 'BOOKING' | 'TRANSFER' | 'INFO';
    bookingDetails?: { service: string; time: string };
    transferDetails?: { contactName: string; reason: string };
  }> {
    const lower = params.userMessage.toLowerCase();

    // 1. Yetkili aktarma kontrolü
    if (lower.includes('kenan') || lower.includes('yetkili') || lower.includes('müdür') || lower.includes('bağla') || lower.includes('aktar')) {
      if (params.transferEnabled) {
        return {
          replyText: `Talebinizi aldım! Yetkili yöneticimiz ${params.contactName}'e "WhatsApp hattında sizinle görüşmek isteyen bir müşteri bekliyor" notuyla anlık bildirim iletildi. Dilerseniz hemen santral üzerinden canlı aktarma başlatabilirsiniz.`,
          actionType: 'TRANSFER',
          transferDetails: {
            contactName: params.contactName,
            reason: params.userMessage
          }
        };
      } else {
        return {
          replyText: 'Yetkiliye doğrudan aktarma modülü şu an kapalıdır. Acil konular için santral numaramızı doğrudan arayabilirsiniz.',
          actionType: 'INFO'
        };
      }
    }

    // 2. Randevu / Sipariş kontrolü
    if (lower.includes('randevu') || lower.includes('saat') || lower.includes('tarih') || lower.includes('yarın') || lower.includes('bugün') || lower.includes('sipariş')) {
      if (params.bookingEnabled) {
        const timeMatch = params.userMessage.match(/(\d{1,2}[:.]\d{2})/);
        const bookingTime = timeMatch ? `Saat ${timeMatch[1]}` : 'Yarın 14:30';
        return {
          replyText: `Harika! ${bookingTime} için randevu/sipariş talebiniz sistemimize işlendi ve işletme randevu ajandasına onaylandı olarak eklendi. Sizi bekliyor olacağız!`,
          actionType: 'BOOKING',
          bookingDetails: {
            service: lower.includes('sipariş') ? 'WhatsApp Ürün/Menü Siparişi' : 'WhatsApp Özel Randevu',
            time: bookingTime
          }
        };
      } else {
        return {
          replyText: 'WhatsApp üzerinden otomatik randevu ve sipariş kaydı modülü şu an kapalıdır. Kayıt için lütfen dükkanımızı doğrudan arayınız.',
          actionType: 'INFO'
        };
      }
    }

    // 3. Katalog / Fiyat listesi kontrolü
    if (lower.includes('katalog') || lower.includes('fiyat') || lower.includes('menü') || lower.includes('ücret') || lower.includes('liste')) {
      if (params.catalogEnabled) {
        return {
          replyText: `Tabii ki! Güncel fiyat listemiz ve dijital ürün kataloğumuz hazırlanmıştır. Aşağıdaki bağlantıdan anında inceleyebilir veya tek tıkla hızlı sipariş verebilirsiniz.`,
          actionType: 'CATALOG'
        };
      } else {
        return {
          replyText: 'Katalog paylaşım modülü şu anda kapalıdır. Güncel fiyat ve ürün bilgisi için lütfen dükkanımızı arayınız.',
          actionType: 'INFO'
        };
      }
    }

    // 4. Sunucu üzerinden Gemini AI yanıtı al
    try {
      const prompt = `
Sen "${params.businessName}" işletmesinin WhatsApp Business Yapay Zeka Asistanısın.
Yetkili: ${params.contactName}
Çalışma Saatleri: ${params.workHours}
Adres: ${params.address}
Katalog Durumu: ${params.catalogEnabled ? 'Açık' : 'Kapalı'}
Randevu Sistemi: ${params.bookingEnabled ? 'Açık' : 'Kapalı'}

Müşteri WhatsApp'tan şunu yazdı: "${params.userMessage}"

Müşteriye samimi, kurumsal, nazik ve kısa bir Türkçe WhatsApp yanıtı ver (maksimum 2-3 cümle):
`;
      const text = await callServerGemini({ prompt });
      const replyText = text.trim();
      if (replyText) {
        return {
          replyText,
          actionType: 'INFO'
        };
      }
    } catch (err) {
      console.error('Gemini WhatsApp response error:', err);
    }

    // 5. Varsayılan bilgi / mesai yanıtı
    if (params.offHoursEnabled) {
      return {
        replyText: `Merhaba! ${params.businessName} olarak çalışma saatlerimiz: ${params.workHours}. Adresimiz: ${params.address}. Katalog, randevu veya yetkili görüşmesi için buradayım.`,
        actionType: 'INFO'
      };
    }

    return {
      replyText: `Merhaba! Mesajınızı aldım. ${params.businessName} dijital müşteri temsilciniz olarak sorularınızı yanıtlayabilir, sipariş ve randevunuzu kaydedebilirim.`,
      actionType: 'INFO'
    };
  }

  /**
   * Uygulama içi Santral Bayi Robot Asistanı:
   * - Tüm uygulama kurallarını, ekranları, fiyatları ve komisyonları ezbere bilir.
   * - Kullanıcının mesajında bir arıza, şikayet, ödeme sorunu veya yönetici talebi varsa
   *   otomatik tespit eder (isEscalatedToAdmin = true) ve Genel Merkez Yönetici (TR.000)
   *   paneline anlık bildirim oluşturulmasını sağlar.
   */
  public async analyzeAndRespondSupport(params: {
    userMessage: string;
    currentRole: string;
    senderTitle: string;
    senderCode: string;
    senderPersonName: string;
    senderPhone: string;
    forceEscalate?: boolean;
  }): Promise<{
    replyText: string;
    isEscalatedToAdmin: boolean;
    issueCategory: string;
  }> {
    const q = params.userMessage.toLocaleLowerCase('tr-TR').trim();

    const problemKeywords = [
      'sorun',
      'arıza',
      'ariza',
      'çalışmıyor',
      'calismiyor',
      'hata',
      'şikayet',
      'sikayet',
      'ödeme',
      'odeme',
      'yatmadı',
      'yatmadi',
      'eksik',
      'aktivasyon',
      'aktif olmadı',
      'yönetici',
      'yonetici',
      'merkez',
      'yetkiliye bağla',
      'yetkiliyle görüş',
      'çözülmedi',
      'cozulmedi',
      'yardım edin',
      'acil',
      'iptal',
      'iade',
      'giremiyorum',
      'açılmıyor',
      'acilmiyor',
      'kilitlendi',
      'bildir',
      'destek talebi'
    ];

    const isProblemDetected =
      Boolean(params.forceEscalate) ||
      problemKeywords.some((kw) => q.includes(kw));

    let issueCategory = 'Genel Destek';
    if (q.includes('ödeme') || q.includes('para') || q.includes('komisyon') || q.includes('fatura') || q.includes('hakediş')) {
      issueCategory = 'Mali & Hakediş Sorunu';
    } else if (q.includes('hat') || q.includes('arama') || q.includes('çağrı') || q.includes('ses') || q.includes('aktar')) {
      issueCategory = 'Santral & Çağrı Teknik Arıza';
    } else if (q.includes('yetki') || q.includes('bayi') || q.includes('lisans') || q.includes('kod')) {
      issueCategory = 'Yetki & Lisans Talebi';
    } else if (isProblemDetected) {
      issueCategory = 'Acil Yönetici Bildirimi';
    }

    if (isProblemDetected) {
      return {
        isEscalatedToAdmin: true,
        issueCategory,
        replyText: `🚨 Sorununuz (${params.senderCode} - ${params.senderPhone}) Yönetici Paneline (TR.000) iletildi. En kısa sürede buradan yanıt verilecektir.`
      };
    }

    const answer = await this.generateAppSupportResponse(params.userMessage, params.currentRole);
    return {
      isEscalatedToAdmin: false,
      issueCategory: 'Bilgi & Eğitim',
      replyText: answer
    };
  }

  public async generateAppSupportResponse(
    userMessage: string,
    currentRole?: string
  ): Promise<string> {
    const role = (currentRole || 'esnaf') as 'admin' | 'iller_bayi' | 'il_bayi' | 'ilce_bayi' | 'esnaf';
    const q = userMessage.toLocaleLowerCase('tr-TR').trim();

    // 1. KARŞILAMA MESAJI (SADE VE KISA)
    if (q.includes('merhaba') || q.includes('selam') || q.includes('nasılsın') || q.includes('kimsin') || q.includes('iyi günler')) {
      if (role === 'esnaf') {
        return 'Merhaba! Kurulum, çağrı aktarma, randevu ve fişli muhasebe konularında size yardımcı olabilirim.';
      }
      if (role === 'ilce_bayi') {
        return 'Merhaba! Esnaf kaydı, %20 komisyonunuz ve bağlı olduğunuz İl Bayisi hakkında bilgi verebilirim.';
      }
      if (role === 'il_bayi') {
        return 'Merhaba! İlçe bayisi atama, %50 lisans primi ve %10 abone geliriniz hakkında yardımcı olabilirim.';
      }
      if (role === 'iller_bayi') {
        return 'Merhaba! 81 ilde İl Bayisi atama ve doluluk takibi konularında yardımcı olabilirim.';
      }
      return 'Merhaba Yönetici (TR.000)! Tüm bayi/abone sistemi ve gelen sorun bildirimleri hazırdır.';
    }

    // 2. PANELE ÖZEL YETKİ & GİZLİLİK KONTROLLERİ (KISA VE NET)
    if (role === 'esnaf') {
      if (
        q.includes('prim') ||
        q.includes('komisyon') ||
        q.includes('bayi kazanç') ||
        q.includes('bayi kâr') ||
        q.includes('yüzde kaç') ||
        q.includes('%20') ||
        q.includes('%10') ||
        q.includes('%50') ||
        q.includes('hakediş') ||
        q.includes('il bayisi') ||
        q.includes('ilçe bayisi') ||
        q.includes('lisans')
      ) {
        return '🔒 Bayilik prim ve komisyon bilgileri yalnızca yetkili bayilerimize özeldir.';
      }
      if (q.includes('bayi olmak') || q.includes('bayilik başvur') || q.includes('nasıl bayi')) {
        return 'Bayilik başvuruları Merkez / İl Bayi onayı ve lisans ödemesi ile yapılır.';
      }
      if (q.includes('fiyat') || q.includes('ücret') || q.includes('kaç para') || q.includes('dakika') || q.includes('paket')) {
        return 'Dakika ücreti yoktur; kendi cep numaranız üzerinden sabit aylık esnaf paketiyle sınırsız çalışır.';
      }
    }

    if (role === 'ilce_bayi') {
      if (q.includes('tr.001') || q.includes('iller bayisi') || q.includes('81 il') || q.includes('genel merkez kasa') || q.includes('merkez payı')) {
        return '🔒 İller Bayisi (TR.001) ve Genel Merkez (TR.000) verileri yalnızca üst yönetime özeldir.';
      }
      if (q.includes('il bilg') || q.includes('il bay') || q.includes('yükselt') || q.includes('terfi') || q.includes('geçiş') || q.includes('üst bayi')) {
        return '📍 İstanbul İl Bayisi (34.il.001) altındasınız. ₺500 fark ödeyerek ₺1.000 İl Bayiliğine yükselebilirsiniz.';
      }
      if (q.includes('fiyat') || q.includes('ücret') || q.includes('komisyon') || q.includes('kazanç') || q.includes('kâr') || q.includes('prim') || q.includes('lisans')) {
        return '💼 Kaydettiğiniz her esnaf abonesinden her ay düzenli %20 komisyon alırsınız.';
      }
      if (q.includes('yetki') || q.includes('abone yap') || q.includes('esnaf ekle') || q.includes('bayi aç')) {
        return '🏪 "Yetki & Ayarlar" menüsünden kendi ilçenizdeki esnafları abone yapabilirsiniz.';
      }
    }

    if (role === 'il_bayi') {
      if (q.includes('tr.001') || q.includes('iller bayisi kazanç') || q.includes('genel merkez kasa')) {
        return '🔒 İller Bayisi (TR.001) ve Genel Merkez (TR.000) verileri merkez yetkisine özeldir.';
      }
      if (q.includes('fiyat') || q.includes('ücret') || q.includes('komisyon') || q.includes('kazanç') || q.includes('kâr') || q.includes('prim') || q.includes('lisans')) {
        return '🏢 Yeni İlçe Bayisi lisansından %50 prim (₺250), alt esnaf abonelerinden her ay %10 pay alırsınız.';
      }
      if (q.includes('yetki') || q.includes('ilçe') || q.includes('bayi') || q.includes('dolu') || q.includes('esnaf')) {
        return '📍 "Yetki & Ayarlar" menüsünden ilinizdeki boş (⚪) ilçelere İlçe Bayisi atayabilirsiniz.';
      }
    }

    if (role === 'iller_bayi') {
      if (q.includes('yetki') || q.includes('il ') || q.includes('81') || q.includes('bayi') || q.includes('dolu') || q.includes('prim') || q.includes('kazanç')) {
        return '🇹🇷 81 ilde boş (⚪) olan illere ₺1.000 lisanslı İl Bayisi atayabilirsiniz; dolu (🟢) iller kilitlidir.';
      }
    }

    // 3. ORTAK MODÜLLER (TEK CÜMLE, SADE VE ÖZ)
    if (q.includes('0850') || q.includes('sabit hat') || q.includes('numara') || q.includes('hat')) {
      return '0850 hat yoktur; sistem doğrudan kendi 05XX cep numaranız üzerinden çalışır.';
    }
    if (q.includes('kurulum') || q.includes('nasıl kurulur') || q.includes('başla') || q.includes('nasıl çalışır') || q.includes('nedir')) {
      return '"🛠️ Kurulum" butonundan 4 kısa adımda santralinizi kendi cep numaranızda aktif edebilirsiniz.';
    }
    if (q.includes('muhasebe') || q.includes('fiş') || q.includes('fatura') || q.includes('gelir') || q.includes('gider') || q.includes('kasa') || q.includes('kdv')) {
      return '"💰 Muhasebe"de kamerayla fiş çektiğinizde KDV ve tutar otomatik okunup kasaya işlenir.';
    }
    if (q.includes('aktar') || q.includes('bağla') || q.includes('sekreter') || q.includes('asistan') || q.includes('çağrı') || q.includes('arama') || q.includes('beklet')) {
      return 'Asistan arayanı bekletir, önce size sorar; onaylarsanız bağlar, müsait değilseniz not bırakır.';
    }
    if (q.includes('randevu') || q.includes('sipariş') || q.includes('takvim')) {
      return 'Telefonla alınan tüm randevu ve siparişler "📅 Randevular" ekranına otomatik kaydedilir.';
    }
    if (q.includes('rozet') || q.includes('belge') || q.includes('sertifika') || q.includes('karekod')) {
      return '"🎖️ Rozet" menüsünden karekodlu resmi dijital yetki belgenizi görüntüleyebilirsiniz.';
    }
    if (q.includes('paylaş') || q.includes('tavsiye') || q.includes('arkadaş') || q.includes('indir') || q.includes('apk')) {
      return role === 'esnaf'
        ? 'Alt menüdeki paylaş butonundan uygulamayı esnaf arkadaşlarınızla paylaşabilirsiniz.'
        : 'Esnaf tavsiyesiyle gelen yeni aboneden ilgili İlçe Bayisi %20 komisyon alır.';
    }

    // 4. AÇIK UÇLU SORULAR İÇİN KISA SUNUCU AI (Maksimum 1 cümle)
    try {
      const roleBoundaryInstruction =
        role === 'esnaf'
          ? 'Kullanıcı Esnaf Abonesidir. Bayilik prim/komisyon bilgisi verme ("Bayilerimize özeldir" de).'
          : role === 'ilce_bayi'
          ? 'Kullanıcı İlçe Bayisidir (%20 esnaf komisyonu alır, İstanbul İl Bayisi 34.il.001 altındadır).'
          : role === 'il_bayi'
          ? 'Kullanıcı İl Bayisidir (%50 lisans primi ve %10 esnaf komisyonu alır).'
          : 'Kullanıcı Üst Kademe Yöneticidir.';

      const systemInstruction = `Sen "Santral Bayi" asistanısın. ${roleBoundaryInstruction} SADECE 1 KISA CÜMLE (en fazla 12 kelime) ile Türkçe cevap ver.`;
      const text = await callServerGemini({
        prompt: `${systemInstruction}\nSoru: "${userMessage}"\nCevap:`,
        timeoutMs: 1500,
      });
      const reply = text.trim();
      if (reply) return reply;
    } catch (_err) {
      // Hızlı yedek
    }

    return 'Kurulum, Santral, Muhasebe veya Yetki konularında sorunuzu kısaca yazabilirsiniz.';
  }

  private customAppliedVoiceUrl: string | null = null;

  /**
   * Yüklenen müşteri hizmetleri kadın sekreter ses profili
   * Yönetici panelinden yeni ses yüklendiğinde ve "Uygula" denildiğinde tüm APK'larda anında geçerli olur.
   */
  public readonly secretaryVoiceProfile = {
    referenceAudioUrl: '/assets/aistudio/M__teri_Hizmetleri_Ses_Kayd___1_-iyile_tirilmi_-v2_56b9a16a.mp3',
    get sampleAudioUrl(): string {
      if (typeof window !== 'undefined') {
        try {
          const savedUrl = window.localStorage.getItem('sb_global_secretary_voice_url_v1');
          if (savedUrl && savedUrl.trim()) {
            return savedUrl;
          }
        } catch {}
      }
      return '/assets/aistudio/sekreter_ornek_ses.mp3?v=natural3';
    },
    lang: 'tr-TR',
    femalePitch: 1.06,
    femaleRate: 0.98,
    malePitch: 0.88,
    maleRate: 0.98,
  };

  public setGlobalVoiceAudioUrl(url: string, fileName?: string): void {
    this.customAppliedVoiceUrl = url;
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem('sb_global_secretary_voice_url_v1', url);
        if (fileName) {
          window.localStorage.setItem('sb_global_secretary_voice_name_v1', fileName);
        }
      } catch {}
    }
  }

  /**
   * Robotik/sentetik ses motoru tamamen devre dışıdır.
   * Tüm dinleme alanlarında yalnızca yüklenen gerçek sekreter sesi çalar.
   */
  public async synthesizeSpeechAudio(_text: string, gender: 'FEMALE' | 'MALE' = 'FEMALE'): Promise<string | null> {
    if (gender === 'MALE') return null;
    return this.customAppliedVoiceUrl || this.secretaryVoiceProfile.sampleAudioUrl;
  }
}

export const geminiCallAssistant = new GeminiCallAssistantService();


