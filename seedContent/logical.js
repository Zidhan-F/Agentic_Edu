const logicalResources = [
  {
    title: 'Panduan Logika Dasar', concept_id: 'logical_syllogism', content_url: '#', level_target: 2, estimated_minutes: 5,
    explanation: 'Silogisme adalah bentuk penalaran deduktif yang terdiri dari dua premis (pernyataan awal) dan satu kesimpulan. Premis mayor memberikan pernyataan umum, premis minor memberikan pernyataan khusus, dan kesimpulan ditarik dari hubungan keduanya. Kunci utamanya adalah memahami hubungan antar himpunan: "semua", "beberapa", dan "tidak ada".',
    keyPoints: [
      '"Semua A adalah B" berarti himpunan A sepenuhnya berada di dalam himpunan B',
      '"Beberapa A adalah B" berarti ada irisan antara himpunan A dan B, tapi tidak seluruhnya',
      'Kesimpulan hanya boleh ditarik dari informasi yang PASTI benar berdasarkan premis',
      'Jangan menambahkan asumsi di luar premis yang diberikan'
    ],
    example: {
      question: 'Semua Dokter adalah Manusia. Beberapa Manusia adalah Kidal. Manakah yang PASTI benar?',
      solution: 'Bayangkan diagram Venn: lingkaran "Dokter" ada di dalam lingkaran "Manusia". Lingkaran "Kidal" beririsan dengan "Manusia" tapi kita tidak tahu apakah irisan itu mengenai bagian "Dokter" atau tidak. Yang PASTI benar: "Beberapa Manusia adalah Dokter" (karena semua Dokter = Manusia, maka pasti ada sebagian Manusia yang adalah Dokter).'
    },
    tip: 'Gunakan diagram Venn! Gambar lingkaran untuk setiap kategori dan lihat hubungannya. Ini cara tercepat untuk memvisualisasikan silogisme.'
  },
  {
    title: 'Logika Silogisme Lanjutan', concept_id: 'logical_syllogism_2', content_url: '#', level_target: 3, estimated_minutes: 6,
    explanation: 'Silogisme lanjutan melibatkan kombinasi premis "semua" dan "beberapa" yang lebih kompleks. Di level ini, Anda perlu memahami bahwa jika "semua A adalah B" dan "beberapa A adalah C", maka "beberapa C juga adalah B". Logika ini sering menjebak karena kita cenderung membuat kesimpulan berlebihan.',
    keyPoints: [
      'Jika "Semua A adalah B" maka setiap anggota A otomatis anggota B',
      '"Beberapa A menyukai X" + "Semua A menyukai Y" = "Beberapa yang menyukai X juga menyukai Y"',
      'Hati-hati dengan kata "semua" vs "beberapa" — keduanya sangat berbeda secara logis',
      'Kesimpulan tidak boleh lebih kuat dari premis terlemah'
    ],
    example: {
      question: 'Beberapa mahasiswa menyukai matematika. Semua mahasiswa menyukai logika. Kesimpulan?',
      solution: 'Karena SEMUA mahasiswa suka logika, maka mahasiswa yang suka matematika (yang merupakan bagian dari "semua mahasiswa") juga pasti suka logika. Jadi: "Beberapa yang menyukai matematika juga menyukai logika".'
    },
    tip: 'Perhatikan kata kunci "semua" dan "beberapa". Premis dengan "semua" lebih kuat dan bisa memberikan kepastian, sedangkan "beberapa" hanya memberikan kemungkinan.'
  },
  {
    title: 'Memahami Logika Urutan', concept_id: 'logical_ordering', content_url: '#', level_target: 2, estimated_minutes: 3,
    explanation: 'Logika urutan menguji kemampuan Anda menyusun elemen berdasarkan relasi perbandingan seperti "lebih tua dari", "lebih tinggi dari", atau "lebih berat dari". Teknik dasarnya adalah menyusun semua informasi menjadi satu rantai urutan yang konsisten.',
    keyPoints: [
      'Tulis setiap hubungan sebagai tanda > atau < untuk mempermudah',
      'Gabungkan semua relasi menjadi satu rantai: misal D > A > B > C',
      'Pertanyaan biasanya menanyakan posisi ekstrem (paling tua/muda, paling tinggi/pendek)',
      'Baca setiap kalimat dengan teliti — "lebih tua" dan "lebih muda" mudah tertukar'
    ],
    example: {
      question: 'Ali lebih tua dari Budi. Charlie lebih muda dari Budi. Dina lebih tua dari Ali. Siapa yang paling muda?',
      solution: 'Susun relasi: Dina > Ali (Dina lebih tua), Ali > Budi (Ali lebih tua), Budi > Charlie (Charlie lebih muda). Rantai: Dina > Ali > Budi > Charlie. Yang paling muda = Charlie.'
    },
    tip: 'Buat garis horizontal dan letakkan nama-nama dari kiri (terkecil) ke kanan (terbesar). Ini membantu visualisasi urutan dengan cepat.'
  },
  {
    title: 'Trik Kalender & Modular', concept_id: 'logical_calendar', content_url: '#', level_target: 3, estimated_minutes: 6,
    explanation: 'Soal kalender menguji kemampuan menghitung hari dengan konsep aritmatika modular. Prinsipnya: 1 minggu = 7 hari, jadi setiap kelipatan 7 akan kembali ke hari yang sama. Untuk mengetahui hari setelah N hari, cukup hitung sisa bagi N dengan 7.',
    keyPoints: [
      'Gunakan rumus: N mod 7 (sisa pembagian N dengan 7) untuk menentukan pergeseran hari',
      'Hari berulang setiap 7 hari: Senin + 7 = Senin, Senin + 14 = Senin',
      'Urutkan hari: Sen(1), Sel(2), Rab(3), Kam(4), Jum(5), Sab(6), Min(7)',
      'Untuk angka besar, fokus pada sisa bagi 7 saja'
    ],
    example: {
      question: 'Jika hari ini Senin, maka 100 hari lagi adalah hari apa?',
      solution: '100 ÷ 7 = 14 sisa 2. Artinya 100 hari = 14 minggu penuh + 2 hari ekstra. Senin + 2 hari = Rabu.'
    },
    tip: 'Jangan pernah menghitung hari satu per satu! Langsung bagi dengan 7 dan fokus pada sisanya. Ini menghemat waktu secara drastis.'
  },
  {
    title: 'Kontrapositif Logika', concept_id: 'logical_contraposition', content_url: '#', level_target: 4, estimated_minutes: 7,
    explanation: 'Kontrapositif adalah aturan logika yang mengatakan: jika "P → Q" (jika P maka Q) bernilai benar, maka "¬Q → ¬P" (jika bukan Q maka bukan P) juga PASTI benar. Ini berbeda dari kebalikan (konvers) "Q → P" yang belum tentu benar.',
    keyPoints: [
      'Pernyataan asli: "Jika P maka Q" (P → Q)',
      'Kontrapositif: "Jika bukan Q maka bukan P" (¬Q → ¬P) — SELALU benar jika aslinya benar',
      'Konvers: "Jika Q maka P" (Q → P) — BELUM TENTU benar',
      'Invers: "Jika bukan P maka bukan Q" (¬P → ¬Q) — BELUM TENTU benar'
    ],
    example: {
      question: '"Semua kucing hitam adalah hewan peliharaan." Mana kontrapositif yang benar?',
      solution: 'Pernyataan asli: Jika kucing hitam (P) → hewan peliharaan (Q). Kontrapositif: Jika BUKAN hewan peliharaan (¬Q) → BUKAN kucing hitam (¬P). Jawaban: "Jika bukan hewan peliharaan, maka bukan kucing hitam".'
    },
    tip: 'Ingat rumus sederhana: balik posisi dan negasikan keduanya. "Jika A maka B" menjadi "Jika bukan B maka bukan A".'
  },
  {
    title: 'Memecahkan Teka-teki Logika', concept_id: 'logical_riddle', content_url: '#', level_target: 1, estimated_minutes: 3,
    explanation: 'Teka-teki logika menguji kemampuan berpikir lateral — yaitu melihat masalah dari sudut yang tidak biasa. Kunci utamanya adalah membaca soal dengan sangat literal dan tidak menambahkan asumsi sendiri.',
    keyPoints: [
      'Baca soal kata per kata — jangan menambahkan informasi yang tidak ada',
      'Perhatikan kata-kata jebakan seperti "menyalip", "menambah", "mengurangi"',
      'Jangan terburu-buru memilih jawaban yang terlihat "logis" secara intuitif',
      'Pikirkan ulang: apakah yang Anda asumsikan benar-benar dinyatakan dalam soal?'
    ],
    example: {
      question: 'Dalam perlombaan lari, Anda menyalip pelari posisi kedua. Anda sekarang di posisi?',
      solution: 'Banyak orang menjawab "pertama", tapi itu salah! Jika Anda menyalip orang di posisi KEDUA, Anda mengambil posisinya — yaitu posisi KEDUA. Anda tidak menyalip orang pertama, jadi Anda belum di posisi pertama.'
    },
    tip: 'Untuk soal jebakan, coba bayangkan situasinya secara nyata. Visualisasikan diri Anda benar-benar berlari dan menyalip seseorang.'
  },
  {
    title: 'Logika Matematika dalam Cerita', concept_id: 'logical_riddle_2', content_url: '#', level_target: 2, estimated_minutes: 4,
    explanation: 'Soal ini menggabungkan logika dengan pemahaman matematika dasar dalam bentuk cerita. Kuncinya adalah mengidentifikasi variabel yang sebenarnya konstan dan yang berubah secara proporsional.',
    keyPoints: [
      'Identifikasi: apa yang tetap (konstan) dan apa yang berubah?',
      'Jangan langsung mengalikan — pikirkan hubungan antar variabel',
      'Setiap mesin bekerja secara independen dan paralel',
      'Waktu pembuatan 1 barang oleh 1 mesin adalah kunci jawabannya'
    ],
    example: {
      question: 'Jika 5 mesin butuh 5 menit untuk membuat 5 barang, berapa waktu 100 mesin untuk 100 barang?',
      solution: '5 mesin membuat 5 barang dalam 5 menit = setiap mesin membuat 1 barang dalam 5 menit. Maka 100 mesin masing-masing membuat 1 barang secara bersamaan = 100 barang dalam 5 menit. Jawabannya tetap 5 menit!'
    },
    tip: 'Pecahkan menjadi unit terkecil dulu: berapa waktu 1 mesin untuk 1 barang? Dari situ, skalakan ke jumlah yang diminta.'
  },
  {
    title: 'Pertidaksamaan Logika', concept_id: 'logical_inequality', content_url: '#', level_target: 1, estimated_minutes: 2,
    explanation: 'Pertidaksamaan logika menguji kemampuan Anda menentukan hubungan antara variabel berdasarkan tanda > (lebih besar), < (lebih kecil), atau = (sama dengan). Ini adalah fondasi untuk soal urutan yang lebih kompleks.',
    keyPoints: [
      'Jika A > B dan B > C, maka pasti A > C (sifat transitif)',
      'Jika A > B dan C < B, maka A > B > C, sehingga A > C',
      'Sifat transitif: hubungan "lebih dari" dapat dirantai',
      'Gambar garis bilangan untuk memvisualisasikan posisi setiap variabel'
    ],
    example: {
      question: 'Jika A > B dan C < B, maka pernyataan mana yang pasti benar?',
      solution: 'A > B (A lebih besar dari B). C < B (C lebih kecil dari B). Gabungkan: A > B > C. Maka yang PASTI benar: A > C.'
    },
    tip: 'Tulis semua hubungan dalam satu baris menggunakan tanda > dan <. Ini membuat hubungan antar variabel langsung terlihat jelas.'
  },
  {
    title: 'Silogisme Kompleks 1', concept_id: 'logical_syllogism_3', content_url: '#', level_target: 3, estimated_minutes: 5,
    explanation: 'Silogisme kompleks melibatkan premis negatif — yaitu pernyataan yang mengandung kata "tidak ada" atau "bukan". Ketika salah satu premis bersifat negatif, kesimpulan yang dihasilkan juga harus bersifat negatif atau parsial.',
    keyPoints: [
      '"Tidak ada A yang B" berarti himpunan A dan B tidak beririsan sama sekali',
      'Jika premis negatif + premis positif → kesimpulan bersifat negatif parsial',
      'Perhatikan bahwa "beberapa A bukan B" berbeda dari "tidak ada A yang B"',
      'Gunakan diagram Venn dengan lingkaran yang tidak beririsan untuk premis negatif'
    ],
    example: {
      question: 'Tidak ada angsa yang berwarna hijau. Beberapa burung berwarna hijau. Kesimpulan?',
      solution: 'Lingkaran "Angsa" dan "Hijau" tidak beririsan. Lingkaran "Burung" dan "Hijau" beririsan. Burung yang hijau pasti BUKAN angsa (karena angsa tidak hijau). Jadi: "Beberapa burung bukan angsa".'
    },
    tip: 'Untuk premis negatif, gambar dua lingkaran yang terpisah total (tidak beririsan). Ini membantu melihat dengan jelas apa yang mustahil.'
  },
  {
    title: 'Silogisme Kompleks 2', concept_id: 'logical_syllogism_4', content_url: '#', level_target: 3, estimated_minutes: 6,
    explanation: 'Pada tingkat ini, Anda akan menemui silogisme dengan dua premis universal — satu positif ("Semua M adalah N") dan satu negatif ("Tidak ada N yang P"). Kombinasi ini menghasilkan kesimpulan definitif yang bisa dipastikan kebenarannya.',
    keyPoints: [
      '"Semua M adalah N" → M sepenuhnya di dalam N',
      '"Tidak ada N yang P" → N dan P terpisah total',
      'Karena M di dalam N, dan N terpisah dari P, maka M juga terpisah dari P',
      'Jawaban: "Tidak ada M yang merupakan P" — ini adalah kesimpulan pasti'
    ],
    example: {
      question: 'Semua M adalah N. Tidak ada N yang merupakan P. Apakah ada M yang merupakan P?',
      solution: 'M ⊂ N (M ada di dalam N). N ∩ P = ∅ (N dan P tidak beririsan). Karena M ada di dalam N, dan N tidak beririsan dengan P, maka M juga tidak mungkin beririsan dengan P. Jawaban: Tidak ada.'
    },
    tip: 'Gambar tiga lingkaran: M di dalam N, lalu P jauh terpisah dari N. Dari gambar ini langsung terlihat bahwa M dan P mustahil bertemu.'
  }
];

module.exports = logicalResources;
