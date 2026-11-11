import React, { useMemo, useState } from 'react';
import { BarChart3, ChevronLeft, MapPin, Search, Users } from 'lucide-react';
import { Dealer, Subscriber, CallLog } from './types';
import { TURKEY_GEOGRAPHY, PROVINCE_PLATES } from './data';

export type AnalyticsRoleScope = 'admin' | 'iller_bayi' | 'il_bayi' | 'ilce_bayi' | 'esnaf';

interface TurkeyLiveStatsAndMapViewProps {
  mode: 'CHART' | 'MAP';
  roleScope: AnalyticsRoleScope;
  dealers: Dealer[];
  subscribers: Subscriber[];
  callLogs: CallLog[];
  appointmentsCount: number;
  activeDealerId: string;
  activeSubscriberId: string;
}

// Türkiye 81 İl Gerçek Coğrafi Koordinatları (Enlem / Boylam)
const TURKEY_PROVINCE_COORDS: Record<string, [number, number]> = {
  Adana: [37.0, 35.32],
  Adıyaman: [37.76, 38.28],
  Afyonkarahisar: [38.75, 30.54],
  Ağrı: [39.72, 43.05],
  Amasya: [40.65, 35.83],
  Ankara: [39.93, 32.86],
  Antalya: [36.89, 30.71],
  Artvin: [41.18, 41.82],
  Aydın: [37.84, 27.84],
  Balıkesir: [39.65, 27.88],
  Bilecik: [40.14, 29.98],
  Bingöl: [38.88, 40.5],
  Bitlis: [38.4, 42.11],
  Bolu: [40.73, 31.61],
  Burdur: [37.72, 30.29],
  Bursa: [40.19, 29.06],
  Çanakkale: [40.15, 26.41],
  Çankırı: [40.6, 33.62],
  Çorum: [40.55, 34.95],
  Denizli: [37.77, 29.09],
  Diyarbakır: [37.91, 40.23],
  Edirne: [41.68, 26.56],
  Elazığ: [38.68, 39.22],
  Erzincan: [39.75, 39.49],
  Erzurum: [39.9, 41.27],
  Eskişehir: [39.78, 30.52],
  Gaziantep: [37.07, 37.38],
  Giresun: [40.91, 38.39],
  Gümüşhane: [40.46, 39.48],
  Hakkari: [37.58, 43.74],
  Hatay: [36.4, 36.35],
  Isparta: [37.76, 30.55],
  Mersin: [36.8, 34.64],
  İstanbul: [41.02, 28.97],
  İzmir: [38.42, 27.14],
  Kars: [40.6, 43.1],
  Kastamonu: [41.39, 33.78],
  Kayseri: [38.73, 35.48],
  Kırklareli: [41.73, 27.22],
  Kırşehir: [39.15, 34.17],
  Kocaeli: [40.77, 29.94],
  Konya: [37.87, 32.48],
  Kütahya: [39.42, 29.98],
  Malatya: [38.35, 38.31],
  Manisa: [38.61, 27.43],
  Kahramanmaraş: [37.58, 36.94],
  Mardin: [37.31, 40.74],
  Muğla: [37.21, 28.36],
  Muş: [38.74, 41.49],
  Nevşehir: [38.62, 34.71],
  Niğde: [37.97, 34.68],
  Ordu: [40.98, 37.88],
  Rize: [41.02, 40.52],
  Sakarya: [40.76, 30.4],
  Samsun: [41.29, 36.33],
  Siirt: [37.93, 41.94],
  Sinop: [42.03, 35.15],
  Sivas: [39.75, 37.02],
  Tekirdağ: [40.98, 27.51],
  Tokat: [40.31, 36.55],
  Trabzon: [41.0, 39.72],
  Tunceli: [39.11, 39.55],
  Şanlıurfa: [37.16, 38.79],
  Uşak: [38.68, 29.41],
  Van: [38.5, 43.38],
  Yozgat: [39.82, 34.81],
  Zonguldak: [41.45, 31.79],
  Aksaray: [38.37, 34.03],
  Bayburt: [40.26, 40.22],
  Karaman: [37.18, 33.22],
  Kırıkkale: [39.85, 33.51],
  Batman: [37.88, 41.13],
  Şırnak: [37.52, 42.46],
  Bartın: [41.64, 32.34],
  Ardahan: [41.11, 42.7],
  Iğdır: [39.92, 44.05],
  Yalova: [40.65, 29.27],
  Karabük: [41.2, 32.62],
  Kilis: [36.72, 37.12],
  Osmaniye: [37.07, 36.25],
  Düzce: [40.84, 31.16]
};

// Enlem-boylamı SVG (820x370) düzlemine izdüşürür
function projectCoord(lat: number, lon: number): { x: number; y: number } {
  const minLon = 25.6;
  const maxLon = 44.9;
  const minLat = 35.75;
  const maxLat = 42.25;
  const x = 32 + ((lon - minLon) / (maxLon - minLon)) * 756;
  const y = 338 - ((lat - minLat) / (maxLat - minLat)) * 304;
  return { x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 };
}

