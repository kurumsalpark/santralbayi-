import 'package:flutter/material.dart';
import 'dart:math';

void main() {
  runApp(const SantralBayiApp());
}

class SantralBayiApp extends StatelessWidget {
  const SantralBayiApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'SantralBayi Akıllı Çağrı',
      debugShowCheckedModeBanner: false,
      theme: ThemeData.dark().copyWith(
        scaffoldBackgroundColor: const Color(0xFF090D16),
        colorScheme: const ColorScheme.dark(
          primary: Color(0xFF6366F1),
          secondary: Color(0xFFA855F7),
          surface: Color(0xFF111827),
          background: Color(0xFF090D16),
        ),
        cardTheme: const CardTheme(
          color: Color(0xFF1E293B),
          elevation: 4,
        ),
      ),
      home: const MainNavigationScreen(),
    );
  }
}

// Global state model for simple simulation
class AppState {
  static String appVersion = "v1.0"; // Sürüm arşivi: v1.0, v1.1, v1.2 ... (Asla eskisinin üzerine yazılmaz)
  static String userRole = "Bayi"; // Bayi, Abone, Merkez
  static String dealerLicense = "Standart Bayi"; // Standart Bayi (₺500) veya Master Bayi (₺1.000)
  static String franchiseTitle = "SantralBayi Kadıköy Master Bölge Direktörlüğü";
  static String uniqueLicenseCode = "SB-34-MST-102";
}

class MainNavigationScreen extends StatefulWidget {
  const MainNavigationScreen({Key? key}) : super(key: key);

  @override
  State<MainNavigationScreen> createState() => _MainNavigationScreenState();
}

class _MainNavigationScreenState extends State<MainNavigationScreen> {
  int _selectedIndex = 0;

  final List<Widget> _screens = [
    const DashboardScreen(),
    const CallScreeningScreen(),
    const CommissionRulesScreen(),
    const OfficialCertificateScreen(),
    const SystemStatusScreen(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: _screens[_selectedIndex],
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _selectedIndex,
        onTap: (index) {
          setState(() {
            _selectedIndex = index;
          });
        },
        type: BottomNavigationBarType.fixed,
        backgroundColor: const Color(0xFF111827),
        selectedItemColor: const Color(0xFF6366F1),
        unselectedItemColor: Colors.grey,
        items: const [
          BottomNavigationBarItem(
            icon: Icon(Icons.dashboard_rounded),
            label: 'Yönetim',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.call_split_rounded),
            label: 'Süzgeç',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.monetization_on_rounded),
            label: 'Komisyon',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.badge_rounded),
            label: 'Belge',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.settings_input_antenna_rounded),
            label: 'Sistem & API',
          ),
        ],
      ),
    );
  }
}

// 1. DASHBOARD SCREEN (BAYİ VE ESNAF YÖNETİMİ)
class DashboardScreen extends StatefulWidget {
  const DashboardScreen({Key? key}) : super(key: key);

  @override
  State<DashboardScreen> createState() => _DashboardScreenState();
}

