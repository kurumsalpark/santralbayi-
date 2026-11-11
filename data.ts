import { Dealer, Subscriber, CallLog } from './types';

export const TURKEY_GEOGRAPHY: { [province: string]: { [district: string]: string[] } } = {
  "Adana": {
    "Seyhan": [
      "Merkez"
    ],
    "Yüreğir": [
      "Merkez"
    ],
    "Çukurova": [
      "Merkez"
    ],
    "Sarıçam": [
      "Merkez"
    ],
    "Ceyhan": [
      "Merkez"
    ],
    "Kozan": [
      "Merkez"
    ],
    "İmamoğlu": [
      "Merkez"
    ],
    "Karataş": [
      "Merkez"
    ],
    "Karaisalı": [
      "Merkez"
    ],
    "Pozantı": [
      "Merkez"
    ],
    "Yumurtalık": [
      "Merkez"
    ],
    "Tufanbeyli": [
      "Merkez"
    ],
    "Feke": [
      "Merkez"
    ],
    "Aladağ": [
      "Merkez"
    ],
    "Saimbeyli": [
      "Merkez"
    ]
  },
  "Adıyaman": {
    "Merkez": [
      "Merkez"
    ],
    "Kahta": [
      "Merkez"
    ],
    "Besni": [
      "Merkez"
    ],
    "Gölbaşı": [
      "Merkez"
    ],
    "Gerger": [
      "Merkez"
    ],
    "Sincik": [
      "Merkez"
    ],
    "Çelikhan": [
      "Merkez"
    ],
    "Tut": [
      "Merkez"
    ],
    "Samsat": [
      "Merkez"
    ]
  },
  "Afyonkarahisar": {
    "Merkez": [
      "Merkez"
    ],
    "Sandıklı": [
      "Merkez"
    ],
    "Dinar": [
      "Merkez"
    ],
    "Bolvadin": [
      "Merkez"
    ],
    "Sinanpaşa": [
      "Merkez"
    ],
    "Emirdağ": [
      "Merkez"
    ],
    "Şuhut": [
      "Merkez"
    ],
    "Çay": [
      "Merkez"
    ],
    "İhsaniye": [
      "Merkez"
    ],
    "İscehisar": [
      "Merkez"
    ],
    "Sultandağı": [
      "Merkez"
    ],
    "Çobanlar": [
      "Merkez"
    ],
    "Dazkırı": [
      "Merkez"
    ],
    "Başmakçı": [
      "Merkez"
    ],
    "Hocalar": [
      "Merkez"
    ],
    "Kızılören": [
      "Merkez"
    ],
    "Evciler": [
      "Merkez"
    ],
    "Bayat": [
      "Merkez"
    ]
  },
  "Ağrı": {
    "Merkez": [
      "Merkez"
    ],
    "Patnos": [
      "Merkez"
    ],
    "Doğubayazıt": [
      "Merkez"
    ],
    "Diyadin": [
      "Merkez"
    ],
    "Eleşkirt": [
      "Merkez"
    ],
    "Tutak": [
      "Merkez"
    ],
    "Taşlıçay": [
      "Merkez"
    ],
    "Hamur": [
      "Merkez"
    ]
  },
  "Amasya": {
    "Merkez": [
      "Merkez"
    ],
    "Merzifon": [
      "Merkez"
    ],
    "Suluova": [
      "Merkez"
    ],
    "Taşova": [
      "Merkez"
    ],
    "Göynücek": [
      "Merkez"
    ],
    "Gümüşhacıköy": [
      "Merkez"
    ],
    "Hamamözü": [
      "Merkez"
    ]
  },
  "Ankara": {
    "Çankaya": [
      "Kızılay",
      "Tunalı",
      "Bahçelievler",
      "Yıldız",
      "Oran",
      "Gaziosmanpaşa",
      "Balgat"
    ],
    "Keçiören": [
      "Merkez"
    ],
    "Yenimahalle": [
      "Merkez"
    ],
    "Mamak": [
      "Merkez"
    ],
    "Etimesgut": [
      "Merkez"
    ],
    "Sincan": [
      "Merkez"
    ],
    "Altındağ": [
      "Merkez"
    ],
    "Pursaklar": [
      "Merkez"
    ],
    "Gölbaşı": [
      "Merkez"
    ],
    "Polatlı": [
      "Merkez"
    ],
    "Çubuk": [
      "Merkez"
    ],
    "Kahramankazan": [
      "Merkez"
    ],
    "Beypazarı": [
      "Merkez"
    ],
    "Elmadağ": [
      "Merkez"
    ],
    "Şereflikoçhisar": [
      "Merkez"
    ],
    "Akyurt": [
      "Merkez"
    ],
    "Nallıhan": [
      "Merkez"
    ],
    "Haymana": [
      "Merkez"
    ],
    "Kızılcahamam": [
      "Merkez"
    ],
    "Bala": [
      "Merkez"
    ],
    "Kalecik": [
      "Merkez"
    ],
    "Ayaş": [
      "Merkez"
    ],
    "Güdül": [
      "Merkez"
    ],
    "Çamlıdere": [
      "Merkez"
    ],
    "Evren": [
      "Merkez"
    ]
  },
  "Antalya": {
    "Muratpaşa": [
      "Merkez"
    ],
    "Kepez": [
      "Merkez"
    ],
    "Alanya": [
      "Merkez"
    ],
    "Manavgat": [
      "Merkez"
    ],
    "Konyaaltı": [
      "Merkez"
    ],
    "Serik": [
      "Merkez"
    ],
    "Aksu": [
      "Merkez"
    ],
    "Kumluca": [
      "Merkez"
    ],
    "Döşemealtı": [
      "Merkez"
    ],
    "Kaş": [
      "Merkez"
    ],
    "Korkuteli": [
      "Merkez"
    ],
    "Gazipaşa": [
      "Merkez"
    ],
    "Finike": [
      "Merkez"
    ],
    "Kemer": [
      "Merkez"
    ],
    "Elmalı": [
      "Merkez"
    ],
    "Demre": [
      "Merkez"
    ],
    "Akseki": [
      "Merkez"
    ],
    "Gündoğmuş": [
      "Merkez"
    ],
    "İbradı": [
      "Merkez"
    ]
  },
  "Artvin": {
    "Merkez": [
      "Merkez"
    ],
    "Hopa": [
      "Merkez"
    ],
    "Borçka": [
      "Merkez"
    ],
    "Yusufeli": [
      "Merkez"
    ],
    "Arhavi": [
      "Merkez"
    ],
    "Şavşat": [
      "Merkez"
    ],
    "Ardanuç": [
      "Merkez"
    ],
    "Murgul": [
      "Merkez"
    ],
    "Kemalpaşa": [
      "Merkez"
    ]
  },
  "Aydın": {
    "Efeler": [
      "Merkez"
    ],
    "Nazilli": [
      "Merkez"
    ],
    "Söke": [
      "Merkez"
    ],
    "Kuşadası": [
      "Merkez"
    ],
    "Didim": [
      "Merkez"
    ],
    "İncirliova": [
      "Merkez"
    ],
    "Çine": [
      "Merkez"
    ],
    "Germencik": [
      "Merkez"
    ],
    "Bozdoğan": [
      "Merkez"
    ],
    "Köşk": [
      "Merkez"
    ],
    "Kuyucak": [
      "Merkez"
    ],
    "Sultanhisar": [
      "Merkez"
    ],
    "Karacasu": [
      "Merkez"
    ],
    "Yenipazar": [
      "Merkez"
    ],
    "Buharkent": [
      "Merkez"
    ],
    "Karpuzlu": [
      "Merkez"
    ],
    "Koçarlı": [
      "Merkez"
    ]
  },
  "Balıkesir": {
    "Altıeylül": [
      "Merkez"
    ],
    "Karesi": [
      "Merkez"
    ],
    "Edremit": [
      "Merkez"
    ],
    "Bandırma": [
      "Merkez"
    ],
    "Gönen": [
      "Merkez"
    ],
    "Ayvalık": [
      "Merkez"
    ],
    "Burhaniye": [
      "Merkez"
    ],
    "Bigadiç": [
      "Merkez"
    ],
    "Susurluk": [
      "Merkez"
    ],
    "Dursunbey": [
      "Merkez"
    ],
    "Sındırgı": [
      "Merkez"
    ],
    "İvrindi": [
      "Merkez"
    ],
    "Erdek": [
      "Merkez"
    ],
    "Havran": [
      "Merkez"
    ],
    "Kepsut": [
      "Merkez"
    ],
    "Manyas": [
      "Merkez"
    ],
    "Savaştepe": [
      "Merkez"
    ],
    "Gömeç": [
      "Merkez"
    ],
    "Balya": [
      "Merkez"
    ],
    "Marmara": [
      "Merkez"
    ]
  },
  "Bilecik": {
    "Merkez": [
      "Merkez"
    ],
    "Bozüyük": [
      "Merkez"
    ],
    "Osmaneli": [
      "Merkez"
    ],
    "Söğüt": [
      "Merkez"
    ],
    "Gölpazarı": [
      "Merkez"
    ],
    "Pazaryeri": [
      "Merkez"
    ],
    "İnhisar": [
      "Merkez"
    ],
    "Yenipazar": [
      "Merkez"
    ]
  },
  "Bingöl": {
    "Merkez": [
      "Merkez"
    ],
    "Genç": [
      "Merkez"
    ],
    "Solhan": [
      "Merkez"
    ],
    "Karlıova": [
      "Merkez"
    ],
    "Adaklı": [
      "Merkez"
    ],
    "Kiğı": [
      "Merkez"
    ],
    "Yedisu": [
      "Merkez"
    ],
    "Yayladere": [
      "Merkez"
    ]
  },
  "Bitlis": {
    "Tatvan": [
      "Merkez"
    ],
    "Merkez": [
      "Merkez"
    ],
    "Güroymak": [
      "Merkez"
    ],
    "Ahlat": [
      "Merkez"
    ],
    "Hizan": [
      "Merkez"
    ],
    "Mutki": [
      "Merkez"
    ],
    "Adilcevaz": [
      "Merkez"
    ]
  },
  "Bolu": {
    "Merkez": [
      "Merkez"
    ],
    "Gerede": [
      "Merkez"
    ],
    "Mudurnu": [
      "Merkez"
    ],
    "Göynük": [
      "Merkez"
    ],
    "Mengen": [
      "Merkez"
    ],
    "Yeniçağa": [
      "Merkez"
    ],
    "Dörtdivan": [
      "Merkez"
    ],
    "Seben": [
      "Merkez"
    ],
    "Kıbrıscık": [
      "Merkez"
    ]
  },
  "Burdur": {
    "Merkez": [
      "Merkez"
    ],
    "Bucak": [
      "Merkez"
    ],
    "Gölhisar": [
      "Merkez"
    ],
    "Yeşilova": [
      "Merkez"
    ],
    "Çavdır": [
      "Merkez"
    ],
    "Tefenni": [
      "Merkez"
    ],
    "Ağlasun": [
      "Merkez"
    ],
    "Karamanlı": [
      "Merkez"
    ],
    "Altınyayla": [
      "Merkez"
    ],
    "Çeltikçi": [
      "Merkez"
    ],
    "Kemer": [
      "Merkez"
    ]
  },
  "Bursa": {
    "Osmangazi": [
      "Merkez"
    ],
    "Yıldırım": [
      "Merkez"
    ],
    "Nilüfer": [
      "Merkez"
    ],
    "İnegöl": [
      "Merkez"
    ],
    "Gemlik": [
      "Merkez"
    ],
    "Mustafakemalpaşa": [
      "Merkez"
    ],
    "Mudanya": [
      "Merkez"
    ],
    "Gürsu": [
      "Merkez"
    ],
    "Karacabey": [
      "Merkez"
    ],
    "Orhangazi": [
      "Merkez"
    ],
    "Kestel": [
      "Merkez"
    ],
    "Yenişehir": [
      "Merkez"
    ],
    "İznik": [
      "Merkez"
    ],
    "Orhaneli": [
      "Merkez"
    ],
    "Keles": [
      "Merkez"
    ],
    "Büyükorhan": [
      "Merkez"
    ],
    "Harmancık": [
      "Merkez"
    ]
  },
  "Çanakkale": {
    "Merkez": [
      "Merkez"
    ],
    "Biga": [
      "Merkez"
    ],
    "Çan": [
      "Merkez"
    ],
    "Gelibolu": [
      "Merkez"
    ],
    "Yenice": [
      "Merkez"
    ],
    "Ayvacık": [
      "Merkez"
    ],
    "Ezine": [
      "Merkez"
    ],
    "Bayramiç": [
      "Merkez"
    ],
    "Lapseki": [
      "Merkez"
    ],
    "Eceabat": [
      "Merkez"
    ],
    "Gökçeada": [
      "Merkez"
    ],
    "Bozcaada": [
      "Merkez"
    ]
  },
  "Çankırı": {
    "Merkez": [
      "Merkez"
    ],
    "Çerkeş": [
      "Merkez"
    ],
    "Ilgaz": [
      "Merkez"
    ],
    "Orta": [
      "Merkez"
    ],
    "Şabanözü": [
      "Merkez"
    ],
    "Kurşunlu": [
      "Merkez"
    ],
    "Yapraklı": [
      "Merkez"
    ],
    "Kızılırmak": [
      "Merkez"
    ],
    "Eldivan": [
      "Merkez"
    ],
    "Atkaracalar": [
      "Merkez"
    ],
    "Korgun": [
      "Merkez"
    ],
    "Bayramören": [
      "Merkez"
    ]
  },
  "Çorum": {
    "Merkez": [
      "Merkez"
    ],
    "Sungurlu": [
      "Merkez"
    ],
    "Osmancık": [
      "Merkez"
    ],
    "İskilip": [
      "Merkez"
    ],
    "Alaca": [
      "Merkez"
    ],
    "Bayat": [
      "Merkez"
    ],
    "Mecitözü": [
      "Merkez"
    ],
    "Kargı": [
      "Merkez"
    ],
    "Ortaköy": [
      "Merkez"
    ],
    "Uğurludağ": [
      "Merkez"
    ],
    "Dodurga": [
      "Merkez"
    ],
    "Oğuzlar": [
      "Merkez"
    ],
    "Laçin": [
      "Merkez"
    ],
    "Boğazkale": [
      "Merkez"
    ]
  },
  "Denizli": {
    "Pamukkale": [
      "Merkez"
    ],
    "Merkezefendi": [
      "Merkez"
    ],
    "Çivril": [
      "Merkez"
    ],
    "Acıpayam": [
      "Merkez"
    ],
    "Tavas": [
      "Merkez"
    ],
    "Honaz": [
      "Merkez"
    ],
    "Sarayköy": [
      "Merkez"
    ],
    "Buldan": [
      "Merkez"
    ],
    "Kale": [
      "Merkez"
    ],
    "Çal": [
      "Merkez"
    ],
    "Çameli": [
      "Merkez"
    ],
    "Serinhisar": [
      "Merkez"
    ],
    "Bozkurt": [
      "Merkez"
    ],
    "Güney": [
      "Merkez"
    ],
    "Çardak": [
      "Merkez"
    ],
    "Bekilli": [
      "Merkez"
    ],
    "Beyağaç": [
      "Merkez"
    ],
    "Babadağ": [
      "Merkez"
    ],
    "Baklan": [
      "Merkez"
    ]
  },
  "Diyarbakır": {
    "Bağlar": [
      "Merkez"
    ],
    "Kayapınar": [
      "Merkez"
    ],
    "Yenişehir": [
      "Merkez"
    ],
    "Ergani": [
      "Merkez"
    ],
    "Sur": [
      "Merkez"
    ],
    "Bismil": [
      "Merkez"
    ],
    "Silvan": [
      "Merkez"
    ],
    "Çınar": [
      "Merkez"
    ],
    "Çermik": [
      "Merkez"
    ],
    "Dicle": [
      "Merkez"
    ],
    "Kulp": [
      "Merkez"
    ],
    "Hani": [
      "Merkez"
    ],
    "Lice": [
      "Merkez"
    ],
    "Eğil": [
      "Merkez"
    ],
    "Hazro": [
      "Merkez"
    ],
    "Kocaköy": [
      "Merkez"
    ],
    "Çüngüş": [
      "Merkez"
    ]
  },
  "Edirne": {
    "Merkez": [
      "Merkez"
    ],
    "Keşan": [
      "Merkez"
    ],
    "Uzunköprü": [
      "Merkez"
    ],
    "İpsala": [
      "Merkez"
    ],
    "Havsa": [
      "Merkez"
    ],
    "Meriç": [
      "Merkez"
    ],
    "Enez": [
      "Merkez"
    ],
    "Süloğlu": [
      "Merkez"
    ],
    "Lalapaşa": [
      "Merkez"
    ]
  },
  "Elazığ": {
    "Merkez": [
      "Merkez"
    ],
    "Kovancılar": [
      "Merkez"
    ],
    "Karakoçan": [
      "Merkez"
    ],
    "Palu": [
      "Merkez"
    ],
    "Arıcak": [
      "Merkez"
    ],
    "Baskil": [
      "Merkez"
    ],
    "Maden": [
      "Merkez"
    ],
    "Sivrice": [
      "Merkez"
    ],
    "Keban": [
      "Merkez"
    ],
    "Alacakaya": [
      "Merkez"
    ],
    "Ağın": [
      "Merkez"
    ]
  },
  "Erzincan": {
    "Merkez": [
      "Merkez"
    ],
    "Tercan": [
      "Merkez"
    ],
    "Üzümlü": [
      "Merkez"
    ],
    "Refahiye": [
      "Merkez"
    ],
    "Çayırlı": [
      "Merkez"
    ],
    "İliç": [
      "Merkez"
    ],
    "Kemah": [
      "Merkez"
    ],
    "Kemaliye": [
      "Merkez"
    ],
    "Otlukbeli": [
      "Merkez"
    ]
  },
  "Erzurum": {
    "Yakutiye": [
      "Merkez"
    ],
    "Palandöken": [
      "Merkez"
    ],
    "Aziziye": [
      "Merkez"
    ],
    "Horasan": [
      "Merkez"
    ],
    "Oltu": [
      "Merkez"
    ],
    "Pasinler": [
      "Merkez"
    ],
    "Karayazı": [
      "Merkez"
    ],
    "Hınıs": [
      "Merkez"
    ],
    "Tekman": [
      "Merkez"
    ],
    "Karaçoban": [
      "Merkez"
    ],
    "Aşkale": [
      "Merkez"
    ],
    "Şenkaya": [
      "Merkez"
    ],
    "Çat": [
      "Merkez"
    ],
    "Köprüköy": [
      "Merkez"
    ],
    "İspir": [
      "Merkez"
    ],
    "Tortum": [
      "Merkez"
    ],
    "Narman": [
      "Merkez"
    ],
    "Uzundere": [
      "Merkez"
    ],
    "Olur": [
      "Merkez"
    ],
    "Pazaryolu": [
      "Merkez"
    ]
  },
  "Eskişehir": {
    "Odunpazarı": [
      "Merkez"
    ],
    "Tepebaşı": [
      "Merkez"
    ],
    "Sivrihisar": [
      "Merkez"
    ],
    "Çifteler": [
      "Merkez"
    ],
    "Seyitgazi": [
      "Merkez"
    ],
    "Alpu": [
      "Merkez"
    ],
    "Mihalıççık": [
      "Merkez"
    ],
    "Mahmudiye": [
      "Merkez"
    ],
    "Beylikova": [
      "Merkez"
    ],
    "İnönü": [
      "Merkez"
    ],
    "Günyüzü": [
      "Merkez"
    ],
    "Han": [
      "Merkez"
    ],
    "Mihalgazi": [
      "Merkez"
    ]
  },
  "Gaziantep": {
    "Şahinbey": [
      "Merkez"
    ],
    "Şehitkamil": [
      "Merkez"
    ],
    "Nizip": [
      "Merkez"
    ],
    "İslahiye": [
      "Merkez"
    ],
    "Nurdağı": [
      "Merkez"
    ],
    "Araban": [
      "Merkez"
    ],
    "Oğuzeli": [
      "Merkez"
    ],
    "Yavuzeli": [
      "Merkez"
    ],
    "Karkamış": [
      "Merkez"
    ]
  },
  "Giresun": {
    "Merkez": [
      "Merkez"
    ],
    "Bulancak": [
      "Merkez"
    ],
    "Espiye": [
      "Merkez"
    ],
    "Görele": [
      "Merkez"
    ],
    "Tirebolu": [
      "Merkez"
    ],
    "Dereli": [
      "Merkez"
    ],
    "Şebinkarahisar": [
      "Merkez"
    ],
    "Keşap": [
      "Merkez"
    ],
    "Yağlıdere": [
      "Merkez"
    ],
    "Alucra": [
      "Merkez"
    ],
    "Piraziz": [
      "Merkez"
    ],
    "Eynesil": [
      "Merkez"
    ],
    "Çamoluk": [
      "Merkez"
    ],
    "Güce": [
      "Merkez"
    ],
    "Doğankent": [
      "Merkez"
    ],
    "Çanakçı": [
      "Merkez"
    ]
  },
  "Gümüşhane": {
    "Merkez": [
      "Merkez"
    ],
    "Kelkit": [
      "Merkez"
    ],
    "Şiran": [
      "Merkez"
    ],
    "Kürtün": [
      "Merkez"
    ],
    "Torul": [
      "Merkez"
    ],
    "Köse": [
      "Merkez"
    ]
  },
  "Hakkari": {
    "Yüksekova": [
      "Merkez"
    ],
    "Merkez": [
      "Merkez"
    ],
    "Şemdinli": [
      "Merkez"
    ],
    "Çukurca": [
      "Merkez"
    ],
    "Derecik": [
      "Merkez"
    ]
  },
  "Hatay": {
    "Antakya": [
      "Merkez"
    ],
    "İskenderun": [
      "Merkez"
    ],
    "Defne": [
      "Merkez"
    ],
    "Dörtyol": [
      "Merkez"
    ],
    "Samandağ": [
      "Merkez"
    ],
    "Kırıkhan": [
      "Merkez"
    ],
    "Reyhanlı": [
      "Merkez"
    ],
    "Arsuz": [
      "Merkez"
    ],
    "Altınözü": [
      "Merkez"
    ],
    "Hassa": [
      "Merkez"
    ],
    "Payas": [
      "Merkez"
    ],
    "Erzin": [
      "Merkez"
    ],
    "Yayladağı": [
      "Merkez"
    ],
    "Belen": [
      "Merkez"
    ],
    "Kumlu": [
      "Merkez"
    ]
  },
  "Isparta": {
    "Merkez": [
      "Merkez"
    ],
    "Yalvaç": [
      "Merkez"
    ],
    "Eğirdir": [
      "Merkez"
    ],
    "Şarkikaraağaç": [
      "Merkez"
    ],
    "Gelendost": [
      "Merkez"
    ],
    "Keçiborlu": [
      "Merkez"
    ],
    "Senirkent": [
      "Merkez"
    ],
    "Sütçüler": [
      "Merkez"
    ],
    "Gönen": [
      "Merkez"
    ],
    "Uluborlu": [
      "Merkez"
    ],
    "Atabey": [
      "Merkez"
    ],
    "Aksu": [
      "Merkez"
    ],
    "Yenişarbademli": [
      "Merkez"
    ]
  },
  "Mersin": {
    "Tarsus": [
      "Merkez"
    ],
    "Toroslar": [
      "Merkez"
    ],
    "Akdeniz": [
      "Merkez"
    ],
    "Yenişehir": [
      "Merkez"
    ],
    "Mezitli": [
      "Merkez"
    ],
    "Erdemli": [
      "Merkez"
    ],
    "Silifke": [
      "Merkez"
    ],
    "Anamur": [
      "Merkez"
    ],
    "Mut": [
      "Merkez"
    ],
    "Bozyazı": [
      "Merkez"
    ],
    "Gülnar": [
      "Merkez"
    ],
    "Aydıncık": [
      "Merkez"
    ],
    "Çamlıyayla": [
      "Merkez"
    ]
  },
  "İstanbul": {
    "Kadıköy": [
      "Moda",
      "Fenerbahçe",
      "Caddebostan",
      "Göztepe",
      "Bostancı",
      "Koşuyolu",
      "Suadiye",
      "Erenköy"
    ],
    "Beşiktaş": [
      "Bebek",
      "Ortaköy",
      "Levent",
      "Arnavutköy",
      "Ulus",
      "Etiler",
      "Balmumcu"
    ],
    "Şişli": [
      "Nişantaşı",
      "Mecidiyeköy",
      "Feriköy",
      "Teşvikiye",
      "Bomonti",
      "Fulya"
    ],
    "Üsküdar": [
      "Kuzguncuk",
      "Acıbadem",
      "Beylerbeyi",
      "Çengelköy",
      "Altunizade",
      "Kandilli"
    ],
    "Ataşehir": [
      "Merkez"
    ],
    "Bakırköy": [
      "Merkez"
    ],
    "Beyoğlu": [
      "Merkez"
    ],
    "Fatih": [
      "Merkez"
    ],
    "Maltepe": [
      "Merkez"
    ],
    "Ümraniye": [
      "Merkez"
    ],
    "Sarıyer": [
      "Merkez"
    ],
    "Pendik": [
      "Merkez"
    ],
    "Kartal": [
      "Merkez"
    ],
    "Beykoz": [
      "Merkez"
    ],
    "Zeytinburnu": [
      "Merkez"
    ],
    "Kağıthane": [
      "Merkez"
    ],
    "Eyüpsultan": [
      "Merkez"
    ],
    "Gaziosmanpaşa": [
      "Merkez"
    ],
    "Küçükçekmece": [
      "Merkez"
    ],
    "Büyükçekmece": [
      "Merkez"
    ],
    "Başakşehir": [
      "Merkez"
    ],
    "Beylikdüzü": [
      "Merkez"
    ],
    "Avcılar": [
      "Merkez"
    ],
    "Tuzla": [
      "Merkez"
    ],
    "Sancaktepe": [
      "Merkez"
    ],
    "Çekmeköy": [
      "Merkez"
    ],
    "Sultangazi": [
      "Merkez"
    ],
    "Esenler": [
      "Merkez"
    ],
    "Esenyurt": [
      "Merkez"
    ],
    "Silivri": [
      "Merkez"
    ],
    "Şile": [
      "Merkez"
    ],
    "Çatalca": [
      "Merkez"
    ],
    "Adalar": [
      "Merkez"
    ],
    "Arnavutköy": [
      "Merkez"
    ],
    "Bağcılar": [
      "Merkez"
    ],
    "Bahçelievler": [
      "Merkez"
    ],
    "Bayrampaşa": [
      "Merkez"
    ],
    "Güngören": [
      "Merkez"
    ],
    "Sultanbeyli": [
      "Merkez"
    ]
  },
  "İzmir": {
    "Konak": [
      "Alsancak",
      "Göztepe",
      "Karataş",
      "Basmane",
      "Hatay"
    ],
    "Karşıyaka": [
      "Merkez"
    ],
    "Bornova": [
      "Merkez"
    ],
    "Buca": [
      "Merkez"
    ],
    "Bayraklı": [
      "Merkez"
    ],
    "Çiğli": [
      "Merkez"
    ],
    "Balçova": [
      "Merkez"
    ],
    "Gaziemir": [
      "Merkez"
    ],
    "Menemen": [
      "Merkez"
    ],
    "Urla": [
      "Merkez"
    ],
    "Çeşme": [
      "Merkez"
    ],
    "Torbalı": [
      "Merkez"
    ],
    "Kemalpaşa": [
      "Merkez"
    ],
    "Aliağa": [
      "Merkez"
    ],
    "Menderes": [
      "Merkez"
    ],
    "Ödemiş": [
      "Merkez"
    ],
    "Tire": [
      "Merkez"
    ],
    "Bergama": [
      "Merkez"
    ],
    "Dikili": [
      "Merkez"
    ],
    "Seferihisar": [
      "Merkez"
    ],
    "Foça": [
      "Merkez"
    ],
    "Güzelbahçe": [
      "Merkez"
    ],
    "Karabağlar": [
      "Merkez"
    ],
    "Kınık": [
      "Merkez"
    ],
    "Kiraz": [
      "Merkez"
    ],
    "Narlıdere": [
      "Merkez"
    ],
    "Beydağ": [
      "Merkez"
    ],
    "Karaburun": [
      "Merkez"
    ],
    "Selçuk": [
      "Merkez"
    ]
  },
  "Kars": {
    "Merkez": [
      "Merkez"
    ],
    "Kağızman": [
      "Merkez"
    ],
    "Sarıkamış": [
      "Merkez"
    ],
    "Selim": [
      "Merkez"
    ],
    "Digor": [
      "Merkez"
    ],
    "Arpaçay": [
      "Merkez"
    ],
    "Akyaka": [
      "Merkez"
    ],
    "Susuz": [
      "Merkez"
    ]
  },
  "Kastamonu": {
    "Merkez": [
      "Merkez"
    ],
    "Tosya": [
      "Merkez"
    ],
    "Taşköprü": [
      "Merkez"
    ],
    "Cide": [
      "Merkez"
    ],
    "İnebolu": [
      "Merkez"
    ],
    "Araç": [
      "Merkez"
    ],
    "Devrekani": [
      "Merkez"
    ],
    "Bozkurt": [
      "Merkez"
    ],
    "Daday": [
      "Merkez"
    ],
    "Azdavay": [
      "Merkez"
    ],
    "Çatalzeytin": [
      "Merkez"
    ],
    "Küre": [
      "Merkez"
    ],
    "Doğanyurt": [
      "Merkez"
    ],
    "İhsangazi": [
      "Merkez"
    ],
    "Pınarbaşı": [
      "Merkez"
    ],
    "Şenpazar": [
      "Merkez"
    ],
    "Abana": [
      "Merkez"
    ],
    "Seydiler": [
      "Merkez"
    ],
    "Hanönü": [
      "Merkez"
    ],
    "Ağlı": [
      "Merkez"
    ]
  },
  "Kayseri": {
    "Melikgazi": [
      "Merkez"
    ],
    "Kocasinan": [
      "Merkez"
    ],
    "Talas": [
      "Merkez"
    ],
    "Develi": [
      "Merkez"
    ],
    "Yahyalı": [
      "Merkez"
    ],
    "Bünyan": [
      "Merkez"
    ],
    "İncesu": [
      "Merkez"
    ],
    "Pınarbaşı": [
      "Merkez"
    ],
    "Tomarza": [
      "Merkez"
    ],
    "Yeşilhisar": [
      "Merkez"
    ],
    "Sarıoğlan": [
      "Merkez"
    ],
    "Hacılar": [
      "Merkez"
    ],
    "Sarız": [
      "Merkez"
    ],
    "Felahiye": [
      "Merkez"
    ],
    "Akkışla": [
      "Merkez"
    ],
    "Özvatan": [
      "Merkez"
    ]
  },
  "Kırklareli": {
    "Merkez": [
      "Merkez"
    ],
    "Lüleburgaz": [
      "Merkez"
    ],
    "Babaeski": [
      "Merkez"
    ],
    "Vize": [
      "Merkez"
    ],
    "Pınarhisar": [
      "Merkez"
    ],
    "Demirköy": [
      "Merkez"
    ],
    "Pehlivanköy": [
      "Merkez"
    ],
    "Kofçaz": [
      "Merkez"
    ]
  },
  "Kırşehir": {
    "Merkez": [
      "Merkez"
    ],
    "Kaman": [
      "Merkez"
    ],
    "Mucur": [
      "Merkez"
    ],
    "Çiçekdağı": [
      "Merkez"
    ],
    "Akpınar": [
      "Merkez"
    ],
    "Boztepe": [
      "Merkez"
    ],
    "Akçakent": [
      "Merkez"
    ]
  },
  "Kocaeli": {
    "Gebze": [
      "Merkez"
    ],
    "İzmit": [
      "Merkez"
    ],
    "Darıca": [
      "Merkez"
    ],
    "Körfez": [
      "Merkez"
    ],
    "Gölcük": [
      "Merkez"
    ],
    "Derince": [
      "Merkez"
    ],
    "Çayırova": [
      "Merkez"
    ],
    "Kartepe": [
      "Merkez"
    ],
    "Başiskele": [
      "Merkez"
    ],
    "Karamürsel": [
      "Merkez"
    ],
    "Kandıra": [
      "Merkez"
    ],
    "Dilovası": [
      "Merkez"
    ]
  },
  "Konya": {
    "Selçuklu": [
      "Merkez"
    ],
    "Meram": [
      "Merkez"
    ],
    "Karatay": [
      "Merkez"
    ],
    "Ereğli": [
      "Merkez"
    ],
    "Akşehir": [
      "Merkez"
    ],
    "Beyşehir": [
      "Merkez"
    ],
    "Cihanbeyli": [
      "Merkez"
    ],
    "Kulu": [
      "Merkez"
    ],
    "Seydişehir": [
      "Merkez"
    ],
    "Ilgın": [
      "Merkez"
    ],
    "Bozkır": [
      "Merkez"
    ],
    "Karapınar": [
      "Merkez"
    ],
    "Sarayönü": [
      "Merkez"
    ],
    "Yunak": [
      "Merkez"
    ],
    "Doğanhisar": [
      "Merkez"
    ],
    "Hüyük": [
      "Merkez"
    ],
    "Altınekin": [
      "Merkez"
    ],
    "Hadim": [
      "Merkez"
    ],
    "Çeltik": [
      "Merkez"
    ],
    "Güneysınır": [
      "Merkez"
    ],
    "Emirgazi": [
      "Merkez"
    ],
    "Tuzlukçu": [
      "Merkez"
    ],
    "Derebucak": [
      "Merkez"
    ],
    "Akören": [
      "Merkez"
    ],
    "Halkapınar": [
      "Merkez"
    ],
    "Yalıhüyük": [
      "Merkez"
    ]
  },
  "Kütahya": {
    "Merkez": [
      "Merkez"
    ],
    "Tavşanlı": [
      "Merkez"
    ],
    "Simav": [
      "Merkez"
    ],
    "Gediz": [
      "Merkez"
    ],
    "Emet": [
      "Merkez"
    ],
    "Altıntaş": [
      "Merkez"
    ],
    "Domaniç": [
      "Merkez"
    ],
    "Hisarcık": [
      "Merkez"
    ],
    "Aslanapa": [
      "Merkez"
    ],
    "Çavdarhisar": [
      "Merkez"
    ],
    "Şaphane": [
      "Merkez"
    ],
    "Pazarlar": [
      "Merkez"
    ],
    "Dumlupınar": [
      "Merkez"
    ]
  },
  "Malatya": {
    "Battalgazi": [
      "Merkez"
    ],
    "Yeşilyurt": [
      "Merkez"
    ],
    "Doğanşehir": [
      "Merkez"
    ],
    "Akçadağ": [
      "Merkez"
    ],
    "Darende": [
      "Merkez"
    ],
    "Hekimhan": [
      "Merkez"
    ],
    "Pütürge": [
      "Merkez"
    ],
    "Yazıhan": [
      "Merkez"
    ],
    "Arapgir": [
      "Merkez"
    ],
    "Kuluncak": [
      "Merkez"
    ],
    "Arguvan": [
      "Merkez"
    ],
    "Kale": [
      "Merkez"
    ],
    "Doğanyol": [
      "Merkez"
    ]
  },
  "Manisa": {
    "Yunusemre": [
      "Merkez"
    ],
    "Şehzadeler": [
      "Merkez"
    ],
    "Akhisar": [
      "Merkez"
    ],
    "Turgutlu": [
      "Merkez"
    ],
    "Salihli": [
      "Merkez"
    ],
    "Soma": [
      "Merkez"
    ],
    "Alaşehir": [
      "Merkez"
    ],
    "Saruhanlı": [
      "Merkez"
    ],
    "Kula": [
      "Merkez"
    ],
    "Demirci": [
      "Merkez"
    ],
    "Kırkağaç": [
      "Merkez"
    ],
    "Sarıgöl": [
      "Merkez"
    ],
    "Gördes": [
      "Merkez"
    ],
    "Selendi": [
      "Merkez"
    ],
    "Ahmetli": [
      "Merkez"
    ],
    "Gölmarmara": [
      "Merkez"
    ],
    "Köprübaşı": [
      "Merkez"
    ]
  },
  "Kahramanmaraş": {
    "Onikişubat": [
      "Merkez"
    ],
    "Dulkadiroğlu": [
      "Merkez"
    ],
    "Elbistan": [
      "Merkez"
    ],
    "Afşin": [
      "Merkez"
    ],
    "Türkoğlu": [
      "Merkez"
    ],
    "Pazarcık": [
      "Merkez"
    ],
    "Göksun": [
      "Merkez"
    ],
    "Andırın": [
      "Merkez"
    ],
    "Çağlayancerit": [
      "Merkez"
    ],
    "Nurhak": [
      "Merkez"
    ],
    "Ekinözü": [
      "Merkez"
    ]
  },
  "Mardin": {
    "Kızıltepe": [
      "Merkez"
    ],
    "Artuklu": [
      "Merkez"
    ],
    "Midyat": [
      "Merkez"
    ],
    "Nusaybin": [
      "Merkez"
    ],
    "Derik": [
      "Merkez"
    ],
    "Mazıdağı": [
      "Merkez"
    ],
    "Dargeçit": [
      "Merkez"
    ],
    "Savur": [
      "Merkez"
    ],
    "Yeşilli": [
      "Merkez"
    ],
    "Ömerli": [
      "Merkez"
    ]
  },
  "Muğla": {
    "Bodrum": [
      "Merkez"
    ],
    "Fethiye": [
      "Merkez"
    ],
    "Milas": [
      "Merkez"
    ],
    "Menteşe": [
      "Merkez"
    ],
    "Marmaris": [
      "Merkez"
    ],
    "Seydikemer": [
      "Merkez"
    ],
    "Ortaca": [
      "Merkez"
    ],
    "Yatağan": [
      "Merkez"
    ],
    "Dalaman": [
      "Merkez"
    ],
    "Köyceğiz": [
      "Merkez"
    ],
    "Ula": [
      "Merkez"
    ],
    "Datça": [
      "Merkez"
    ],
    "Kavaklıdere": [
      "Merkez"
    ]
  },
  "Muş": {
    "Merkez": [
      "Merkez"
    ],
    "Bulanık": [
      "Merkez"
    ],
    "Malazgirt": [
      "Merkez"
    ],
    "Varto": [
      "Merkez"
    ],
    "Korkut": [
      "Merkez"
    ],
    "Hasköy": [
      "Merkez"
    ]
  },
  "Nevşehir": {
    "Merkez": [
      "Merkez"
    ],
    "Ürgüp": [
      "Merkez"
    ],
    "Avanos": [
      "Merkez"
    ],
    "Gülşehir": [
      "Merkez"
    ],
    "Derinkuyu": [
      "Merkez"
    ],
    "Kozaklı": [
      "Merkez"
    ],
    "Acıgöl": [
      "Merkez"
    ],
    "Hacıbektaş": [
      "Merkez"
    ]
  },
  "Niğde": {
    "Merkez": [
      "Merkez"
    ],
    "Bor": [
      "Merkez"
    ],
    "Çiftlik": [
      "Merkez"
    ],
    "Ulukışla": [
      "Merkez"
    ],
    "Altunhisar": [
      "Merkez"
    ],
    "Çamardı": [
      "Merkez"
    ]
  },
  "Ordu": {
    "Altınordu": [
      "Merkez"
    ],
    "Ünye": [
      "Merkez"
    ],
    "Fatsa": [
      "Merkez"
    ],
    "Gölköy": [
      "Merkez"
    ],
    "Perşembe": [
      "Merkez"
    ],
    "Korgan": [
      "Merkez"
    ],
    "Kumru": [
      "Merkez"
    ],
    "Aybastı": [
      "Merkez"
    ],
    "Akkuş": [
      "Merkez"
    ],
    "Ulubey": [
      "Merkez"
    ],
    "Mesudiye": [
      "Merkez"
    ],
    "Gürgentepe": [
      "Merkez"
    ],
    "İkizce": [
      "Merkez"
    ],
    "Çatalpınar": [
      "Merkez"
    ],
    "Çaybaşı": [
      "Merkez"
    ],
    "Kabataş": [
      "Merkez"
    ],
    "Kabadüz": [
      "Merkez"
    ],
    "Çamaş": [
      "Merkez"
    ],
    "Gülyalı": [
      "Merkez"
    ]
  },
  "Rize": {
    "Merkez": [
      "Merkez"
    ],
    "Çayeli": [
      "Merkez"
    ],
    "Ardeşen": [
      "Merkez"
    ],
    "Pazar": [
      "Merkez"
    ],
    "Fındıklı": [
      "Merkez"
    ],
    "Güneysu": [
      "Merkez"
    ],
    "Kalkandere": [
      "Merkez"
    ],
    "İyidere": [
      "Merkez"
    ],
    "Derepazarı": [
      "Merkez"
    ],
    "Çamlıhemşin": [
      "Merkez"
    ],
    "İkizdere": [
      "Merkez"
    ],
    "Hemşin": [
      "Merkez"
    ]
  },
  "Sakarya": {
    "Adapazarı": [
      "Merkez"
    ],
    "Serdivan": [
      "Merkez"
    ],
    "Akyazı": [
      "Merkez"
    ],
    "Erenler": [
      "Merkez"
    ],
    "Hendek": [
      "Merkez"
    ],
    "Karasu": [
      "Merkez"
    ],
    "Geyve": [
      "Merkez"
    ],
    "Arifiye": [
      "Merkez"
    ],
    "Sapanca": [
      "Merkez"
    ],
    "Pamukova": [
      "Merkez"
    ],
    "Ferizli": [
      "Merkez"
    ],
    "Kaynarca": [
      "Merkez"
    ],
    "Kocaali": [
      "Merkez"
    ],
    "Söğütlü": [
      "Merkez"
    ],
    "Karapürçek": [
      "Merkez"
    ],
    "Taraklı": [
      "Merkez"
    ]
  },
  "Samsun": {
    "İlkadım": [
      "Merkez"
    ],
    "Atakum": [
      "Merkez"
    ],
    "Bafra": [
      "Merkez"
    ],
    "Çarşamba": [
      "Merkez"
    ],
    "Canik": [
      "Merkez"
    ],
    "Vezirköprü": [
      "Merkez"
    ],
    "Terme": [
      "Merkez"
    ],
    "Tekkeköy": [
      "Merkez"
    ],
    "Havza": [
      "Merkez"
    ],
    "Alaçam": [
      "Merkez"
    ],
    "19 Mayıs": [
      "Merkez"
    ],
    "Ayvacık": [
      "Merkez"
    ],
    "Kavak": [
      "Merkez"
    ],
    "Salıpazarı": [
      "Merkez"
    ],
    "Asarcık": [
      "Merkez"
    ],
    "Ladik": [
      "Merkez"
    ],
    "Yakakent": [
      "Merkez"
    ]
  },
  "Siirt": {
    "Merkez": [
      "Merkez"
    ],
    "Kurtalan": [
      "Merkez"
    ],
    "Pervari": [
      "Merkez"
    ],
    "Baykan": [
      "Merkez"
    ],
    "Şirvan": [
      "Merkez"
    ],
    "Eruh": [
      "Merkez"
    ],
    "Tillo": [
      "Merkez"
    ]
  },
  "Sinop": {
    "Merkez": [
      "Merkez"
    ],
    "Boyabat": [
      "Merkez"
    ],
    "Gerze": [
      "Merkez"
    ],
    "Ayancık": [
      "Merkez"
    ],
    "Durağan": [
      "Merkez"
    ],
    "Türkeli": [
      "Merkez"
    ],
    "Erfelek": [
      "Merkez"
    ],
    "Dikmen": [
      "Merkez"
    ],
    "Saraydüzü": [
      "Merkez"
    ]
  },
  "Sivas": {
    "Merkez": [
      "Merkez"
    ],
    "Şarkışla": [
      "Merkez"
    ],
    "Yıldızeli": [
      "Merkez"
    ],
    "Suşehri": [
      "Merkez"
    ],
    "Zara": [
      "Merkez"
    ],
    "Gemerek": [
      "Merkez"
    ],
    "Kangal": [
      "Merkez"
    ],
    "Gürün": [
      "Merkez"
    ],
    "Divriği": [
      "Merkez"
    ],
    "Koyulhisar": [
      "Merkez"
    ],
    "Hafik": [
      "Merkez"
    ],
    "Ulaş": [
      "Merkez"
    ],
    "Altınyayla": [
      "Merkez"
    ],
    "Felahiye": [
      "Merkez"
    ],
    "İmranlı": [
      "Merkez"
    ],
    "Akıncılar": [
      "Merkez"
    ],
    "Gölova": [
      "Merkez"
    ],
    "Doğanşar": [
      "Merkez"
    ]
  },
  "Tekirdağ": {
    "Çorlu": [
      "Merkez"
    ],
    "Süleymanpaşa": [
      "Merkez"
    ],
    "Çerkezköy": [
      "Merkez"
    ],
    "Kapaklı": [
      "Merkez"
    ],
    "Ergene": [
      "Merkez"
    ],
    "Malkara": [
      "Merkez"
    ],
    "Saray": [
      "Merkez"
    ],
    "Hayrabolu": [
      "Merkez"
    ],
    "Şarköy": [
      "Merkez"
    ],
    "Muratlı": [
      "Merkez"
    ],
    "Marmaraereğlisi": [
      "Merkez"
    ]
  },
  "Tokat": {
    "Merkez": [
      "Merkez"
    ],
    "Erbaa": [
      "Merkez"
    ],
    "Turhal": [
      "Merkez"
    ],
    "Niksar": [
      "Merkez"
    ],
    "Zile": [
      "Merkez"
    ],
    "Reşadiye": [
      "Merkez"
    ],
    "Almus": [
      "Merkez"
    ],
    "Pazar": [
      "Merkez"
    ],
    "Yeşilyurt": [
      "Merkez"
    ],
    "Artova": [
      "Merkez"
    ],
    "Sulusaray": [
      "Merkez"
    ],
    "Başçiftlik": [
      "Merkez"
    ]
  },
  "Trabzon": {
    "Ortahisar": [
      "Merkez"
    ],
    "Akçaabat": [
      "Merkez"
    ],
    "Araklı": [
      "Merkez"
    ],
    "Of": [
      "Merkez"
    ],
    "Yomra": [
      "Merkez"
    ],
    "Arsin": [
      "Merkez"
    ],
    "Vakfıkebir": [
      "Merkez"
    ],
    "Sürmene": [
      "Merkez"
    ],
    "Maçka": [
      "Merkez"
    ],
    "Beşikdüzü": [
      "Merkez"
    ],
    "Çarşıbaşı": [
      "Merkez"
    ],
    "Tonya": [
      "Merkez"
    ],
    "Düzköy": [
      "Merkez"
    ],
    "Çaykara": [
      "Merkez"
    ],
    "Şalpazarı": [
      "Merkez"
    ],
    "Hayrat": [
      "Merkez"
    ],
    "Köprübaşı": [
      "Merkez"
    ],
    "Dernekpazarı": [
      "Merkez"
    ]
  },
  "Tunceli": {
    "Merkez": [
      "Merkez"
    ],
    "Pertek": [
      "Merkez"
    ],
    "Mazgirt": [
      "Merkez"
    ],
    "Çemişgezek": [
      "Merkez"
    ],
    "Hozat": [
      "Merkez"
    ],
    "Ovacık": [
      "Merkez"
    ],
    "Pülümür": [
      "Merkez"
    ],
    "Nazımiye": [
      "Merkez"
    ]
  },
  "Şanlıurfa": {
    "Eyyübiye": [
      "Merkez"
    ],
    "Haliliye": [
      "Merkez"
    ],
    "Siverek": [
      "Merkez"
    ],
    "Viranşehir": [
      "Merkez"
    ],
    "Karaköprü": [
      "Merkez"
    ],
    "Akçakale": [
      "Merkez"
    ],
    "Suruç": [
      "Merkez"
    ],
    "Birecik": [
      "Merkez"
    ],
    "Ceylanpınar": [
      "Merkez"
    ],
    "Harran": [
      "Merkez"
    ],
    "Bozova": [
      "Merkez"
    ],
    "Hilvan": [
      "Merkez"
    ],
    "Halfeti": [
      "Merkez"
    ]
  },
  "Uşak": {
    "Merkez": [
      "Merkez"
    ],
    "Banaz": [
      "Merkez"
    ],
    "Eşme": [
      "Merkez"
    ],
    "Sivaslı": [
      "Merkez"
    ],
    "Ulubey": [
      "Merkez"
    ],
    "Karahallı": [
      "Merkez"
    ]
  },
  "Van": {
    "İpekyolu": [
      "Merkez"
    ],
    "Erciş": [
      "Merkez"
    ],
    "Tuşba": [
      "Merkez"
    ],
    "Edremit": [
      "Merkez"
    ],
    "Özalp": [
      "Merkez"
    ],
    "Çaldıran": [
      "Merkez"
    ],
    "Başkale": [
      "Merkez"
    ],
    "Muradiye": [
      "Merkez"
    ],
    "Gürpınar": [
      "Merkez"
    ],
    "Gevaş": [
      "Merkez"
    ],
    "Saray": [
      "Merkez"
    ],
    "Çatak": [
      "Merkez"
    ],
    "Bahçesaray": [
      "Merkez"
    ]
  },
  "Yozgat": {
    "Merkez": [
      "Merkez"
    ],
    "Sorgun": [
      "Merkez"
    ],
    "Akdağmadeni": [
      "Merkez"
    ],
    "Yerköy": [
      "Merkez"
    ],
    "Boğazlıyan": [
      "Merkez"
    ],
    "Sarıkaya": [
      "Merkez"
    ],
    "Çekerek": [
      "Merkez"
    ],
    "Şefaatli": [
      "Merkez"
    ],
    "Saraykent": [
      "Merkez"
    ],
    "Çayıralan": [
      "Merkez"
    ],
    "Kadışehri": [
      "Merkez"
    ],
    "Aydıncık": [
      "Merkez"
    ],
    "Yenifakılı": [
      "Merkez"
    ],
    "Çandır": [
      "Merkez"
    ]
  },
  "Zonguldak": {
    "Merkez": [
      "Merkez"
    ],
    "Ereğli": [
      "Merkez"
    ],
    "Çaycuma": [
      "Merkez"
    ],
    "Devrek": [
      "Merkez"
    ],
    "Kozlu": [
      "Merkez"
    ],
    "Alaplı": [
      "Merkez"
    ],
    "Kilimli": [
      "Merkez"
    ],
    "Gökçebey": [
      "Merkez"
    ]
  },
  "Aksaray": {
    "Merkez": [
      "Merkez"
    ],
    "Ortaköy": [
      "Merkez"
    ],
    "Eskil": [
      "Merkez"
    ],
    "Gülağaç": [
      "Merkez"
    ],
    "Güzelyurt": [
      "Merkez"
    ],
    "Ağaçören": [
      "Merkez"
    ],
    "Sultanhanı": [
      "Merkez"
    ],
    "Sarıyahşi": [
      "Merkez"
    ]
  },
  "Bayburt": {
    "Merkez": [
      "Merkez"
    ],
    "Demirözü": [
      "Merkez"
    ],
    "Aydıntepe": [
      "Merkez"
    ]
  },
  "Karaman": {
    "Merkez": [
      "Merkez"
    ],
    "Ermenek": [
      "Merkez"
    ],
    "Sarıveliler": [
      "Merkez"
    ],
    "Ayrancı": [
      "Merkez"
    ],
    "Kazımkarabekir": [
      "Merkez"
    ],
    "Başyayla": [
      "Merkez"
    ]
  },
  "Kırıkkale": {
    "Merkez": [
      "Merkez"
    ],
    "Yahşihan": [
      "Merkez"
    ],
    "Keskin": [
      "Merkez"
    ],
    "Delice": [
      "Merkez"
    ],
    "Bahşılı": [
      "Merkez"
    ],
    "Sulakyurt": [
      "Merkez"
    ],
    "Balışeyh": [
      "Merkez"
    ],
    "Karakeçili": [
      "Merkez"
    ],
    "Çelebi": [
      "Merkez"
    ]
  },
  "Batman": {
    "Merkez": [
      "Merkez"
    ],
    "Kozluk": [
      "Merkez"
    ],
    "Sason": [
      "Merkez"
    ],
    "Beşiri": [
      "Merkez"
    ],
    "Gercüş": [
      "Merkez"
    ],
    "Hasankeyf": [
      "Merkez"
    ]
  },
  "Şırnak": {
    "Cizre": [
      "Merkez"
    ],
    "Silopi": [
      "Merkez"
    ],
    "Merkez": [
      "Merkez"
    ],
    "İdil": [
      "Merkez"
    ],
    "Uludere": [
      "Merkez"
    ],
    "Beytüşşebap": [
      "Merkez"
    ],
    "Güçlükonak": [
      "Merkez"
    ]
  },
  "Bartın": {
    "Merkez": [
      "Merkez"
    ],
    "Ulus": [
      "Merkez"
    ],
    "Amasra": [
      "Merkez"
    ],
    "Kurucaşile": [
      "Merkez"
    ]
  },
  "Ardahan": {
    "Merkez": [
      "Merkez"
    ],
    "Göle": [
      "Merkez"
    ],
    "Çıldır": [
      "Merkez"
    ],
    "Hanak": [
      "Merkez"
    ],
    "Posof": [
      "Merkez"
    ],
    "Damal": [
      "Merkez"
    ]
  },
  "Iğdır": {
    "Merkez": [
      "Merkez"
    ],
    "Tuzluca": [
      "Merkez"
    ],
    "Aralık": [
      "Merkez"
    ],
    "Karakoyunlu": [
      "Merkez"
    ]
  },
  "Yalova": {
    "Merkez": [
      "Merkez"
    ],
    "Çiftlikköy": [
      "Merkez"
    ],
    "Çınarcık": [
      "Merkez"
    ],
    "Altınova": [
      "Merkez"
    ],
    "Armutlu": [
      "Merkez"
    ],
    "Termal": [
      "Merkez"
    ]
  },
  "Karabük": {
    "Merkez": [
      "Merkez"
    ],
    "Safranbolu": [
      "Merkez"
    ],
    "Yenice": [
      "Merkez"
    ],
    "Eskipazar": [
      "Merkez"
    ],
    "Eflani": [
      "Merkez"
    ],
    "Ovacık": [
      "Merkez"
    ]
  },
  "Kilis": {
    "Merkez": [
      "Merkez"
    ],
    "Musabeyli": [
      "Merkez"
    ],
    "Elbeyli": [
      "Merkez"
    ],
    "Polateli": [
      "Merkez"
    ]
  },
  "Osmaniye": {
    "Merkez": [
      "Merkez"
    ],
    "Kadirli": [
      "Merkez"
    ],
    "Düziçi": [
      "Merkez"
    ],
    "Bahçe": [
      "Merkez"
    ],
    "Toprakkale": [
      "Merkez"
    ],
    "Sumbas": [
      "Merkez"
    ],
    "Hasanbeyli": [
      "Merkez"
    ]
  },
  "Düzce": {
    "Merkez": [
      "Merkez"
    ],
    "Akçakoca": [
      "Merkez"
    ],
    "Kaynaşlı": [
      "Merkez"
    ],
    "Gölyaka": [
      "Merkez"
    ],
    "Çilimli": [
      "Merkez"
    ],
    "Yığılca": [
      "Merkez"
    ],
    "Gümüşova": [
      "Merkez"
    ],
    "Cumayeri": [
      "Merkez"
    ]
  }
};

