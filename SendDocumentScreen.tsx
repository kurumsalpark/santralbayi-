import React, { useState, useMemo, useEffect } from 'react';
import {
  FileText,
  Receipt,
  Wrench,
  Plus,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  Camera,
  Building2,
  Check,
  Search,
  X
} from 'lucide-react';
import { Subscriber, Dealer } from './types';

export type DocType = 'FIS' | 'SERVIS' | 'FATURA';

export interface DocumentItem {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  vatRate: number;
}

interface SendDocumentScreenProps {
  onClose: () => void;
  activeRole: string;
  setupOrigin: string;
  setupProfession: string;
  subscribers: Subscriber[];
  dealers: Dealer[];
  activeSubscriberId?: string;
  activeDealerId?: string;
  onShowToast: (msg: string, type?: 'success' | 'error') => void;
}

interface ProfessionDocConfig {
  defaultTab: DocType;
  customerLabel: string;
  customerPlaceholder: string;
  fisSubtitle: string;
  servisSubtitle: string;
  faturaSubtitle: string;
  field1Label: string;
  field1Placeholder: string;
  field2Label: string;
  field2Placeholder: string;
  field3Label: string;
  field3Placeholder: string;
  complaintLabel: string;
  complaintPlaceholder: string;
  actionLabel: string;
  actionPlaceholder: string;
  specialistLabel: string;
  specialistPlaceholder: string;
  itemPlaceholder: string;
  presets: Array<{ name: string; price: number }>;
}

export const getProfessionDocConfig = (profession: string): ProfessionDocConfig => {
  const p = (profession || '').toLocaleLowerCase('tr-TR');

  // 1. Eczane
  if (p.includes('eczac') || p.includes('eczane')) {
    return {
      defaultTab: 'FIS',
      customerLabel: '👤 Hasta / Müşteri Adı',
      customerPlaceholder: 'Örn: Ayşe Demir',
      fisSubtitle: 'İlaç, Dermokozmetik & Medikal Tahsilat Makbuzu',
      servisSubtitle: 'Majistral İlaç & Medikal Cihaz Teslim Fişi',
      faturaSubtitle: 'Eczane Kurumsal E-Arşiv Fatura',
      field1Label: 'Ürün / Cihaz Türü',
      field1Placeholder: 'Tansiyon Aleti / Majistral',
      field2Label: 'Marka / Reçete Tipi',
      field2Placeholder: 'Omron / Renkli Reçete',
      field3Label: 'Reçete / Takip No',
      field3Placeholder: 'RÇT-2026-104',
      complaintLabel: 'Hasta Notu / İstek',
      complaintPlaceholder: 'Örn: Cihaz kalibrasyonu / Özel karışım',
      actionLabel: 'Hazırlanan Ürün / Teslim',
      actionPlaceholder: 'Örn: Majistral krem hazırlandı',
      specialistLabel: 'Sorumlu Eczacı / Kalfa',
      specialistPlaceholder: 'Ecz. Selin Hanım',
      itemPlaceholder: 'Örn: Reçete Katılım Payı, Vitamin, Dermokozmetik',
      presets: [
        { name: 'Reçete & İlaç Fark Ücreti', price: 250 },
        { name: 'Dermokozmetik Cilt Bakım Ürünü', price: 850 },
        { name: 'Vitamin & Takviye Paketi', price: 600 },
        { name: 'Medikal Ürün / Cihaz', price: 1200 }
      ]
    };
  }

  // 2. Diş Hekimi
  if (p.includes('diş')) {
    return {
      defaultTab: 'FIS',
      customerLabel: '👤 Hasta Adı Soyadı',
      customerPlaceholder: 'Örn: Mehmet Kaya',
      fisSubtitle: 'Diş Tedavi & Klinik Tahsilat Makbuzu',
      servisSubtitle: 'Diş Tedavi, Protez & İmplant İşlem Fişi',
      faturaSubtitle: 'Ağız ve Diş Sağlığı Kurumsal Fatura',
      field1Label: 'İlgili Diş / Bölge',
      field1Placeholder: 'Üst Çene / 16-26 No Diş',
      field2Label: 'İşlem / Protez Türü',
      field2Placeholder: 'Zirkonyum / İmplant',
      field3Label: 'Hasta Protokol No',
      field3Placeholder: 'DT-4092',
      complaintLabel: 'Hasta Şikayeti / Teşhis',
      complaintPlaceholder: 'Örn: Sıcak-soğuk hassasiyeti, kırık diş',
      actionLabel: 'Uygulanan Diş Tedavisi',
      actionPlaceholder: 'Örn: Kanal tedavisi ve kompozit dolgu',
      specialistLabel: 'Diş Hekimi',
      specialistPlaceholder: 'Dt. Burak Bey',
      itemPlaceholder: 'Örn: İmplant, Zirkonyum Kaplama, Kanal Tedavisi',
      presets: [
        { name: 'Diş Muayene & Panoramik Röntgen', price: 750 },
        { name: 'Kompozit Diş Dolgusu', price: 1800 },
        { name: 'Kanal Tedavisi & Restorasyon', price: 3200 },
        { name: 'Diş Taşı Temizliği (Detartraj)', price: 1500 },
        { name: 'İmplant Uygulaması (Tek Diş)', price: 12500 }
      ]
    };
  }

  // 3. Veteriner & Pet
  if (p.includes('veteriner') || p.includes('pet')) {
    return {
      defaultTab: 'FIS',
      customerLabel: '👤 Hasta Sahibi & Pet Adı',
      customerPlaceholder: 'Örn: Canan Yılmaz (Pamuk - Kedi)',
      fisSubtitle: 'Veteriner Klinik & Pet Tahsilat Makbuzu',
      servisSubtitle: 'Pet Muayene, Aşı & Bakım Takip Fişi',
      faturaSubtitle: 'Veteriner Kliniği Kurumsal Fatura',
      field1Label: 'Evcil Hayvan Türü / Irkı',
      field1Placeholder: 'Kedi (Tekir) / Köpek',
      field2Label: 'Pet Adı / Yaş',
      field2Placeholder: 'Pamuk - 2 Yaş',
      field3Label: 'Çip / Karne No',
      field3Placeholder: 'TR-90012834',
      complaintLabel: 'Klinik Bulgular / Talep',
      complaintPlaceholder: 'Örn: Periyodik aşı, iştahsızlık, tıraş',
      actionLabel: 'Yapılan Muayene & Uygulama',
      actionPlaceholder: 'Örn: Karma aşı + iç dış parazit uygulandı',
      specialistLabel: 'Veteriner Hekim',
      specialistPlaceholder: 'Vet. Hekim Emre Bey',
      itemPlaceholder: 'Örn: Karma Aşı, İç-Dış Parazit, Pet Kuaför',
      presets: [
        { name: 'Genel Veteriner Muayene', price: 700 },
        { name: 'Karma / Kuduz Aşı Uygulaması', price: 950 },
        { name: 'İç & Dış Parazit Uygulaması', price: 800 },
        { name: 'Pet Kuaför & Makas Tıraşı', price: 1100 }
      ]
    };
  }

  // 4. Doktor / Klinik / Psikolog / Diyetisyen / Fizyoterapi
  if (
    p.includes('doktor') || p.includes('klinik') || p.includes('psikolog') ||
    p.includes('diyetisyen') || p.includes('fizyoterapi')
  ) {
    return {
      defaultTab: 'FIS',
      customerLabel: '👤 Hasta / Danışan Adı Soyadı',
      customerPlaceholder: 'Örn: Zeynep Aksoy',
      fisSubtitle: 'Klinik Muayene & Danışmanlık Tahsilat Makbuzu',
      servisSubtitle: 'Seans, Terapi & Muayene Takip Fişi',
      faturaSubtitle: 'Sağlık & Danışmanlık Kurumsal Fatura',
      field1Label: 'Seans / Poliklinik Türü',
      field1Placeholder: 'Uzman Muayene / Seans',
      field2Label: 'Paket / Seans Sayısı',
      field2Placeholder: '1. Seans / 8 Seans Paket',
      field3Label: 'Dosya / Kayıt No',
      field3Placeholder: 'KLN-2026-88',
      complaintLabel: 'Danışan Notu / Ön Değerlendirme',
      complaintPlaceholder: 'Örn: Bel-boyun ağrısı / Beslenme programı',
      actionLabel: 'Uygulanan Seans / Program',
      actionPlaceholder: 'Örn: 45 dk terapi seansı tamamlandı',
      specialistLabel: 'Uzman / Doktor',
      specialistPlaceholder: 'Uzm. Dr. / Terapist',
      itemPlaceholder: 'Örn: Uzman Muayene, Terapi Seansı, Kontrol',
      presets: [
        { name: 'Uzman Muayene & Değerlendirme', price: 1500 },
        { name: 'Bireysel Terapi / Danışmanlık Seansı', price: 1800 },
        { name: 'Aylık Takip & Kontrol Paketi', price: 4500 },
        { name: 'Manuel Terapi / Uygulama Seansı', price: 1600 }
      ]
    };
  }

  // 5. Kuaför / Berber / Tırnak / Lazer / Spa
  if (
    p.includes('kuaför') || p.includes('berber') || p.includes('tırnak') ||
    p.includes('lazer') || p.includes('estetik') || p.includes('spa') || p.includes('masaj')
  ) {
    return {
      defaultTab: 'FIS',
      customerLabel: '👤 Müşteri Adı Soyadı',
      customerPlaceholder: 'Örn: Elif Yıldız',
      fisSubtitle: 'Güzellik, Bakım & Kuaför Tahsilat Makbuzu',
      servisSubtitle: 'Seans, Uygulama & Bakım Takip Fişi',
      faturaSubtitle: 'Güzellik & Bakım Merkezi Kurumsal Fatura',
      field1Label: 'Uygulama Bölgesi / Hizmet',
      field1Placeholder: 'Saç / Cilt / Lazer / Tırnak',
      field2Label: 'Kullanılan Ürün / Paket',
      field2Placeholder: 'Keratin / 6 Seans Paket',
      field3Label: 'Müşteri Kart No',
      field3Placeholder: 'GZL-502',
      complaintLabel: 'Müşteri Talebi / İstek',
      complaintPlaceholder: 'Örn: Ombre renklendirme, protez tırnak',
      actionLabel: 'Yapılan İşlem & Bakım',
      actionPlaceholder: 'Örn: Kesim, renklendirme ve keratin bakım',
      specialistLabel: 'Uzman / Stilist',
      specialistPlaceholder: 'Usta / Estetisyen',
      itemPlaceholder: 'Örn: Saç Kesim, Boya, Protez Tırnak, Lazer Seansı',
      presets: [
        { name: 'Saç Kesim & Şekillendirme', price: 650 },
        { name: 'Saç Boyama / Ombre & Bakım', price: 2400 },
        { name: 'Protez Tırnak & Kalıcı Oje', price: 1100 },
        { name: 'Lazer Epilasyon / Cilt Bakım Seansı', price: 1500 }
      ]
    };
  }

  // 6. Oto Tamir / Yıkama / Ekspertiz / Rent a Car / Lastik / Cam
  if (
    p.includes('oto') || p.includes('rent a car') || p.includes('lastik') ||
    p.includes('ekspertiz') || p.includes('mekanik') || p.includes('detailing')
  ) {
    return {
      defaultTab: 'SERVIS',
      customerLabel: '👤 Araç Sahibi / Müşteri Adı',
      customerPlaceholder: 'Örn: Hasan Çelik',
      fisSubtitle: 'Otomotiv Hizmet & Tahsilat Makbuzu',
      servisSubtitle: 'Araç Kabul, Bakım & Servis İş Emri Fişi',
      faturaSubtitle: 'Otomotiv & Servis Kurumsal Fatura',
      field1Label: 'Araç Marka / Model',
      field1Placeholder: 'Örn: VW Passat / Renault Megane',
      field2Label: 'Kilometre / Yakıt',
      field2Placeholder: '142.000 KM / Dizel',
      field3Label: 'Araç Plakası',
      field3Placeholder: '34 ABC 123',
      complaintLabel: 'Araç Şikayeti / Talep Edilen İşlem',
      complaintPlaceholder: 'Örn: Periyodik bakım, fren sesi, detaylı temizlik',
      actionLabel: 'Yapılan İşlem & Değişen Parçalar',
      actionPlaceholder: 'Örn: Yağ + filtre değişimi, ön balata yenilendi',
      specialistLabel: 'Sorumlu Usta / Eksper',
      specialistPlaceholder: 'Başusta Murat',
      itemPlaceholder: 'Örn: Periyodik Bakım, Fren Balatası, Ekspertiz, Oto Yıkama',
      presets: [
        { name: 'Periyodik Motor Yağ & Filtre Bakımı', price: 3800 },
        { name: 'Fren Balata & Disk Bakımı', price: 2600 },
        { name: 'Full Oto Ekspertiz / Detaylı Kontrol', price: 2500 },
        { name: 'Detaylı İç-Dış Temizlik & Seramik', price: 1800 },
        { name: 'Lastik Değişimi & Rot Balans Ayarı', price: 1200 }
      ]
    };
  }

  // 7. Kombi / Klima / Beyaz Eşya / Telefon / Bilgisayar / Kamera / Elektrik / Su Tesisat / Çilingir / Halı Yıkama
  if (
    p.includes('klima') || p.includes('kombi') || p.includes('beyaz eşya') ||
    p.includes('telefon') || p.includes('bilgisayar') || p.includes('kamera') ||
    p.includes('elektrik') || p.includes('tesisat') || p.includes('çilingir') ||
    p.includes('halı') || p.includes('servis') || p.includes('tamir')
  ) {
    return {
      defaultTab: 'SERVIS',
      customerLabel: '👤 Müşteri Adı Soyadı',
      customerPlaceholder: 'Örn: Mustafa Öztürk',
      fisSubtitle: 'Teknik Servis & İşçilik Tahsilat Makbuzu',
      servisSubtitle: 'Teknik Servis, Arıza & Teslim Tutanağı',
      faturaSubtitle: 'Teknik Servis & Mühendislik Kurumsal Fatura',
      field1Label: 'Cihaz / Ürün Türü',
      field1Placeholder: 'Kombi / Klima / Telefon / Tesisat',
      field2Label: 'Marka / Model',
      field2Placeholder: 'Örn: Vaillant / Arçelik / iPhone',
      field3Label: 'Seri No / Abone No',
      field3Placeholder: 'SN-8839201',
      complaintLabel: 'Arıza Tanımı / Müşteri Şikayeti',
      complaintPlaceholder: 'Örn: Su ısıtmıyor, ekran kırık, kaçak var',
      actionLabel: 'Yapılan Onarım & Değişen Parça',
      actionPlaceholder: 'Örn: Anakart onarıldı, parça değişimi ve test yapıldı',
      specialistLabel: 'Teknisyen / Usta',
      specialistPlaceholder: 'Teknisyen Ali Usta',
      itemPlaceholder: 'Örn: Servis Bakım Ücreti, Yedek Parça, Montaj İşçiliği',
      presets: [
        { name: 'Yerinde Arıza Tespit & Servis İşçiliği', price: 900 },
        { name: 'Yıllık Periyodik Bakım & Temizlik', price: 1500 },
        { name: 'Orijinal Yedek Parça Değişimi', price: 2400 },
        { name: 'Montaj, Kurulum & Devreye Alma', price: 1800 }
      ]
    };
  }

  // 8. Avukat / Mali Müşavir / Emlak / Mimarlık / Sigorta / Yazılım / Ajans
  if (
    p.includes('avukat') || p.includes('hukuk') || p.includes('mali') ||
    p.includes('muhasebe') || p.includes('smmm') || p.includes('emlak') ||
    p.includes('gayrimenkul') || p.includes('mimar') || p.includes('sigorta') ||
    p.includes('yazılım') || p.includes('ajans')
  ) {
    return {
      defaultTab: 'FATURA',
      customerLabel: '👤 Müvekkil / Müşteri / Firma Ünvanı',
      customerPlaceholder: 'Örn: Yılmaz İnşaat Ltd. Şti.',
      fisSubtitle: 'Danışmanlık & Hizmet Tahsilat Makbuzu',
      servisSubtitle: 'Dosya, Proje & Sözleşme Teslim Tutanağı',
      faturaSubtitle: 'Kurumsal Hizmet & Serbest Meslek Faturası',
      field1Label: 'Dosya / Proje / Poliçe Türü',
      field1Placeholder: 'Danışmanlık / Kira Sözleşmesi / Proje',
      field2Label: 'Dönem / Kapsam',
      field2Placeholder: 'Kasım 2026 / Tam Kapsam',
      field3Label: 'Dosya / Sözleşme No',
      field3Placeholder: 'SZL-2026-412',
      complaintLabel: 'Talep / Dosya Konusu',
      complaintPlaceholder: 'Örn: Sözleşme hazırlığı, aylık müşavirlik, poliçe',
      actionLabel: 'Tamamlanan İşlem / Teslimat',
      actionPlaceholder: 'Örn: Resmi evraklar ve sözleşme teslim edildi',
      specialistLabel: 'Sorumlu Uzman / Danışman',
      specialistPlaceholder: 'Av. / SMMM / Danışman',
      itemPlaceholder: 'Örn: Danışmanlık Bedeli, Komisyon, Proje Hizmeti',
      presets: [
        { name: 'Kurumsal Danışmanlık & Hizmet Bedeli', price: 5000 },
        { name: 'Aylık Müşavirlik / Bakım Hizmeti', price: 4000 },
        { name: 'Sözleşme & Dosya Hazırlık Ücreti', price: 3500 },
        { name: 'Proje / Hizmet Komisyon Bedeli', price: 12000 }
      ]
    };
  }

  // 9. Eğitim / Sürücü Kursu / Spor Salonu / Organizasyon / Fotoğraf / Otel / Kafe / Nakliyat / Terzi ve Diğerleri
  return {
    defaultTab: 'FIS',
    customerLabel: '👤 Müşteri Adı / Ünvanı',
    customerPlaceholder: 'Örn: Ahmet Yılmaz / ABC Ticaret',
    fisSubtitle: `${profession || 'İşletme'} Hızlı Tahsilat Makbuzu`,
    servisSubtitle: `${profession || 'İşletme'} Hizmet & Teslim Fişi`,
    faturaSubtitle: `${profession || 'İşletme'} Kurumsal E-Arşiv Fatura`,
    field1Label: 'Hizmet / Paket / Ürün Türü',
    field1Placeholder: 'Standart Paket / Özel Hizmet',
    field2Label: 'Detay / Süre / Model',
    field2Placeholder: 'Aylık / Özel Ölçü',
    field3Label: 'Kayıt / Sipariş No',
    field3Placeholder: 'KTY-2026-109',
    complaintLabel: 'Müşteri Notu / Talep Detayı',
    complaintPlaceholder: 'Örn: Özel ölçü, rezervasyon tarihi, teslim saati',
    actionLabel: 'Sunulan Hizmet / Teslimat Özeti',
    actionPlaceholder: 'Örn: Hizmet tamamlandı ve müşteriye teslim edildi',
    specialistLabel: 'Sorumlu Yetkili / Personel',
    specialistPlaceholder: 'Yetkili Personel',
    itemPlaceholder: 'Örn: Paket Ücreti, Hizmet Bedeli, Ürün Satışı',
    presets: [
      { name: `${profession || 'İşletme'} Standart Hizmet Bedeli`, price: 1000 },
      { name: 'Aylık Paket / Kayıt Tahsilatı', price: 3000 },
      { name: 'Özel Uygulama / Ek Hizmet', price: 1500 },
      { name: 'Ürün / Malzeme Teslim Bedeli', price: 750 }
    ]
  };
};