class _DashboardScreenState extends State<DashboardScreen> {
  void _upgradeLicense() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        backgroundColor: const Color(0xFF1E293B),
        title: const Text('Lisans Yükseltme'),
        content: const Text(
          'Standart Bayi lisansınızı, aradaki ₺500 farkı ödeyerek tek tıkla Master Bayi düzeyine yükseltmek istiyor musunuz?\n\n'
          '✓ Alt bayilik açma yetkisi aktifleşir.\n'
          '✓ Ekstra %20 gelir imkanı sağlanır.'
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('İptal', style: TextStyle(color: Colors.grey)),
          ),
          ElevatedButton(
            style: ElevatedButton.styleFrom(
              backgroundColor: const Color(0xFF6366F1),
            ),
            onPressed: () {
              setState(() {
                AppState.dealerLicense = "Master Bayi";
              });
              Navigator.pop(context);
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(
                  content: Text('Tebrikler! Master Bayi lisansına başarıyla yükseltildiniz.'),
                  backgroundColor: Colors.green,
                ),
              );
            },
            child: const Text('₺500 Öde ve Yükselt'),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('SantralBayi Dashboard'),
        backgroundColor: const Color(0xFF111827),
        elevation: 0,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // User Welcome Card
            Container(
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                gradient: const LinearGradient(
                  colors: [Color(0xFF6366F1), Color(0xFFA855F7)],
                ),
                borderRadius: BorderRadius.circular(16),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        AppState.franchiseTitle,
                        style: const TextStyle(
                          fontWeight: FontWeight.bold,
                          fontSize: 14,
                        ),
                      ),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                        decoration: BoxDecoration(
                          color: Colors.white24,
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: Text(
                          AppState.dealerLicense,
                          style: const TextStyle(fontSize: 10, fontWeight: FontWeight.bold),
                        ),
                      )
                    ],
                  ),
                  const SizedBox(height: 8),
                  Text(
                    'Plaka-Tip Kodu: ${AppState.uniqueLicenseCode}',
                    style: const TextStyle(color: Colors.white70, fontSize: 12),
                  ),
                  const SizedBox(height: 16),
                  if (AppState.dealerLicense == "Standart Bayi")
                    ElevatedButton.icon(
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.white,
                        foregroundColor: const Color(0xFF6366F1),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(12),
                        ),
                      ),
                      icon: const Icon(Icons.bolt, size: 16),
                      label: const Text('Master Bayi\'ye Yüksel (₺500 Fark ile)'),
                      onPressed: _upgradeLicense,
                    ),
                ],
              ),
            ),
            const SizedBox(height: 24),
            
            // Stats Grid
            GridView.count(
              crossAxisCount: 2,
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              mainAxisSpacing: 12,
              crossAxisSpacing: 12,
              childAspectRatio: 1.5,
              children: [
                _buildStatCard('Toplam Abone (Esnaf)', '14 Aktif', Icons.storefront_rounded),
                _buildStatCard('Alt Bayi Sayısı', AppState.dealerLicense == "Master Bayi" ? '3 Bayi' : '🔒 Kilitli', Icons.group_work_rounded),
                _buildStatCard('Aylık Sabit Gelir', '₺14.500', Icons.payments_rounded),
                _buildStatCard('Bekleyen Dağıtım', '₺2.400', Icons.account_balance_wallet_rounded),
              ],
            ),
            const SizedBox(height: 24),

            // Quick Actions Title
            const Text(
              'Hızlı İşlemler',
              style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.white),
            ),
            const SizedBox(height: 12),
            
            ListTile(
              tileColor: const Color(0xFF1E293B),
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
              leading: const Icon(Icons.add_business_rounded, color: Color(0xFF6366F1)),
              title: const Text('Yeni Esnaf Abone Ekle'),
              subtitle: const Text('Esnafa aylık sabit paket aktivasyonu'),
              trailing: const Icon(Icons.chevron_right),
              onTap: () {
                _showAddSubscriberDialog();
              },
            ),
            const SizedBox(height: 8),
            ListTile(
              tileColor: const Color(0xFF1E293B),
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
              leading: Icon(
                Icons.person_add_alt_1_rounded, 
                color: AppState.dealerLicense == "Master Bayi" ? const Color(0xFFA855F7) : Colors.grey
              ),
              title: Text(
                'Alt Bayi Kayıt Formu',
                style: TextStyle(color: AppState.dealerLicense == "Master Bayi" ? Colors.white : Colors.grey),
              ),
              subtitle: Text(
                AppState.dealerLicense == "Master Bayi" 
                  ? 'Alt lisans satışı ve ₺500 prim kazancı' 
                  : 'Yalnızca Master Bayiler alt bayi açabilir'
              ),
              trailing: const Icon(Icons.chevron_right),
              onTap: AppState.dealerLicense == "Master Bayi" 
                ? () => _showAddSubDealerDialog()
                : () => _showLockedFeatureMessage(),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildStatCard(String title, String value, IconData icon) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(12),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Icon(icon, color: const Color(0xFF6366F1), size: 20),
                const Icon(Icons.trending_up, color: Colors.green, size: 14),
              ],
            ),
            const SizedBox(height: 8),
            Text(title, style: const TextStyle(fontSize: 10, color: Colors.white70)),
            const SizedBox(height: 4),
            Text(value, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold)),
          ],
        ),
      ),
    );
  }

  void _showAddSubscriberDialog() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        backgroundColor: const Color(0xFF1E293B),
        title: const Text('Yeni Esnaf Abone'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: const [
            TextField(
              decoration: InputDecoration(
                labelText: 'İşletme Adı',
                border: OutlineInputBorder(),
              ),
            ),
            SizedBox(height: 12),
            TextField(
              decoration: InputDecoration(
                labelText: 'Yetkili Telefon Numarası',
                border: OutlineInputBorder(),
              ),
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('İptal'),
          ),
          ElevatedButton(
            style: ElevatedButton.styleFrom(backgroundColor: const Color(0xFF6366F1)),
            onPressed: () {
              Navigator.pop(context);
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(content: Text('Yeni esnaf başvurusu oluşturuldu, evrak kontrolü bekleniyor.')),
              );
            },
            child: const Text('Abone Yap'),
          ),
        ],
      ),
    );
  }

  void _showAddSubDealerDialog() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        backgroundColor: const Color(0xFF1E293B),
        title: const Text('Yeni Alt Bayi Kaydı'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: const [
            TextField(
              decoration: InputDecoration(
                labelText: 'Bayi / Şirket Unvanı',
                border: OutlineInputBorder(),
              ),
            ),
            SizedBox(height: 12),
            TextField(
              decoration: InputDecoration(
                labelText: 'Referans Kodu (Otomatik)',
                border: OutlineInputBorder(),
                enabled: false,
              ),
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Vazgeç'),
          ),
          ElevatedButton(
            style: ElevatedButton.styleFrom(backgroundColor: const Color(0xFFA855F7)),
            onPressed: () {
              Navigator.pop(context);
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(content: Text('Alt bayi lisansı satıldı! ₺500 prim cüzdanınıza eklendi.')),
              );
            },
            child: const Text('Bayi Oluştur ve Paylaş'),
          ),
        ],
      ),
    );
  }

  void _showLockedFeatureMessage() {
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('Bu özellik kilitlidir. Alt bayi açabilmek için öncelikle Master Bayi lisansına yükselmelisiniz.'),
        backgroundColor: Colors.redAccent,
      ),
    );
  }
}