export const INITIAL_DEALERS: Dealer[] = [
  {
    id: 'd-0',
    name: 'Türkiye İller Koordinatörlüğü',
    dealerCode: 'TR.001',
    officialTitle: 'Türkiye İller Koordinatörlüğü & Üst Bayi',
    licenseTier: 'MASTER_1000',
    level: 'ILLER',
    licenseFeePaid: 3000,
    businessType: 'HYBRID',
    canIssueDealership: true,
    canSellSubscription: true,
    subDealerCount: 81,
    province: 'Türkiye Geneli',
    district: 'Tüm İller',
    subdomain: 'turkiye.santralbayi',
    customDomain: 'turkiye-santralbayi.com',
    balance: 148500,
    commissionRate: 50,
    status: 'ACTIVE',
    createdAt: '2026-01-01',
    contactName: 'Kemal Öztürk',
    contactPhone: '0532 100 2030',
    subscriberCount: 1420,
    apkDistributed: 4200,
    apkConverted: 1420,
    apkDropped: 40,
    apkReturned: 10,
    iban: 'TR02 0001 0001 2345 6789 0123 45',
    taxNumber: '1002948120'
  },
  {
    id: 'd-1',
    name: 'İstanbul İl Bayisi',
    dealerCode: '34.il.001',
    officialTitle: 'İstanbul İl Bayisi',
    licenseTier: 'MASTER_1000',
    licenseFeePaid: 1000,
    businessType: 'HYBRID',
    canIssueDealership: true,
    canSellSubscription: false,
    subDealerCount: 4,
    parentId: 'd-0',
    province: 'İstanbul',
    subdomain: 'istanbul.santralbayi',
    customDomain: 'istanbul-santralbayi.com',
    balance: 42500,
    commissionRate: 35,
    status: 'ACTIVE',
    createdAt: '2026-01-15',
    contactName: 'Zeynep Kaya',
    contactPhone: '0542 222 3344',
    subscriberCount: 24,
    apkDistributed: 180,
    apkConverted: 41,
    apkDropped: 4,
    apkReturned: 2,
    iban: 'TR32 0006 1005 1234 5678 9012 34',
    taxNumber: '3410294812'
  },
  {
    id: 'd-2',
    name: 'İstanbul Kadıköy İlçe Bayisi',
    dealerCode: '34.ilç.001',
    officialTitle: 'İstanbul Kadıköy İlçe Bayisi',
    licenseTier: 'STANDARD_500',
    licenseFeePaid: 500,
    businessType: 'HYBRID',
    canIssueDealership: false,
    canSellSubscription: true,
    subDealerCount: 0,
    parentId: 'd-1',
    province: 'İstanbul',
    district: 'Kadıköy',
    subdomain: 'kadikoy.santralbayi',
    balance: 18400,
    commissionRate: 20,
    status: 'ACTIVE',
    createdAt: '2026-02-10',
    contactName: 'Murat Yılmaz',
    contactPhone: '0533 111 2233',
    subscriberCount: 14,
    apkDistributed: 65,
    apkConverted: 14,
    apkDropped: 2,
    apkReturned: 1,
    iban: 'TR14 0001 0009 8765 4321 0987 65',
    taxNumber: '3420184719'
  },
  {
    id: 'd-4',
    name: 'Ankara İl Bayisi',
    dealerCode: '06.il.001',
    officialTitle: 'Ankara İl Bayisi',
    licenseTier: 'MASTER_1000',
    licenseFeePaid: 1000,
    businessType: 'DEALERSHIP_ONLY',
    canIssueDealership: true,
    canSellSubscription: false,
    subDealerCount: 3,
    parentId: 'd-0',
    province: 'Ankara',
    subdomain: 'ankara.santralbayi',
    customDomain: 'ankara-santralbayi.com',
    balance: 31200,
    commissionRate: 35,
    status: 'ACTIVE',
    createdAt: '2026-01-20',
    contactName: 'Mustafa Şahin',
    contactPhone: '0505 444 5566',
    subscriberCount: 0,
    apkDistributed: 120,
    apkConverted: 22,
    apkDropped: 3,
    apkReturned: 1,
    iban: 'TR56 0001 5001 2233 4455 6677 88',
    taxNumber: '0610192837'
  },
  {
    id: 'd-5',
    name: 'Ankara Çankaya İlçe Bayisi',
    dealerCode: '06.ilç.001',
    officialTitle: 'Ankara Çankaya İlçe Bayisi',
    licenseTier: 'STANDARD_500',
    licenseFeePaid: 500,
    businessType: 'SUBSCRIBER_ONLY',
    canIssueDealership: false,
    canSellSubscription: true,
    subDealerCount: 0,
    parentId: 'd-4',
    province: 'Ankara',
    district: 'Çankaya',
    subdomain: 'cankaya.santralbayi',
    balance: 12100,
    commissionRate: 20,
    status: 'ACTIVE',
    createdAt: '2026-02-18',
    contactName: 'Elif Yurt',
    contactPhone: '0533 555 6677',
    subscriberCount: 9,
    apkDistributed: 44,
    apkConverted: 9,
    apkDropped: 1,
    apkReturned: 1,
    iban: 'TR78 0006 7000 1122 3344 5566 99',
  },
  {
    id: 'd-6',
    name: 'Ankara Yenimahalle İlçe Bayisi',
    dealerCode: '06.ilç.002',
    officialTitle: 'Ankara Yenimahalle İlçe Bayisi',
    licenseTier: 'STANDARD_500',
    licenseFeePaid: 500,
    businessType: 'SUBSCRIBER_ONLY',
    canIssueDealership: false,
    canSellSubscription: true,
    subDealerCount: 0,
    parentId: 'd-4',
    province: 'Ankara',
    district: 'Yenimahalle',
    subdomain: 'yenimahalle.santralbayi',
    balance: 8500,
    commissionRate: 20,
    status: 'ACTIVE',
    createdAt: '2026-02-22',
    contactName: 'Kemal Demir',
    contactPhone: '0532 777 8899',
    subscriberCount: 6,
    apkDistributed: 32,
    apkConverted: 6,
    apkDropped: 1,
    apkReturned: 0,
    iban: 'TR19 0001 5001 4455 6677 8899 00',
    taxNumber: '0620294819'
  },
  {
    id: 'd-7',
    name: 'Ankara Keçiören İlçe Bayisi',
    dealerCode: '06.ilç.003',
    officialTitle: 'Ankara Keçiören İlçe Bayisi',
    licenseTier: 'STANDARD_500',
    licenseFeePaid: 500,
    businessType: 'SUBSCRIBER_ONLY',
    canIssueDealership: false,
    canSellSubscription: true,
    subDealerCount: 0,
    parentId: 'd-4',
    province: 'Ankara',
    district: 'Keçiören',
    subdomain: 'kecioren.santralbayi',
    balance: 0,
    commissionRate: 20,
    status: 'PENDING',
    createdAt: '2026-03-01',
    contactName: 'Atama Yapılmadı',
    contactPhone: '-',
    subscriberCount: 0,
    apkDistributed: 0,
    apkConverted: 0,
    apkDropped: 0,
    apkReturned: 0,
    iban: '',
    taxNumber: ''
  },
  {
    id: 'd-web-ilce-1',
    name: 'Beşiktaş Web Başvuru İlçe Bayisi',
    dealerCode: '34.ilç.009',
    officialTitle: 'İstanbul Beşiktaş İlçe Bayisi (Web Kaydı)',
    level: 'ILCE',
    licenseTier: 'STANDARD_500',
    licenseFeePaid: 500,
    businessType: 'SUBSCRIBER_ONLY',
    canIssueDealership: false,
    canSellSubscription: true,
    subDealerCount: 0,
    parentId: 'ADMIN_POOL',
    province: 'Web Havuzu (İstanbul)',
    district: 'Beşiktaş',
    subdomain: 'besiktas.santralbayi',
    balance: 0,
    commissionRate: 20,
    status: 'ACTIVE',
    createdAt: '2026-03-14',
    contactName: 'Serdar Kılıç (Web Kaydı)',
    contactPhone: '0532 811 4050',
    subscriberCount: 0,
    movedByAdmin: true,
    hasDownline: false
  },
  {
    id: 'd-web-il-1',
    name: 'İzmir İl Bayisi (Web Kaydı)',
    dealerCode: '35.il.001',
    officialTitle: 'İzmir İl Bölge Direktörlüğü (Web Kaydı)',
    level: 'IL',
    licenseTier: 'MASTER_1000',
    licenseFeePaid: 1000,
    businessType: 'DEALERSHIP_ONLY',
    canIssueDealership: true,
    canSellSubscription: false,
    subDealerCount: 0,
    parentId: 'ADMIN_POOL',
    province: 'İzmir',
    district: 'İl Geneli',
    subdomain: 'izmir.santralbayi',
    balance: 0,
    commissionRate: 35,
    status: 'ACTIVE',
    createdAt: '2026-03-14',
    contactName: 'Hakan Aydın (Web Kaydı)',
    contactPhone: '0533 922 6070',
    subscriberCount: 0,
    movedByAdmin: true,
    hasDownline: false
  }
];

