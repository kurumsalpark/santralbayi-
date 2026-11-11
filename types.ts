export type DealerLevel = 'ILLER' | 'IL' | 'ILCE' | 'SEMT';

export type DealerLicenseTier = 'STANDARD_500' | 'MASTER_1000'; // 500 TL Abone Bayisi vs 1000 TL Alt Bayi Açabilen Master Bayi

export type DealerBusinessType = 'HYBRID' | 'DEALERSHIP_ONLY' | 'SUBSCRIBER_ONLY';

export interface Dealer {
  id: string;
  name: string;
  level?: DealerLevel;
  licenseTier?: DealerLicenseTier; // 500 TL (Sadece Abone) / 1000 TL (Alt Bayi Yetkili)
  licenseFeePaid?: number; // 500 or 1000 TL
  businessType?: DealerBusinessType;
  canIssueDealership?: boolean; // Bayilik verme yetkisi
  canSellSubscription?: boolean; // Abonelik satma yetkisi
  subDealerCount?: number; // Sahip olduğu alt bayi sayısı
  parentId?: string; // İsteğe bağlı üst bayi bağlantısı
  province: string;
  district?: string;
  neighborhood?: string;
  logoUrl?: string;
  subdomain: string;
  customDomain?: string;
  balance: number;
  commissionRate: number; // e.g., 20%
  status: 'ACTIVE' | 'PENDING' | 'SUSPENDED';
  createdAt: string;
  contactName: string;
  contactPhone: string;
  subscriberCount: number;
  dealerCode?: string; // Otomatik Kurumsal Kod, örn: KP-34-MST-101
  officialTitle?: string; // Otomatik Kurumsal Unvan, örn: Santral Bayi İstanbul Kadıköy Master Bölge Direktörlüğü
  apkDistributed?: number; // Dağıtılan toplam APK
  apkConverted?: number;   // Aboneye dönüşen APK
  apkDropped?: number;     // Aboneliği bırakan APK
  apkReturned?: number;    // Bırakıp geri dönen APK
  iban?: string;           // Hakediş IBAN
  taxNumber?: string;      // Vergi / Kimlik No
  demoDaysLeft?: number;   // Özel tanımlanan demo / canlı lisans gün sayısı
  isUnlimitedLicense?: boolean; // Sınırsız lisans durumu
  licenseBillingCycle?: 'monthly' | 'yearly'; // Aylık veya Yıllık lisans döngüsü
  isLicensePaid?: boolean; // Aktif dönem lisans ödemesi yapıldı mı (false ise yenileyene kadar hakediş Yöneticiye gider)
  licenseCommissionAlreadyPaid?: boolean; // Aktif dönem lisans primi bir kez ödendi mi (tekrar prim verilmez)
  previousRoleTitle?: string; // Terfi öncesi makam/yetki unvanı
  previousCode?: string;      // Terfi öncesi kurumsal kod
  promotedToTitle?: string;   // Terfi ettiği yeni makam unvanı
  promotedToRole?: 'ILLER' | 'IL' | 'ILCE' | 'ESNAF';
  promotedToCode?: string;
  promotionNotice?: string;   // Terfi bilgi özeti
  uplineIllerId?: string;     // Bağlı olduğu Türkiye İller Bayisi ID
  uplineIllerCode?: string;   // Bağlı olduğu Türkiye İller Bayisi Kodu
  movedByAdmin?: boolean;     // Yönetici (Genel Merkez) tarafından taşındı/atandı mı
  hasDownline?: boolean;      // Altına bayi/abone kazandırdı mı
  transferredFromRole?: string;
  transferredDownlineCounts?: {
    ilCount: number;
    ilceCount: number;
    esnafCount: number;
    referredEsnafCount: number;
  };
  transferredEarnedBalance?: number;
  transferredPaidRenewalTotal?: number;
  transferredPendingRenewalTotal?: number;
  renewalFeeItems?: Array<{
    id: string;
    entityId: string;
    entityName: string;
    entityRole: 'IL_BAYI' | 'ILCE_BAYI' | 'ESNAF_ABONE' | 'REFERANS_ESNAF';
    entityCode: string;
    amount: number;
    status: 'PAID' | 'PENDING';
    dueDate: string;
  }>;
  allowedFeatures?: {
    whitelabel: boolean;
    advancedLogs: boolean;
    subDealers: boolean;
    apiAccess: boolean;
  };
}