// 2. ARAYAN SÜZGECİ VE AKILLI ÖN GÖRÜŞMELİ AKTARMA (WARM TRANSFER)
class CallScreeningScreen extends StatefulWidget {
  const CallScreeningScreen({Key? key}) : super(key: key);

  @override
  State<CallScreeningScreen> createState() => _CallScreeningScreenState();
}

class _CallScreeningScreenState extends State<CallScreeningScreen> {
  String _assistantStatus = "Beklemede";
  String _callerName = "Mehmet Demir (Esnaf Adayı)";
  String _targetPerson = "Kenan Bey (Bölge Direktörü)";
  bool _isPlayingMusic = false;

  void _startWarmTransferSimulation() {
    setState(() {
      _assistantStatus = "Arka planda yetkili ($withPrefix(_targetPerson)) aranıyor...";
      _isPlayingMusic = true;
    });

    Future.delayed(const Duration(seconds: 3), () {
      if (!mounted) return;
      _showDirectorDecisionDialog();
    });
  }

  String withPrefix(String text) {
    return text.replaceAll(" (Bölge Direktörü)", "");
  }

  void _showDirectorDecisionDialog() {
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (context) => AlertDialog(
        backgroundColor: const Color(0xFF1E293B),
        title: Text('Yapay Zeka Süzgeci - $withPrefix(_targetPerson) Hattı'),
        content: Text(
          'Arka planda Kenan Bey\'e soruluyor:\n\n'
          '"$_callerName sizinle görüşmek istiyor, aktarayım mı?"\n\n'
          'Yetkili kararını simüle edin:'
        ),
        actions: [
          ElevatedButton(
            style: ElevatedButton.styleFrom(backgroundColor: Colors.red),
            onPressed: () {
              Navigator.pop(context);
              setState(() {
                _isPlayingMusic = false;
                _assistantStatus = "Yetkili Müsait Değil: Arayana 'Kenan Bey 3 dakika sonra bizzat arayacak' bilgisi verildi. SMS/Bildirim bırakıldı.";
              });
            },
            child: const Text('Müsait Değilim'),
          ),
          ElevatedButton(
            style: ElevatedButton.styleFrom(backgroundColor: Colors.green),
            onPressed: () {
              Navigator.pop(context);
              setState(() {
                _isPlayingMusic = false;
                _assistantStatus = "Aktarma Başarılı: Arayan kişi Kenan Bey\'e güvenle bağlandı.";
              });
            },
            child: const Text('Aktarımı Kabul Et'),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Akıllı Arayan Süzgeci'),
        backgroundColor: const Color(0xFF111827),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Card(
              child: Padding(
                padding: EdgeInsets.all(16),
                child: Text(
                  '💡 Akıllı Ön Görüşmeli Aktarma (Warm Transfer):\n'
                  'Arayan kişi doğrudan hatta bağlanmaz. Yapay zeka arayanı bekletme müziğine alır, '
                  'arka planda yetkiliyi arayıp kimin aradığını ve aktarma onayını sorar.',
                  style: TextStyle(fontSize: 12, height: 1.4, color: Colors.indigoAccent),
                ),
              ),
            ),
            const SizedBox(height: 24),
            
            // Call Details UI
            Container(
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                color: const Color(0xFF111827),
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: Colors.indigo.withOpacity(0.3)),
              ),
              child: Column(
                children: [
                  const Icon(Icons.phone_in_talk_rounded, size: 48, color: Color(0xFF6366F1)),
                  const SizedBox(height: 12),
                  const Text('Gelen Çağrı Simülasyonu', style: TextStyle(color: Colors.white70, fontSize: 12)),
                  const SizedBox(height: 4),
                  Text(_callerName, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
                  const SizedBox(height: 8),
                  Text('Görüşülmek İstenen: $_targetPerson', style: const TextStyle(color: Colors.grey, fontSize: 12)),
                  
                  if (_isPlayingMusic) ...[
                    const SizedBox(height: 16),
                    const LinearProgressIndicator(color: Color(0xFFA855F7)),
                    const SizedBox(height: 8),
                    const Text('Arayana bekleme müziği dinletiliyor...', style: TextStyle(fontStyle: FontStyle.italic, fontSize: 11, color: Colors.purpleAccent)),
                  ],
                  
                  const SizedBox(height: 24),
                  ElevatedButton.icon(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: const Color(0xFF6366F1),
                      minimumSize: const Size.fromHeight(50),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                    ),
                    icon: const Icon(Icons.play_arrow_rounded),
                    label: const Text('Akıllı Aktarmayı Başlat'),
                    onPressed: _isPlayingMusic ? null : _startWarmTransferSimulation,
                  ),
                ],
              ),
            ),
            const SizedBox(height: 24),
            
            const Text('Santral Durum Raporu:', style: TextStyle(fontWeight: FontWeight.bold)),
            const SizedBox(height: 8),
            Text(
              _assistantStatus,
              style: TextStyle(
                color: _assistantStatus.contains('Başarılı') ? Colors.green : Colors.indigoAccent,
                fontSize: 13,
                fontWeight: FontWeight.w500,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

// 3. KÂR & KOMİSYON DAĞITIM KURALLARI
class CommissionRulesScreen extends StatelessWidget {
  const CommissionRulesScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Kâr Dağıtım Kuralları'),
        backgroundColor: const Color(0xFF111827),
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          _buildRuleCard(
            '1. Yeni Bayi Lisansı Satışı',
            'Üst bayi yeni bir bayi açtığında (lisans bedeli ₺1.000 ise); ₺500 üst bayiye net prim olarak kalır, kalan ₺500 Genel Merkez kasasına iletilir.',
            Icons.store_mall_directory_rounded,
            const Color(0xFF6366F1),
          ),
          _buildRuleCard(
            '2. Alt Bayinin Yaptığı Abone (Esnaf)',
            'Alt bayinin sisteme bağladığı her santral abonesinin aylık sabit paket ödemesinden üst bayiye her ay %20 pasif pay ödenir.',
            Icons.people_alt_rounded,
            const Color(0xFFA855F7),
          ),
          _buildRuleCard(
            '3. Aboneden Abone Tavsiyesi',
            'Bir abone uygulamayı paylaşıp yeni bir esnafın üye olmasını sağlarsa; esnafı sisteme katan alt bayi kâr alır, üst bayi kâr alamaz.',
            Icons.share_location_rounded,
            Colors.amber,
          ),
          _buildRuleCard(
            '4. iyzico Sanal POS Güvencesi',
            'Gerçek faaliyete geçiş aşamasında tüm ödemeler ve kâr dağıtımları iyzico sanal pos entegrasyonu ile otomatik split (bölünmüş) ödeme yöntemiyle dağıtılacaktır.',
            Icons.verified_user_rounded,
            Colors.green,
          ),
        ],
      ),
    );
  }

  Widget _buildRuleCard(String title, String desc, IconData icon, Color color) {
    return Card(
      margin: const EdgeInsets.bottom(12),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Icon(icon, color: color, size: 28),
            const SizedBox(width: 16),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
                  const SizedBox(height: 6),
                  Text(desc, style: const TextStyle(fontSize: 12, color: Colors.white70, height: 1.4)),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

// 4. OTOMATİK KURUMSAL KİMLİK & RESMİ DİJİTAL YETKİ BELGESİ / ROZET
class OfficialCertificateScreen extends StatelessWidget {
  const OfficialCertificateScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Dijital Yetki Belgesi'),
        backgroundColor: const Color(0xFF111827),
      ),
      body: Center(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(24),
          child: Column(
            children: [
              // Certificate Widget
              Container(
                padding: const EdgeInsets.all(24),
                decoration: BoxDecoration(
                  color: const Color(0xFF1E293B),
                  borderRadius: BorderRadius.circular(20),
                  border: Border.all(color: const Color(0xFF6366F1), width: 2),
                  boxShadow: [
                    BoxShadow(
                      color: const Color(0xFF6366F1).withOpacity(0.15),
                      blurRadius: 20,
                      spreadRadius: 5,
                    )
                  ],
                ),
                child: Column(
                  children: [
                    // Badge Header
                    const Icon(Icons.verified_rounded, color: Color(0xFF6366F1), size: 48),
                    const SizedBox(height: 12),
                    const Text(
                      'SANTRALBAYİ SİSTEMİ',
                      style: TextStyle(fontWeight: FontWeight.black, letterSpacing: 1.5, fontSize: 13, color: Colors.grey),
                    ),
                    const SizedBox(height: 4),
                    const Text(
                      'RESMİ YETKİ BELGESİ',
                      style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18, color: Colors.white),
                    ),
                    const Divider(color: Colors.white24, height: 24),
                    
                    const Text(
                      'Bu belge, ilgili bayinin resmi yetkili olduğunu ve SantralBayi sistemleri kapsamında esnafa santral satışı yapabileceğini gösterir.',
                      textAlign: TextAlign.center,
                      style: TextStyle(fontSize: 11, color: Colors.white70, height: 1.4),
                    ),
                    const SizedBox(height: 20),
                    
                    // Unvan
                    Text(
                      AppState.franchiseTitle.toUpperCase(),
                      textAlign: TextAlign.center,
                      style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: Color(0xFF6366F1)),
                    ),
                    const SizedBox(height: 8),
                    // Lisans Kodu
                    Text(
                      'PLAKA-TİP KODU: ${AppState.uniqueLicenseCode}',
                      style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: Colors.grey),
                    ),
                    
                    const SizedBox(height: 24),
                    
                    // Fake QR Code box representing automatic QR authentication
                    Container(
                      width: 120,
                      height: 120,
                      padding: const EdgeInsets.all(8),
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: CustomPaint(
                        painter: QRCodePainter(),
                      ),
                    ),
                    const SizedBox(height: 12),
                    const Text(
                      'Esnafa Güven Veren Dijital Karekod Doğrulama',
                      style: TextStyle(fontSize: 9, color: Colors.white54, fontStyle: FontStyle.italic),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 24),
              ElevatedButton.icon(
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFF1E293B),
                  side: const BorderSide(color: Color(0xFF6366F1)),
                ),
                icon: const Icon(Icons.download_rounded),
                label: const Text('Belgeyi PDF Olarak İndir (Müşteriye Göster)'),
                onPressed: () {
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(content: Text('Yetki belgesi galerinize başarıyla indirildi.')),
                  );
                },
              ),
            ],
          ),
        ),
      ),
    );
  }
}