export const INITIAL_SUBSCRIBERS: Subscriber[] = [
  {
    id: 's-1',
    name: 'Bora Eczanesi',
    companyName: 'Bora Eczanesi Tic. Ltd.',
    subscriberCode: '34.e.001',
    phone: '0216 345 6789',
    dealerId: 'd-2', // Kadıköy İlçe Bayisi
    status: 'ACTIVE',
    plan: 'PRO',
    monthlyPrice: 350,
    demoDaysLeft: 0,
    isPaid: true,
    subdomain: 'boraeczanesi.santralbayi',
    createdAt: '2026-03-05',
    sector: 'Sağlık & Eczacılık',
    taxNumber: '3481920391',
    referredBySubscriberName: 'İstanbul Kadıköy İlçe Bayisi Doğrudan Saha Dağıtımı',
    hasDownline: true,
    apkStatus: 'ACTIVE',
    apkVersion: 'v1.1',
    apkDistributedDate: '01.03.2026',
    aiConfig: {
      agentName: 'Eczane Asistanı Melis',
      voiceType: 'Female_TR',
      greetingMessage: 'Bora Eczanesi Akıllı Asistanı Melis. Nöbetçi eczane bilgisi, ilaç stok sorgulama, randevu veya fiyat danışma için size yardımcı olabilirim.',
      knowledgeBase: 'Nöbetçi günlerimiz: Pazartesi ve Perşembe. Adres: Moda Cd. No:82 Kadıköy. Telefon: 0216 345 6789. Ağrı kesiciler ortalama 80 TL ile 150 TL arasındadır. Vitamin destekleri 250 TL-600 TL aralığındadır. Reçeteli ilaçlar için SGK sorgulaması TC Kimlik ve Reçete No ile telefonda yapılabilmektedir.',
      recordCalls: true,
      unlimitedCalls: true,
      features: {
        information: true,
        noteTaking: true,
        appointmentBooking: true,
        priceNegotiation: true,
        warmTransfer: true
      },
      warmTransferConfig: {
        enabled: true,
        screenAnonymousCallers: true,
        defaultCallbackMinutes: 3
      },
      negotiationDiscountPercent: 10,
      persuasionTone: 'PERSUASIVE',
      ivrExtensions: [
        { key: '1', department: 'Muhasebe & Faturalandırma', forwardNumber: '101' },
        { key: '2', department: 'Depo & İlaç Stok Hattı', forwardNumber: '102' },
        { key: '3', department: 'Teknik Destek / Reçete İşlemleri', forwardNumber: '103' }
      ]
    }
  },
  {
    id: 's-2',
    name: 'Göztepe Veteriner Kliniği',
    companyName: 'Göztepe Vet Veteriner Hizmetleri',
    subscriberCode: '34.e.002',
    phone: '0216 456 7890',
    dealerId: 'd-2', // Kadıköy İlçe Bayisi
    status: 'ACTIVE',
    plan: 'ENTERPRISE',
    monthlyPrice: 500,
    demoDaysLeft: 0,
    isPaid: true,
    subdomain: 'goztepevet.santralbayi',
    customDomain: 'goztepeveterinerlik.com',
    createdAt: '2026-02-15',
    sector: 'Veterinerlik & Evcil Hayvan',
    taxNumber: '3490219482',
    referredBySubscriberName: 'Bora Eczanesi (Esnaf Tavsiyesi)',
    referredBySubscriberId: 's-1',
    hasDownline: true,
    apkStatus: 'ACTIVE',
    apkVersion: 'v1.1',
    apkDistributedDate: '10.02.2026',
    aiConfig: {
      agentName: 'VetAsistan Caner',
      voiceType: 'Male_TR',
      greetingMessage: 'Göztepe Veteriner Kliniğine hoş geldiniz. Ben yapay zeka asistanınız Caner. Muayene ücreti, aşı randevusu veya acil durumlar için yardımcı olabilirim.',
      knowledgeBase: 'Genel muayene ücreti: 450 TL. Kedi karma aşısı: 400 TL, Köpek kuduz aşısı: 350 TL. Çalışma saatleri: Haftanın her günü 09:00 - 22:00. Acil durumlarda nöbetçi veterinerimiz her zaman klinikte bulunur. Adres: Göztepe Mah. Bağdat Cd. No:190 Kadıköy.',
      recordCalls: true,
      unlimitedCalls: true,
      features: {
        information: true,
        noteTaking: true,
        appointmentBooking: true,
        priceNegotiation: true
      },
      negotiationDiscountPercent: 15,
      persuasionTone: 'PERSUASIVE',
      ivrExtensions: [
        { key: '1', department: 'Randevu & Muayene Sorumlusu', forwardNumber: '110' },
        { key: '2', department: 'Pet Shop & Ürün Satış', forwardNumber: '111' },
        { key: '3', department: 'Laboratuvar & Tahlil Sonuçları', forwardNumber: '112' }
      ]
    }
  },
  {
    id: 's-3',
    name: 'Emin Rent A Car',
    companyName: 'Emin Otomotiv Kiralamacılık',
    subscriberCode: '06.e.001',
    phone: '0312 444 8899',
    dealerId: 'd-5', // Çankaya İlçe Bayisi
    status: 'ACTIVE',
    plan: 'BASIC',
    monthlyPrice: 350,
    demoDaysLeft: 0,
    isPaid: true,
    subdomain: 'eminrentacar.santralbayi',
    createdAt: '2026-02-25',
    sector: 'Otomotiv & Araç Kiralama',
    taxNumber: '0681920394',
    referredBySubscriberName: 'Ankara Çankaya İlçe Bayisi QR Kit Tanıtımı',
    hasDownline: true,
    apkStatus: 'ACTIVE',
    apkVersion: 'v1.1',
    apkDistributedDate: '22.02.2026',
    aiConfig: {
      agentName: 'Emin Rent A Car Asistanı',
      voiceType: 'Neutral_TR',
      greetingMessage: 'Emin Rent A Car\'a hoş geldiniz. Günlük kiralık araç fiyatları, rezervasyon koşulları ve araç müsaitliği için sorabilirsiniz.',
      knowledgeBase: 'Ekonomik sınıf araçlar günlük 1200 TL\'den başlamaktadır. Orta sınıf araçlar günlük 1800 TL\'dir. SUV sınıfı araçlar 2500 TL\'dir. Minimum kiralama süresi 2 gündür. En az 2 yıllık B sınıfı ehliyet ve depozito için kredi kartı gerekmektedir. Ofisimiz Çankaya Kızılay\'dadır.',
      recordCalls: true,
      unlimitedCalls: true,
      features: {
        information: true,
        noteTaking: true,
        appointmentBooking: true,
        priceNegotiation: true
      },
      negotiationDiscountPercent: 12,
      persuasionTone: 'SALES_FOCUSED',
      ivrExtensions: [
        { key: '1', department: 'Araç Teslimat / İade Masası', forwardNumber: '201' },
        { key: '2', department: 'Rezervasyon & Fiyatlandırma Ofisi', forwardNumber: '202' },
        { key: '3', department: 'Hasar & Yol Yardım (7/24)', forwardNumber: '203' }
      ]
    }
  },
  {
    id: 's-4',
    name: 'Moda Butik Kahve',
    companyName: 'Moda Kahvecisi & Roastery',
    subscriberCode: '34.e.003',
    phone: '0216 333 4455',
    dealerId: 'd-2', // Kadıköy İlçe Bayisi
    status: 'ACTIVE',
    plan: 'PRO',
    monthlyPrice: 350,
    demoDaysLeft: 0,
    isPaid: true,
    subdomain: 'modakahve.santralbayi',
    createdAt: '2026-03-12',
    sector: 'Kafe & Restoran',
    taxNumber: '3489102837',
    referredBySubscriberName: 'Bora Eczanesi (Esnaf Tavsiyesi)',
    referredBySubscriberId: 's-1',
    hasDownline: false,
    apkStatus: 'RETURNED', // Bırakmıştı geri döndü
    apkVersion: 'v1.1',
    apkDistributedDate: '15.01.2026',
    aiConfig: {
      agentName: 'Kahve Sipariş Asistanı',
      voiceType: 'Neutral_TR',
      greetingMessage: 'Moda Butik Kahveye hoş geldiniz! Paket kahve siparişi, masa rezervasyonu ve çalışma saatleri için size yardımcı olabilirim.',
      knowledgeBase: 'Çekirdek kahveler 250gr paket 180 TL-320 TL arası. Çalışma saatlerimiz: 08:00 - 23:00. Adres: Caferağa Mah. Moda.',
      recordCalls: true,
      unlimitedCalls: true,
      features: {
        information: true,
        noteTaking: true,
        appointmentBooking: true,
        priceNegotiation: false
      }
    }
  },
  {
    id: 's-5',
    name: 'Yıldız Hukuk & Danışmanlık',
    companyName: 'Yıldız Avukatlık Ortaklığı',
    phone: '0216 555 7788',
    dealerId: 'd-2', // Kadıköy İlçe Bayisi
    status: 'SUSPENDED',
    plan: 'PRO',
    monthlyPrice: 350,
    demoDaysLeft: 0,
    isPaid: false,
    subdomain: 'yildizhukuk.santralbayi',
    createdAt: '2026-01-28',
    sector: 'Hukuk & Danışmanlık',
    taxNumber: '3499182736',
    referredBySubscriberName: 'İstanbul Kadıköy İlçe Bayisi Doğrudan Başvuru',
    apkStatus: 'DROPPED', // Aboneliği bıraktı
    apkVersion: 'v1.0',
    apkDistributedDate: '20.01.2026',
    aiConfig: {
      agentName: 'Hukuk Danışman Asistanı',
      voiceType: 'Female_TR',
      greetingMessage: 'Yıldız Hukuk Bürosu santralindesiniz. Dava dosyası sorgulama ve randevu talebi için lütfen adınızı belirtiniz.',
      knowledgeBase: 'Büromuz iş hukuku ve ticaret hukuku alanlarında hizmet vermektedir. Randevu için sekreterlik not alır.',
      recordCalls: true,
      unlimitedCalls: true,
      features: {
        information: true,
        noteTaking: true,
        appointmentBooking: true,
        priceNegotiation: false
      }
    }
  },
  {
    id: 's-6',
    name: 'Ankara Dent Diş Kliniği',
    companyName: 'Ankara Dent Sağlık Hizmetleri',
    phone: '0312 419 2030',
    dealerId: 'd-5', // Çankaya İlçe Bayisi
    status: 'ACTIVE',
    plan: 'PRO',
    monthlyPrice: 350,
    demoDaysLeft: 0,
    isPaid: true,
    subdomain: 'ankaradent.santralbayi',
    createdAt: '2026-03-01',
    sector: 'Sağlık & Diş Hekimi',
    taxNumber: '0688192031',
    referredBySubscriberName: 'Ankara Çankaya İlçe Bayisi Doğrudan Dağıtım',
    hasDownline: false,
    apkStatus: 'ACTIVE',
    apkVersion: 'v1.1',
    apkDistributedDate: '28.02.2026',
    aiConfig: {
      agentName: 'Dent Asistan Seda',
      voiceType: 'Female_TR',
      greetingMessage: 'Ankara Dent Diş Kliniğine hoş geldiniz. Muayene randevusu ve diş tedavileri danışma hattındasınız.',
      knowledgeBase: 'Muayene saatlerimiz: 09:00 - 19:00. Adres: Tunalı Hilmi Cd. No:45 Çankaya/Ankara.',
      recordCalls: true,
      unlimitedCalls: true,
      features: {
        information: true,
        noteTaking: true,
        appointmentBooking: true,
        priceNegotiation: true
      }
    }
  },
  {
    id: 's-7',
    name: 'Başkent Oto Servis & Ekspertiz',
    companyName: 'Başkent Oto Servis Ltd.',
    phone: '0312 385 4050',
    dealerId: 'd-6', // Yenimahalle İlçe Bayisi
    status: 'ACTIVE',
    plan: 'ENTERPRISE',
    monthlyPrice: 500,
    demoDaysLeft: 0,
    isPaid: true,
    subdomain: 'baskentoto.santralbayi',
    createdAt: '2026-03-08',
    sector: 'Oto Servis & Tamir',
    taxNumber: '0699283741',
    referredBySubscriberName: 'Ankara Yenimahalle İlçe Bayisi Tanıtımı',
    hasDownline: true,
    apkStatus: 'ACTIVE',
    apkVersion: 'v1.1',
    apkDistributedDate: '05.03.2026',
    aiConfig: {
      agentName: 'Başkent Oto Asistanı',
      voiceType: 'Male_TR',
      greetingMessage: 'Başkent Oto Servis ve Ekspertize hoş geldiniz. Periyodik bakım, arıza tespiti ve ekspertiz randevusu için yardımcı olabilirim.',
      knowledgeBase: 'Ostim Sanayi Sitesi 1234. Sokak No:18 Yenimahalle/Ankara. Çalışma saatleri: 08:30 - 19:00.',
      recordCalls: true,
      unlimitedCalls: true,
      features: {
        information: true,
        noteTaking: true,
        appointmentBooking: true,
        priceNegotiation: true
      }
    }
  },
  {
    id: 's-web-1',
    name: 'Kuzey Optik & Lens (Web Kaydı)',
    companyName: 'Kuzey Optik Mağazacılık',
    subscriberCode: '34.e.091',
    phone: '0532 610 1122',
    birthProvince: 'Web Havuzu',
    birthDistrict: 'Merkez Havuz',
    dealerId: 'ADMIN_POOL',
    status: 'ACTIVE',
    plan: 'PRO',
    monthlyPrice: 350,
    demoDaysLeft: 0,
    isPaid: true,
    subdomain: 'kuzeyoptik.santralbayi',
    createdAt: '2026-03-14',
    sector: 'Optik & Saat',
    referredBySubscriberName: '🌐 Web Sitesinden Doğrudan Abone Oldu (Merkez Havuzu)',
    movedByAdmin: true,
    hasDownline: false,
    apkStatus: 'ACTIVE',
    apkVersion: 'v1.1',
    aiConfig: {
      agentName: 'Optik Asistanı',
      voiceType: 'Female_TR',
      greetingMessage: 'Kuzey Optik santraline hoş geldiniz.',
      knowledgeBase: 'Gözlük ve lens stok sorgulama.',
      recordCalls: true,
      unlimitedCalls: true,
      features: { information: true, noteTaking: true, appointmentBooking: true, priceNegotiation: true }
    }
  },
  {
    id: 's-web-2',
    name: 'Lezzet Dünyası Restoran (Web Kaydı)',
    companyName: 'Lezzet Dünyası Gıda Ltd.',
    subscriberCode: '34.e.092',
    phone: '0544 720 3344',
    birthProvince: 'Web Havuzu',
    birthDistrict: 'Merkez Havuz',
    dealerId: 'ADMIN_POOL',
    status: 'ACTIVE',
    plan: 'PRO',
    monthlyPrice: 350,
    demoDaysLeft: 0,
    isPaid: true,
    subdomain: 'lezzetdunyasi.santralbayi',
    createdAt: '2026-03-14',
    sector: 'Restoran & Gıda',
    referredBySubscriberName: '🌐 Web Sitesinden Doğrudan Abone Oldu (Merkez Havuzu)',
    movedByAdmin: true,
    hasDownline: false,
    apkStatus: 'ACTIVE',
    apkVersion: 'v1.1',
    aiConfig: {
      agentName: 'Rezervasyon Asistanı',
      voiceType: 'Female_TR',
      greetingMessage: 'Lezzet Dünyası Restorana hoş geldiniz.',
      knowledgeBase: 'Masa rezervasyonu ve paket sipariş.',
      recordCalls: true,
      unlimitedCalls: true,
      features: { information: true, noteTaking: true, appointmentBooking: true, priceNegotiation: true }
    }
  },
  {
    id: 's-web-3',
    name: 'Elit Diş Polikliniği (Web Kaydı)',
    companyName: 'Elit Ağız ve Diş Sağlığı',
    subscriberCode: '06.e.093',
    phone: '0535 830 5566',
    birthProvince: 'Web Havuzu',
    birthDistrict: 'Merkez Havuz',
    dealerId: 'ADMIN_POOL',
    status: 'ACTIVE',
    plan: 'ENTERPRISE',
    monthlyPrice: 500,
    demoDaysLeft: 0,
    isPaid: true,
    subdomain: 'elitdis.santralbayi',
    createdAt: '2026-03-14',
    sector: 'Diş & Poliklinik',
    referredBySubscriberName: '🌐 Web Sitesinden Doğrudan Abone Oldu (Merkez Havuzu)',
    movedByAdmin: true,
    hasDownline: false,
    apkStatus: 'ACTIVE',
    apkVersion: 'v1.1',
    aiConfig: {
      agentName: 'Klinik Asistanı',
      voiceType: 'Female_TR',
      greetingMessage: 'Elit Diş Polikliniğine hoş geldiniz.',
      knowledgeBase: 'Diş muayene ve randevu hattı.',
      recordCalls: true,
      unlimitedCalls: true,
      features: { information: true, noteTaking: true, appointmentBooking: true, priceNegotiation: true }
    }
  }
];