export const SendDocumentScreen: React.FC<SendDocumentScreenProps> = ({
  setupOrigin,
  setupProfession,
  subscribers,
  dealers,
  activeSubscriberId,
  activeDealerId,
  onShowToast
}) => {
  // Kurulumda kayıtlı olan aktif mesleği tespit et
  const effectiveProfession = useMemo(() => {
    if (setupProfession && setupProfession.trim()) return setupProfession.trim();
    if (setupOrigin === 'esnaf' && activeSubscriberId) {
      const sub = subscribers.find(s => s.id === activeSubscriberId);
      if (sub?.sector) return sub.sector;
    }
    if ((setupOrigin === 'il_bayi' || setupOrigin === 'ilce_bayi' || setupOrigin === 'iller_bayi') && activeDealerId) {
      const d = dealers.find(del => del.id === activeDealerId);
      if (d) return 'Santral & Çağrı Sistemleri Bayiliği';
    }
    return 'Genel İşletme';
  }, [setupProfession, setupOrigin, activeSubscriberId, activeDealerId, subscribers, dealers]);

  const profConfig = useMemo(() => getProfessionDocConfig(effectiveProfession), [effectiveProfession]);

  // Açılır/kapanır aktif başlık (Başlangıçta 3 başlık da kapalı ve net görünür, tıklanan açılır)
  const [activeTab, setActiveTab] = useState<DocType>(profConfig.defaultTab);
  const [openHeader, setOpenHeader] = useState<DocType | null>(null);
  const [isCompanyConfigOpen, setIsCompanyConfigOpen] = useState<boolean>(false);

  // Firma Logosu & Bilgileri State (Her panel için ayrı localStorage kaydı)
  const storageKey = `sb_doc_company_profile_${setupOrigin || 'default'}_v1`;
  const [companyLogo, setCompanyLogo] = useState<string | null>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved).logo || null : null;
    } catch {
      return null;
    }
  });
  const [companyTitle, setCompanyTitle] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved).title || '' : '';
    } catch {
      return '';
    }
  });
  const [companyPhone, setCompanyPhone] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved).phone || '' : '';
    } catch {
      return '';
    }
  });
  const [companyTaxOffice, setCompanyTaxOffice] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved).taxOffice || '' : '';
    } catch {
      return '';
    }
  });
  const [companyTaxNo, setCompanyTaxNo] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved).taxNo || '' : '';
    } catch {
      return '';
    }
  });
  const [companyAddress, setCompanyAddress] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved).address || '' : '';
    } catch {
      return '';
    }
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        setCompanyLogo(parsed.logo || null);
        setCompanyTitle(parsed.title || '');
        setCompanyPhone(parsed.phone || '');
        setCompanyTaxOffice(parsed.taxOffice || '');
        setCompanyTaxNo(parsed.taxNo || '');
        setCompanyAddress(parsed.address || '');
      } else {
        setCompanyLogo(null);
        setCompanyTitle('');
        setCompanyPhone('');
        setCompanyTaxOffice('');
        setCompanyTaxNo('');
        setCompanyAddress('');
      }
    } catch {
      // ignore
    }
  }, [storageKey]);

  const handleSaveCompanyConfig = (customLogo?: string | null) => {
    const payload = {
      logo: customLogo !== undefined ? customLogo : companyLogo,
      title: companyTitle.trim(),
      phone: companyPhone.trim(),
      taxOffice: companyTaxOffice.trim(),
      taxNo: companyTaxNo.trim(),
      address: companyAddress.trim()
    };
    try {
      localStorage.setItem(storageKey, JSON.stringify(payload));
    } catch {
      // ignore
    }
    onShowToast('✓ Firma logosu ve bilgileri kaydedildi! Şimdi 1, 2 veya 3. adıma geçebilirsiniz.', 'success');
    setIsCompanyConfigOpen(false);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = reader.result as string;
      setCompanyLogo(dataUrl);
      const payload = {
        logo: dataUrl,
        title: companyTitle.trim(),
        phone: companyPhone.trim(),
        taxOffice: companyTaxOffice.trim(),
        taxNo: companyTaxNo.trim(),
        address: companyAddress.trim()
      };
      try {
        localStorage.setItem(storageKey, JSON.stringify(payload));
      } catch {
        // ignore
      }
      onShowToast('📷 Firma görseli / logosu yüklendi!', 'success');
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    setActiveTab(profConfig.defaultTab);
  }, [profConfig.defaultTab]);

  // Form State'leri
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerTaxNo, setCustomerTaxNo] = useState('');
  const [customerTaxOffice, setCustomerTaxOffice] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [showCustomerDropdown, setShowCustomerDropdown] = useState(false);

  // Hızlı Menü Açık/Kapalı, Düzenleme Modu ve Fatura Oluşturuldu State'leri
  const [isQuickMenuOpen, setIsQuickMenuOpen] = useState<boolean>(false);
  const [isInvoiceCreated, setIsInvoiceCreated] = useState<boolean>(false);
  const [isEditingQuickMenu, setIsEditingQuickMenu] = useState<boolean>(false);
  const [isAddingNewPreset, setIsAddingNewPreset] = useState(false);
  const [newPresetName, setNewPresetName] = useState('');
  const [newPresetPrice, setNewPresetPrice] = useState<number>(0);

  // KDV Oranı (%18 Varsayılan, KDV Fiyatların İçindedir) ve İskonto Oranı Ayarlama State'leri
  const [vatRate, setVatRate] = useState<number>(18);
  const [isVatEditorOpen, setIsVatEditorOpen] = useState(false);

  const discountStorageKey = `sb_doc_discount_${setupOrigin || 'default'}_${effectiveProfession}_v1`;
  const [discountRate, setDiscountRate] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(discountStorageKey);
      if (saved !== null) {
        const parsed = Number(saved);
        if (!isNaN(parsed) && parsed >= 0 && parsed <= 100) return parsed;
      }
    } catch {
      // ignore
    }
    return 10;
  });
  const [isDiscountSelected, setIsDiscountSelected] = useState<boolean>(false);
  const [isTahsilatModeSelected, setIsTahsilatModeSelected] = useState<boolean>(false);
  const [tahsilatAmount, setTahsilatAmount] = useState<number>(0);

  // Rakamı Türkçe Yazıya Çevirme Motoru (Örn: 2500 -> "İki Bin Beş Yüz Türk Lirası")
  const numberToTurkishWords = (amount: number): string => {
    const safeVal = Math.max(0, Math.round((Number(amount) || 0) * 100) / 100);
    const wholePart = Math.floor(safeVal);
    const kurusPart = Math.round((safeVal - wholePart) * 100);

    const birler = ['', 'Bir', 'İki', 'Üç', 'Dört', 'Beş', 'Altı', 'Yedi', 'Sekiz', 'Dokuz'];
    const onlar = ['', 'On', 'Yirmi', 'Otuz', 'Kırk', 'Elli', 'Altmış', 'Yetmiş', 'Seksen', 'Doksan'];
    const basamaklar = ['', 'Bin', 'Milyon', 'Milyar', 'Trilyon'];

    const convertThreeDigits = (num: number): string => {
      const yuz = Math.floor(num / 100);
      const on = Math.floor((num % 100) / 10);
      const bir = num % 10;
      const parts: string[] = [];

      if (yuz > 0) {
        parts.push(yuz === 1 ? 'Yüz' : `${birler[yuz]} Yüz`);
      }
      if (on > 0) {
        parts.push(onlar[on]);
      }
      if (bir > 0) {
        parts.push(birler[bir]);
      }
      return parts.join(' ');
    };

    const convertInteger = (n: number): string => {
      if (n === 0) return 'Sıfır';
      let temp = n;
      let groupIdx = 0;
      const groups: string[] = [];

      while (temp > 0) {
        const chunk = temp % 1000;
        if (chunk > 0) {
          let chunkText = convertThreeDigits(chunk);
          if (groupIdx === 1 && chunk === 1) {
            chunkText = 'Bin';
          } else if (basamaklar[groupIdx]) {
            chunkText = `${chunkText} ${basamaklar[groupIdx]}`;
          }
          groups.unshift(chunkText);
        }
        temp = Math.floor(temp / 1000);
        groupIdx++;
      }
      return groups.join(' ');
    };

    let result = `${convertInteger(wholePart)} Türk Lirası`;
    if (kurusPart > 0) {
      result += ` ${convertInteger(kurusPart)} Kuruş`;
    }
    return result;
  };

  useEffect(() => {
    try {
      const saved = localStorage.getItem(discountStorageKey);
      if (saved !== null) {
        const parsed = Number(saved);
        if (!isNaN(parsed) && parsed >= 0 && parsed <= 100) {
          setDiscountRate(parsed);
          return;
        }
      }
    } catch {
      // ignore
    }
    setDiscountRate(10);
  }, [discountStorageKey]);

  const handleChangeDiscountRate = (val: number) => {
    const safeRate = Math.max(0, Math.min(100, Number(val) || 0));
    setDiscountRate(safeRate);
    try {
      localStorage.setItem(discountStorageKey, String(safeRate));
    } catch {
      // ignore
    }
  };

  // Mesleğe Göre Hızlı Menü Kalemleri + Sabit İşçilik Ücreti ve Servis Ücreti
  const presetStorageKey = `sb_doc_presets_${setupOrigin || 'default'}_${effectiveProfession}_v5`;

  const buildMenuWithLaborAndService = (
    rawList: Array<{ id?: string; name: string; price: number }>
  ): Array<{ id: string; name: string; price: number; quantity: number }> => {
    const base = rawList.map((p, i) => ({
      id: p.id || `preset-${i}`,
      name: p.name || '',
      price: Number(p.price) || 0,
      quantity: 0
    }));

    const hasLabor = base.some(item => item.name.toLocaleLowerCase('tr-TR') === 'işçilik ücreti');
    if (!hasLabor) {
      base.push({
        id: 'preset-labor',
        name: 'İşçilik Ücreti',
        price: 1000,
        quantity: 0
      });
    }

    const hasService = base.some(item => item.name.toLocaleLowerCase('tr-TR') === 'servis ücreti');
    if (!hasService) {
      base.push({
        id: 'preset-service',
        name: 'Servis Ücreti',
        price: 750,
        quantity: 0
      });
    }

    return base;
  };

  const [customPresets, setCustomPresets] = useState<Array<{ id: string; name: string; price: number; quantity: number }>>(() => {
    try {
      const saved = localStorage.getItem(presetStorageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return buildMenuWithLaborAndService(parsed);
        }
      }
    } catch {
      // ignore
    }
    return buildMenuWithLaborAndService(profConfig.presets);
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem(presetStorageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setCustomPresets(buildMenuWithLaborAndService(parsed));
          return;
        }
      }
    } catch {
      // ignore
    }
    setCustomPresets(buildMenuWithLaborAndService(profConfig.presets));
  }, [presetStorageKey, profConfig.presets]);

  const savePresetsToStorage = (updated: Array<{ id: string; name: string; price: number; quantity: number }>) => {
    setCustomPresets(updated);
    try {
      // Menü kalemlerinin isim ve fiyatlarını kalıcı kaydet
      const menuToPersist = updated.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: 0
      }));
      localStorage.setItem(presetStorageKey, JSON.stringify(menuToPersist));
      localStorage.setItem(discountStorageKey, String(discountRate));
    } catch {
      // ignore
    }
  };

  const resetCurrentDocumentItems = () => {
    setCustomPresets(prev => prev.map(p => ({ ...p, quantity: 0 })));
    setIsDiscountSelected(false);
    setIsTahsilatModeSelected(false);
    setTahsilatAmount(0);
    setIsQuickMenuOpen(false);
    setIsInvoiceCreated(false);
    setIsEditingQuickMenu(false);
    setIsAddingNewPreset(false);
  };

  // Hazır Menü içindeki kalemin ismini değiştirme
  const handleChangePresetName = (idx: number, newName: string) => {
    const updated = customPresets.map((p, i) => (i === idx ? { ...p, name: newName } : p));
    savePresetsToStorage(updated);
  };

  // Hazır Menü içindeki kalemin fiyatını ayarlama
  const handleChangePresetPrice = (idx: number, newPrice: number) => {
    const safePrice = Math.max(0, Number(newPrice) || 0);
    const updated = customPresets.map((p, i) => (i === idx ? { ...p, price: safePrice } : p));
    savePresetsToStorage(updated);
  };

  // Tek Kalem Tik (✓) Seçimi: İşaretlenirse 1, kaldırılırsa 0 olur (Tahsilat seçiliyse kaldırır)
  const handleToggleItemCheck = (idx: number) => {
    setIsTahsilatModeSelected(false);
    setTahsilatAmount(0);
    setCustomPresets(prev =>
      prev.map((p, i) => (i === idx ? { ...p, quantity: (p.quantity || 0) > 0 ? 0 : 1 } : p))
    );
  };

  // Tahsilat Makbuzu Seçimi: Diğer tüm seçili seçenekleri kaldırır
  const handleToggleTahsilatMode = () => {
    setIsTahsilatModeSelected(prev => {
      const next = !prev;
      if (next) {
        setCustomPresets(list => list.map(p => ({ ...p, quantity: 0 })));
        setIsDiscountSelected(false);
      } else {
        setTahsilatAmount(0);
      }
      return next;
    });
  };

  // Hazır Menüye yeni kalem tanımlama ve doğrudan faturaya ekleme
  const handleAddNewPresetItem = () => {
    if (!newPresetName.trim()) {
      onShowToast('Lütfen eklenecek kalem adını yazınız!', 'error');
      return;
    }
    const finalName = newPresetName.trim();
    const finalPrice = Math.max(0, Number(newPresetPrice) || 0);

    const updatedPresets = [
      ...customPresets.map(p => ({ ...p, quantity: 0 })),
      {
        id: `preset-${Date.now()}`,
        name: finalName,
        price: finalPrice,
        quantity: 0
      }
    ];
    savePresetsToStorage(updatedPresets);
    setIsDiscountSelected(false);

    setNewPresetName('');
    setNewPresetPrice(0);
    setIsAddingNewPreset(false);
    onShowToast(`"${finalName}" hızlı menüye eklendi!`, 'success');
  };

  // Servis Fişi Alanları (Mesleğe Göre Dinamik Etiketli)
  const [serviceDevice, setServiceDevice] = useState('');
  const [serviceModel, setServiceModel] = useState('');
  const [serviceSerialOrPlate, setServiceSerialOrPlate] = useState('');
  const [serviceComplaint, setServiceComplaint] = useState('');
  const [serviceActionTaken, setServiceActionTaken] = useState('');
  const [serviceWarranty, setServiceWarranty] = useState('3 Ay Garantili');
  const [serviceTechnician, setServiceTechnician] = useState('');
  const [serviceStatus, setServiceStatus] = useState<'ISLEMDE' | 'HAZIR' | 'TESLIM_EDILDI'>('HAZIR');

  // Kayıtlı Müşteri Havuzu (Belge geçmişi + Cihaz Rehberi + Aboneler/Bayiler)
  const customerStorageKey = `sb_doc_customers_${setupOrigin || 'default'}_v1`;
  const [savedCustomers, setSavedCustomers] = useState<Array<{
    name: string;
    phone: string;
    taxNo?: string;
    taxOffice?: string;
    address?: string;
    device?: string;
    model?: string;
    serialOrPlate?: string;
  }>>(() => {
    try {
      const raw = localStorage.getItem(customerStorageKey);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const allRegisteredCustomers = useMemo(() => {
    const map = new Map<string, {
      name: string;
      phone: string;
      taxNo?: string;
      taxOffice?: string;
      address?: string;
      device?: string;
      model?: string;
      serialOrPlate?: string;
    }>();

    // Sadece daha önce belge oluşturulmuş kayıtlı isimler
    savedCustomers.forEach(c => {
      if (c.name?.trim()) {
        map.set(c.name.trim().toLocaleLowerCase('tr-TR'), c);
      }
    });

    return Array.from(map.values());
  }, [savedCustomers]);

  const filteredCustomers = useMemo(() => {
    const q = customerName.trim().toLocaleLowerCase('tr-TR');
    if (!q) return [];
    return allRegisteredCustomers.filter(
      c =>
        c.name.toLocaleLowerCase('tr-TR').includes(q) ||
        (c.phone && c.phone.includes(q)) ||
        (c.taxNo && c.taxNo.includes(q))
    );
  }, [customerName, allRegisteredCustomers]);

  const handleSelectCustomer = (cust: {
    name: string;
    phone: string;
    taxNo?: string;
    taxOffice?: string;
    address?: string;
    device?: string;
    model?: string;
    serialOrPlate?: string;
  }) => {
    setCustomerName(cust.name || '');
    if (cust.phone) setCustomerPhone(cust.phone);
    if (cust.taxNo) setCustomerTaxNo(cust.taxNo);
    if (cust.taxOffice) setCustomerTaxOffice(cust.taxOffice);
    if (cust.address) setCustomerAddress(cust.address);
    if (cust.device) setServiceDevice(cust.device);
    if (cust.model) setServiceModel(cust.model);
    if (cust.serialOrPlate) setServiceSerialOrPlate(cust.serialOrPlate);
    setShowCustomerDropdown(false);
    onShowToast(`✓ "${cust.name}" bilgileri otomatik eşleştirildi!`, 'success');
  };

  const handleSearchCustomerClick = () => {
    if (!customerName.trim()) {
      setShowCustomerDropdown(false);
      onShowToast('Aramak için önce Adı Soyadı yazınız.', 'error');
      return;
    }
    if (filteredCustomers.length === 0) {
      setShowCustomerDropdown(false);
      onShowToast('Eşleşen kayıtlı isim bulunamadı.', 'error');
      return;
    }
    setShowCustomerDropdown(true);
  };

  // Fiş / Faturaya Eklenmiş Olan Kalemler (quantity > 0 olanlar)
  const addedInvoiceItems = useMemo(() => {
    return customPresets
      .map((item, idx) => ({ ...item, originalIdx: idx }))
      .filter(item => item.quantity > 0);
  }, [customPresets]);

  // Toplam Hesaplamaları (Seçilen Kalemlerin Toplamı + İskonto Düşümü veya Tahsilat Tutarı)
  const calculations = useMemo(() => {
    if (isTahsilatModeSelected) {
      const safeTahsilat = Math.round((Math.max(0, Number(tahsilatAmount) || 0)) * 100) / 100;
      return {
        rawSubtotal: safeTahsilat,
        discountAmount: 0,
        total: safeTahsilat
      };
    }

    let rawSubtotal = 0;

    customPresets.forEach((p) => {
      if ((p.quantity || 0) <= 0) return;
      rawSubtotal += Number(p.price) || 0;
    });

    const discountAmount = isDiscountSelected ? rawSubtotal * (discountRate / 100) : 0;
    const total = Math.max(0, rawSubtotal - discountAmount);

    return {
      rawSubtotal: Math.round(rawSubtotal * 100) / 100,
      discountAmount: Math.round(discountAmount * 100) / 100,
      total: Math.round(total * 100) / 100
    };
  }, [customPresets, isDiscountSelected, discountRate, isTahsilatModeSelected, tahsilatAmount]);

  const hasValidSelection =
    addedInvoiceItems.length > 0 || (isTahsilatModeSelected && tahsilatAmount > 0);

  // Oluşturulan Belgeyi Ekrandaki Görselin Birebir Aynısı Olarak PNG Resme Dönüştürme Motoru
  const generateDocumentImageBlob = async (docNo: string): Promise<{ blob: Blob; dataUrl: string } | null> => {
    try {
      const scale = 2;
      const width = 440;
      const pad = 16;
      const innerW = width - pad * 2;
      const todayDateStr = new Date().toLocaleDateString('tr-TR');
      const hasCompanyHeader = Boolean(
        companyLogo || companyTitle.trim() || companyPhone.trim() || companyTaxNo.trim() || companyAddress.trim()
      );

      // Yüksekliği dinamik hesapla
      let totalHeight = pad;
      const headerH = hasCompanyHeader ? 96 : 48;
      totalHeight += headerH + 12;

      // Müşteri kutusu (Adı Soyadı + Telefon Numarası)
      const custBoxH = 74;
      totalHeight += custBoxH + 12;

      // Kalemler veya Tahsilat kutusu
      let tableH = 34; // Başlık satırı
      if (isTahsilatModeSelected) {
        tableH += 42 + 48; // Rakam satırı + Yalnız ... tahsil edilmiştir satırı
      } else {
        tableH += addedInvoiceItems.length * 36;
        if (isDiscountSelected) {
          tableH += 36 + 36; // Toplam satırı + altında İskonto satırı
        }
        tableH += 42; // Net Toplam Tutar
      }
      totalHeight += tableH + pad;

      const canvas = document.createElement('canvas');
      canvas.width = width * scale;
      canvas.height = totalHeight * scale;
      const ctx = canvas.getContext('2d');
      if (!ctx) return null;
      ctx.scale(scale, scale);

      const drawRoundedRect = (x: number, y: number, w: number, h: number, r: number, fill: string, stroke?: string, lineWidth = 1) => {
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + w - r, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + r);
        ctx.lineTo(x + w, y + h - r);
        ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        ctx.lineTo(x + r, y + h);
        ctx.quadraticCurveTo(x, y + h, x, y + h - r);
        ctx.lineTo(x, y + r);
        ctx.quadraticCurveTo(x, y, x + r, y);
        ctx.closePath();
        if (fill) {
          ctx.fillStyle = fill;
          ctx.fill();
        }
        if (stroke) {
          ctx.strokeStyle = stroke;
          ctx.lineWidth = lineWidth;
          ctx.stroke();
        }
      };

      // Arka plan
      ctx.fillStyle = '#090d16';
      ctx.fillRect(0, 0, width, totalHeight);

      let curY = pad;

      // 1. ÜST MATBAA ANTETLİ FİRMA BAŞLIĞI
      if (hasCompanyHeader) {
        drawRoundedRect(pad, curY, innerW, headerH, 10, '#fcfaf5', '#1e293b', 2);
        let textStartX = pad + 12;

        if (companyLogo) {
          try {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            await new Promise<void>((resolve) => {
              img.onload = () => resolve();
              img.onerror = () => resolve();
              img.src = companyLogo;
            });
            if (img.width > 0) {
              ctx.drawImage(img, pad + 12, curY + 12, 42, 42);
              textStartX = pad + 62;
            }
          } catch {
            // ignore logo load error
          }
        }

        ctx.fillStyle = '#0f172a';
        ctx.font = 'bold 13px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText((companyTitle.trim() || 'FİRMA ÜNVANI').slice(0, 28), textStartX, curY + 26);

        if (companyPhone.trim()) {
          ctx.fillStyle = '#334155';
          ctx.font = '600 10px monospace';
          ctx.fillText(`Tel: ${companyPhone.trim()}`, textStartX, curY + 42);
        }

        ctx.fillStyle = '#0f172a';
        ctx.font = 'bold 10px sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText('TAHSİLAT MAKBUZU', pad + innerW - 12, curY + 22);

        ctx.fillStyle = '#334155';
        ctx.font = 'bold 9.5px monospace';
        ctx.fillText(`No: ${docNo}`, pad + innerW - 12, curY + 36);
        ctx.fillText(`Tarih: ${todayDateStr}`, pad + innerW - 12, curY + 49);

        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(pad + 10, curY + 64);
        ctx.lineTo(pad + innerW - 10, curY + 64);
        ctx.stroke();

        ctx.fillStyle = '#334155';
        ctx.font = '600 9px sans-serif';
        ctx.textAlign = 'left';
        const taxLine = [
          companyTaxOffice.trim() ? companyTaxOffice.trim() : '',
          companyTaxNo.trim() ? `V.No: ${companyTaxNo.trim()}` : ''
        ]
          .filter(Boolean)
          .join(' • ');
        ctx.fillText(taxLine || companyAddress.trim().slice(0, 50), pad + 12, curY + 80);
        if (taxLine && companyAddress.trim()) {
          ctx.textAlign = 'right';
          ctx.fillText(companyAddress.trim().slice(0, 32), pad + innerW - 12, curY + 80);
        }
      } else {
        drawRoundedRect(pad, curY, innerW, headerH, 8, '#0f172a', '#1e293b', 1);
        ctx.fillStyle = '#34d399';
        ctx.font = 'bold 12px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText('TAHSİLAT MAKBUZU', pad + 12, curY + 28);

        ctx.fillStyle = '#94a3b8';
        ctx.font = 'bold 10px monospace';
        ctx.textAlign = 'right';
        ctx.fillText(`${docNo} • ${todayDateStr}`, pad + innerW - 12, curY + 28);
      }

      curY += headerH + 12;

      // 2. ADI SOYADI & TELEFON NUMARASI KUTUSU
      drawRoundedRect(pad, curY, innerW, custBoxH, 8, '#020617', '#1e293b', 1);
      ctx.fillStyle = '#94a3b8';
      ctx.font = 'bold 11px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('Adı Soyadı', pad + 12, curY + 23);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(customerName.trim(), pad + innerW - 12, curY + 23);

      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(pad, curY + 37);
      ctx.lineTo(pad + innerW, curY + 37);
      ctx.stroke();

      ctx.fillStyle = '#94a3b8';
      ctx.font = 'bold 11px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('Telefon Numarası', pad + 12, curY + 59);

      ctx.fillStyle = '#e2e8f0';
      ctx.font = 'bold 12px monospace';
      ctx.textAlign = 'right';
      ctx.fillText(customerPhone.trim(), pad + innerW - 12, curY + 59);

      curY += custBoxH + 12;

      // 3. KALEMLER VEYA TAHSİLAT MAKBUZU TABLOSU
      drawRoundedRect(pad, curY, innerW, tableH, 8, '#020617', '#1e293b', 1);

      // Tablo Üst Başlık
      drawRoundedRect(pad, curY, innerW, 34, 8, '#0f172a');
      ctx.fillStyle = '#34d399';
      ctx.font = 'bold 11px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(isTahsilatModeSelected ? 'TAHSİLAT MAKBUZU' : 'EKLENEN KALEMLER', pad + 12, curY + 21);

      let rowY = curY + 34;

      const drawDivider = (yPos: number) => {
        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(pad, yPos);
        ctx.lineTo(pad + innerW, yPos);
        ctx.stroke();
      };

      drawDivider(rowY);

      if (isTahsilatModeSelected) {
        // Rakam Satırı
        ctx.fillStyle = '#34d399';
        ctx.font = 'bold 15px monospace';
        ctx.textAlign = 'right';
        ctx.fillText(`₺${calculations.total.toLocaleString('tr-TR')}`, pad + innerW - 12, rowY + 26);
        rowY += 42;
        drawDivider(rowY);

        // Yalnız ... tahsil edilmiştir satırı
        ctx.fillStyle = 'rgba(120, 53, 15, 0.22)';
        ctx.fillRect(pad + 1, rowY, innerW - 2, 47);
        ctx.fillStyle = '#fcd34d';
        ctx.font = 'bold 11.5px sans-serif';
        ctx.textAlign = 'right';
        const wordsText = `Yalnız ${numberToTurkishWords(calculations.total)} tahsil edilmiştir.`;
        ctx.fillText(wordsText, pad + innerW - 12, rowY + 28, innerW - 24);
      } else {
        addedInvoiceItems.forEach((item) => {
          ctx.fillStyle = '#34d399';
          ctx.font = 'bold 12px sans-serif';
          ctx.textAlign = 'left';
          ctx.fillText('✓', pad + 12, rowY + 23);

          ctx.fillStyle = '#e2e8f0';
          ctx.font = '600 12px sans-serif';
          ctx.fillText(item.name.slice(0, 32), pad + 28, rowY + 23);

          ctx.fillStyle = '#34d399';
          ctx.font = 'bold 12px monospace';
          ctx.textAlign = 'right';
          ctx.fillText(`₺${item.price.toLocaleString('tr-TR')}`, pad + innerW - 12, rowY + 23);

          rowY += 36;
          drawDivider(rowY);
        });

        if (isDiscountSelected) {
          // 1. Toplam (İskontosuz Ham Toplam)
          ctx.fillStyle = '#cbd5e1';
          ctx.font = 'bold 12px sans-serif';
          ctx.textAlign = 'left';
          ctx.fillText('Toplam', pad + 12, rowY + 23);

          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 12px monospace';
          ctx.textAlign = 'right';
          ctx.fillText(`₺${calculations.rawSubtotal.toLocaleString('tr-TR')}`, pad + innerW - 12, rowY + 23);

          rowY += 36;
          drawDivider(rowY);

          // 2. Altında İskonto Düşümü
          ctx.fillStyle = 'rgba(120, 53, 15, 0.2)';
          ctx.fillRect(pad + 1, rowY, innerW - 2, 36);

          ctx.fillStyle = '#fbbf24';
          ctx.font = 'bold 12px sans-serif';
          ctx.textAlign = 'left';
          ctx.fillText(`İskonto (%${discountRate})`, pad + 12, rowY + 23);

          ctx.font = 'bold 12px monospace';
          ctx.textAlign = 'right';
          ctx.fillText(`-₺${calculations.discountAmount.toLocaleString('tr-TR')}`, pad + innerW - 12, rowY + 23);

          rowY += 36;
          drawDivider(rowY);
        }

        // 3. En Altta Net Toplam Tutar
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(pad + 1, rowY, innerW - 2, 41);

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 11.5px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(isDiscountSelected ? 'KALAN TOPLAM' : 'TOPLAM TUTAR', pad + 12, rowY + 26);

        ctx.fillStyle = '#34d399';
        ctx.font = 'bold 14px monospace';
        ctx.textAlign = 'right';
        ctx.fillText(`₺${calculations.total.toLocaleString('tr-TR')}`, pad + innerW - 12, rowY + 26);
      }

      const dataUrl = canvas.toDataURL('image/png');
      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'));
      if (!blob) return null;
      return { blob, dataUrl };
    } catch {
      return null;
    }
  };

  // Belge Gönder Motoru (Açıklamasız Sadece Görsel PNG Oluşturup WhatsApp'a Gönderir)
  const handleSendDocument = async (actionType: 'WHATSAPP' | 'SMS' | 'PRINT') => {
    if (!customerName.trim() || !customerPhone.trim()) {
      onShowToast('Lütfen Adı Soyadı ve Telefon Numarası giriniz!', 'error');
      return;
    }

    if (calculations.total <= 0) {
      onShowToast('Lütfen en az bir işlem kalemi seçiniz veya tutar giriniz!', 'error');
      return;
    }

    const typeLabel = 'Tahsilat Makbuzu';

    if (actionType === 'WHATSAPP') {
      const digitsOnly = customerPhone.replace(/\D/g, '');
      const waPhone = digitsOnly.startsWith('0')
        ? `9${digitsOnly}`
        : digitsOnly.startsWith('90')
        ? digitsOnly
        : `90${digitsOnly}`;
      const waJid = `${waPhone}@s.whatsapp.net`;

      const generated = await generateDocumentImageBlob(docNumber);

      if (generated) {
        const fileName = `tahsilat-makbuzu-${docNumber}.png`;
        const imageFile = new File([generated.blob], fileName, { type: 'image/png' });

        // 1. Android APK Köprüsü: Doğrudan jid (905...@s.whatsapp.net) ile o numaraya görsel ekli WhatsApp açar
        const bridge = (window as any).AndroidBridge;
        if (bridge && typeof bridge.shareWhatsAppImageToNumber === 'function') {
          try {
            bridge.shareWhatsAppImageToNumber(generated.dataUrl, waPhone, waJid);
          } catch {
            // ignore
          }
        } else if (bridge && typeof bridge.shareImageBase64 === 'function') {
          try {
            bridge.shareImageBase64(generated.dataUrl, waPhone, '');
          } catch {
            // ignore
          }
        } else if (
          typeof navigator !== 'undefined' &&
          typeof navigator.canShare === 'function' &&
          navigator.canShare({ files: [imageFile] })
        ) {
          // 2. Mobil Tarayıcı (Chrome): İndirme yapmadan doğrudan PNG resim dosyasını WhatsApp'a aktarır
          try {
            await navigator.share({
              files: [imageFile]
            });
          } catch {
            // Kullanıcı kapattıysa devam et
          }
        } else {
          // 3. Dosya paylaşımı desteklenmeyen masaüstü tarayıcıda doğrudan numarayı aç
          const waLink = document.createElement('a');
          waLink.href = `https://wa.me/${waPhone}`;
          waLink.target = '_blank';
          waLink.rel = 'noopener noreferrer';
          document.body.appendChild(waLink);
          waLink.click();
          document.body.removeChild(waLink);
        }
      }
    }

    let actionFeedback = '';
    if (actionType === 'WHATSAPP') {
      if (isTahsilatModeSelected) {
        actionFeedback = `✓ Belge görseli oluşturuldu ve WhatsApp'a aktarıldı: "${customerName}" — ₺${calculations.total.toLocaleString('tr-TR')} (Yalnız ${numberToTurkishWords(calculations.total)} tahsil edilmiştir.)`;
      } else {
        actionFeedback = `✓ Belge görseli oluşturuldu ve WhatsApp'a aktarıldı: "${customerName}" (${docNumber} - ₺${calculations.total.toLocaleString('tr-TR')})`;
      }
    } else if (actionType === 'SMS') {
      actionFeedback = `✓ SMS ile İletildi: "${customerName}" numarasına ${docNumber} nolu ${typeLabel} bildirimi gönderildi.`;
    } else {
      actionFeedback = `✓ ${typeLabel} Yazdırıldı / PDF Çıktısı Hazırlandı: ${docNumber}`;
    }

    onShowToast(actionFeedback, 'success');

    // Müşteriyi bir sonraki aramada otomatik eşleşmesi için kaydet
    const newCustRecord = {
      name: customerName.trim(),
      phone: customerPhone.trim(),
      taxNo: customerTaxNo.trim(),
      taxOffice: customerTaxOffice.trim(),
      address: customerAddress.trim(),
      device: serviceDevice.trim(),
      model: serviceModel.trim(),
      serialOrPlate: serviceSerialOrPlate.trim()
    };
    setSavedCustomers(prev => {
      const updated = [
        newCustRecord,
        ...prev.filter(c => c.name.toLocaleLowerCase('tr-TR') !== newCustRecord.name.toLocaleLowerCase('tr-TR'))
      ];
      try {
        localStorage.setItem(customerStorageKey, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });

    setCustomerName('');
    setCustomerPhone('');
    setCustomerTaxNo('');
    setCustomerTaxOffice('');
    setCustomerAddress('');
    setNotes('');
    setServiceDevice('');
    setServiceModel('');
    setServiceSerialOrPlate('');
    setServiceComplaint('');
    setServiceActionTaken('');
    resetCurrentDocumentItems();
    setOpenHeader(null);
  };

  // Otomatik Belge No Üretimi
  const docNumber = useMemo(() => {
    const prefix = activeTab === 'FIS' ? 'THS' : activeTab === 'SERVIS' ? 'SRV' : 'FTR';
    const rand = Math.floor(1000 + Math.random() * 9000);
    return `${prefix}-2026-${rand}`;
  }, [activeTab]);

  const headerConfigs: Array<{
    type: DocType;
    num: string;
    title: string;
    subtitle: string;
    icon: React.ReactNode;
    accentBorder: string;
    badgeClass: string;
    badgeText: string;
  }> = [
    {
      type: 'FIS',
      num: '1',
      title: 'Tahsilat Makbuzu',
      subtitle: profConfig.fisSubtitle,
      icon: <Receipt className="w-5 h-5 text-emerald-400 shrink-0" />,
      accentBorder: 'border-emerald-500/60',
      badgeClass: 'text-emerald-300 bg-emerald-950/80 border-emerald-600/50',
      badgeText: 'Makbuz'
    }
  ];

  const renderDynamicForm = (tabType: DocType) => {
    const docPrintTitle =
      tabType === 'FIS'
        ? 'TAHSİLAT MAKBUZU'
        : tabType === 'SERVIS'
        ? 'SERVİS & İŞLEM FİŞİ'
        : 'KURUMSAL FATURA';
    const todayDateStr = new Date().toLocaleDateString('tr-TR');

    return (
    <div className="p-3.5 pt-3 border-t border-slate-800 space-y-3.5 bg-slate-900/50 rounded-b-2xl">
      {/* MATBAA BASKISI ORİJİNAL ANTETLİ FİŞ BAŞLIĞI (LOGO VEYA FİRMA BİLGİSİ EKLENDİĞİNDE FİŞİN BAŞINDA GÖRÜNÜR) */}
      {(companyLogo || companyTitle.trim() || companyPhone.trim() || companyTaxNo.trim() || companyAddress.trim()) && (
        <div className="relative bg-[#faf6ee] text-slate-900 rounded-xl p-3 border-2 border-slate-800 shadow-lg overflow-hidden">
          {/* Matbaa iç çift çizgi çerçevesi */}
          <div className="border border-slate-700/70 rounded-lg p-2.5 bg-[#fcfaf5]">
            <div className="flex items-start justify-between gap-2.5 border-b-2 border-double border-slate-800/80 pb-2">
              {/* Sol: Matbaa Baskı Logo & Firma Ünvanı */}
              <div className="flex items-center gap-2.5 min-w-0 flex-1">
                {companyLogo && (
                  <img
                    src={companyLogo}
                    alt="Firma Logosu"
                    className="w-12 h-12 object-contain shrink-0 mix-blend-multiply contrast-125"
                  />
                )}
                <div className="min-w-0 flex-1">
                  <span className="text-[12px] font-black uppercase tracking-tight text-slate-950 block leading-tight">
                    {companyTitle.trim() || effectiveProfession}
                  </span>
                  <span className="text-[9.5px] font-bold text-slate-700 block truncate mt-0.5">
                    {effectiveProfession}
                  </span>
                  {companyPhone.trim() && (
                    <span className="text-[9.5px] font-mono font-bold text-slate-800 block mt-0.5">
                      Tel: {companyPhone}
                    </span>
                  )}
                </div>
              </div>

              {/* Sağ: Matbaa Belge Başlığı, Kırmızı Seri No & Tarih */}
              <div className="text-right shrink-0 border-l border-slate-400/80 pl-2">
                <span className="inline-block px-1.5 py-0.5 bg-slate-900 text-[#faf6ee] text-[8.5px] font-black uppercase tracking-widest rounded-sm">
                  {docPrintTitle}
                </span>
                <div className="text-[10.5px] font-mono font-black text-red-700 tracking-wider mt-1">
                  № {docNumber}
                </div>
                <div className="text-[9px] font-mono font-bold text-slate-700">
                  Tarih: {todayDateStr}
                </div>
              </div>
            </div>

            {/* Alt Satır: Vergi Dairesi / No ve Adres */}
            {(companyTaxOffice.trim() || companyTaxNo.trim() || companyAddress.trim()) && (
              <div className="pt-1.5 flex flex-wrap items-center justify-between gap-x-3 gap-y-0.5 text-[9px] font-semibold text-slate-800">
                {(companyTaxOffice.trim() || companyTaxNo.trim()) && (
                  <span>
                    {companyTaxOffice.trim() ? `${companyTaxOffice} ` : ''}
                    {companyTaxNo.trim() ? `V.No: ${companyTaxNo}` : ''}
                  </span>
                )}
                {companyAddress.trim() && (
                  <span className="truncate">{companyAddress}</span>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Müşteri Bilgileri: Oluşturulmadan önce form, oluşturulduktan sonra Adı Soyadı ve altında Telefon Numarası */}
      {!isInvoiceCreated ? (
        <div className="space-y-2.5 text-xs">
          <div className="relative">
            <label className="text-[11px] text-slate-300 font-bold block mb-1">
              Adı Soyadı
            </label>
            <div className="flex items-center gap-1.5">
              <input
                type="text"
                value={customerName}
                onChange={(e) => {
                  const val = e.target.value;
                  setCustomerName(val);
                  setShowCustomerDropdown(val.trim().length > 0);
                }}
                placeholder="Adı Soyadı"
                className="flex-1 min-w-0 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
              <button
                type="button"
                onClick={handleSearchCustomerClick}
                className="px-3 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 shrink-0 shadow-md shadow-indigo-950/50 active:scale-95 transition-all cursor-pointer"
                title="Kayıtlı Müşteri Ara ve Otomatik Eşleştir"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Ara</span>
              </button>
            </div>

            {/* Sadece isim yazıldığında ve eşleşen kayıt olduğunda açılan liste */}
            {showCustomerDropdown && customerName.trim().length > 0 && filteredCustomers.length > 0 && (
              <div className="mt-1.5 bg-slate-950 border border-indigo-500/60 rounded-xl p-1.5 space-y-1 max-h-48 overflow-y-auto shadow-xl">
                <div className="flex items-center justify-between px-2 py-1 border-b border-slate-800">
                  <span className="text-[10.5px] font-bold text-indigo-300">
                    🔍 Eşleşen Kayıtlı İsimler ({filteredCustomers.length})
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowCustomerDropdown(false)}
                    className="text-[10px] text-slate-400 hover:text-rose-400 font-bold cursor-pointer px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800"
                  >
                    ✕ Kapat
                  </button>
                </div>
                {filteredCustomers.map((cust, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleSelectCustomer(cust)}
                    className="w-full text-left px-2.5 py-2 rounded-lg bg-slate-900/60 hover:bg-indigo-950/70 border border-slate-800/80 hover:border-indigo-500/50 flex items-center justify-between gap-2 transition-colors cursor-pointer"
                  >
                    <div className="min-w-0">
                      <span className="text-xs font-bold text-white block truncate">{cust.name}</span>
                    </div>
                    {cust.phone && (
                      <span className="text-[10.5px] font-mono text-emerald-400 shrink-0">
                        {cust.phone}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="text-[11px] text-slate-300 font-bold block mb-1">
              Telefon Numarası
            </label>
            <input
              type="text"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              placeholder="05XX XXX XX XX"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>
      ) : (
        <div className="border border-slate-800 rounded-lg overflow-hidden bg-slate-950 divide-y divide-slate-800 text-xs">
          <div className="px-3 py-2 flex items-center justify-between gap-2">
            <span className="text-slate-400 font-bold shrink-0">Adı Soyadı</span>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Adı Soyadı"
              className="w-full bg-transparent text-right font-bold text-white placeholder-slate-600 focus:outline-none"
            />
          </div>
          <div className="px-3 py-2 flex items-center justify-between gap-2">
            <span className="text-slate-400 font-bold shrink-0">Telefon Numarası</span>
            <input
              type="text"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              placeholder="05XX XXX XX XX"
              className="w-full bg-transparent text-right font-mono font-bold text-slate-200 placeholder-slate-600 focus:outline-none"
            />
          </div>
        </div>
      )}

      {/* SERVİS FİŞİNE ÖZEL MESLEKİ DİNAMİK ALANLAR */}
      {tabType === 'SERVIS' && (
        <div className="bg-slate-950 p-3 rounded-xl border border-amber-500/30 space-y-2.5 text-xs">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[10px] text-slate-400 font-bold block mb-1">{profConfig.field1Label}</label>
              <input
                type="text"
                value={serviceDevice}
                onChange={(e) => setServiceDevice(e.target.value)}
                placeholder={profConfig.field1Placeholder}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-2 text-xs text-white"
              />
            </div>
            <div>
              <label className="text-[10px] text-slate-400 font-bold block mb-1">{profConfig.field2Label}</label>
              <input
                type="text"
                value={serviceModel}
                onChange={(e) => setServiceModel(e.target.value)}
                placeholder={profConfig.field2Placeholder}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-2 text-xs text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[10px] text-slate-400 font-bold block mb-1">{profConfig.field3Label}</label>
              <input
                type="text"
                value={serviceSerialOrPlate}
                onChange={(e) => setServiceSerialOrPlate(e.target.value)}
                placeholder={profConfig.field3Placeholder}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-2 text-xs text-white font-mono"
              />
            </div>
            <div>
              <label className="text-[10px] text-slate-400 font-bold block mb-1">{profConfig.specialistLabel}</label>
              <input
                type="text"
                value={serviceTechnician}
                onChange={(e) => setServiceTechnician(e.target.value)}
                placeholder={profConfig.specialistPlaceholder}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-2 text-xs text-white"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] text-slate-400 font-bold block mb-1">{profConfig.complaintLabel}</label>
            <input
              type="text"
              value={serviceComplaint}
              onChange={(e) => setServiceComplaint(e.target.value)}
              placeholder={profConfig.complaintPlaceholder}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-2 text-xs text-white"
            />
          </div>

          <div>
            <label className="text-[10px] text-slate-400 font-bold block mb-1">{profConfig.actionLabel}</label>
            <input
              type="text"
              value={serviceActionTaken}
              onChange={(e) => setServiceActionTaken(e.target.value)}
              placeholder={profConfig.actionPlaceholder}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-2 text-xs text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[10px] text-slate-400 font-bold block mb-1">Garanti / Takip</label>
              <select
                value={serviceWarranty}
                onChange={(e) => setServiceWarranty(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-2 text-xs text-white"
              >
                <option value="Garantisiz / Tek İşlem">Tek İşlem</option>
                <option value="1 Ay Garantili">1 Ay Garantili</option>
                <option value="3 Ay Garantili">3 Ay Garantili</option>
                <option value="6 Ay Garantili">6 Ay Garantili</option>
                <option value="1 Yıl Garantili">1 Yıl Garantili</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] text-slate-400 font-bold block mb-1">İşlem Durumu</label>
              <select
                value={serviceStatus}
                onChange={(e) => setServiceStatus(e.target.value as any)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-2 text-xs text-white font-bold"
              >
                <option value="ISLEMDE">⏳ İşlemde</option>
                <option value="HAZIR">✓ Hazır</option>
                <option value="TESLIM_EDILDI">★ Teslim Edildi</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* KURUMSAL FATURAYA ÖZEL VERGİ ALANLARI */}
      {tabType === 'FATURA' && (
        <div className="bg-slate-950 p-3 rounded-xl border border-cyan-500/30 space-y-2.5 text-xs">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[10px] text-slate-400 font-bold block mb-1">Vergi / T.C. No</label>
              <input
                type="text"
                value={customerTaxNo}
                onChange={(e) => setCustomerTaxNo(e.target.value)}
                placeholder="10 / 11 Haneli No"
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-2 text-xs text-white"
              />
            </div>
            <div>
              <label className="text-[10px] text-slate-400 font-bold block mb-1">Vergi Dairesi</label>
              <input
                type="text"
                value={customerTaxOffice}
                onChange={(e) => setCustomerTaxOffice(e.target.value)}
                placeholder="Örn: Kadıköy V.D."
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-2 text-xs text-white"
              />
            </div>
          </div>
          <div>
            <label className="text-[10px] text-slate-400 font-bold block mb-1">Fatura Adresi</label>
            <input
              type="text"
              value={customerAddress}
              onChange={(e) => setCustomerAddress(e.target.value)}
              placeholder="İl, ilçe ve açık adres bilgisi"
              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-2 text-xs text-white"
            />
          </div>
        </div>
      )}

      {/* ADIM ADIM MUHASEBE TABLOSU: 1. + EKLE -> 2. MENÜDEN SEÇ & FATURA OLUŞTUR -> 3. EKLENEN LİSTE + TOPLAM + WHATSAPP GÖNDER */}
      <div className="border border-slate-800 rounded-lg overflow-hidden bg-slate-950 text-xs">
        {/* Üst Başlık: Fatura oluşturulmadıysa "+ Ekle" ve menü açıksa "Hızlı Menüyü Düzenle" */}
        {!isInvoiceCreated ? (
          <div className="flex items-center justify-between bg-slate-900 px-3 py-2 border-b border-slate-800">
            <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
              {isQuickMenuOpen ? 'Hızlı Menü' : 'İşlem / Kalem'}
            </span>
            <div className="flex items-center gap-1.5">
              {isQuickMenuOpen && isEditingQuickMenu && (
                <button
                  type="button"
                  onClick={() => setIsAddingNewPreset(prev => !prev)}
                  className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-emerald-400 font-bold text-[10.5px] cursor-pointer"
                >
                  + Yeni Kalem
                </button>
              )}
              {isQuickMenuOpen && (
                <button
                  type="button"
                  onClick={() => {
                    const clearedPresets = customPresets.map(p => ({ ...p, quantity: 0 }));
                    setCustomPresets(clearedPresets);
                    setIsDiscountSelected(false);
                    setIsTahsilatModeSelected(false);
                    setTahsilatAmount(0);
                    if (isEditingQuickMenu) {
                      savePresetsToStorage(clearedPresets);
                      setIsEditingQuickMenu(false);
                      setIsAddingNewPreset(false);
                      onShowToast('Hızlı menü listesi güncellendi!', 'success');
                    } else {
                      setIsEditingQuickMenu(true);
                    }
                  }}
                  className={`px-2.5 py-1 rounded font-bold text-[10.5px] cursor-pointer ${
                    isEditingQuickMenu
                      ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                      : 'bg-slate-800 hover:bg-slate-700 text-amber-300'
                  }`}
                >
                  {isEditingQuickMenu ? 'Listeyi Güncelle' : 'Hızlı Menüyü Düzenle'}
                </button>
              )}
              {!isQuickMenuOpen && (
                <button
                  type="button"
                  onClick={() => setIsQuickMenuOpen(true)}
                  className="px-3 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[11px] flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Ekle</span>
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between bg-slate-900 px-3 py-2 border-b border-slate-800">
            <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
              {isTahsilatModeSelected ? 'Tahsilat Makbuzu' : 'Eklenen Kalemler'}
            </span>
          </div>
        )}

        {/* YENİ KALEM TANIMLAMA SATIRI (DÜZENLEME MODUNDA) */}
        {!isInvoiceCreated && isQuickMenuOpen && isEditingQuickMenu && isAddingNewPreset && (
          <div className="flex items-center gap-2 px-3 py-2 bg-slate-900/90 border-b border-slate-800">
            <input
              type="text"
              value={newPresetName}
              onChange={(e) => setNewPresetName(e.target.value)}
              placeholder="Yeni kalem adı..."
              className="flex-1 min-w-0 bg-transparent border-b border-slate-700 focus:border-emerald-400 py-1 text-xs text-white focus:outline-none"
            />
            <div className="flex items-center gap-1 w-24 shrink-0">
              <span className="text-[11px] text-slate-400 font-mono">₺</span>
              <input
                type="number"
                min={0}
                value={newPresetPrice || ''}
                onChange={(e) => setNewPresetPrice(Math.max(0, parseFloat(e.target.value) || 0))}
                placeholder="0"
                className="w-full bg-transparent border-b border-slate-700 focus:border-emerald-400 py-1 text-xs font-mono font-bold text-emerald-400 text-right focus:outline-none"
              />
            </div>
            <button
              type="button"
              onClick={handleAddNewPresetItem}
              className="px-2 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10.5px] rounded shrink-0 cursor-pointer"
            >
              Kaydet
            </button>
          </div>
        )}

        {/* 1. AŞAMA: EKLE DENİLDİĞİNDE AÇILAN HIZLI MENÜ (TEK KALEM TİK SEÇİMİ + İSKONTO + TAHSİLAT MAKBUZU) */}
        {!isInvoiceCreated && isQuickMenuOpen && (
          <div className="divide-y divide-slate-800/80 border-b border-slate-700 bg-slate-900/40">
            <div className="grid grid-cols-12 px-3 py-1.5 bg-slate-900/80 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              <div className={isEditingQuickMenu ? 'col-span-8' : 'col-span-7'}>Kalem</div>
              <div className={isEditingQuickMenu ? 'col-span-4 text-right' : 'col-span-3 text-right'}>Fiyat</div>
              {!isEditingQuickMenu && <div className="col-span-2 text-right">Seç</div>}
            </div>
            {customPresets.map((preset, i) => {
              const isChecked = !isEditingQuickMenu && (preset.quantity || 0) > 0;
              return (
                <div
                  key={preset.id || i}
                  onClick={() => {
                    if (!isEditingQuickMenu) handleToggleItemCheck(i);
                  }}
                  className={`grid grid-cols-12 items-center gap-2 px-3 py-2 transition-colors ${
                    !isEditingQuickMenu ? 'cursor-pointer hover:bg-slate-900/70' : ''
                  } ${isChecked ? 'bg-emerald-950/20' : ''}`}
                >
                  <div className={isEditingQuickMenu ? 'col-span-8 min-w-0' : 'col-span-7 min-w-0'}>
                    {isEditingQuickMenu ? (
                      <input
                        type="text"
                        value={preset.name}
                        onChange={(e) => handleChangePresetName(i, e.target.value)}
                        className="w-full min-w-0 bg-slate-950 border border-indigo-500/60 rounded px-2 py-1 text-xs font-medium text-white focus:outline-none"
                      />
                    ) : (
                      <span className={`text-xs font-medium block truncate ${isChecked ? 'text-white font-bold' : 'text-slate-200'}`}>
                        {preset.name}
                      </span>
                    )}
                  </div>

                  <div className={`${isEditingQuickMenu ? 'col-span-4' : 'col-span-3'} flex items-center justify-end gap-0.5 font-mono`}>
                    {isEditingQuickMenu ? (
                      <>
                        <span className="text-[10px] text-slate-400">₺</span>
                        <input
                          type="number"
                          min={0}
                          value={preset.price || ''}
                          onChange={(e) => handleChangePresetPrice(i, parseFloat(e.target.value) || 0)}
                          placeholder="0"
                          className="w-20 bg-slate-950 border border-emerald-500/60 rounded px-1.5 py-1 text-xs font-bold text-emerald-400 text-right focus:outline-none"
                        />
                      </>
                    ) : (
                      <span className="text-xs font-bold text-emerald-400 tabular-nums">
                        ₺{preset.price.toLocaleString('tr-TR')}
                      </span>
                    )}
                  </div>

                  {!isEditingQuickMenu && (
                    <div className="col-span-2 flex items-center justify-end">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleItemCheck(i);
                        }}
                        className={`w-6 h-6 rounded flex items-center justify-center border transition-all cursor-pointer ${
                          isChecked
                            ? 'bg-emerald-600 border-emerald-400 text-white'
                            : 'bg-slate-950 border-slate-700 text-transparent hover:border-slate-500'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}

            {/* HIZLI MENÜ İSKONTO SATIRI (VARSAYILAN %10, HIZLI MENÜ DÜZENLEDE AYARLANABİLİR) */}
            <div
              onClick={() => {
                if (!isEditingQuickMenu) {
                  setIsTahsilatModeSelected(false);
                  setTahsilatAmount(0);
                  setIsDiscountSelected(prev => !prev);
                }
              }}
              className={`grid grid-cols-12 items-center gap-2 px-3 py-2 transition-colors ${
                !isEditingQuickMenu ? 'cursor-pointer hover:bg-slate-900/70' : ''
              } ${!isEditingQuickMenu && isDiscountSelected ? 'bg-amber-950/25' : 'bg-slate-900/60'}`}
            >
              <div className={`${isEditingQuickMenu ? 'col-span-8' : 'col-span-7'} min-w-0 flex items-center gap-1.5`}>
                <span className={`text-xs font-bold ${!isEditingQuickMenu && isDiscountSelected ? 'text-amber-300' : 'text-amber-400/90'}`}>
                  İskonto (%{discountRate})
                </span>
              </div>

              <div className={`${isEditingQuickMenu ? 'col-span-4' : 'col-span-3'} flex items-center justify-end gap-0.5 font-mono`}>
                {isEditingQuickMenu ? (
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] text-amber-300 font-bold">%</span>
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={discountRate}
                      onChange={(e) => handleChangeDiscountRate(parseFloat(e.target.value) || 0)}
                      className="w-14 bg-slate-950 border border-amber-500/60 rounded px-1.5 py-1 text-xs font-bold text-amber-300 text-right focus:outline-none"
                    />
                  </div>
                ) : (
                  <span className="text-xs font-bold text-amber-400 tabular-nums">
                    {calculations.discountAmount > 0
                      ? `-₺${calculations.discountAmount.toLocaleString('tr-TR')}`
                      : `%${discountRate}`}
                  </span>
                )}
              </div>

              {!isEditingQuickMenu && (
                <div className="col-span-2 flex items-center justify-end">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsTahsilatModeSelected(false);
                      setTahsilatAmount(0);
                      setIsDiscountSelected(prev => !prev);
                    }}
                    className={`w-6 h-6 rounded flex items-center justify-center border transition-all cursor-pointer ${
                      isDiscountSelected
                        ? 'bg-amber-500 border-amber-300 text-slate-950'
                        : 'bg-slate-950 border-slate-700 text-transparent hover:border-slate-500'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </button>
                </div>
              )}
            </div>

            {/* HIZLI MENÜ TAHSİLAT MAKBUZU SATIRI (İSKONTO RENGİNDE, BASILDIĞINDA DİĞER SEÇENEKLERİ KALDIRIR) */}
            {!isEditingQuickMenu && (
              <div
                onClick={handleToggleTahsilatMode}
                className={`grid grid-cols-12 items-center gap-2 px-3 py-2 transition-colors cursor-pointer hover:bg-slate-900/70 ${
                  isTahsilatModeSelected ? 'bg-amber-950/25' : 'bg-slate-900/60'
                }`}
              >
                <div className="col-span-7 min-w-0 flex items-center gap-1.5">
                  <span className={`text-xs font-bold ${isTahsilatModeSelected ? 'text-amber-300' : 'text-amber-400/90'}`}>
                    Tahsilat Makbuzu
                  </span>
                </div>

                <div className="col-span-3 flex items-center justify-end gap-0.5 font-mono">
                  <span className="text-xs font-bold text-amber-400 tabular-nums">
                    {isTahsilatModeSelected && tahsilatAmount > 0
                      ? `₺${tahsilatAmount.toLocaleString('tr-TR')}`
                      : 'Tahsilat'}
                  </span>
                </div>

                <div className="col-span-2 flex items-center justify-end">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleTahsilatMode();
                    }}
                    className={`w-6 h-6 rounded flex items-center justify-center border transition-all cursor-pointer ${
                      isTahsilatModeSelected
                        ? 'bg-amber-500 border-amber-300 text-slate-950'
                        : 'bg-slate-950 border-slate-700 text-transparent hover:border-slate-500'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </button>
                </div>
              </div>
            )}

            {/* TAHSİLAT MAKBUZU SEÇİLDİĞİNDE AÇILAN "TAHSİL EDİLECEK RAKAM" GİRİŞ ALANI */}
            {!isEditingQuickMenu && isTahsilatModeSelected && (
              <div className="px-3 py-2.5 bg-amber-950/20 flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-amber-300 shrink-0">
                  Tahsil Edilecek Rakam
                </span>
                <div className="flex items-center gap-1.5 w-36">
                  <span className="text-xs font-bold text-amber-400 font-mono">₺</span>
                  <input
                    type="number"
                    min={0}
                    value={tahsilatAmount || ''}
                    onChange={(e) => setTahsilatAmount(Math.max(0, parseFloat(e.target.value) || 0))}
                    placeholder="0"
                    autoFocus
                    className="w-full bg-slate-950 border border-amber-500/70 rounded-lg px-2.5 py-1.5 text-xs font-mono font-bold text-amber-300 text-right focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* 2. AŞAMA: OLUŞTUR BUTONUNA BASILDIĞINDA GÖRÜNEN TAHSİLAT MAKBUZU */}
        {isInvoiceCreated && isTahsilatModeSelected && tahsilatAmount > 0 && (
          <div className="divide-y divide-slate-800/80 bg-slate-950">
            <div className="px-3 py-2.5 flex items-center justify-end">
              <span className="font-mono font-bold text-emerald-400 text-sm tabular-nums">
                ₺{calculations.total.toLocaleString('tr-TR')}
              </span>
            </div>
            <div className="px-3 py-2.5 bg-amber-950/15 text-right">
              <span className="font-bold text-amber-300">
                Yalnız {numberToTurkishWords(calculations.total)} tahsil edilmiştir.
              </span>
            </div>
          </div>
        )}

        {isInvoiceCreated && !isTahsilatModeSelected && addedInvoiceItems.length > 0 && (
          <div className="divide-y divide-slate-800/80 border-b border-slate-800">
            {addedInvoiceItems.map((item) => (
              <div
                key={item.id || item.originalIdx}
                className="grid grid-cols-12 items-center px-3 py-2 text-slate-200"
              >
                <div className="col-span-8 font-medium text-xs truncate pr-2 flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="truncate">{item.name}</span>
                </div>
                <div className="col-span-4 text-right font-mono font-bold text-emerald-400 tabular-nums">
                  ₺{item.price.toLocaleString('tr-TR')}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ALTTA GÖRÜNEN TOPLAM -> İSKONTO DÜŞÜMÜ -> KALAN TOPLAM SATIRLARI */}
        {!isEditingQuickMenu && !isTahsilatModeSelected && (!isQuickMenuOpen || addedInvoiceItems.length > 0) && (
          <div className="divide-y divide-slate-800/80 bg-slate-950">
            {isDiscountSelected && (
              <>
                <div className="flex justify-between items-center px-3 py-2 text-slate-200 font-bold">
                  <span>Toplam</span>
                  <span className="font-mono text-white tabular-nums">
                    ₺{calculations.rawSubtotal.toLocaleString('tr-TR')}
                  </span>
                </div>
                <div className="flex justify-between items-center px-3 py-2 text-amber-300 bg-amber-950/15 font-bold">
                  <span>İskonto (%{discountRate})</span>
                  <span className="font-mono text-amber-400 tabular-nums">
                    -₺{calculations.discountAmount.toLocaleString('tr-TR')}
                  </span>
                </div>
              </>
            )}

            <div className="flex justify-between items-center px-3 py-2.5 bg-slate-900 font-bold text-xs text-white">
              <span className="uppercase tracking-wider text-[11px]">
                {isDiscountSelected ? 'Kalan Toplam' : 'Toplam Tutar'}
              </span>
              <span className="text-sm text-emerald-400 font-mono tabular-nums">
                ₺{calculations.total.toLocaleString('tr-TR')}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* ADIM BUTONU: KALEM EKLENİNCE VEYA TAHSİLAT RAKAMI GİRİLİNCE "OLUŞTUR" ÇIKAR -> BASINCA "WHATSAPP İLE GÖNDER" ÇIKAR */}
      {!isEditingQuickMenu && hasValidSelection && !isInvoiceCreated && (
        <div className="pt-1">
          <button
            type="button"
            onClick={() => {
              if (!customerName.trim() || !customerPhone.trim()) {
                onShowToast('Lütfen Adı Soyadı ve Telefon Numarası giriniz!', 'error');
                return;
              }
              setShowCustomerDropdown(false);
              setIsQuickMenuOpen(false);
              setIsEditingQuickMenu(false);
              setIsInvoiceCreated(true);
            }}
            className="w-full py-2.5 px-3 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-indigo-950/40 active:scale-95 transition-all cursor-pointer"
          >
            <Check className="w-4 h-4 shrink-0" />
            <span>
              {isTahsilatModeSelected || tabType === 'FIS'
                ? 'Tahsilat Makbuzu Oluştur'
                : tabType === 'SERVIS'
                ? 'Servis Fişi Oluştur'
                : 'Fatura Oluştur'}
            </span>
          </button>
        </div>
      )}

      {isInvoiceCreated && hasValidSelection && (
        <div className="pt-1">
          <button
            type="button"
            onClick={() => handleSendDocument('WHATSAPP')}
            className="w-full py-2.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 active:scale-95 transition-all cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 shrink-0" />
            <span>WhatsApp ile Gönder</span>
          </button>
        </div>
      )}
    </div>
    );
  };

  const isCompanyConfigured = Boolean(companyLogo || companyTitle.trim());
  const selectedDocConfig = openHeader ? headerConfigs.find(h => h.type === openHeader) || null : null;

  return (
    <div className="flex-1 min-h-0 flex flex-col space-y-3 overflow-y-auto overscroll-contain [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden scrollbar-none pr-0.5 text-left pb-24">
      {/* 1. TEKİL EKRAN: FİRMA LOGOSU & BİLGİLERİ AÇIKSA SADECE BU BÖLÜM GÖRÜNÜR */}
      {isCompanyConfigOpen ? (
        <div className="shrink-0 bg-slate-950 rounded-2xl border border-indigo-500/70 shadow-lg">
          <div className="w-full p-3.5 flex items-center justify-between gap-2.5 text-left border-b border-slate-800">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              {companyLogo ? (
                <img
                  src={companyLogo}
                  alt="Firma Logosu"
                  className="w-9 h-9 rounded-xl object-cover border border-indigo-500/50 shrink-0 bg-slate-900"
                />
              ) : (
                <div className="w-9 h-9 rounded-xl bg-indigo-950/80 border border-indigo-500/40 flex items-center justify-center shrink-0">
                  <Building2 className="w-5 h-5 text-indigo-400" />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <span className="text-[13px] font-black text-white uppercase tracking-wide block truncate">
                  {companyTitle.trim() ? companyTitle : 'Firma Logosu & Bilgileri'}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsCompanyConfigOpen(false)}
              className="p-1.5 rounded-xl bg-slate-900 hover:bg-rose-950 text-slate-300 hover:text-rose-300 border border-slate-800 cursor-pointer shrink-0 transition-colors"
              title="Kapat ve Listeye Dön"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-3.5 pt-3 space-y-3 bg-slate-900/50 rounded-b-2xl text-xs">
            {/* 1. RESİM ÇEK / LOGO VEYA KARTVİZİT YÜKLE */}
            <div className="bg-slate-950 p-3 rounded-xl border border-indigo-500/30 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black text-indigo-300 flex items-center gap-1.5">
                  <Camera className="w-4 h-4 text-indigo-400" />
                  <span>1. Resim Çek / Logo veya Kaşe Yükle</span>
                </span>
                {companyLogo && (
                  <button
                    type="button"
                    onClick={() => {
                      setCompanyLogo(null);
                      handleSaveCompanyConfig(null);
                    }}
                    className="text-[10px] font-bold text-rose-400 hover:text-rose-300 bg-rose-950/50 px-2 py-0.5 rounded-lg border border-rose-500/30 cursor-pointer"
                  >
                    ✕ Görseli Sil
                  </button>
                )}
              </div>

              {companyLogo ? (
                <div className="flex items-center gap-3 bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                  <img
                    src={companyLogo}
                    alt="Yüklenen Logo"
                    className="w-16 h-16 rounded-xl object-contain bg-slate-950 border border-slate-700 shrink-0"
                  />
                  <div className="min-w-0 flex-1 space-y-1">
                    <span className="text-[11px] font-bold text-emerald-400 block">
                      ✓ Logo / Kartvizit Görseli Aktif
                    </span>
                    <label className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[10.5px] font-bold cursor-pointer border border-slate-700">
                      <Camera className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Yeni Resim Çek / Değiştir</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              ) : (
                <label className="w-full py-3 px-3 rounded-xl bg-gradient-to-r from-indigo-600/25 to-cyan-600/25 hover:from-indigo-600/40 hover:to-cyan-600/40 border border-dashed border-indigo-400/60 flex items-center justify-center gap-2 text-indigo-200 font-bold text-xs cursor-pointer transition-all active:scale-[0.99]">
                  <Camera className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>📷 Kamera ile Çek veya Galeriden Logo Seç</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            {/* 2. ELLE FİRMA BİLGİLERİNİ YAPILANDIR */}
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2.5">
              <span className="text-[11px] font-black text-amber-300 block">
                ✍️ 2. Elle Firma Bilgilerini Girin
              </span>

              <div>
                <label className="text-[10.5px] text-slate-300 font-bold block mb-1">
                  Firma / İşletme Ünvanı
                </label>
                <input
                  type="text"
                  value={companyTitle}
                  onChange={(e) => setCompanyTitle(e.target.value)}
                  placeholder={`Örn: Özkan ${effectiveProfession}`}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10.5px] text-slate-300 font-bold block mb-1">
                    İşletme Telefonu
                  </label>
                  <input
                    type="text"
                    value={companyPhone}
                    onChange={(e) => setCompanyPhone(e.target.value)}
                    placeholder="05XX XXX XX XX"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-[10.5px] text-slate-300 font-bold block mb-1">
                    Vergi / T.C. No
                  </label>
                  <input
                    type="text"
                    value={companyTaxNo}
                    onChange={(e) => setCompanyTaxNo(e.target.value)}
                    placeholder="Vergi / T.C. No"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10.5px] text-slate-300 font-bold block mb-1">
                    Vergi Dairesi
                  </label>
                  <input
                    type="text"
                    value={companyTaxOffice}
                    onChange={(e) => setCompanyTaxOffice(e.target.value)}
                    placeholder="Örn: Kadıköy V.D."
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-[10.5px] text-slate-300 font-bold block mb-1">
                    İşletme Adresi
                  </label>
                  <input
                    type="text"
                    value={companyAddress}
                    onChange={(e) => setCompanyAddress(e.target.value)}
                    placeholder="İl / İlçe / Mahalle"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleSaveCompanyConfig()}
                className="w-full py-2.5 px-3 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-lg shadow-indigo-950/50 active:scale-95 transition-all cursor-pointer mt-1"
              >
                <Check className="w-4 h-4 shrink-0" />
                <span>Kaydet ve Listeye Dön</span>
              </button>
            </div>
          </div>
        </div>
      ) : selectedDocConfig ? (
        /* 2. TEKİL EKRAN: TAHSİLAT MAKBUZU / SERVİS FİŞİ / FATURA SEÇİLDİĞİNDE SADECE O BÖLÜM GÖRÜNÜR */
        <div className={`shrink-0 bg-slate-950 rounded-2xl border ${selectedDocConfig.accentBorder} shadow-lg`}>
          <div className="w-full p-3.5 flex items-center justify-between gap-2.5 text-left">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              {selectedDocConfig.icon}
              <div className="min-w-0 flex-1">
                <span className="text-[13px] font-black text-white uppercase tracking-wide block">
                  {selectedDocConfig.num}. {selectedDocConfig.title}
                </span>
                <span className="text-[10.5px] text-slate-400 font-medium block truncate mt-0.5">
                  {selectedDocConfig.subtitle}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                resetCurrentDocumentItems();
                setOpenHeader(null);
              }}
              className="p-1.5 rounded-xl bg-slate-900 hover:bg-rose-950 text-slate-300 hover:text-rose-300 border border-slate-800 cursor-pointer shrink-0 transition-colors"
              title="Kapat ve Listeye Dön"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {renderDynamicForm(selectedDocConfig.type)}
        </div>
      ) : (
        /* 3. ANA LİSTE GÖRÜNÜMÜ */
        <>
          <div className="shrink-0 bg-slate-950 rounded-2xl border border-slate-800 transition-all">
            <button
              type="button"
              onClick={() => {
                setOpenHeader(null);
                setIsCompanyConfigOpen(true);
              }}
              className="w-full p-3.5 flex items-center justify-between gap-2.5 text-left hover:bg-slate-900/70 transition-colors cursor-pointer rounded-2xl"
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                {companyLogo ? (
                  <img
                    src={companyLogo}
                    alt="Firma Logosu"
                    className="w-9 h-9 rounded-xl object-cover border border-indigo-500/50 shrink-0 bg-slate-900"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-xl bg-indigo-950/80 border border-indigo-500/40 flex items-center justify-center shrink-0">
                    <Building2 className="w-5 h-5 text-indigo-400" />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <span className="text-[13px] font-black text-white uppercase tracking-wide block truncate">
                    {companyTitle.trim() ? companyTitle : 'Firma Logosu & Bilgileri'}
                  </span>
                  <span className="text-[10.5px] text-slate-400 font-medium block truncate mt-0.5">
                    {isCompanyConfigured
                      ? `✓ Yapılandırıldı ${companyPhone ? `• ${companyPhone}` : ''}`
                      : '📷 Resim çekin veya elle firma bilgilerinizi yapılandırın'}
                  </span>
                </div>
              </div>
              <span
                className={`text-[9.5px] font-bold px-2.5 py-1 rounded-full border shrink-0 ${
                  isCompanyConfigured
                    ? 'text-emerald-300 bg-emerald-950/80 border-emerald-600/50'
                    : 'text-indigo-300 bg-indigo-950/80 border-indigo-600/50'
                }`}
              >
                {isCompanyConfigured ? '✓ Hazır' : 'Logo & Firma'}
              </span>
            </button>
          </div>

          {headerConfigs.map((hdr) => (
            <div
              key={hdr.type}
              className="shrink-0 bg-slate-950 rounded-2xl border border-slate-800 transition-all"
            >
              <button
                type="button"
                onClick={() => {
                  resetCurrentDocumentItems();
                  setIsCompanyConfigOpen(false);
                  setActiveTab(hdr.type);
                  setOpenHeader(hdr.type);
                }}
                className="w-full p-3.5 flex items-center justify-between gap-2.5 text-left hover:bg-slate-900/70 transition-colors cursor-pointer rounded-2xl"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  {hdr.icon}
                  <div className="min-w-0 flex-1">
                    <span className="text-[13px] font-black text-white uppercase tracking-wide block">
                      {hdr.num}. {hdr.title}
                    </span>
                    <span className="text-[10.5px] text-slate-400 font-medium block truncate mt-0.5">
                      {hdr.subtitle}
                    </span>
                  </div>
                </div>
                <span className={`text-[9.5px] font-bold px-2.5 py-1 rounded-full border shrink-0 ${hdr.badgeClass}`}>
                  {hdr.badgeText}
                </span>
              </button>
            </div>
          ))}
        </>
      )}
    </div>
  );
};