// Custom QR Code drawing painter
class QRCodePainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = Colors.black
      ..style = PaintingStyle.fill;

    final random = Random(42); // Seed to keep it consistent
    const int gridSize = 15;
    final double cellSize = size.width / gridSize;

    for (int i = 0; i < gridSize; i++) {
      for (int j = 0; j < gridSize; j++) {
        // Draw standard QR code corner finders
        bool isCorner = (i < 4 && j < 4) || (i >= gridSize - 4 && j < 4) || (i < 4 && j >= gridSize - 4);
        if (isCorner) {
          bool border = i == 0 || i == 3 || j == 0 || j == 3 || (i == gridSize - 1 || i == gridSize - 4) || (j == gridSize - 1 || j == gridSize - 4);
          if (border) {
            canvas.drawRect(Rect.fromLTWH(i * cellSize, j * cellSize, cellSize, cellSize), paint);
          }
        } else if (random.nextBool()) {
          canvas.drawRect(Rect.fromLTWH(i * cellSize, j * cellSize, cellSize, cellSize), paint);
        }
      }
    }
  }

  @override
  bool shouldRepaint(CustomPainter oldDelegate) => false;
}

// 5. SİSTEM & API YÖNETİM MERKEZİ (GSM TELECOM, GEMINI VE FIREBASE)
class SystemStatusScreen extends StatefulWidget {
  const SystemStatusScreen({Key? key}) : super(key: key);