export const INITIAL_CALL_LOGS: CallLog[] = [
  {
    id: 'c-1',
    subscriberId: 's-1',
    subscriberName: 'Bora Eczanesi',
    callerPhone: '0535 987 6543',
    callerName: 'Hasan Ak',
    timestamp: '2026-08-30T14:24:00',
    duration: 54,
    status: 'AI_HANDLED',
    transcript: [
      { speaker: 'AI', text: 'Bora Eczanesi Akıllı Asistanı Melis. Nöbetçi eczane bilgisi, ilaç stok sorgulama veya fiyat bilgisi için size yardımcı olabilirim.' },
      { speaker: 'CALLER', text: 'Merhaba, bugün nöbetçi misiniz? Bir de elinizde C vitamini takviyesi var mı, fiyatı nedir?' },
      { speaker: 'AI', text: 'Merhaba. Bugün nöbetçi değiliz, nöbetçi günlerimiz Pazartesi ve Perşembe günleridir. C vitamini takviyesi stoklarımızda bulunmaktadır. Fiyatlarımız marka ve adede göre 250 TL ile 600 TL arasında değişmektedir.' },
      { speaker: 'CALLER', text: 'Anladım, teşekkür ederim kolay gelsin.' },
      { speaker: 'AI', text: 'Rica ederiz, sağlıklı günler dileriz.' }
    ],
    aiSummary: 'Arayan kişi nöbetçi eczane durumunu ve C vitamini fiyatını sordu. Nöbetçi günleri bilgisi verilerek C vitamini fiyat aralığı (250 TL - 600 TL) paylaşıldı.',
    extractedNotes: 'Nöbetçi günü soruldu, C vitamini stok ve fiyatı onaylandı.',
    priceQuoted: '250 TL - 600 TL',
    negotiationOutcome: 'Standart Liste Fiyatı Verildi'
  },
  {
    id: 'c-2',
    subscriberId: 's-2',
    subscriberName: 'Göztepe Veteriner Kliniği',
    callerPhone: '0543 456 1234',
    callerName: 'Ayşe Şen',
    timestamp: '2026-08-30T15:10:00',
    duration: 82,
    status: 'AI_HANDLED',
    transcript: [
      { speaker: 'AI', text: 'Göztepe Veteriner Kliniğine hoş geldiniz. Ben yapay zeka asistanınız Caner. Muayene ücreti, aşı randevusu veya acil durumlar için yardımcı olabilirim.' },
      { speaker: 'CALLER', text: 'Merhaba, kedim için genel muayene ve karma aşı fiyatı 850 TL dediniz, biraz yüksek geldi. İndirim yapamaz mısınız?' },
      { speaker: 'AI', text: 'Değerli hayvanseverimiz, kliniğimizde uzman hekim kontrolü ve orijinal soğuk zincir aşı uygulanmaktadır. Ancak bugün onaylamanız durumunda ilk gelişinize özel %10 ikna indirimi uygulayarak toplam tutarı 765 TL yapabilir ve saat 20:00 randevunuzu hekimimize doğrudan yazabilirim. Uygun mudur?' },
      { speaker: 'CALLER', text: 'Çok iyi olur, teşekkürler. Akşam 20:00 için randevuyu onaylıyorum.' },
      { speaker: 'AI', text: 'Harika! Akşam 20:00 için randevunuz hekim takvimine işlendi ve SMS onayınız iletildi. Minik dostumuzla sizi bekliyoruz.' }
    ],
    aiSummary: 'Müşteri toplam 850 TL fiyata itiraz ederek indirim istedi. Yapay zeka %10 ikna indirimi sunarak 765 TL üzerinden anlaşma sağladı ve akşam 20:00 randevusunu onaylattı.',
    extractedNotes: 'Kedi muayenesi & karma aşı. Fiyat itirazı %10 indirimle çözüldü. Randevu 20:00 teyit edildi.',
    priceQuoted: '765 TL (%10 İkna İndirimiyle)',
    appointmentBooked: 'Bugün 20:00 (Kedi Muayene & Karma Aşı)',
    negotiationOutcome: 'Başarılı (%10 İkna İndirimiyle Randevu Kapatıldı)'
  },
  {
    id: 'c-3',
    subscriberId: 's-1',
    subscriberName: 'Bora Eczanesi',
    callerPhone: '0532 999 1122',
    callerName: 'Tanımsız Arayan (İsimsiz)',
    timestamp: '2026-08-30T16:45:00',
    duration: 68,
    status: 'AI_HANDLED',
    transcript: [
      { speaker: 'AI', text: 'Bora Eczanesi Akıllı Asistanı Melis. Size nasıl yardımcı olabilirim?' },
      { speaker: 'CALLER', text: 'Ben Kenan Bey ile görüşmek istiyorum, acil bir konu var.' },
      { speaker: 'AI', text: 'Sizi Kenan Bey\'e bağlamak için hemen hatta beklemeye alıyorum, lütfen bekleyiniz...' },
      { speaker: 'AI', text: '[Arka Plan Çağrısı -> Kenan Bey]: Kenan Bey merhaba, adını vermek istemeyen bir kişi sizinle acil görüşmek istiyor. Görüşmeyi kabul ediyor musunuz?' },
      { speaker: 'CALLER', text: '[Kenan Bey Yanıtı]: Melis şu an önemli bir toplantıdayım, kendisine söyle 3 dakika içinde bizzat geri arayacağım.' },
      { speaker: 'AI', text: 'Kenan Bey ile görüştüm; kendisi şu anda önemli bir toplantıda olduğunu ancak 3 dakika içinde sizi bizzat geri arayacağını iletti. Çağrınız ve numaranız Kenan Bey\'e acil not olarak iletilmiştir.' },
      { speaker: 'CALLER', text: 'Tamamdır, bekliyorum teşekkürler.' }
    ],
    aiSummary: 'Arayan kişi doğrudan Kenan Bey ile görüşmek istedi. Asistan arayanı beklemeye alıp Kenan Bey\'e sordu. Kenan Bey 3 dakika içinde döneceğini bildirdi. Bilgi arayana aktarıldı, CRM\'e acil arama notu oluşturuldu.',
    extractedNotes: 'Akıllı Ön Görüşmeli Aktarma (Warm Transfer): Kenan Bey 3 dk içinde 0532 999 1122 numarasını geri arayacak. (Acil Toplantı Notu)',
    priceQuoted: 'Görüşülmedi (Aktarma Talebi)'
  }
];

