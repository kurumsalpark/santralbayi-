import React, { useMemo, useState } from 'react';
import {
  Briefcase,
  Check,
  ChevronLeft,
  Copy,
  MapPin,
  Search,
  ShieldCheck,
  User,
  X
} from 'lucide-react';
import { Dealer, Subscriber } from './types';

export interface PersonIdentityRecord {
  id: string;
  entityType: 'ADMIN' | 'ILLER' | 'IL' | 'ILCE' | 'ESNAF';
  roleBadge: string;
  code: string;
  fullName: string;
  tcOrTaxNo: string;
  gender: string;
  birthYear: string;
  ageText: string;
  hometownProvince: string;
  hometownDistrict: string;
  hometownNeighborhood: string;
  hometownDisplay: string;
  profession: string;
  companyOrTitle: string;
  operatingRegion: string;
  businessAddress: string;
  phone: string;
  extraPhones: string[];
  email: string;
  statusLabel: string;
  isActive: boolean;
  uplineText: string;
  downlineSummary: string;
  licenseSummary: string;
  iban: string;
  createdAt: string;
}

interface AdminGlobalDirectoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  dealers: Dealer[];
  subscribers: Subscriber[];
  setupProfiles: Record<string, any>;
}

const computeAgeText = (birthYearRaw?: string): string => {
  if (!birthYearRaw) return '-';
  const yr = parseInt(birthYearRaw.trim(), 10);
  if (Number.isNaN(yr) || yr < 1920 || yr > 2026) return birthYearRaw;
  const currentYear = new Date().getFullYear();
  const age = Math.max(1, currentYear - yr);
  return `${yr} (${age} Yaş)`;
};

const buildHometownDisplay = (prov?: string, dist?: string, neigh?: string): string => {
  const parts = [prov, dist, neigh]
    .map((x) => (x || '').trim())
    .filter((x) => Boolean(x) && x !== '-');
  return parts.length > 0 ? parts.join(' / ') : 'Belirtilmedi';
};