  @override
  State<SystemStatusScreen> createState() => _SystemStatusScreenState();
}

class _SystemStatusScreenState extends State<SystemStatusScreen> {
  bool _wakeLockActive = true;
  bool _geminiConnected = true;
  bool _firebasePhoneAuthActive = true;
  bool _mobileGsmTelecomActive = true;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Sistem, API & GSM Santral'),
        backgroundColor: const Color(0xFF111827),
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              gradient: const LinearGradient(
                colors: [Color(0xFF1E1B4B), Color(0xFF31104B)],
              ),
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: const Color(0xFF6366F1).withOpacity(0.5)),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: const [
                Text(
                  '0850 Yok! Doğrudan Kendi GSM Cep Hattınız',
                  style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16, color: Colors.white),
                ),
                SizedBox(height: 6),
                Text(
                  'Bu uygulama, Android Telecom In-Call servisi ve Google Gemini yapay zekası ile doğrudan cep telefonu numaranıza gelen aramaları arka planda karşılar.',
                  style: TextStyle(fontSize: 12, color: Colors.white70, height: 1.4),
                ),
              ],
            ),
          ),
          const SizedBox(height: 16),
          
          _buildStatusTile(
            title: 'Android Telecom In-Call Servisi',
            subtitle: 'Mobil GSM aramalarını yakalama ve yapay zekaya yönlendirme',
            status: _mobileGsmTelecomActive ? 'Aktif (GSM Dinleniyor)' : 'Devre Dışı',
            icon: Icons.cell_tower_rounded,
            color: Colors.green,
          ),

          _buildStatusTile(
            title: 'Apple iOS CallKit & PushKit Framework',
            subtitle: 'iPhone arama ekranı entegrasyonu, VoIP Push uyanma ve AVFAudio desteği',
            status: 'iOS Hazır (CallKit + PushKit)',
            icon: Icons.apple_rounded,
            color: Colors.blueAccent,
          ),
          
          _buildStatusTile(
            title: 'Google Gemini Live API (Yapay Zeka)',
            subtitle: 'Google Gemini Doğal Dil ve Akıllı Yanıt Motoru',
            status: _geminiConnected ? 'Bağlı (Gemini 2.5 Flash Canlı)' : 'Hazırlanıyor',
            icon: Icons.psychology_rounded,
            color: const Color(0xFF6366F1),
          ),

          _buildStatusTile(
            title: 'Firebase Phone Auth & Kalıcı Hesap Tanıma',
            subtitle: 'Uygulama silinip yüklense bile telefon numarasıyla tüm ayarları otomatik kurtarır',
            status: _firebasePhoneAuthActive ? 'Kalıcı Bulut Tanıma Aktif' : 'Kapalı',
            icon: Icons.cloud_sync_rounded,
            color: Colors.amber,
          ),

          _buildStatusTile(
            title: 'WakeLock & Pil Tasarrufu Koruması',
            subtitle: 'Uygulamanın arka planda Android tarafından kapatılmasını önler',
            status: _wakeLockActive ? '7/24 Kesintisiz Arka Plan Uyanık' : 'Kapalı',
            icon: Icons.battery_charging_full_rounded,
            color: Colors.cyan,
          ),

          _buildStatusTile(
            title: 'iyzico Sanal POS Tahsilat & Prim',
            subtitle: 'Esnaf aylık paketleri ve ₺500/₺1000 bayi lisans ödemeleri',
            status: 'Canlı Satış Öncesi Hazır (Split Ödeme)',
            icon: Icons.credit_card_rounded,
            color: Colors.tealAccent,
          ),
        ],
      ),
    );
  }

  Widget _buildStatusTile({
    required String title,
    required String subtitle,
    required String status,
    required IconData icon,
    required Color color,
  }) {
    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      child: Padding(
        padding: const EdgeInsets.all(14),
        child: Row(
          children: [
            Container(
              padding: const EdgeInsets.all(10),
              decoration: BoxDecoration(
                color: color.withOpacity(0.15),
                borderRadius: BorderRadius.circular(10),
              ),
              child: Icon(icon, color: color, size: 24),
            ),
            const SizedBox(width: 14),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
                  const SizedBox(height: 3),
                  Text(subtitle, style: const TextStyle(fontSize: 11, color: Colors.grey)),
                  const SizedBox(height: 6),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                    decoration: BoxDecoration(
                      color: color.withOpacity(0.1),
                      borderRadius: BorderRadius.circular(6),
                      border: Border.all(color: color.withOpacity(0.3)),
                    ),
                    child: Text(status, style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: color)),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