export const PROVINCE_PLATES: Record<string, string> = {
  'Adana': '01', 'Adıyaman': '02', 'Afyonkarahisar': '03', 'Ağrı': '04', 'Amasya': '05',
  'Ankara': '06', 'Antalya': '07', 'Artvin': '08', 'Aydın': '09', 'Balıkesir': '10',
  'Bilecik': '11', 'Bingöl': '12', 'Bitlis': '13', 'Bolu': '14', 'Burdur': '15',
  'Bursa': '16', 'Çanakkale': '17', 'Çankırı': '18', 'Çorum': '19', 'Denizli': '20',
  'Diyarbakır': '21', 'Edirne': '22', 'Elazığ': '23', 'Erzincan': '24', 'Erzurum': '25',
  'Eskişehir': '26', 'Gaziantep': '27', 'Giresun': '28', 'Gümüşhane': '29', 'Hakkari': '30',
  'Hatay': '31', 'Isparta': '32', 'Mersin': '33', 'İstanbul': '34', 'İzmir': '35',
  'Kars': '36', 'Kastamonu': '37', 'Kayseri': '38', 'Kırklareli': '39', 'Kırşehir': '40',
  'Kocaeli': '41', 'Konya': '42', 'Kütahya': '43', 'Malatya': '44', 'Manisa': '45',
  'Kahramanmaraş': '46', 'Mardin': '47', 'Muğla': '48', 'Muş': '49', 'Nevşehir': '50',
  'Niğde': '51', 'Ordu': '52', 'Rize': '53', 'Sakarya': '54', 'Samsun': '55',
  'Siirt': '56', 'Sinop': '57', 'Sivas': '58', 'Tekirdağ': '59', 'Tokat': '60',
  'Trabzon': '61', 'Tunceli': '62', 'Şanlıurfa': '63', 'Uşak': '64', 'Van': '65',
  'Yozgat': '66', 'Zonguldak': '67', 'Aksaray': '68', 'Bayburt': '69', 'Karaman': '70',
  'Kırıkkale': '71', 'Batman': '72', 'Şırnak': '73', 'Bartın': '74', 'Ardahan': '75',
  'Iğdır': '76', 'Yalova': '77', 'Karabük': '78', 'Kilis': '79', 'Osmaniye': '80',
  'Düzce': '81'
};