export const AdminGlobalDirectoryModal: React.FC<AdminGlobalDirectoryModalProps> = ({
  isOpen,
  onClose,
  dealers,
  subscribers,
  setupProfiles
}) => {
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const records = useMemo<PersonIdentityRecord[]>(() => {
    const list: PersonIdentityRecord[] = [];

    // 1. Genel Merkez Yönetici (TR.000)
    const adminProf = setupProfiles['admin'];
    if (adminProf) {
      const adminProfession =
        (adminProf.isCustomProfession && adminProf.customProfessionVal?.trim())
          ? adminProf.customProfessionVal.trim()
          : adminProf.profession || 'Yazılım & Telekomünikasyon Yönetimi';
      const hProv = adminProf.birthProvince || 'Ardahan';
      const hDist = adminProf.birthDistrict || 'Damal';
      const hNeigh = adminProf.birthNeighborhood || '';

      list.push({
        id: 'admin-root',
        entityType: 'ADMIN',
        roleBadge: 'Genel Merkez Yönetici',
        code: 'TR.000',
        fullName: adminProf.fullName || 'Kenan Gürkan',
        tcOrTaxNo: adminProf.tcNo || '-',
        gender: adminProf.gender || 'Erkek',
        birthYear: adminProf.birthYear || '-',
        ageText: computeAgeText(adminProf.birthYear),
        hometownProvince: hProv,
        hometownDistrict: hDist,
        hometownNeighborhood: hNeigh,
        hometownDisplay: buildHometownDisplay(hProv, hDist, hNeigh),
        profession: adminProfession,
        companyOrTitle: adminProf.customerName || 'SantralBayi Genel Merkez',
        operatingRegion: 'Türkiye Geneli (81 İl)',
        businessAddress: adminProf.businessAddressConfig || 'Genel Merkez / İstanbul',
        phone: adminProf.customerPhone || '0537 603 16 45',
        extraPhones: Array.isArray(adminProf.extraPhones) ? adminProf.extraPhones.filter(Boolean) : [],
        email: adminProf.email || '-',
        statusLabel: 'Tam Yetkili Yönetici',
        isActive: true,
        uplineText: 'En Üst Merkez Makamı',
        downlineSummary: `${dealers.filter((d) => !d.id.startsWith('vacant-') && !d.id.startsWith('dist-')).length} Bayi · ${subscribers.length} Abone`,
        licenseSummary: 'Sınırsız Merkez Lisansı',
        iban: adminProf.iban || '-',
        createdAt: 'Kurucu Kayıt'
      });
    }

    // 2. Gerçek kayıtlı bayiler (boş şablonlar hariç)
    const activeDealers = dealers.filter(
      (d) =>
        !d.id.startsWith('vacant-') &&
        !d.id.startsWith('dist-') &&
        (d.status as string) !== 'VACANT' &&
        Boolean(d.contactName && d.contactName.trim() && d.contactName !== 'Atama Yapılmadı')
    );

    activeDealers.forEach((d) => {
      const isIller =
        d.id === 'd-0' ||
        d.level === 'ILLER' ||
        d.province === 'Türkiye Geneli' ||
        (d.dealerCode?.startsWith('TR.') && d.dealerCode !== 'TR.000');
      const isIl =
        !isIller &&
        (d.level === 'IL' ||
          (d.licenseTier === 'MASTER_1000' && d.canIssueDealership !== false && !d.dealerCode?.includes('.ilç.')));

      const fallbackKey = isIller ? 'iller_bayi' : isIl ? 'il_bayi' : 'ilce_bayi';
      const prof =
        setupProfiles[`dealer_${d.id}`] ||
        (d.id === 'd-0' || d.id === 'd-1' || d.id === 'd-2' ? setupProfiles[fallbackKey] : undefined);

      const parentDealer = d.parentId ? dealers.find((p) => p.id === d.parentId) : undefined;
      const childDealersCount = activeDealers.filter((c) => c.parentId === d.id).length;
      const connectedSubsCount = isIl
        ? subscribers.filter((s) => {
            const subD = dealers.find((x) => x.id === s.dealerId);
            return subD?.id === d.id || subD?.parentId === d.id;
          }).length
        : subscribers.filter((s) => s.dealerId === d.id).length;

      const hProv = prof?.birthProvince || d.province || 'İstanbul';
      const hDist = prof?.birthDistrict || d.district || 'Merkez';
      const hNeigh = prof?.birthNeighborhood || d.neighborhood || '';

      const professionVal =
        prof?.isCustomProfession && prof?.customProfessionVal?.trim()
          ? prof.customProfessionVal.trim()
          : prof?.profession ||
            (isIller
              ? 'Üst Bölge & Bayi Koordinatörü'
              : isIl
              ? 'İl Bölge Bayisi & Girişimci'
              : 'İlçe Bayisi & Saha Yöneticisi');

      const cycleText = d.licenseBillingCycle === 'yearly' ? 'Yıllık Lisans' : 'Aylık Lisans';
      const paidText = d.isLicensePaid === false ? 'Yenileme Bekliyor' : 'Ödendi · Aktif';

      list.push({
        id: `dealer-${d.id}`,
        entityType: isIller ? 'ILLER' : isIl ? 'IL' : 'ILCE',
        roleBadge: isIller ? 'Türkiye İller Bayisi' : isIl ? 'İl Bayisi' : 'İlçe Bayisi',
        code: d.dealerCode || (isIller ? 'TR.001' : isIl ? '34.il.001' : '34.ilç.001'),
        fullName: d.contactName || prof?.fullName || d.name,
        tcOrTaxNo: d.taxNumber || prof?.tcNo || 'Belirtilmedi',
        gender: prof?.gender || 'Belirtilmedi',
        birthYear: prof?.birthYear || '-',
        ageText: computeAgeText(prof?.birthYear),
        hometownProvince: hProv,
        hometownDistrict: hDist,
        hometownNeighborhood: hNeigh,
        hometownDisplay: buildHometownDisplay(hProv, hDist, hNeigh),
        profession: professionVal,
        companyOrTitle:
          prof?.customerName ||
          d.officialTitle ||
          d.name ||
          (isIller ? 'Türkiye İller Koordinatörlüğü' : `${d.province} Bayiliği`),
        operatingRegion: isIller
          ? 'Türkiye Geneli (81 İl)'
          : `${d.province || '-'}${d.district ? ` / ${d.district}` : ''}`,
        businessAddress:
          prof?.businessAddressConfig ||
          `${d.district ? `${d.district} / ` : ''}${d.province || 'İstanbul'}`,
        phone: d.contactPhone || prof?.customerPhone || '-',
        extraPhones: Array.isArray(prof?.extraPhones) ? prof.extraPhones.filter(Boolean) : [],
        email: prof?.email || 'Belirtilmedi',
        statusLabel: d.status === 'ACTIVE' ? 'Aktif Yetkili' : 'Onay / Askıda',
        isActive: d.status === 'ACTIVE',
        uplineText: isIller
          ? 'Genel Merkez Yönetici (TR.000)'
          : parentDealer
          ? `${parentDealer.contactName || parentDealer.name} (${parentDealer.dealerCode || 'TR.001'})`
          : 'Genel Merkez (TR.000)',
        downlineSummary: isIller
          ? `${activeDealers.filter((x) => x.id !== 'd-0' && x.level === 'IL').length} İl Bayisi · ${subscribers.length} Abone`
          : isIl
          ? `${childDealersCount} İlçe Bayisi · ${connectedSubsCount} Esnaf Abone`
          : `${connectedSubsCount || d.subscriberCount || 0} Esnaf Abone`,
        licenseSummary: `${cycleText} · ${paidText}`,
        iban: d.iban || prof?.iban || 'Belirtilmedi',
        createdAt: d.createdAt || '-'
      });
    });

    // 3. Gerçek kayıtlı esnaf aboneler
    subscribers.forEach((s) => {
      const parentDealer = s.dealerId ? dealers.find((d) => d.id === s.dealerId) : undefined;
      const prof =
        setupProfiles[`subscriber_${s.id}`] || (s.id === 's-1' ? setupProfiles['esnaf'] : undefined);
      const referredCount = subscribers.filter((r) => r.referredBySubscriberId === s.id).length;

      const hProv = s.birthProvince || prof?.birthProvince || parentDealer?.province || 'İstanbul';
      const hDist = s.birthDistrict || prof?.birthDistrict || parentDealer?.district || 'Kadıköy';
      const hNeigh = s.birthNeighborhood || prof?.birthNeighborhood || '';

      const professionVal =
        prof?.isCustomProfession && prof?.customProfessionVal?.trim()
          ? prof.customProfessionVal.trim()
          : prof?.profession || s.sector || 'Esnaf & İşletme Sahibi';

      const birthYr = s.birthYear || prof?.birthYear || '';

      list.push({
        id: `sub-${s.id}`,
        entityType: 'ESNAF',
        roleBadge: 'Esnaf Abone',
        code: s.subscriberCode || '34.e.001',
        fullName: s.fullName || prof?.fullName || s.name || 'İşletme Yetkilisi',
        tcOrTaxNo: s.tcNo || s.taxNumber || prof?.tcNo || 'Belirtilmedi',
        gender: s.gender || prof?.gender || 'Belirtilmedi',
        birthYear: birthYr || '-',
        ageText: computeAgeText(birthYr),
        hometownProvince: hProv,
        hometownDistrict: hDist,
        hometownNeighborhood: hNeigh,
        hometownDisplay: buildHometownDisplay(hProv, hDist, hNeigh),
        profession: professionVal,
        companyOrTitle: s.companyName || prof?.customerName || s.name || 'Esnaf İşletmesi',
        operatingRegion: `${parentDealer?.province || hProv}${parentDealer?.district ? ` / ${parentDealer.district}` : ''}`,
        businessAddress:
          prof?.businessAddressConfig ||
          `${hNeigh ? `${hNeigh} Mah. ` : ''}${hDist} / ${hProv}`,
        phone: s.phone || s.contactPhone || prof?.customerPhone || '-',
        extraPhones:
          s.extraContactPhones && s.extraContactPhones.length > 0
            ? s.extraContactPhones
            : Array.isArray(prof?.extraPhones)
            ? prof.extraPhones.filter(Boolean)
            : [],
        email: s.email || prof?.email || 'Belirtilmedi',
        statusLabel: s.status === 'ACTIVE' ? 'Aktif Abone' : 'Demo / Beklemede',
        isActive: s.status === 'ACTIVE',
        uplineText: s.referredBySubscriberName
          ? `Tavsiye: ${s.referredBySubscriberName} · Bayi: ${parentDealer?.dealerCode || '-'}`
          : parentDealer
          ? `${parentDealer.contactName || parentDealer.name} (${parentDealer.dealerCode || '-'})`
          : 'Merkez Havuzu (TR.000)',
        downlineSummary: `${referredCount} Tavsiye Edilen Esnaf`,
        licenseSummary: `${s.plan} Sabit Paket${s.monthlyPrice ? ` · ₺${s.monthlyPrice.toLocaleString('tr-TR')}/Ay` : ''}`,
        iban: (s as any).iban || prof?.iban || 'Belirtilmedi',
        createdAt: s.createdAt || '-'
      });
    });

    return list;
  }, [dealers, subscribers, setupProfiles]);

  const trimmedQuery = query.trim();

  const matchedRecords = useMemo(() => {
    if (!trimmedQuery) return [];
    const normalizedText = trimmedQuery.toLocaleLowerCase('tr-TR').replace(/\s+/g, '');
    const queryDigits = trimmedQuery.replace(/\D/g, '');
    const last10QueryDigits = queryDigits.length >= 10 ? queryDigits.slice(-10) : queryDigits;

    return records.filter((rec) => {
      const textHaystack = [
        rec.fullName,
        rec.phone,
        ...rec.extraPhones,
        rec.code,
        rec.tcOrTaxNo,
        rec.hometownDisplay,
        rec.profession,
        rec.companyOrTitle,
        rec.operatingRegion
      ]
        .join(' ')
        .toLocaleLowerCase('tr-TR')
        .replace(/\s+/g, '');

      if (textHaystack.includes(normalizedText)) return true;

      if (last10QueryDigits.length >= 3) {
        const phoneDigits = rec.phone.replace(/\D/g, '');
        const tcDigits = rec.tcOrTaxNo.replace(/\D/g, '');
        if (phoneDigits.includes(last10QueryDigits) || tcDigits.includes(last10QueryDigits)) {
          return true;
        }
      }

      return false;
    });
  }, [records, trimmedQuery]);

  const selectedRecord = useMemo(
    () => records.find((r) => r.id === selectedId) || null,
    [records, selectedId]
  );

  if (!isOpen) return null;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trimmedQuery) return;
    if (matchedRecords.length === 1) {
      setSelectedId(matchedRecords[0].id);
    } else {
      setSelectedId(null);
    }
  };

  const handleCopy = (key: string, text: string) => {
    if (!text || text === '-' || text === 'Belirtilmedi') return;
    try {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 1600);
    } catch {}
  };

  return (
    <div className="fixed inset-0 z-[90] bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-2.5 sm:p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-md max-h-[92vh] flex flex-col shadow-2xl overflow-hidden text-left">
        {/* Üst Başlık */}
        <div className="px-4 py-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            {selectedRecord ? (
              <button
                type="button"
                onClick={() => setSelectedId(null)}
                className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center justify-center text-slate-200 shrink-0 cursor-pointer"
                title="Arama Sonuçlarına Dön"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            ) : (
              <div className="w-8 h-8 rounded-xl bg-sky-500/15 border border-sky-500/40 flex items-center justify-center text-sky-400 shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
            )}
            <div className="min-w-0">
              <h3 className="text-xs sm:text-sm font-bold text-white truncate">
                {selectedRecord ? 'Kişi & Kimlik Bilgi Kartı' : 'Kimlik & Kişi Sorgulama'}
              </h3>
              <p className="text-[10px] text-slate-400 truncate font-mono tabular-nums">
                {selectedRecord
                  ? `${selectedRecord.code} · ${selectedRecord.roleBadge}`
                  : 'İsim veya Telefon Numarası ile Kimlik Sorgu'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              setSelectedId(null);
              setQuery('');
              onClose();
            }}
            className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-rose-950/70 border border-slate-700 hover:border-rose-500/60 flex items-center justify-center text-slate-300 hover:text-rose-300 transition-colors shrink-0 cursor-pointer"
            title="Kapat"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Sabit Arama Formu (İsim veya Numara Girip Sorgulama) */}
        <form
          onSubmit={handleSearchSubmit}
          className="p-3.5 bg-slate-900 border-b border-slate-800/90 flex items-center gap-2 shrink-0"
        >
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-sky-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                if (selectedId) setSelectedId(null);
              }}
              placeholder="İsim soyisim veya numara giriniz..."
              className="w-full bg-slate-950 border border-slate-700 focus:border-sky-400 rounded-xl pl-9 pr-8 py-2.5 text-xs text-white outline-none placeholder:text-slate-500"
            />
            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setSelectedId(null);
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 cursor-pointer"
                title="Temizle"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <button
            type="submit"
            className="px-3.5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-black text-xs shrink-0 cursor-pointer transition-colors"
          >
            Sorgula
          </button>
        </form>

        {/* İÇERİK ALANI */}
        {selectedRecord ? (
          /* TAM KİMLİK, NERELİ VE NE İŞ YAPIYOR BİLGİ KARTI */
          <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs">
            {/* Üst Özet Başlık */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-3.5 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-300 font-black text-sm shrink-0">
                    {selectedRecord.fullName.charAt(0).toLocaleUpperCase('tr-TR')}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-black text-white truncate">
                      {selectedRecord.fullName}
                    </h4>
                    <p className="text-[11px] text-sky-400 font-semibold truncate">
                      {selectedRecord.roleBadge}
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-mono tabular-nums font-black text-amber-300 shrink-0">
                  {selectedRecord.code}
                </span>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Kayıt Durumu</span>
                <span
                  className={`font-bold ${
                    selectedRecord.isActive ? 'text-emerald-400' : 'text-amber-400'
                  }`}
                >
                  {selectedRecord.statusLabel}
                </span>
              </div>
            </div>

            {/* 1. KİMLİK BİLGİLERİ */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden">
              <div className="px-3.5 py-2 bg-slate-900/70 border-b border-slate-800 flex items-center gap-1.5 text-[11px] font-bold text-sky-300">
                <User className="w-3.5 h-3.5" />
                <span>Kimlik Bilgileri</span>
              </div>
              <div className="divide-y divide-slate-800/80">
                <div className="px-3.5 py-2.5 flex items-center justify-between gap-2">
                  <span className="text-slate-400">Ad Soyad</span>
                  <span className="font-bold text-white text-right">{selectedRecord.fullName}</span>
                </div>
                <div className="px-3.5 py-2.5 flex items-center justify-between gap-2">
                  <span className="text-slate-400">TC Kimlik / Vergi No</span>
                  <span className="font-mono tabular-nums font-semibold text-slate-200">
                    {selectedRecord.tcOrTaxNo}
                  </span>
                </div>
                <div className="px-3.5 py-2.5 flex items-center justify-between gap-2">
                  <span className="text-slate-400">Doğum Yılı & Yaşı</span>
                  <span className="font-mono tabular-nums text-slate-200">{selectedRecord.ageText}</span>
                </div>
                <div className="px-3.5 py-2.5 flex items-center justify-between gap-2">
                  <span className="text-slate-400">Cinsiyet</span>
                  <span className="font-semibold text-slate-200">{selectedRecord.gender}</span>
                </div>
              </div>
            </div>

            {/* 2. NERELİ & BÖLGE BİLGİLERİ */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden">
              <div className="px-3.5 py-2 bg-slate-900/70 border-b border-slate-800 flex items-center gap-1.5 text-[11px] font-bold text-emerald-300">
                <MapPin className="w-3.5 h-3.5" />
                <span>Nereli & Bölge Bilgisi</span>
              </div>
              <div className="divide-y divide-slate-800/80">
                <div className="px-3.5 py-2.5 flex items-center justify-between gap-2">
                  <span className="text-slate-400 shrink-0">Nereli (Memleket)</span>
                  <span className="font-bold text-emerald-300 text-right">
                    {selectedRecord.hometownDisplay}
                  </span>
                </div>
                <div className="px-3.5 py-2.5 flex items-center justify-between gap-2">
                  <span className="text-slate-400 shrink-0">Faaliyet Bölgesi</span>
                  <span className="font-semibold text-slate-200 text-right">
                    {selectedRecord.operatingRegion}
                  </span>
                </div>
                <div className="px-3.5 py-2.5 flex items-start justify-between gap-3">
                  <span className="text-slate-400 shrink-0">Açık Adres / Konum</span>
                  <span className="text-slate-200 text-right break-words">
                    {selectedRecord.businessAddress}
                  </span>
                </div>
              </div>
            </div>

            {/* 3. NE İŞ YAPIYOR (MESLEK & İŞLETME) */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden">
              <div className="px-3.5 py-2 bg-slate-900/70 border-b border-slate-800 flex items-center gap-1.5 text-[11px] font-bold text-amber-300">
                <Briefcase className="w-3.5 h-3.5" />
                <span>Ne İş Yapıyor (Meslek & Kurum)</span>
              </div>
              <div className="divide-y divide-slate-800/80">
                <div className="px-3.5 py-2.5 flex items-center justify-between gap-2">
                  <span className="text-slate-400 shrink-0">Mesleği / İşi</span>
                  <span className="font-bold text-amber-300 text-right">
                    {selectedRecord.profession}
                  </span>
                </div>
                <div className="px-3.5 py-2.5 flex items-center justify-between gap-2">
                  <span className="text-slate-400 shrink-0">Firma / İşletme Unvanı</span>
                  <span className="font-semibold text-white text-right break-words">
                    {selectedRecord.companyOrTitle}
                  </span>
                </div>
                <div className="px-3.5 py-2.5 flex items-center justify-between gap-2">
                  <span className="text-slate-400 shrink-0">Sistemdeki Görevi</span>
                  <span className="font-semibold text-sky-300 text-right">
                    {selectedRecord.roleBadge} ({selectedRecord.code})
                  </span>
                </div>
              </div>
            </div>

            {/* 4. İLETİŞİM & SİSTEM DETAYLARI (ARAMA TUŞU YOK, METİN + KOPYALA) */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl divide-y divide-slate-800/80">
              <div className="px-3.5 py-2.5 flex items-center justify-between gap-2">
                <span className="text-slate-400">GSM Telefon</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono tabular-nums font-bold text-white">
                    {selectedRecord.phone}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy('phone', selectedRecord.phone)}
                    className="px-2 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-[10px] font-semibold text-slate-300 flex items-center gap-1 cursor-pointer"
                  >
                    {copiedKey === 'phone' ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span>Kopyalandı</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 text-slate-400" />
                        <span>Kopyala</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {selectedRecord.extraPhones.length > 0 && (
                <div className="px-3.5 py-2.5 flex items-center justify-between gap-2">
                  <span className="text-slate-400">Ek Numaralar</span>
                  <span className="font-mono tabular-nums text-slate-200 text-right">
                    {selectedRecord.extraPhones.join(', ')}
                  </span>
                </div>
              )}

              <div className="px-3.5 py-2.5 flex items-center justify-between gap-2">
                <span className="text-slate-400">E-Posta</span>
                <span className="text-slate-200 truncate">{selectedRecord.email}</span>
              </div>

              <div className="px-3.5 py-2.5 flex items-center justify-between gap-2">
                <span className="text-slate-400 shrink-0">Bağlı Olduğu Üst</span>
                <span className="font-semibold text-cyan-300 text-right truncate">
                  {selectedRecord.uplineText}
                </span>
              </div>

              <div className="px-3.5 py-2.5 flex items-center justify-between gap-2">
                <span className="text-slate-400 shrink-0">Alt Ağ Özeti</span>
                <span className="font-mono tabular-nums text-slate-200 text-right">
                  {selectedRecord.downlineSummary}
                </span>
              </div>

              <div className="px-3.5 py-2.5 flex items-center justify-between gap-2">
                <span className="text-slate-400 shrink-0">Lisans / Paket</span>
                <span className="font-semibold text-slate-200 text-right">
                  {selectedRecord.licenseSummary}
                </span>
              </div>

              <div className="px-3.5 py-2.5 flex items-center justify-between gap-2">
                <span className="text-slate-400">Kayıt Tarihi</span>
                <span className="font-mono tabular-nums text-slate-300">
                  {selectedRecord.createdAt}
                </span>
              </div>

              <div className="px-3.5 py-2.5 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Kayıtlı IBAN</span>
                  {selectedRecord.iban && selectedRecord.iban !== 'Belirtilmedi' && selectedRecord.iban !== '-' && (
                    <button
                      type="button"
                      onClick={() => handleCopy('iban', selectedRecord.iban)}
                      className="text-[10px] text-sky-400 hover:text-sky-300 font-semibold cursor-pointer"
                    >
                      {copiedKey === 'iban' ? '✓ Kopyalandı' : 'IBAN Kopyala'}
                    </button>
                  )}
                </div>
                <p className="font-mono tabular-nums text-[11px] text-slate-200 break-all">
                  {selectedRecord.iban}
                </p>
              </div>
            </div>
          </div>
        ) : !trimmedQuery ? (
          /* HENÜZ ARAMA YAPILMADAN ÖNCEKİ SADE SORGULAMA EKRANI */
          <div className="p-6 text-center space-y-2.5">
            <div className="w-12 h-12 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center text-sky-400 mx-auto">
              <Search className="w-5 h-5" />
            </div>
            <p className="text-xs font-bold text-slate-200">
              İsim Soyisim veya Telefon Numarası Giriniz
            </p>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Yukarıdaki kutuya aradığınız kişinin adını, cep telefonu numarasını veya sabit kodunu yazıp{' '}
              <span className="text-sky-300 font-semibold">Sorgula</span> butonuna bastığınızda kimlik bilgileri, nereli olduğu ve ne iş yaptığı ekrana gelir.
            </p>
          </div>
        ) : (
          /* EŞLEŞEN KİŞİLER LİSTESİ */
          <div className="flex-1 overflow-y-auto p-3.5 space-y-2">
            {matchedRecords.length === 0 ? (
              <div className="text-center py-8 px-4 text-xs text-slate-400 bg-slate-950/60 rounded-2xl border border-slate-800">
                “<span className="text-white font-semibold">{trimmedQuery}</span>” ile eşleşen kişi veya numara bulunamadı.
              </div>
            ) : (
              <>
                <p className="text-[10.5px] text-slate-400 px-1 font-mono tabular-nums">
                  {matchedRecords.length} eşleşen kayıt bulundu — kimlik kartı için dokunun:
                </p>
                {matchedRecords.map((rec) => (
                  <button
                    key={rec.id}
                    type="button"
                    onClick={() => setSelectedId(rec.id)}
                    className="w-full text-left bg-slate-950 hover:bg-slate-950/80 border border-slate-800 hover:border-sky-500/60 rounded-2xl p-3 space-y-1.5 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-black text-white truncate">
                        {rec.fullName}
                      </span>
                      <span className="text-[10.5px] font-mono tabular-nums font-bold text-amber-300 shrink-0">
                        {rec.code}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px]">
                      <span className="text-emerald-300 font-semibold">
                        Memleket: {rec.hometownDisplay}
                      </span>
                      <span className="text-slate-600">·</span>
                      <span className="text-amber-300 font-semibold truncate">
                        İşi: {rec.profession}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-2 text-[10.5px] text-slate-400 pt-0.5">
                      <span className="truncate">
                        {rec.roleBadge} · {rec.companyOrTitle}
                      </span>
                      <span className="font-mono tabular-nums text-slate-200 shrink-0">
                        {rec.phone}
                      </span>
                    </div>
                  </button>
                ))}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