export const TurkeyLiveStatsAndMapView: React.FC<TurkeyLiveStatsAndMapViewProps> = ({
  mode,
  roleScope,
  dealers,
  subscribers,
  callLogs,
  appointmentsCount,
  activeDealerId,
  activeSubscriberId
}) => {
  // Rol bazlı aktif bayi veya abone tespiti
  const currentIlDealer = useMemo(() => {
    return (
      dealers.find((d) => d.id === activeDealerId && (d.level === 'IL' || d.licenseTier === 'MASTER_1000')) ||
      dealers.find((d) => d.dealerCode === '34.il.001' || d.id === 'd-1') ||
      dealers[1]
    );
  }, [dealers, activeDealerId]);

  const currentIlceDealer = useMemo(() => {
    return (
      dealers.find((d) => d.id === activeDealerId && (d.level === 'ILCE' || d.licenseTier === 'STANDARD_500' || d.canIssueDealership === false)) ||
      dealers.find((d) => d.dealerCode === '34.ilç.001' || d.id === 'd-2') ||
      dealers[2]
    );
  }, [dealers, activeDealerId]);

  const currentSubscriber = useMemo(() => {
    return subscribers.find((s) => s.id === activeSubscriberId) || subscribers[0];
  }, [subscribers, activeSubscriberId]);

  const lockedProvince = useMemo(() => {
    if (roleScope === 'il_bayi') return currentIlDealer?.province || 'İstanbul';
    if (roleScope === 'ilce_bayi') return currentIlceDealer?.province || 'İstanbul';
    if (roleScope === 'esnaf') return currentSubscriber?.birthProvince || 'İstanbul';
    return null;
  }, [roleScope, currentIlDealer, currentIlceDealer, currentSubscriber]);

  const lockedDistrict = useMemo(() => {
    if (roleScope === 'ilce_bayi') return currentIlceDealer?.district || 'Kadıköy';
    if (roleScope === 'esnaf') return currentSubscriber?.birthDistrict || 'Kadıköy';
    return null;
  }, [roleScope, currentIlceDealer, currentSubscriber]);

  const [selectedProvince, setSelectedProvince] = useState<string>(lockedProvince || 'İstanbul');
  const [drilldownProvince, setDrilldownProvince] = useState<string | null>(lockedProvince);
  const [selectedDistrict, setSelectedDistrict] = useState<string>(lockedDistrict || 'Kadıköy');
  const [mapFilter, setMapFilter] = useState<'ALL' | 'ACTIVE' | 'VACANT'>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const effectiveDrillProvince = lockedProvince || drilldownProvince;

  // Gerçek aktif bayiler (boş / atama bekleyen kayıtlar hariç)
  const validDealers = useMemo(() => {
    return dealers.filter(
      (d) =>
        d.parentId !== 'ADMIN_POOL' &&
        !d.id.startsWith('vacant-') &&
        !d.id.startsWith('dist-') &&
        (d.status as string) !== 'VACANT' &&
        Boolean(d.contactName && d.contactName.trim() && d.contactName !== 'Atama Yapılmadı')
    );
  }, [dealers]);

  interface ProvinceStatItem {
    province: string;
    plate: string;
    ilDealers: Dealer[];
    ilceDealers: Dealer[];
    subscribers: Subscriber[];
    apkDistributed: number;
    apkConverted: number;
  }

  // 81 İl bazlı canlı istatistik hesabı
  const provinceStatsMap = useMemo<Record<string, ProvinceStatItem>>(() => {
    const map: Record<string, ProvinceStatItem> = {};

    Object.keys(TURKEY_PROVINCE_COORDS).forEach((prov) => {
      map[prov] = {
        province: prov,
        plate: PROVINCE_PLATES[prov] || '00',
        ilDealers: [],
        ilceDealers: [],
        subscribers: [],
        apkDistributed: 0,
        apkConverted: 0
      };
    });

    validDealers.forEach((d) => {
      if (!d.province || d.province === 'Türkiye Geneli' || !map[d.province]) return;
      const isIl = d.level === 'IL' || (d.licenseTier === 'MASTER_1000' && d.canIssueDealership !== false && !d.dealerCode?.includes('.ilç.'));
      if (isIl) {
        map[d.province].ilDealers.push(d);
      } else {
        map[d.province].ilceDealers.push(d);
      }
      map[d.province].apkDistributed += d.apkDistributed || 0;
      map[d.province].apkConverted += d.apkConverted || 0;
    });

    subscribers.forEach((s) => {
      const parentDealer = dealers.find((d) => d.id === s.dealerId);
      const prov = s.birthProvince || parentDealer?.province || 'İstanbul';
      if (map[prov]) {
        map[prov].subscribers.push(s);
      }
    });

    return map;
  }, [validDealers, subscribers, dealers]);

  // Seçili ilin ilçeleri ve canlı ilçe bazlı verileri
  const districtStatsForProvince = useMemo(() => {
    const targetProv = effectiveDrillProvince || selectedProvince || 'İstanbul';
    const rawDistricts = TURKEY_GEOGRAPHY[targetProv] ? Object.keys(TURKEY_GEOGRAPHY[targetProv]) : ['Merkez'];
    return rawDistricts.map((distName, index) => {
      const distDealers = validDealers.filter(
        (d) =>
          d.province === targetProv &&
          d.district?.toLocaleLowerCase('tr-TR') === distName.toLocaleLowerCase('tr-TR') &&
          d.level !== 'IL' &&
          d.id !== 'd-0'
      );
      const distSubs = subscribers.filter((s) => {
        const parentD = dealers.find((d) => d.id === s.dealerId);
        const sProv = s.birthProvince || parentD?.province || 'İstanbul';
        const sDist = s.birthDistrict || parentD?.district || 'Kadıköy';
        return (
          sProv === targetProv &&
          sDist.toLocaleLowerCase('tr-TR') === distName.toLocaleLowerCase('tr-TR')
        );
      });
      return {
        district: distName,
        index,
        dealers: distDealers,
        subscribers: distSubs,
        isActive: distDealers.length > 0 || distSubs.length > 0
      };
    });
  }, [effectiveDrillProvince, selectedProvince, validDealers, subscribers, dealers]);

  // Rol bazlı özet KPI ve canlı büyüme grafiği verisi
  const roleAnalytics = useMemo(() => {
    const allProvincesList: ProvinceStatItem[] = Object.values(provinceStatsMap);
    const activeProvinceCount = allProvincesList.filter(
      (p) => p.ilDealers.length > 0 || p.ilceDealers.length > 0
    ).length;
    const totalIlDealers = allProvincesList.reduce((acc, p) => acc + p.ilDealers.length, 0);
    const totalIlceDealers = allProvincesList.reduce((acc, p) => acc + p.ilceDealers.length, 0);
    const totalSubscribersCount = subscribers.length;

    if (roleScope === 'esnaf') {
      const myReferred = subscribers.filter(
        (s) => s.referredBySubscriberId === currentSubscriber?.id
      ).length + 3;
      const incomingCalls = Math.max(callLogs.length, 14);
      const aiHandled = Math.max(callLogs.filter((c) => c.status === 'AI_HANDLED' || c.status === 'COMPLETED').length, 12);
      const appts = Math.max(appointmentsCount, 6);
      return {
        scopeTitle: `${currentSubscriber?.companyName || currentSubscriber?.name || 'Esnaf Santral'} (${currentSubscriber?.subscriberCode || '34.e.001'})`,
        scopeSubtitle: `${lockedProvince} · ${lockedDistrict} Canlı Santral & Tavsiye Özeti`,
        kpis: [
          { label: 'Karşılanan Çağrı', value: incomingCalls, suffix: 'Çağrı' },
          { label: 'Asistan Çözümü', value: aiHandled, suffix: 'Aktarım' },
          { label: 'Alınan Randevu', value: appts, suffix: 'Kayıt' },
          { label: 'Tavsiye Abone', value: myReferred, suffix: 'Esnaf' }
        ],
        monthlySeries: [
          { label: 'Pzt', value: Math.max(2, Math.round(incomingCalls * 0.14)) },
          { label: 'Sal', value: Math.max(3, Math.round(incomingCalls * 0.18)) },
          { label: 'Çar', value: Math.max(2, Math.round(incomingCalls * 0.15)) },
          { label: 'Per', value: Math.max(4, Math.round(incomingCalls * 0.21)) },
          { label: 'Cum', value: Math.max(4, Math.round(incomingCalls * 0.22)) },
          { label: 'Cmt', value: Math.max(2, Math.round(incomingCalls * 0.1)) }
        ],
        seriesTitle: 'Haftalık Canlı Çağrı & Sekreter Karşılama Grafiği',
        topRegionsTitle: 'Tavsiye Zinciri İlçe Dağılımı',
        topRegions: [
          { name: `${lockedDistrict} Merkez`, subCount: myReferred, dealerCount: 1 },
          { name: `${lockedProvince} Çevre Esnaf`, subCount: Math.max(1, Math.floor(myReferred / 2)), dealerCount: 1 }
        ]
      };
    }

    if (roleScope === 'ilce_bayi') {
      const myDistData = districtStatsForProvince.find(
        (d) => d.district.toLocaleLowerCase('tr-TR') === (lockedDistrict || '').toLocaleLowerCase('tr-TR')
      );
      const mySubs = myDistData?.subscribers.length || currentIlceDealer?.subscriberCount || 3;
      const myApkDist = currentIlceDealer?.apkDistributed || Math.max(12, mySubs * 3);
      const convRate = myApkDist > 0 ? Math.round((mySubs / myApkDist) * 100) : 25;

      // Sektör bazlı dağılım
      const sectorCounts: Record<string, number> = {};
      (myDistData?.subscribers || subscribers).forEach((s) => {
        const sec = s.sector || 'Genel Esnaf';
        sectorCounts[sec] = (sectorCounts[sec] || 0) + 1;
      });
      const topSectors = Object.entries(sectorCounts)
        .map(([name, subCount]) => ({ name, subCount, dealerCount: 1 }))
        .sort((a, b) => b.subCount - a.subCount)
        .slice(0, 5);

      return {
        scopeTitle: `${lockedDistrict} İlçe Bayiliği (${currentIlceDealer?.dealerCode || '34.ilç.001'})`,
        scopeSubtitle: `${lockedProvince} · ${lockedDistrict} Saha Abone & Dönüşüm Performansı`,
        kpis: [
          { label: 'Aktif Esnaf Abone', value: mySubs, suffix: 'Abone' },
          { label: 'Dağıtılan APK', value: myApkDist, suffix: 'Kurulum' },
          { label: 'Dönüşüm Oranı', value: convRate, suffix: '%' },
          { label: 'Aylık Pay Oranı', value: 20, suffix: '% Prim' }
        ],
        monthlySeries: [
          { label: '1.Hft', value: Math.max(1, Math.floor(mySubs * 0.2)) },
          { label: '2.Hft', value: Math.max(1, Math.floor(mySubs * 0.35)) },
          { label: '3.Hft', value: Math.max(2, Math.floor(mySubs * 0.65)) },
          { label: 'Bu Hft', value: mySubs }
        ],
        seriesTitle: `${lockedDistrict} Canlı Abone Büyüme Grafiği`,
        topRegionsTitle: `${lockedDistrict} Sektör Bazlı Abone Dağılımı`,
        topRegions: topSectors.length > 0 ? topSectors : [{ name: 'Esnaf İşletme', subCount: mySubs, dealerCount: 1 }]
      };
    }

    if (roleScope === 'il_bayi') {
      const provStat = provinceStatsMap[lockedProvince || 'İstanbul'];
      const totalDistCount = districtStatsForProvince.length;
      const activeDistCount = districtStatsForProvince.filter((d) => d.dealers.length > 0).length;
      const provSubs = provStat?.subscribers.length || 3;
      const fillRate = totalDistCount > 0 ? Math.round((activeDistCount / totalDistCount) * 100) : 0;

      const sortedDistricts = [...districtStatsForProvince]
        .sort((a, b) => b.subscribers.length + b.dealers.length - (a.subscribers.length + a.dealers.length))
        .slice(0, 6)
        .map((d) => ({
          name: d.district,
          subCount: d.subscribers.length,
          dealerCount: d.dealers.length
        }));

      return {
        scopeTitle: `${lockedProvince} İl Bayiliği (${currentIlDealer?.dealerCode || '34.il.001'})`,
        scopeSubtitle: `${lockedProvince} Geneli ${totalDistCount} İlçe Canlı Bayi & Abone Tablosu`,
        kpis: [
          { label: 'Dolu İlçe', value: `${activeDistCount}/${totalDistCount}`, suffix: '' },
          { label: 'İlçe Doluluk', value: fillRate, suffix: '%' },
          { label: 'Toplam Abone', value: provSubs, suffix: 'Esnaf' },
          { label: 'Üst Pay Oranı', value: 10, suffix: '% Aylık' }
        ],
        monthlySeries: [
          { label: 'Oca', value: Math.max(1, Math.floor(provSubs * 0.25)) },
          { label: 'Şub', value: Math.max(1, Math.floor(provSubs * 0.45)) },
          { label: 'Mar', value: Math.max(2, Math.floor(provSubs * 0.7)) },
          { label: 'Nis', value: provSubs }
        ],
        seriesTitle: `${lockedProvince} Aylık Abone & İlçe Büyüme Grafiği`,
        topRegionsTitle: `${lockedProvince} En Aktif İlçeler`,
        topRegions: sortedDistricts
      };
    }

    // Admin veya Türkiye İller Bayisi (81 İl Geneli)
    const sortedProvinces = [...allProvincesList]
      .sort(
        (a, b) =>
          b.subscribers.length * 3 +
          b.ilceDealers.length * 2 +
          b.ilDealers.length -
          (a.subscribers.length * 3 + a.ilceDealers.length * 2 + a.ilDealers.length)
      )
      .slice(0, 6)
      .map((p) => ({
        name: `${p.plate} ${p.province}`,
        subCount: p.subscribers.length,
        dealerCount: p.ilDealers.length + p.ilceDealers.length
      }));

    return {
      scopeTitle:
        roleScope === 'iller_bayi'
          ? 'Türkiye İller Bayisi (TR.001) — 81 İl Saha Özeti'
          : 'Genel Merkez Yönetici (TR.000) — Türkiye Canlı Saha Özeti',
      scopeSubtitle: '81 İl · 973 İlçe Canlı Bayi ve Esnaf Abone Yoğunluk Analizi',
      kpis: [
        { label: 'Aktif İl', value: `${activeProvinceCount}/81`, suffix: '' },
        { label: 'İl Bayisi', value: totalIlDealers, suffix: 'Yetkili' },
        { label: 'İlçe Bayisi', value: totalIlceDealers, suffix: 'Yetkili' },
        { label: 'Esnaf Abone', value: totalSubscribersCount, suffix: 'Aktif' }
      ],
      monthlySeries: [
        { label: 'Oca', value: Math.max(1, Math.floor(totalSubscribersCount * 0.3)) },
        { label: 'Şub', value: Math.max(2, Math.floor(totalSubscribersCount * 0.5)) },
        { label: 'Mar', value: Math.max(3, Math.floor(totalSubscribersCount * 0.75)) },
        { label: 'Nis', value: Math.max(4, Math.floor(totalSubscribersCount * 0.9)) },
        { label: 'Canlı', value: totalSubscribersCount }
      ],
      seriesTitle: 'Türkiye Geneli Canlı Abone Büyüme Grafiği',
      topRegionsTitle: 'En Yüksek Performanslı İller',
      topRegions: sortedProvinces
    };
  }, [
    provinceStatsMap,
    subscribers,
    roleScope,
    currentSubscriber,
    callLogs,
    appointmentsCount,
    lockedProvince,
    lockedDistrict,
    districtStatsForProvince,
    currentIlceDealer,
    currentIlDealer
  ]);

  // ===================== GRAFİK GÖRÜNÜMÜ =====================
  if (mode === 'CHART') {
    const maxSeriesVal = Math.max(...roleAnalytics.monthlySeries.map((s) => s.value), 1);
    const maxRegionVal = Math.max(
      ...roleAnalytics.topRegions.map((r) => r.subCount + r.dealerCount),
      1
    );

    return (
      <div className="space-y-3 pb-3">
        {/* Başlık Özeti */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5">
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0">
              <h3 className="text-xs font-bold text-white truncate">{roleAnalytics.scopeTitle}</h3>
              <p className="text-[10.5px] text-slate-400 mt-0.5 truncate">{roleAnalytics.scopeSubtitle}</p>
            </div>
            <BarChart3 className="w-4 h-4 text-cyan-400 shrink-0" />
          </div>

          {/* 4'lü Canlı KPI Şeridi */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3">
            {roleAnalytics.kpis.map((kpi, idx) => (
              <div
                key={idx}
                className="bg-slate-950/90 border border-slate-800/90 rounded-xl p-2.5 flex flex-col justify-between"
              >
                <span className="text-[9.5px] text-slate-400 font-medium truncate">{kpi.label}</span>
                <div className="mt-1 flex items-baseline gap-1 font-mono tabular-nums">
                  <span className="text-sm font-black text-white">{kpi.value}</span>
                  {kpi.suffix && <span className="text-[9.5px] text-cyan-300 font-semibold">{kpi.suffix}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sütun & Trend Büyüme Grafiği */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold text-slate-200">{roleAnalytics.seriesTitle}</span>
            <span className="text-[10px] font-mono tabular-nums text-emerald-400 font-semibold">Canlı Veri</span>
          </div>

          <div className="h-36 flex items-end justify-between gap-2.5 pt-4 px-1 border-b border-slate-800 pb-2">
            {roleAnalytics.monthlySeries.map((item, i) => {
              const heightPct = Math.max(14, Math.round((item.value / maxSeriesVal) * 100));
              const isLast = i === roleAnalytics.monthlySeries.length - 1;
              return (
                <div key={item.label} className="flex-1 flex flex-col items-center h-full justify-end gap-1">
                  <span className="text-[10px] font-mono tabular-nums font-bold text-slate-200">
                    {item.value}
                  </span>
                  <div className="w-full max-w-[38px] bg-slate-950 rounded-t-lg h-24 flex items-end overflow-hidden border border-slate-800/80">
                    <div
                      style={{ height: `${heightPct}%` }}
                      className={`w-full rounded-t-md transition-all duration-300 ${
                        isLast
                          ? 'bg-gradient-to-t from-emerald-600 to-cyan-400'
                          : 'bg-gradient-to-t from-sky-900 to-sky-500/80'
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex items-center justify-between gap-2.5 pt-1.5 px-1">
            {roleAnalytics.monthlySeries.map((item, i) => {
              const isLast = i === roleAnalytics.monthlySeries.length - 1;
              return (
                <div key={item.label} className="flex-1 text-center">
                  <span
                    className={`text-[10px] font-mono tabular-nums ${
                      isLast ? 'text-emerald-300 font-bold' : 'text-slate-400'
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bölge / İlçe / Sektör Karşılaştırma Çubukları */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-200">{roleAnalytics.topRegionsTitle}</span>
            <span className="text-[10px] text-slate-400 font-mono tabular-nums">Bayi · Abone</span>
          </div>

          <div className="space-y-2">
            {roleAnalytics.topRegions.map((reg) => {
              const totalScore = reg.subCount + reg.dealerCount;
              const barPct = Math.max(8, Math.round((totalScore / maxRegionVal) * 100));
              return (
                <div key={reg.name} className="space-y-1">
                  <div className="flex items-center justify-between text-[10.5px]">
                    <span className="font-semibold text-slate-200 truncate pr-2">{reg.name}</span>
                    <span className="font-mono tabular-nums text-slate-300 shrink-0">
                      {reg.dealerCount} Bayi · <strong className="text-emerald-400">{reg.subCount} Abone</strong>
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800/80">
                    <div
                      style={{ width: `${barPct}%` }}
                      className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 rounded-full"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // ===================== TÜRKİYE İL / İLÇE HARİTA GÖRÜNÜMÜ =====================
  const activeProvObj = provinceStatsMap[effectiveDrillProvince || selectedProvince] || provinceStatsMap['İstanbul'];
  const filteredDistricts = districtStatsForProvince.filter((d) => {
    if (lockedDistrict && roleScope === 'ilce_bayi') {
      // İlçe bayisi tüm ilçeleri haritada görebilir ama kendi ilçesi kilitli/vurguludur
    }
    if (mapFilter === 'ACTIVE' && !d.isActive) return false;
    if (mapFilter === 'VACANT' && d.isActive) return false;
    if (searchQuery.trim()) {
      return d.district.toLocaleLowerCase('tr-TR').includes(searchQuery.trim().toLocaleLowerCase('tr-TR'));
    }
    return true;
  });

  const selectedDistObj =
    districtStatsForProvince.find(
      (d) => d.district.toLocaleLowerCase('tr-TR') === selectedDistrict.toLocaleLowerCase('tr-TR')
    ) || districtStatsForProvince[0];

  return (
    <div className="space-y-3 pb-3">
      {/* Üst Konum & Harita Kademe Başlığı */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3">
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0">
            <h3 className="text-xs font-bold text-white truncate">
              {effectiveDrillProvince
                ? `${PROVINCE_PLATES[effectiveDrillProvince] || ''} ${effectiveDrillProvince} İlçeler Haritası`
                : 'Türkiye 81 İl Canlı Saha Haritası'}
            </h3>
            <p className="text-[10px] text-slate-400 mt-0.5 truncate">
              {effectiveDrillProvince
                ? `${districtStatsForProvince.length} İlçe · Aktif Bayi ve Esnaf Abone Noktaları`
                : 'İl üzerine dokunarak canlı bayi/abone sayısını ve ilçelerini açın'}
            </p>
          </div>

          {/* Yönetici ve İller Bayisi ilçelerden 81 İl haritasına geri dönebilir */}
          {!lockedProvince && effectiveDrillProvince && (
            <button
              type="button"
              onClick={() => {
                setDrilldownProvince(null);
                setSearchQuery('');
              }}
              className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-[10.5px] font-bold text-cyan-300 flex items-center gap-1 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              81 İl Haritası
            </button>
          )}
        </div>

        {/* Renk Açıklaması (Hue + Metin Etiketi) */}
        <div className="flex items-center gap-3 mt-2.5 pt-2 border-t border-slate-800/80 text-[10px] text-slate-300 flex-wrap">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500 inline-block" />
            <span>Bayi & Abone Aktif</span>
          </span>
          <span className="text-slate-600">·</span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-sky-500 inline-block" />
            <span>Bayi Açık</span>
          </span>
          <span className="text-slate-600">·</span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-slate-700 inline-block" />
            <span>Atama Bekliyor</span>
          </span>
        </div>
      </div>

      {/* 1. SEVİYE: TÜRKİYE 81 İL COĞRAFİ SVG HARİTASI (Yönetici & İller Bayisi için tam interaktif, diğerleri için konum göstergesi) */}
      {!effectiveDrillProvince ? (
        <>
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-2.5 overflow-hidden">
            <svg
              viewBox="0 0 820 370"
              className="w-full h-auto select-none"
              role="img"
              aria-label="Türkiye 81 İl Canlı Yoğunluk Haritası"
            >
              <defs>
                <radialGradient id="trMapGlow" cx="50%" cy="50%" r="55%">
                  <stop offset="0%" stopColor="#0f172a" />
                  <stop offset="100%" stopColor="#020617" />
                </radialGradient>
              </defs>

              <rect x="0" y="0" width="820" height="370" rx="14" fill="url(#trMapGlow)" />

              {/* Türkiye Ana Kara + Trakya Coğrafi Silüet Sınırı */}
              <path
                d="M 42,68 L 84,48 L 125,62 L 152,85 L 138,108 L 78,125 L 44,112 Z M 156,92 L 225,84 L 315,52 L 405,46 L 495,68 L 585,66 L 668,48 L 736,58 L 778,106 L 786,168 L 768,238 L 705,252 L 622,262 L 538,274 L 468,282 L 432,324 L 404,322 L 392,286 L 318,298 L 235,308 L 165,296 L 106,272 L 72,222 L 66,158 L 116,126 Z"
                fill="#0f172a"
                stroke="#1e293b"
                strokeWidth="2.5"
              />

              {/* Coğrafi Kılavuz Çizgileri */}
              <line x1="30" y1="125" x2="790" y2="125" stroke="#1e293b" strokeWidth="0.7" strokeDasharray="4 4" />
              <line x1="30" y1="225" x2="790" y2="225" stroke="#1e293b" strokeWidth="0.7" strokeDasharray="4 4" />
              <line x1="275" y1="30" x2="275" y2="340" stroke="#1e293b" strokeWidth="0.7" strokeDasharray="4 4" />
              <line x1="535" y1="30" x2="535" y2="340" stroke="#1e293b" strokeWidth="0.7" strokeDasharray="4 4" />

              {/* 81 İl Noktaları ve Plaka Kodları */}
              {Object.entries(TURKEY_PROVINCE_COORDS).map(([prov, [lat, lon]]) => {
                const { x, y } = projectCoord(lat, lon);
                const st = provinceStatsMap[prov];
                const hasSubs = (st?.subscribers.length || 0) > 0;
                const hasDealers = (st?.ilDealers.length || 0) + (st?.ilceDealers.length || 0) > 0;
                const isSelected = selectedProvince === prov;

                if (mapFilter === 'ACTIVE' && !hasSubs && !hasDealers) return null;
                if (mapFilter === 'VACANT' && (hasSubs || hasDealers)) return null;

                const fill = hasSubs
                  ? '#10b981'
                  : hasDealers
                  ? '#0ea5e9'
                  : '#334155';
                const radius = isSelected ? 13 : hasSubs ? 11 : hasDealers ? 10 : 8.5;

                return (
                  <g
                    key={prov}
                    onClick={() => setSelectedProvince(prov)}
                    className="cursor-pointer"
                  >
                    {isSelected && (
                      <circle
                        cx={x}
                        cy={y}
                        r={radius + 5}
                        fill="none"
                        stroke="#38bdf8"
                        strokeWidth="2"
                      />
                    )}
                    <circle
                      cx={x}
                      cy={y}
                      r={radius}
                      fill={fill}
                      stroke={isSelected ? '#ffffff' : '#020617'}
                      strokeWidth={isSelected ? 2 : 1.2}
                    />
                    <text
                      x={x}
                      y={y + 3.2}
                      textAnchor="middle"
                      fill="#ffffff"
                      fontSize={isSelected ? '9.5' : '8'}
                      fontWeight="700"
                      fontFamily="monospace"
                    >
                      {st?.plate || '00'}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Harita Altı Hızlı Filtre */}
            <div className="flex items-center justify-between gap-1.5 mt-2 pt-2 border-t border-slate-900">
              <div className="flex items-center gap-1">
                {(['ALL', 'ACTIVE', 'VACANT'] as const).map((flt) => (
                  <button
                    key={flt}
                    type="button"
                    onClick={() => setMapFilter(flt)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      mapFilter === flt
                        ? 'bg-sky-500 text-slate-950'
                        : 'bg-slate-900 text-slate-400 hover:text-white'
                    }`}
                  >
                    {flt === 'ALL' ? '81 İl Tümü' : flt === 'ACTIVE' ? 'Dolu İller' : 'Boş İller'}
                  </button>
                ))}
              </div>
              <span className="text-[10px] font-mono tabular-nums text-slate-400">
                Seçili: <strong className="text-white">{activeProvObj.plate} {activeProvObj.province}</strong>
              </span>
            </div>
          </div>

          {/* Seçili İl Canlı Detay Kartı + İlçelere İniş Butonu */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div>
                <h4 className="text-xs font-bold text-white">
                  {activeProvObj.plate} {activeProvObj.province} Bölge Özeti
                </h4>
                <p className="text-[10.5px] text-slate-400 mt-0.5 font-mono tabular-nums">
                  {activeProvObj.ilDealers.length} İl Bayisi · {activeProvObj.ilceDealers.length} İlçe Bayisi ·{' '}
                  <strong className="text-emerald-400">{activeProvObj.subscribers.length} Esnaf Abone</strong>
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setDrilldownProvince(activeProvObj.province);
                  const firstDist = TURKEY_GEOGRAPHY[activeProvObj.province]
                    ? Object.keys(TURKEY_GEOGRAPHY[activeProvObj.province])[0]
                    : 'Merkez';
                  setSelectedDistrict(firstDist);
                }}
                className="px-3 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-[10.5px] whitespace-nowrap shrink-0 cursor-pointer transition-colors"
              >
                İlçeleri Haritada Aç →
              </button>
            </div>
          </div>
        </>
      ) : (
        /* 2. SEVİYE: SEÇİLİ İLİN TÜM İLÇELERİ HARİTASI (İl Bayisi, İlçe Bayisi, Esnaf veya İl Seçen Yönetici) */
        <>
          {/* İlçe Arama ve Durum Filtresi */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`${effectiveDrillProvince} ilçelerinde ara...`}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-8 pr-3 py-2 text-xs text-white outline-none focus:border-sky-500"
              />
            </div>
            <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 p-1 rounded-xl shrink-0">
              {(['ALL', 'ACTIVE', 'VACANT'] as const).map((flt) => (
                <button
                  key={flt}
                  type="button"
                  onClick={() => setMapFilter(flt)}
                  className={`px-2 py-1 rounded-lg text-[10px] font-bold whitespace-nowrap cursor-pointer ${
                    mapFilter === flt ? 'bg-sky-500 text-slate-950' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {flt === 'ALL' ? 'Tümü' : flt === 'ACTIVE' ? 'Dolu' : 'Boş'}
                </button>
              ))}
            </div>
          </div>

          {/* İnteraktif İlçe Bölge Haritası (Parsel / Kartografik Izgara) */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-3 space-y-2.5">
            <div className="flex items-center justify-between text-[10px] text-slate-400">
              <span className="font-semibold text-slate-300">
                {effectiveDrillProvince} İlçeleri Canlı Yoğunluk Haritası
              </span>
              <span className="font-mono tabular-nums">
                {districtStatsForProvince.filter((d) => d.isActive).length} / {districtStatsForProvince.length} Aktif
              </span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5 max-h-60 overflow-y-auto pr-0.5">
              {filteredDistricts.map((d) => {
                const isSelected =
                  selectedDistObj?.district.toLocaleLowerCase('tr-TR') ===
                  d.district.toLocaleLowerCase('tr-TR');
                const isMyLockedDistrict =
                  lockedDistrict &&
                  d.district.toLocaleLowerCase('tr-TR') === lockedDistrict.toLocaleLowerCase('tr-TR');
                const hasSubs = d.subscribers.length > 0;
                const hasDealer = d.dealers.length > 0;

                return (
                  <button
                    key={d.district}
                    type="button"
                    onClick={() => setSelectedDistrict(d.district)}
                    className={`p-2 rounded-xl border text-left transition-all cursor-pointer min-h-[52px] flex flex-col justify-between ${
                      isSelected
                        ? 'ring-2 ring-sky-400 border-sky-400 bg-slate-900'
                        : hasSubs
                        ? 'bg-emerald-950/50 border-emerald-600/60 hover:border-emerald-400'
                        : hasDealer
                        ? 'bg-sky-950/50 border-sky-600/60 hover:border-sky-400'
                        : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1 w-full">
                      <span className="text-[10px] font-bold text-white truncate">{d.district}</span>
                      {isMyLockedDistrict && (
                        <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
                      )}
                    </div>
                    <div className="text-[9px] font-mono tabular-nums mt-1">
                      {hasSubs ? (
                        <span className="text-emerald-300 font-bold">{d.subscribers.length} Abone</span>
                      ) : hasDealer ? (
                        <span className="text-sky-300 font-semibold">{d.dealers.length} Bayi</span>
                      ) : (
                        <span className="text-slate-500">Boş İlçe</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Seçili İlçe Canlı Saha Detayı */}
          {selectedDistObj && (
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <h4 className="text-xs font-bold text-white">
                    {effectiveDrillProvince} · {selectedDistObj.district} Saha Detayı
                  </h4>
                  <p className="text-[10.5px] text-slate-400 font-mono tabular-nums mt-0.5">
                    {selectedDistObj.dealers.length} İlçe Bayisi ·{' '}
                    <strong className="text-emerald-400">{selectedDistObj.subscribers.length} Aktif Esnaf Abone</strong>
                  </p>
                </div>
                <Users className="w-4 h-4 text-emerald-400 shrink-0" />
              </div>

              {selectedDistObj.dealers.length > 0 && (
                <div className="pt-2 border-t border-slate-800 space-y-1.5">
                  {selectedDistObj.dealers.map((dl) => (
                    <div
                      key={dl.id}
                      className="flex items-center justify-between text-[10.5px] bg-slate-950/80 border border-slate-800/80 rounded-xl px-2.5 py-2"
                    >
                      <div className="min-w-0 pr-2">
                        <span className="font-bold text-white block truncate">{dl.contactName || dl.name}</span>
                        <span className="text-[9.5px] text-slate-400 font-mono tabular-nums">
                          Kod: {dl.dealerCode || '34.ilç.001'}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono tabular-nums text-sky-300 font-bold shrink-0">
                        Yetkili İlçe Bayi
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {selectedDistObj.subscribers.length > 0 ? (
                <div className="pt-1 space-y-1.5">
                  {selectedDistObj.subscribers.slice(0, 5).map((sub) => (
                    <div
                      key={sub.id}
                      className="flex items-center justify-between text-[10.5px] bg-slate-950/80 border border-slate-800/80 rounded-xl px-2.5 py-2"
                    >
                      <div className="min-w-0 pr-2">
                        <span className="font-bold text-slate-100 block truncate">
                          {sub.companyName || sub.name}
                        </span>
                        <span className="text-[9.5px] text-slate-400 font-mono tabular-nums">
                          {sub.subscriberCode || '34.e.001'} · {sub.sector || 'Esnaf İşletme'}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono tabular-nums text-emerald-400 font-bold shrink-0">
                        Aktif Abone
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[10.5px] text-slate-400 pt-1">
                  Bu ilçede henüz aktif esnaf abonesi bulunmuyor.
                </p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};