export const getProvincePlate = (pName?: string): string => {
  if (!pName) return '34';
  const clean = pName.trim();
  if (PROVINCE_PLATES[clean]) return PROVINCE_PLATES[clean];
  for (const [k, v] of Object.entries(PROVINCE_PLATES)) {
    if (clean.toLowerCase().includes(k.toLowerCase()) || k.toLowerCase().includes(clean.toLowerCase())) {
      return v;
    }
  }
  return '34';
};

const getAllIssuedReferenceCodes = (): Set<string> => {
  const set = new Set<string>();
  for (const d of INITIAL_DEALERS) {
    if (d.dealerCode) set.add(d.dealerCode.trim());
  }
  for (const s of INITIAL_SUBSCRIBERS) {
    if (s.subscriberCode) set.add(s.subscriberCode.trim());
  }
  if (typeof window !== 'undefined') {
    try {
      const winCodes = (window as unknown as { __sbIssuedRefCodes?: string[] }).__sbIssuedRefCodes;
      if (Array.isArray(winCodes)) {
        for (const c of winCodes) {
          if (c) set.add(String(c).trim());
        }
      }
      const saved = window.localStorage.getItem('sb_issued_ref_codes_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          for (const c of parsed) {
            if (c) set.add(String(c).trim());
          }
        }
      }
    } catch {}
  }
  return set;
};