export interface Subscriber {
  id: string;
  name: string;
  companyName: string;
  phone: string;
  contactPhone?: string;
  extraContactPhones?: string[];
  dealerId?: string; // Managed by which dealer
  referredBySubscriberName?: string; // Kimden abone geldi (Referans esnaf)
  referredBySubscriberId?: string;
  uplineIllerId?: string;
  uplineIllerCode?: string;
  movedByAdmin?: boolean; // Yönetici (Genel Merkez) tarafından taşındı/atandı mı
  hasDownline?: boolean;  // Altına yeni esnaf abone kazandırdı mı
  apkStatus?: 'ACTIVE' | 'DEMO' | 'DROPPED' | 'RETURNED' | 'PENDING_INSTALL'; // APK Yaşam Döngüsü
  apkVersion?: string; // Yüklü APK Sürümü (v1.0 / v1.1)
  apkSentBy?: string; // APK gönderen yetkili kodu
  apkDistributedDate?: string;
  sector?: string; // Sektör
  subscriberCode?: string; // Kurumsal Abone Kodu, örn: KG-34-KDK-301
  previousRoleTitle?: string;
  previousCode?: string;
  promotedToTitle?: string;
  promotedToRole?: 'ILLER' | 'IL' | 'ILCE' | 'ESNAF';
  promotedToCode?: string;
  promotionNotice?: string;
  taxNumber?: string; // Vergi / TC No
  fullName?: string;
  gender?: string;
  birthYear?: string;
  tcNo?: string;
  birthProvince?: string;
  birthDistrict?: string;
  birthNeighborhood?: string;
  email?: string;
  status: 'ACTIVE' | 'SUSPENDED' | 'PENDING';
  plan: 'BASIC' | 'PRO' | 'ENTERPRISE';
  monthlyPrice?: number;
  demoDaysLeft?: number; // 3 Days Free Trial Demo
  isPaid?: boolean; // Paid subscriber?
  subdomain: string;
  customDomain?: string;
  createdAt: string;
  aiConfig: {
    agentName: string;
    voiceType: string; // 'Male_TR' | 'Female_TR' | 'Neutral_TR'
    greetingMessage: string;
    knowledgeBase: string; // Fiyat listesi, adres, çalışma saatleri vb.
    recordCalls: boolean;
    unlimitedCalls: boolean; // Dakika sistemi yok, sınırsız karşılama
    features: {
      information: boolean; // Bilgi verme
      noteTaking: boolean; // Not alma & CRM
      appointmentBooking: boolean; // Randevu verme & takvim
      priceNegotiation: boolean; // Fiyat verme, pazarlık & ikna etme
      warmTransfer?: boolean; // Ön görüşmeli / akıllı canlı aktarma & call screening
    };
    warmTransferConfig?: {
      enabled: boolean;
      screenAnonymousCallers: boolean; // Adını vermek istemeyenleri yetkiliye önceden sorup bildirme
      defaultCallbackMinutes: number; // Örn: 3 dakika içinde bizzat geri arayacağını iletme
    };
    negotiationDiscountPercent?: number; // Yapay zekaya tanınan maksimum pazarlık/indirim yetkisi (%)
    persuasionTone?: 'COURTEOUS' | 'PERSUASIVE' | 'SALES_FOCUSED';
    ivrExtensions?: {
      key: string; // e.g., "1", "2"
      department: string; // e.g., "Muhasebe"
      forwardNumber: string; // e.g., "0532..." or "101"
    }[];
  };
}

export interface CallLog {
  id: string;
  subscriberId: string;
  subscriberName: string;
  callerPhone: string;
  callerName?: string;
  timestamp: string;
  duration: number; // seconds
  status: 'COMPLETED' | 'MISSED' | 'AI_HANDLED';
  transcript: { speaker: 'AI' | 'CALLER'; text: string }[];
  aiSummary: string;
  extractedNotes: string;
  priceQuoted?: string;
  appointmentBooked?: string; // e.g., "Yarın 15:30 Onaylandı"
  negotiationOutcome?: string; // e.g., "%10 İkna İndirimiyle Anlaşıldı"
}

export interface DealerApplication {
  id: string;
  applicantName: string;
  companyName: string;
  phone: string;
  distributorDealerId: string; // Uygulamayı dağıtan / referans olan bayi
  distributorDealerName: string;
  distributorDealerCode?: string;
  requestedTier: DealerLicenseTier;
  licenseFee: number;
  status: 'PENDING_DEALER_APPROVAL' | 'APPROVED' | 'REJECTED';
  createdAt: string;
  approvedBy?: string; // 'DEALER' | 'ADMIN'
  approvedAt?: string;
  notes?: string;
  notifiedAdmin: boolean;
}

