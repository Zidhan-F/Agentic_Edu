const spatialResources = [
  {
    title: 'Visualisasi 3D Dasar', concept_id: 'spatial_cube', content_url: '#', level_target: 2, estimated_minutes: 5,
    explanation: 'Visualisasi ruang menguji kemampuan Anda membayangkan objek 3D dalam pikiran. Untuk soal kubus yang ditempelkan, kunci utamanya adalah menghitung sisi yang tersembunyi — yaitu sisi yang saling menempel dan tidak terlihat dari luar.',
    keyPoints: [
      'Satu kubus memiliki 6 sisi',
      'Dua kubus terpisah = 6 + 6 = 12 sisi total',
      'Saat ditempelkan, 2 sisi saling bersentuhan (1 dari masing-masing kubus)',
      'Sisi terlihat dari luar = 12 - 2 = 10 sisi'
    ],
    example: {
      question: 'Dua kubus ditempelkan menjadi satu. Berapa sisi yang terlihat dari luar?',
      solution: '2 kubus = 12 sisi. Saat ditempel, 1 sisi dari kubus A menempel ke 1 sisi kubus B = 2 sisi tersembunyi. 12 - 2 = 10 sisi terlihat.'
    },
    tip: 'Untuk soal benda 3D yang digabungkan, selalu hitung total sisi dulu, lalu kurangi sisi yang tersembunyi (2 sisi per area tempel).'
  },
  {
    title: 'Refleksi & Bayangan', concept_id: 'spatial_mirror', content_url: '#', level_target: 2, estimated_minutes: 4,
    explanation: 'Bayangan cermin datar membalik objek secara horizontal (kiri-kanan). Tulisan yang dibalik cermin akan terbaca dari kanan ke kiri. Inilah mengapa ambulans menulis "AMBULANCE" secara terbalik — agar terbaca benar di kaca spion mobil di depannya.',
    keyPoints: [
      'Cermin datar membalik objek secara horizontal (kiri ↔ kanan)',
      'Setiap huruf juga dibalik secara individual',
      'Tulisan terbalik di cermin akan terbaca normal',
      'Ambulans menulis terbalik agar terbaca benar di kaca spion kendaraan lain'
    ],
    example: {
      question: 'Mengapa kata "AMBULANCE" ditulis terbalik di mobil ambulans?',
      solution: 'Karena ditulis terbalik horizontal (mirror). Saat pengendara melihat melalui kaca spion (yang juga membalik gambar), tulisan terbalik + cermin = terbaca normal "AMBULANCE".'
    },
    tip: 'Untuk menguji bayangan cermin, tuliskan kata di kertas, lalu lihat dari belakang kertas (menghadap cahaya). Itulah bayangan cerminnya.'
  },
  {
    title: 'Paper Folding Technique', concept_id: 'spatial_folding', content_url: '#', level_target: 3, estimated_minutes: 6,
    explanation: 'Soal paper folding (lipatan kertas) menguji kemampuan membayangkan hasil lipatan dan lubang. Setiap kali kertas dilipat, jumlah lapisan menjadi 2 kali lipat. Lubang yang dibuat pada kertas terlipat akan muncul di SETIAP lapisan saat dibuka.',
    keyPoints: [
      'Lipat 1 kali = 2 lapisan, lipat 2 kali = 4 lapisan',
      'Setiap lubang di kertas terlipat menghasilkan lubang di SETIAP lapisan',
      '1 lubang pada 4 lapisan = 4 lubang saat dibuka',
      'Posisi lubang bersifat simetris terhadap garis lipatan'
    ],
    example: {
      question: 'Kertas dilipat 2 kali lalu dilubangi di tengah. Berapa lubang saat dibuka?',
      solution: 'Lipat pertama: 2 lapisan. Lipat kedua: 4 lapisan. Melubangi = menembus semua 4 lapisan. Saat dibuka: 4 lubang (simetris terhadap kedua garis lipatan).'
    },
    tip: 'Rumus cepat: jumlah lubang = 2^(jumlah lipatan) × jumlah lubang yang dibuat. Lipat 2 kali, 1 lubang = 2² × 1 = 4.'
  },
  {
    title: 'Orientasi Mata Angin 1', concept_id: 'spatial_direction', content_url: '#', level_target: 1, estimated_minutes: 2,
    explanation: 'Orientasi arah menggunakan 4 arah utama: Utara (atas), Selatan (bawah), Timur (kanan), Barat (kiri). Putaran 90° searah jarum jam mengubah arah ke arah berikutnya: Utara → Timur → Selatan → Barat → Utara.',
    keyPoints: [
      'Searah jarum jam: U → T → S → B → U (UTSB)',
      '90° = 1 pergeseran arah',
      '180° = 2 pergeseran (berhadapan langsung)',
      '270° = 3 pergeseran = sama dengan 90° berlawanan arah jarum jam'
    ],
    example: {
      question: 'Menghadap Utara, berputar 90° searah jarum jam dua kali. Menghadap ke mana?',
      solution: 'Mulai: Utara. Putar 90° searah jarum jam = Timur. Putar 90° lagi = Selatan. Jawaban: Selatan. Alternatif: 2 × 90° = 180° = arah berlawanan dari Utara = Selatan.'
    },
    tip: 'Gambar kompas di kertas dan gunakan jari untuk memutar. Searah jarum jam = U→T→S→B.'
  },
  {
    title: 'Irisan Bangun Ruang', concept_id: 'spatial_slice', content_url: '#', level_target: 2, estimated_minutes: 4,
    explanation: 'Ketika bangun ruang 3D dipotong oleh bidang datar, hasilnya adalah bangun datar 2D. Bentuk irisan tergantung pada bangun ruang dan sudut pemotongan. Bola yang dipotong SELALU menghasilkan lingkaran, tidak peduli dari sudut mana.',
    keyPoints: [
      'Bola dipotong dari arah manapun → selalu menghasilkan LINGKARAN',
      'Irisan di tengah menghasilkan lingkaran terbesar (sama dengan diameter bola)',
      'Kubus dipotong diagonal → bisa menghasilkan segitiga atau segi enam',
      'Silinder dipotong horizontal → lingkaran; vertikal → persegi panjang'
    ],
    example: {
      question: 'Jika bola dipotong tepat di tengah, bangun datar apa yang terbentuk?',
      solution: 'Bola memiliki simetri sempurna ke segala arah. Pemotongan bidang datar melalui pusat bola menghasilkan lingkaran besar (great circle) dengan diameter = diameter bola. Jawaban: Lingkaran.'
    },
    tip: 'Ingat bentuk dasar irisan: bola→lingkaran, kubus→poligon, kerucut→lingkaran/elips/parabola/hiperbola.'
  },
  {
    title: 'Orientasi Mata Angin 2', concept_id: 'spatial_direction_2', content_url: '#', level_target: 3, estimated_minutes: 4,
    explanation: 'Pada level lanjut, soal menggunakan 8 arah mata angin (termasuk arah antara seperti Timur Laut, Tenggara, dll) dan putaran dengan derajat non-kelipatan 90°. Setiap arah dipisahkan 45°.',
    keyPoints: [
      '8 arah: U(0°), TL(45°), T(90°), TG(135°), S(180°), BD(225°), B(270°), BL(315°)',
      'Berlawanan jarum jam = derajat berkurang',
      'Dari Timur (90°), putar 135° berlawanan jarum jam = 90° - 135° = -45° = 315° = Barat Laut',
      'Jika hasil negatif, tambahkan 360°'
    ],
    example: {
      question: 'Menghadap Timur, berputar 135° berlawanan arah jarum jam. Kemana?',
      solution: 'Timur = 90°. Berlawanan jarum jam = kurangi: 90° - 135° = -45°. Tambah 360°: -45° + 360° = 315° = Barat Laut.'
    },
    tip: 'Gunakan rumus angka: tetapkan derajat awal, tambah/kurang sesuai arah putaran. Hasil negatif? Tambah 360°. Hasil > 360°? Kurangi 360°.'
  },
  {
    title: 'Bayangan Cermin Lanjutan', concept_id: 'spatial_mirror_2', content_url: '#', level_target: 3, estimated_minutes: 5,
    explanation: 'Bayangan jam di cermin: cermin membalik posisi kiri-kanan. Untuk menghitung waktu bayangan jam, gunakan rumus: Waktu bayangan = 12:00 - waktu asli (untuk jam 12 jam).',
    keyPoints: [
      'Rumus cepat: waktu bayangan = 12:00 - waktu asli',
      'Contoh: bayangan 09:00 = 12:00 - 09:00 = 03:00',
      'Angka di cermin tertukar posisi kiri-kanan',
      'Jarum jam bergerak berlawanan arah di bayangan cermin'
    ],
    example: {
      question: 'Bayangan jam 09:00 pada cermin datar menunjukkan pukul?',
      solution: 'Gunakan rumus: 12:00 - 09:00 = 03:00. Verifikasi: pada 09:00, jarum jam di angka 9 (kiri), jarum menit di 12 (atas). Di cermin, kiri→kanan: jarum jam di angka 3, jarum menit tetap di 12 = 03:00.'
    },
    tip: 'Hafal rumus 12:00 - waktu asli. Jika hasilnya negatif, tambah 12. Contoh: bayangan 12:30 = 12:00 - 12:30 = -0:30 + 12:00 = 11:30.'
  },
  {
    title: 'Visualisasi Volume Ruang', concept_id: 'spatial_volume', content_url: '#', level_target: 2, estimated_minutes: 4,
    explanation: 'Untuk menghitung jumlah kubus kecil dalam kubus besar, gunakan rumus volume kubus: sisi³. Kubus 3×3×3 berarti 3 kubus di setiap dimensi (panjang, lebar, tinggi).',
    keyPoints: [
      'Volume kubus = sisi × sisi × sisi = sisi³',
      'Kubus 3×3×3 = 3³ = 27 kubus kecil',
      'Lapisan bawah = 3×3 = 9, lapisan tengah = 9, lapisan atas = 9, total = 27',
      'Ini termasuk kubus yang tersembunyi di bagian dalam!'
    ],
    example: {
      question: 'Berapa kubus kecil (1×1×1) untuk membuat kubus besar (3×3×3)?',
      solution: 'Kubus 3×3×3 = 3 × 3 × 3 = 27 kubus kecil. Bayangkan 3 lapisan, masing-masing berisi 9 kubus (3 baris × 3 kolom).'
    },
    tip: 'Untuk kubus n×n×n, jawabannya selalu n³. Hafal: 2³=8, 3³=27, 4³=64, 5³=125.'
  },
  {
    title: 'Visualisasi & Pola Dadu', concept_id: 'spatial_dice', content_url: '#', level_target: 4, estimated_minutes: 7,
    explanation: 'Dadu standar memiliki aturan: sisi yang berlawanan selalu berjumlah 7. Jadi: 1↔6, 2↔5, 3↔4. Jika Anda tahu dua sisi, Anda bisa menentukan sisi lainnya.',
    keyPoints: [
      'Aturan dadu standar: sisi berlawanan berjumlah 7',
      'Pasangan: 1-6, 2-5, 3-4',
      'Jika sisi atas = 2, maka sisi bawah (berlawanan) = 7-2 = 5',
      'Ini berlaku untuk SEMUA dadu standar di seluruh dunia'
    ],
    example: {
      question: 'Sisi atas dadu angka 2. Sisi manakah yang berlawanan dengan angka 2?',
      solution: 'Aturan dadu standar: sisi berlawanan berjumlah 7. Berlawanan dengan 2 = 7 - 2 = 5. Jawaban: 5.'
    },
    tip: 'Hafal aturan jumlah 7 untuk dadu standar. Ini langsung menjawab semua soal tentang sisi berlawanan dadu.'
  },
  {
    title: 'Bayangan 2D dari Benda 3D', concept_id: 'spatial_shadow', content_url: '#', level_target: 2, estimated_minutes: 3,
    explanation: 'Bayangan benda 3D pada bidang datar tergantung pada arah cahaya. Bayangan adalah proyeksi 2D dari bentuk 3D. Silinder yang disorot dari samping menghasilkan persegi panjang karena sisi samping silinder berbentuk datar.',
    keyPoints: [
      'Silinder dari samping → Persegi panjang',
      'Silinder dari atas/bawah → Lingkaran',
      'Bola dari arah manapun → Lingkaran',
      'Kubus dari samping → Persegi; dari sudut → Segi enam'
    ],
    example: {
      question: 'Bayangan silinder yang disorot cahaya lurus dari samping adalah?',
      solution: 'Dari samping, silinder terlihat seperti persegi panjang (tinggi = tinggi silinder, lebar = diameter silinder). Jawaban: Persegi panjang.'
    },
    tip: 'Bayangkan Anda melihat benda tersebut dari arah cahaya. Apa bentuk siluetnya? Itulah bentuk bayangannya.'
  }
];

module.exports = spatialResources;