export const generateDottedCode = (
  role: 'ILLER' | 'IL' | 'ILCE' | 'ESNAF' | 'ADMIN',
  province?: string,
  seq: number = 1
): string => {
  if (role === 'ADMIN') return 'TR.000';
  const plate = getProvincePlate(province);
  const prefix =
    role === 'ILLER'
      ? 'TR.'
      : role === 'IL'
      ? `${plate}.il.`
      : role === 'ILCE'
      ? `${plate}.ilç.`
      : `${plate}.e.`;

  const issued = getAllIssuedReferenceCodes();
  let candidateSeq = Math.max(1, seq);

  // Mevcut veya daha önce verilmiş hiçbir kodla çakışmaması için en büyük sıradan devam et
  for (const code of issued) {
    if (code.startsWith(prefix)) {
      const tail = code.slice(prefix.length);
      const num = parseInt(tail, 10);
      if (!isNaN(num) && num >= candidateSeq && code !== 'TR.000') {
        candidateSeq = num + 1;
      }
    }
  }

  const padSeq = String(candidateSeq).padStart(3, '0');
  return `${prefix}${padSeq}`;
};

// SABİT REFERANS KODU KURALI: Atanmış bir bayi veya abone kodu (ör. 34.il.992, 34.ilç.001, 34.e.001)
// bayiler arasında taşınsa veya kademesi değişse bile KESİNLİKLE DEĞİŞMEZ.
export const upgradeDottedCode = (
  currentCode: string | undefined,
  targetRole: 'ILLER' | 'IL' | 'ILCE',
  province?: string,
  fallbackSeq: number = 1
): string => {
  if (currentCode && currentCode.trim() && !currentCode.trim().startsWith('ABN-')) {
    return currentCode.trim();
  }
  return generateDottedCode(targetRole, province, fallbackSeq);
};


