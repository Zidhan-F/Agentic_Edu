const verbalResources = [
  {
    title: 'Klasifikasi Objek Dasar', concept_id: 'verbal_classify', content_url: '#', level_target: 1, estimated_minutes: 2,
    explanation: 'Klasifikasi verbal menguji kemampuan Anda mengenali anggota yang tidak termasuk dalam satu kelompok. Caranya: tentukan kesamaan dari mayoritas objek, lalu temukan objek yang berbeda kategorinya.',
    keyPoints: [
      'Cari kesamaan dari mayoritas pilihan — apa kategori umumnya?',
      'Temukan satu objek yang berbeda kategori dari yang lain',
      'Perhatikan: Apel, Mangga, Pisang, Anggur = buah-buahan; Wortel = sayuran',
      'Jangan terjebak kesamaan superfisial seperti warna atau ukuran'
    ],
    example: {
      question: 'Mana yang tidak termasuk kelompok: Apel, Mangga, Wortel, Pisang, Anggur?',
      solution: 'Apel, Mangga, Pisang, Anggur = buah-buahan. Wortel = sayuran. Jawaban: Wortel.'
    },
    tip: 'Selalu cari kategori UTAMA (buah/sayur, hewan/tumbuhan, dll) sebelum mempertimbangkan karakteristik lain.'
  },
  {
    title: 'Memahami Analogi Dasar', concept_id: 'verbal_analogy', content_url: '#', level_target: 1, estimated_minutes: 2,
    explanation: 'Analogi verbal menguji kemampuan Anda menemukan hubungan antara dua kata, lalu menerapkan hubungan yang sama ke pasangan kata lain. Pola umum: A berbanding B = C berbanding ?. Kunci: identifikasi jenis hubungan (lawan kata, fungsi, bagian-keseluruhan, dll).',
    keyPoints: [
      'Identifikasi hubungan: apakah lawan kata, sinonim, fungsi, atau hierarki?',
      'PANAS-DINGIN = lawan kata (antonim)',
      'Terapkan hubungan yang sama: TINGGI = ? (lawan kata)',
      'Lawan kata TINGGI = RENDAH (bukan kecil atau pendek dalam konteks ini)'
    ],
    example: {
      question: 'PANAS : DINGIN = TINGGI : ...?',
      solution: 'Hubungan PANAS-DINGIN = antonim (lawan kata). Terapkan ke TINGGI: lawan katanya = RENDAH.'
    },
    tip: 'Langkah 1: identifikasi hubungan antar kata pertama. Langkah 2: terapkan hubungan yang sama persis ke kata kedua.'
  },
  {
    title: 'Kosakata Tingkat Lanjut', concept_id: 'verbal_synonym', content_url: '#', level_target: 3, estimated_minutes: 5,
    explanation: 'Sinonim adalah kata yang memiliki makna sama atau sangat mirip. Pada tingkat lanjut, soal menggunakan kata-kata formal atau jarang digunakan sehari-hari. Kunci: pahami konteks penggunaan kata dan cari kata dengan makna paling mendekati.',
    keyPoints: [
      'ELUSIF = sulit ditangkap, sulit dipahami, atau sulit ditemukan',
      'Kata ini berasal dari bahasa Inggris "elusive"',
      'Konteks: "Kebahagiaan itu elusif" = kebahagiaan sulit diraih/ditangkap',
      'Jangan keliru dengan "eksklusif" (terbatas) atau "illusif" (bersifat ilusi)'
    ],
    example: {
      question: 'Temukan sinonim dari kata "ELUSIF"',
      solution: 'ELUSIF berarti sesuatu yang sulit ditangkap atau dipegang. Dari pilihan yang tersedia, "Sulit ditangkap" adalah sinonim yang paling tepat.'
    },
    tip: 'Jika tidak yakin dengan arti sebuah kata, coba gunakan dalam kalimat. "Pencuri itu sangat elusif" — artinya pencuri itu sulit ditangkap.'
  },
  {
    title: 'Peribahasa Indonesia', concept_id: 'verbal_proverb', content_url: '#', level_target: 2, estimated_minutes: 3,
    explanation: 'Peribahasa adalah ungkapan kiasan yang mengandung nasihat atau kebijaksanaan. Untuk memahaminya, jangan artikan secara harfiah — cari makna figuratif (kiasan) yang terkandung di dalamnya. Peribahasa sering menggunakan alam atau benda sehari-hari sebagai metafora.',
    keyPoints: [
      '"Buah jatuh tidak jauh dari pohonnya" = BUKAN tentang buah sungguhan',
      'Makna kiasan: sifat anak cenderung mirip dengan orang tuanya',
      'Peribahasa = nasihat/pengamatan kehidupan dalam bentuk kiasan',
      'Cari hubungan metaforis: buah = anak, pohon = orang tua'
    ],
    example: {
      question: '"Buah jatuh tidak jauh dari pohonnya." Apa maknanya?',
      solution: 'Buah (anak) jatuh (tumbuh/berkembang) tidak jauh dari pohon (orang tua). Makna: sifat anak biasanya mirip atau tidak jauh berbeda dari sifat orang tuanya.'
    },
    tip: 'Untuk peribahasa, selalu cari makna KIASAN, bukan makna harfiah. Tanyakan pada diri sendiri: "Apa pelajaran hidup yang ingin disampaikan?"'
  },
  {
    title: 'Mengenal Antonim Kata', concept_id: 'verbal_antonym', content_url: '#', level_target: 2, estimated_minutes: 3,
    explanation: 'Antonim adalah kata dengan makna berlawanan. Untuk kata "ABSTRAK", Anda perlu memahami maknanya terlebih dahulu: abstrak = tidak berwujud, konseptual, tidak nyata. Maka antonimnya = berwujud, nyata, konkret.',
    keyPoints: [
      'ABSTRAK = tidak berwujud, konseptual, hanya ada dalam pikiran',
      'Antonim ABSTRAK = KONKRET (nyata, berwujud, bisa disentuh/dilihat)',
      '"Nyata" dan "Jelas" mirip tapi KONKRET lebih tepat sebagai antonim langsung',
      'Konteks: "seni abstrak" vs "benda konkret"'
    ],
    example: {
      question: 'Antonim dari "ABSTRAK" adalah?',
      solution: 'ABSTRAK = tidak nyata, konseptual. Lawannya = KONKRET (nyata, berwujud). "Nyata" juga dekat maknanya, tapi "Konkret" adalah antonim formal yang paling tepat.'
    },
    tip: 'Untuk soal antonim, pastikan jawaban Anda benar-benar berlawanan makna, bukan hanya "berbeda". Konkret vs Abstrak adalah pasangan antonim klasik.'
  },
  {
    title: 'Analogi Pekerjaan & Fungsi', concept_id: 'verbal_analogy_2', content_url: '#', level_target: 1, estimated_minutes: 2,
    explanation: 'Jenis analogi ini menguji hubungan "aktivitas : objek". BACA membutuhkan BUKU sebagai objeknya. Maka MINUM membutuhkan apa? Cari objek yang paling langsung terkait dengan aktivitas tersebut.',
    keyPoints: [
      'Identifikasi hubungan: BACA (aktivitas) → BUKU (objek langsung)',
      'MINUM (aktivitas) → ? (objek langsung)',
      'AIR adalah objek yang langsung diminum (bukan gelas — itu alat)',
      'Bedakan objek langsung (air) dengan alat (gelas) dan kondisi (haus)'
    ],
    example: {
      question: 'BACA : BUKU = MINUM : ...?',
      solution: 'Hubungan: aktivitas dan objek langsungnya. Kita MEMBACA buku (buku = yang dibaca). Kita MEMINUM air (air = yang diminum). Jawaban: AIR.'
    },
    tip: 'Bedakan antara OBJEK (apa yang di-verb-kan) dan ALAT (dengan apa melakukannya). Baca BUKU bukan baca kacamata.'
  },
  {
    title: 'Klasifikasi Objek Lanjutan', concept_id: 'verbal_classify_2', content_url: '#', level_target: 1, estimated_minutes: 2,
    explanation: 'Pada level ini, klasifikasi menggunakan kategori yang lebih abstrak seperti "aktivitas fisik vs mental". Anda perlu mengenali bahwa berlari, berjalan, dan melompat adalah gerakan fisik tubuh, sedangkan berpikir adalah aktivitas mental.',
    keyPoints: [
      'Berlari, Berjalan, Melompat = aktivitas fisik yang melibatkan gerakan tubuh',
      'Berpikir = aktivitas mental yang terjadi di dalam pikiran',
      'Kategori pembeda: fisik vs mental',
      'Cari sifat yang dimiliki 3 dari 4 objek — yang tidak memilikinya adalah jawabannya'
    ],
    example: {
      question: 'Mana yang tidak masuk kelompok? Berlari, Berjalan, Melompat, Berpikir',
      solution: 'Berlari, Berjalan, Melompat = semua melibatkan gerakan fisik tubuh. Berpikir = aktivitas mental, tidak melibatkan gerakan fisik. Jawaban: Berpikir.'
    },
    tip: 'Cari kesamaan dari tiga objek terlebih dahulu, baru eliminasi yang berbeda. Jangan mulai dari yang berbeda — mulai dari mayoritas.'
  },
  {
    title: 'Kosakata Akademik Tinggi', concept_id: 'verbal_vocabulary', content_url: '#', level_target: 4, estimated_minutes: 6,
    explanation: 'Soal kosakata tingkat tinggi menguji pengetahuan etimologi (asal-usul kata). Kata "PEDAGOGI" berasal dari bahasa Yunani: "paidos" (anak) + "agogos" (pemimpin/pembimbing). Jadi pedagogi = ilmu/seni mengajar dan mendidik.',
    keyPoints: [
      'PEDAGOGI = ilmu/seni tentang pendidikan dan pengajaran',
      'Asal kata: Yunani "paidos" (anak) + "agogos" (pembimbing)',
      'Seorang pedagog = pendidik/guru',
      'Istilah terkait: andragogi (pendidikan orang dewasa), didaktik (metode mengajar)'
    ],
    example: {
      question: 'Kata "PEDAGOGI" berkaitan erat dengan?',
      solution: 'Pedagogi berasal dari bahasa Yunani yang artinya "membimbing anak". Ini adalah istilah yang merujuk pada ilmu pendidikan dan pengajaran. Jawaban: Pendidikan.'
    },
    tip: 'Untuk kata serapan, coba kenali akar katanya. Banyak kata akademik berasal dari bahasa Yunani atau Latin dan memiliki pola yang bisa dikenali.'
  },
  {
    title: 'Analogi Hierarki', concept_id: 'verbal_analogy_3', content_url: '#', level_target: 2, estimated_minutes: 3,
    explanation: 'Analogi hierarki menguji pemahaman tentang tingkatan atau susunan dari kecil ke besar. HURUF membentuk KATA, KATA membentuk KALIMAT, KALIMAT membentuk PARAGRAF. Ini adalah hubungan "unit kecil membentuk unit yang lebih besar".',
    keyPoints: [
      'Hierarki bahasa: Huruf → Kata → Kalimat → Paragraf → Teks',
      'HURUF dirangkai menjadi KATA (satu tingkat naik)',
      'KATA dirangkai menjadi KALIMAT (satu tingkat naik lagi)',
      'Konsistensi: naik SATU tingkat, bukan dua atau lebih'
    ],
    example: {
      question: 'Jika HURUF dirangkai menjadi KATA, maka KATA dirangkai menjadi?',
      solution: 'Huruf → Kata (naik 1 level). Kata → ? (naik 1 level). Dalam hierarki bahasa: Huruf < Kata < Kalimat < Paragraf. Jawaban: Kalimat.'
    },
    tip: 'Dalam soal analogi hierarki, naiklah tepat SATU tingkat — jangan loncat ke tingkat yang lebih tinggi (bukan Paragraf, bukan Buku).'
  },
  {
    title: 'Sinonim Terapan', concept_id: 'verbal_synonym_2', content_url: '#', level_target: 3, estimated_minutes: 4,
    explanation: 'Kata "KOMPREHENSIF" sering digunakan dalam konteks akademik dan profesional. Artinya mencakup semua aspek secara lengkap dan menyeluruh. Berbeda dengan "rumit" (yang berarti sulit) atau "singkat" (yang berarti pendek).',
    keyPoints: [
      'KOMPREHENSIF = menyeluruh, lengkap, mencakup semua aspek',
      'Contoh: "laporan komprehensif" = laporan yang membahas SEMUA aspek',
      '"Menyeluruh" adalah sinonim paling tepat',
      'BUKAN rumit (complicated), BUKAN sempit (narrow), BUKAN singkat (brief)'
    ],
    example: {
      question: 'Sinonim dari "KOMPREHENSIF" adalah?',
      solution: 'Komprehensif = mencakup segala aspek secara lengkap. Dari pilihan: Sempit (antonim), Singkat (antonim), Menyeluruh (sinonim!), Rumit (berbeda makna). Jawaban: Menyeluruh.'
    },
    tip: 'Jika ragu, coba ganti kata dalam kalimat: "studi komprehensif" = "studi menyeluruh" ✓. "studi rumit" ✗ — maknanya berbeda.'
  }
];

module.exports = verbalResources;
