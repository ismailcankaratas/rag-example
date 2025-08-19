export const chunks = [
  {
    id: "1",
    text: `Sipariş Fişi Modülü (/siparis-fisi):
- Amaç: Müşteri siparişlerinin oluşturulması, revizesi, rezervasyonu ve sevk/fatura süreçlerine temel teşkil etmesi.
- Ön Koşullar: Cari kartın tanımlı olması, stok kartlarının ve birimlerinin tanımlı olması, (varsa) fiyat listesi ve iskonto kuralları.
- Temel Alanlar: Belge no/seri, belge tarihi, cari (müşteri), para birimi, vade, teslim tarihi, teslimat adresi, depo, satış temsilcisi, genel iskonto; satır alanları: stok kodu, açıklama, miktar, birim, birim fiyat, satır iskonto(lar), KDV, depo/raf, parti/lot/seri.
- İş Akışı (Önerilen): 1) Cari seç → 2) Teslim tarihi ve depo belirle → 3) Satırları ekle → 4) Fiyat/iskonto kontrolü → 5) Kredi limiti ve risk kontrolü → 6) Taslak kaydet → 7) Onaya gönder (varsa) → 8) Onaylanınca rezervasyon oluştur → 9) Sevk fişine veya irsaliyeye dönüştür → 10) Faturalandır.
- Durumlar: Taslak, Onayda, Onaylı, Kısmi Sevk, Tam Sevk, Kapalı/Arşiv.
- Doğrulamalar: Negatif stok izinleri, risk/kredi limiti, fiyat listesi tarih geçerliliği, para birimi ve kur zorunlulukları.
- İpuçları: Sık kullanılan satırlar için şablon kullanın; toplu iskonto yerine satır bazlı iskontoları tercih edin; teslim tarihine göre sevk planı raporu alın.
- Sık Hatalar: “Stok bulunamadı” (yanlış depo/raf), “Kredi limiti aşıldı” (risk parametreleri), “Kur tanımsız” (dövizli fiyat).`,
  },
  {
    id: "2",
    text: `Satın Alma Talebi Modülü (/satinalma-talep):
- Amaç: İhtiyaçların departman bazlı toplanması, onay akışından geçmesi ve satın alma siparişine dönüştürülmesi.
- Temel Alanlar: Talep no/tarih, talep eden birim/kullanıcı, hedef depo, gerekçe, öncelik, bütçe kalemi; satır alanları: malzeme/stok kodu, açıklama, miktar, istenen tarih.
- İş Akışı: 1) Talep oluştur → 2) Gerekçe ve öncelik belirt → 3) Satırları ekle → 4) Taslak kaydet → 5) Onaya gönder → 6) Onay sonrası konsolidasyon (birden çok talebi birleştirme) → 7) Teklif toplama (opsiyonel) → 8) Satın alma siparişine dönüştür.
- Durumlar: Taslak, Onayda, Onaylı, Kısmi Karşılandı, Tam Karşılandı, Reddedildi.
- En İyi Pratik: Standart malzemeler için onay matrisini otomatikleştirin; kritik/ACİL taleplere SLA tanımlayın.
- Sık Hatalar: “Malzeme tanımsız” (stok kartı eksik), “Onay matrisi bulunamadı” (parametre eksik).`,
  },
  {
    id: "3",
    text: `Stok Hareketleri Modülü (/stok-hareketleri):
- Amaç: Giriş, çıkış, transfer, sayım farkı, üretim tüketimi/çıktısı gibi tüm hareketlerin tek ekranda izlenmesi ve raporlanması.
- Filtreler: Tarih aralığı, depo/raf, stok kodu, hareket türü, belge no, cari, parti/lot/seri.
- Görünüm: Liste/grid, hızlı toplamlar, satır detayı (belgeye git bağlantısı), parti/seri izi (trace).
- İşlevler: Dışa aktar (CSV/Excel), yazdırılabilir fiş, toplu düzeltme (yetkiyle), sayım farklarını kapatma.
- Performans İpucu: Geniş tarih aralığı ve tüm depolar seçiliyken performans etkilenir; önce stok veya depo filtreleyin.
- Sık Hatalar: “Yetki yetersiz” (düzeltme yetkisi), “Parti/seri zorunlu” (izlenebilir stok).`,
  },
  {
    id: "4",
    text: `Cari Kart Modülü (/cari-kart):
- Amaç: Müşteri/tedarikçi temel bilgileri, finans parametreleri ve iletişim bilgilerinin yönetimi.
- Zorunlu Alanlar: Unvan, vergi no/tc, ülke/il/ilçe, para birimi, ödeme vadesi, e-posta (e-belge için önerilir).
- Finans Parametreleri: Kredi limiti, risk grubu, teminat, bloke/aktif durum, iskonto/vaade anlaşmaları.
- Adres/İlgili Kişi: Birden fazla adres, teslimat/billing ayrımı; ilgili kişi, görev, telefon/e-posta.
- Entegrasyonlar: E-fatura/e-arşiv profili (varsa), IBAN/banka bilgileri, ticari kayıt no.
- Bakım: Çift kayıtları birleştirme, pasif etme, kategori/segment atama.
- Sık Hatalar: “Vergi no formatı geçersiz”, “E-fatura profili uyumsuz”.`,
  },
  {
    id: "5",
    text: `Fatura Modülü (/fatura-olustur):
- Amaç: Satış/alış, iade, hizmet ve masraf faturalarının düzenlenmesi; irsaliye/siparişten faturalama.
- Kaynaklar: Doğrudan giriş, siparişten getirme, irsaliyeden dönüştürme, toplu faturalama.
- Vergi/Finans: KDV, tevkifat, stopaj, yuvarlama; para birimi ve kur; vade ve tahsilat planı.
- E-Belge: E-fatura/e-arşiv taslak oluşturma, gönderim durumu takibi, hata kodlarını görüntüleme (sistem konfigürasyonuna bağlı).
- Muhasebe: Otomatik muhasebeleştirme kuralları, hesap planı eşleştirmesi, gelir-gider merkezleri.
- İş Akışı: 1) Cari ve belge türünü seç → 2) Satırları ekle/aktar → 3) Vergi/iskonto kontrolü → 4) Taslak kaydet → 5) Onay/Onay sonrası e-belge oluştur → 6) Muhasebeleştir ve kapat.
- Sık Hatalar: “Kur bulunamadı” (dövizli faturalar), “E-belge şablonu eksik”, “Hesap planı eşleşmedi”.`,
  },
  {
    id: "6",
    text: `Personel İzin Modülü (/personel-izin):
- Amaç: Yıllık izin, rapor, mazeret vb. izin taleplerinin planlanması, onayı ve bordro entegrasyonu.
- Politika: Kıdem bazlı hak ediş, dönemsel kazanım, devir ve avans izin kuralları (İK parametrelerinden).
- İş Akışı: 1) Personel izin talebi oluşturur → 2) Çakışan tarih kontrolü (takvim) → 3) Amir onayı → 4) İK kontrolü → 5) Bordroya aktarım.
- Görünüm: Takvim, kişi bazlı izin bakiyesi, ekip kapak planı, departman yük grafiği.
- Sık Hatalar: “Bakiye yetersiz”, “Tarih çakışması”, “Onay akışı tanımsız”.`,
  },
  {
    id: "7",
    text: `Kasa İşlemleri Modülü (/kasa-islemleri):
- Amaç: Nakit tahsilat/ödeme, avans, masraf ve iç transferlerin kayıt altına alınması.
- Temel Alanlar: İşlem türü (tahsilat/ödeme), cari, tutar, para birimi, kur, belge tarihi, açıklama, makbuz numarası.
- İş Akışı: 1) Kasa seç → 2) İşlem türünü belirle → 3) Cari ve tutarı gir → 4) İlgili fatura/sevk bağla (varsa) → 5) Kaydet ve makbuz yazdır.
- En İyi Pratik: Gün sonunda kasa sayımı ve fark analizi; farklı para birimleri için ayrı kasalar.
- Sık Hatalar: “Açık fatura bulunamadı” (eşleştirme), “Kur hatası”, “Yetki yok (iptal/düzeltme)”.`,
  },
  {
    id: "8",
    text: `Banka Hareketleri Modülü (/banka-hareketleri):
- Amaç: Banka giriş/çıkışlarının, havale/EFT/pos tahsilatlarının ve dekontlarının izlenmesi; mutabakat.
- İçe Aktarım: Banka ekstresi içe aktarma ve otomatik eşleştirme (tutar+tarih+açıklama; desteklenen formatlar sistem ayarına bağlı).
- Mutabakat: Fatura ve hareket eşleştirme, kısmi kapatma, komisyon/masraf dağıtımı, kur farkı muhasebesi.
- İş Akışı: 1) Ekstreyi içe aktar (opsiyonel) → 2) Otomatik eşleştir → 3) Kalanları manuel eşleştir → 4) Muhasebeleştir → 5) Mutabakat raporu al.
- Sık Hatalar: “Banka hesabı eşleşmedi”, “Çoklu kur farkı”, “POS kesinti parametresi eksik”.`,
  },
  {
    id: "9",
    text: `Depolar Arası Transfer Modülü (/depo-transfer):
- Amaç: Ürünlerin kaynak depodan hedef depoya güvenli ve izlenebilir aktarımı.
- Temel Alanlar: Kaynak depo, hedef depo, hareket tarihi, açıklama; satır: stok kodu, miktar, birim, parti/lot/seri, raf adresi.
- İş Akışı: 1) Kaynak/hedef depoyu seç → 2) Satırları ekle → 3) Çıkış onayı (kaynak) → 4) Taşıma (yolda) → 5) Giriş onayı (hedef) → 6) Evrak yazdır (transfer fişi).
- İpuçları: Parti/seri zorunlu ürünlerde barkodla okutma; raf adresiyle toplama/yerleştirme.
- Sık Hatalar: “Hedef depo pasif”, “Negatif stok engeli”, “Parti/seri eksik”.`,
  },
  {
    id: "10",
    text: `Üretim Emirleri Modülü (/uretim-emirleri):
- Amaç: Ürün reçetesi (BOM) ve iş akışı doğrultusunda malzeme ihtiyaçlarını planlamak, üretimi başlatmak ve sonuçlandırmak.
- Temel Alanlar: Üretilecek ürün (stok), miktar, termin tarihi, hat/istasyon (varsa), reçete versiyonu; tüketim/çıktı satırları.
- İş Akışı: 1) Emir aç → 2) Reçeteden bileşenleri çek → 3) Malzeme rezervasyonu/çıkarma → 4) Operasyon başlat → 5) Tüketim kaydı (gerçekleşen) → 6) Çıktı (iyi ürün) ve fire → 7) Kalite kontrol → 8) Depoya giriş/muhasebeleştirme → 9) Emir kapatma.
- Planlama: Termin ve kapasite çakışmalarını kontrol edin; kritik bileşen için stok uyarılarını izleyin.
- Sık Hatalar: “Reçete bulunamadı/versiyon uyumsuz”, “Yetersiz hammadde”, “Kalite onayı bekliyor”.`,
  },
  {
    id: "11",
    text: `Stok Raporları (/stok-raporlari):
- Amaç: Anlık stok, emniyet stoğu, yaşlandırma, lokasyon bazlı miktar ve değer analizleri.
- Filtreler: Tarih, depo/raf, stok grubu, tedarikçi, parti/seri, lot yaşı.
- Çıktılar: Excel/CSV, pivot özet, grafik; minimum/maksimum stok ihlalleri listesi.
- İpuçları: Emniyet stok uyarılarını satın alma taleplerine dönüştürme; yavaş dönen stokları kampanya listesine aktarın.`,
  },
  {
    id: "12",
    text: `Müşteri Bakiye ve Risk Kontrolü (/cari-bakiye):
- Amaç: Müşteri bazında açık faturalar, vade aşımı, tahsilat planı ve risk/kredi limit takibi.
- Görünümler: Özet (bakiye, risk, bloke), detay (belge bazında), yaşlandırma (0–30/31–60/61–90/90+).
- Aksiyonlar: Hatırlatma mektubu, tahsilat planı, bloke kaldırma talebi (yetkiye bağlı).`,
  },
  {
    id: "13",
    text: `Satış Teklifi Modülü (/satis-teklifi):
- Amaç: Potansiyel satışlar için fiyat, iskonto ve teslim koşullarını içeren teklif hazırlamak ve siparişe dönüştürmek.
- İş Akışı: 1) Müşteri ve para birimi seç → 2) Kalemleri ekle → 3) Vade/teslim süresi/garanti koşulları → 4) Geçerlilik tarihi → 5) PDF gönder → 6) Kabul/ret takibi → 7) Siparişe dönüştür.
- İpuçları: Fiyat listesi tarih geçerliliğini kontrol edin; teklif versiyonlaması ile değişiklikleri izleyin.`,
  },
  {
    id: "14",
    text: `Bordro Hazırlama (/bordro):
- Amaç: Personel maaş/ek ödeme/kesinti hesaplarının oluşturulması ve tahakkukların muhasebeye aktarımı.
- İş Akışı: 1) Dönem seç → 2) Devamsızlık/izin verilerini çek → 3) Ek ödemeler/kesintiler → 4) Tahakkuk hesapla → 5) Kontrol ve onay → 6) Muhasebeleştir → 7) Banka ödeme dosyası (varsa) oluştur.
- Sık Hatalar: “İzin verisi eksik”, “Parametre uyuşmazlığı (SGK/vergiler)”.`,
  },
  {
    id: "15",
    text: `Genel Muhasebe Fişleri (/muhasebe-fisleri):
- Amaç: Yevmiye kayıtları, düzeltmeler, kur farkları ve dönem sonu işlemleri.
- İş Akışı: 1) Fiş türü (mahsup/kur farkı/düzeltme) → 2) Tarih/döviz → 3) Hesap borç/alacak → 4) Masraf/gelir merkezi → 5) Kaydet ve mizan kontrolü.
- İpuçları: Otomatik fiş kurallarını kullanarak satış, satın alma ve banka işlemlerini manuelden arındırın.`,
  },
];
