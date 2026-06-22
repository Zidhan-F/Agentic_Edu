const numericalResources = [
  {
    title: 'Pola Deret Angka', concept_id: 'num_series', content_url: '#', level_target: 2, estimated_minutes: 4,
    explanation: 'Deret angka adalah urutan bilangan yang mengikuti pola tertentu. Untuk menemukan pola, perhatikan selisih antar angka berurutan. Jika selisihnya konstan, itu deret aritmatika. Jika selisihnya berubah secara teratur, cari pola di dalam selisih itu sendiri (selisih kedua).',
    keyPoints: [
      'Hitung selisih antar angka berurutan (selisih pertama): 6-2=4, 12-6=6, 20-12=8, 30-20=10',
      'Jika selisih pertama tidak konstan, hitung selisih kedua: 6-4=2, 8-6=2, 10-8=2 → konstan!',
      'Selisih kedua konstan = pola kuadratik (melibatkan n²)',
      'Untuk menemukan angka berikutnya: selisih berikutnya = 10+2=12, maka 30+12=42'
    ],
    example: {
      question: 'Berapakah angka selanjutnya: 2, 6, 12, 20, 30, ...?',
      solution: 'Selisih pertama: 4, 6, 8, 10 (naik 2 setiap langkah). Selisih berikutnya = 12. Jadi: 30 + 12 = 42. Pola ini juga bisa ditulis sebagai n(n+1): 1×2=2, 2×3=6, 3×4=12, 4×5=20, 5×6=30, 6×7=42.'
    },
    tip: 'Selalu hitung selisih antar angka dulu. Jika selisih pertama tidak konstan, hitung selisih dari selisih (selisih kedua). Ini teknik yang paling ampuh untuk soal deret.'
  },
  {
    title: 'Jebakan Persentase', concept_id: 'num_percent', content_url: '#', level_target: 3, estimated_minutes: 5,
    explanation: 'Persentase naik lalu turun dengan angka yang sama TIDAK akan kembali ke nilai awal. Ini karena persentase kenaikan dihitung dari nilai awal, sedangkan persentase penurunan dihitung dari nilai yang sudah naik (lebih besar). Penurunan 20% dari angka yang lebih besar menghasilkan pengurangan yang lebih besar daripada kenaikan 20% sebelumnya.',
    keyPoints: [
      'Naik 20% dari 100 = 100 × 1.2 = 120',
      'Turun 20% dari 120 = 120 × 0.8 = 96 (bukan kembali ke 100!)',
      'Rumus cepat: perubahan bersih = -(persentase²/100) = -(20²/100) = -4%',
      'Semakin besar persentasenya, semakin besar "kerugian" bersihnya'
    ],
    example: {
      question: 'Harga naik 20%, lalu turun 20%. Berapa perubahan dari harga awal?',
      solution: 'Misalkan harga awal = 100. Naik 20%: 100 × 1.2 = 120. Turun 20%: 120 × 0.8 = 96. Perubahan: 96 - 100 = -4. Jadi turun 4% dari harga awal.'
    },
    tip: 'Gunakan rumus cepat: -(p²/100) di mana p = persentase. Untuk 20%: -(400/100) = -4%. Ini berlaku untuk semua soal naik-turun persentase yang sama.'
  },
  {
    title: 'Sudut pada Jam Analog', concept_id: 'num_geometry', content_url: '#', level_target: 3, estimated_minutes: 4,
    explanation: 'Jam analog memiliki dua jarum yang bergerak dengan kecepatan berbeda. Jarum menit bergerak 6° per menit (360°/60), sedangkan jarum jam bergerak 0.5° per menit (360°/720). Sudut antara keduanya dihitung dari selisih posisi masing-masing jarum.',
    keyPoints: [
      'Jarum menit: posisi = menit × 6° (contoh: menit 15 = 90°)',
      'Jarum jam: posisi = (jam × 30°) + (menit × 0.5°)',
      'Pada 3:15 → jarum menit di 90°, jarum jam di (3×30)+(15×0.5) = 90+7.5 = 97.5°',
      'Sudut = |97.5 - 90| = 7.5°'
    ],
    example: {
      question: 'Pukul 3:15, berapakah sudut antara jarum jam dan jarum menit?',
      solution: 'Jarum menit di angka 3 = 90° dari angka 12. Jarum jam: sudah lewat angka 3 karena sudah 15 menit berlalu. Posisi = 3×30 + 15×0.5 = 97.5°. Sudut = 97.5° - 90° = 7.5°.'
    },
    tip: 'Kesalahan umum: mengira jarum jam tepat di angka 3 pada pukul 3:15. Padahal jarum jam sudah bergeser sedikit! Selalu tambahkan menit × 0.5° untuk posisi jarum jam.'
  },
  {
    title: 'Kecepatan & Jarak', concept_id: 'num_speed', content_url: '#', level_target: 2, estimated_minutes: 3,
    explanation: 'Kecepatan rata-rata BUKAN rata-rata dari dua kecepatan! Kecepatan rata-rata = Total Jarak ÷ Total Waktu. Ini penting karena banyak soal menjebak dengan memberikan kecepatan berbeda di tiap segmen perjalanan.',
    keyPoints: [
      'Rumus dasar: Kecepatan = Jarak / Waktu',
      'Kecepatan rata-rata = Total Jarak / Total Waktu',
      'JANGAN merata-ratakan kecepatan: (v1+v2)/2 hanya berlaku jika waktu tempuh sama',
      'Hitung total jarak dan total waktu secara terpisah, lalu bagi'
    ],
    example: {
      question: 'Kereta menempuh 120 km dalam 2 jam, lalu 180 km dalam 3 jam. Kecepatan rata-rata?',
      solution: 'Total jarak = 120 + 180 = 300 km. Total waktu = 2 + 3 = 5 jam. Kecepatan rata-rata = 300/5 = 60 km/jam.'
    },
    tip: 'Ingat: kecepatan rata-rata ≠ rata-rata kecepatan. Selalu hitung total jarak dan total waktu dulu.'
  },
  {
    title: 'Aljabar dalam Kehidupan', concept_id: 'num_algebra', content_url: '#', level_target: 2, estimated_minutes: 5,
    explanation: 'Aljabar dasar digunakan untuk menemukan nilai yang tidak diketahui (x) dari informasi yang diberikan. Dalam konteks diskon, harga akhir = harga awal × (1 - diskon/100). Untuk mencari harga awal, balikkan rumus tersebut.',
    keyPoints: [
      'Diskon p% berarti harga akhir = harga awal × (100-p)/100',
      'Untuk mencari harga awal: harga awal = harga akhir ÷ ((100-p)/100)',
      'Diskon 30% → kalikan dengan 0.7 untuk mendapat harga akhir',
      'Untuk balik: bagi harga akhir dengan 0.7 untuk mendapat harga awal'
    ],
    example: {
      question: 'Harga baju didiskon 30% menjadi Rp 70.000. Berapa harga awalnya?',
      solution: 'Harga akhir = Harga awal × (100%-30%) = Harga awal × 70%. Maka: 70.000 = Harga awal × 0.7. Harga awal = 70.000 / 0.7 = Rp 100.000.'
    },
    tip: 'Jangan terjebak menghitung 30% dari 70.000 lalu menambahkannya! Yang benar: 70.000 adalah 70% dari harga awal, jadi bagi dengan 0.7.'
  },
  {
    title: 'Menghitung Persentase Cepat', concept_id: 'num_basic_percent', content_url: '#', level_target: 1, estimated_minutes: 2,
    explanation: 'Persentase artinya "per seratus". Jadi 15% dari 200 artinya 15/100 × 200. Ada trik cepat: pecah persentase menjadi bagian yang mudah dihitung. Misalnya 15% = 10% + 5%.',
    keyPoints: [
      '10% = bagi dengan 10 (geser koma satu angka ke kiri)',
      '5% = setengah dari 10%',
      '15% = 10% + 5%',
      '25% = bagi 4, 50% = bagi 2, 1% = bagi 100'
    ],
    example: {
      question: 'Berapa 15% dari 200?',
      solution: '10% dari 200 = 20. 5% dari 200 = 10 (setengah dari 10%). 15% = 20 + 10 = 30.'
    },
    tip: 'Pecah persentase rumit menjadi kombinasi 10%, 5%, dan 1%. Contoh: 23% = 20% + 3% = (2×10%) + (3×1%).'
  },
  {
    title: 'Dasar Aritmatika Mental', concept_id: 'num_arithmetic', content_url: '#', level_target: 1, estimated_minutes: 3,
    explanation: 'Aritmatika mental adalah kemampuan menghitung tanpa alat bantu. Untuk soal akar kuadrat, Anda perlu menghafal kuadrat sempurna: 1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144. Ini mempercepat perhitungan secara signifikan.',
    keyPoints: [
      'Kuadrat sempurna wajib hafal: 1²=1, 2²=4, 3²=9, ... 12²=144',
      '√144 = 12 karena 12 × 12 = 144',
      'Untuk perkalian: pecah menjadi langkah-langkah kecil. 12 × 3 = (10×3) + (2×3) = 36',
      'Latihan rutin menghafal tabel perkalian mempercepat semua perhitungan'
    ],
    example: {
      question: 'Akar kuadrat dari 144 dikalikan 3 adalah?',
      solution: '√144 = 12 (karena 12 × 12 = 144). 12 × 3 = 36.'
    },
    tip: 'Hafal kuadrat sempurna dari 1² sampai 15². Ini akan sangat membantu di hampir semua jenis soal numerik.'
  },
  {
    title: 'Konsep Dasar Peluang', concept_id: 'num_probability', content_url: '#', level_target: 4, estimated_minutes: 7,
    explanation: 'Peluang = jumlah kejadian yang diinginkan / total kejadian yang mungkin. Untuk dua dadu, total kemungkinan = 6 × 6 = 36. Untuk mencari peluang jumlah tertentu, hitung berapa pasangan yang menghasilkan jumlah tersebut.',
    keyPoints: [
      'Total kemungkinan 2 dadu = 6 × 6 = 36 kombinasi',
      'Jumlah 7: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) = 6 pasangan',
      'Peluang = 6/36 = 1/6',
      'Jumlah 7 memiliki peluang TERTINGGI dibanding jumlah lainnya'
    ],
    example: {
      question: 'Dua dadu dilempar. Berapa peluang muncul jumlah angka 7?',
      solution: 'Daftar pasangan: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) = 6 kombinasi. Total kombinasi: 36. Peluang = 6/36 = 1/6.'
    },
    tip: 'Untuk soal dadu, buat tabel 6×6 dan tandai semua kombinasi yang memenuhi syarat. Ini metode paling aman dan akurat.'
  },
  {
    title: 'Menyelesaikan Persamaan Linier', concept_id: 'num_equation', content_url: '#', level_target: 3, estimated_minutes: 5,
    explanation: 'Sistem persamaan linear dua variabel dapat diselesaikan dengan metode eliminasi atau substitusi. Eliminasi: jumlahkan/kurangkan dua persamaan untuk menghilangkan salah satu variabel. Substitusi: nyatakan satu variabel dalam variabel lain, lalu substitusikan.',
    keyPoints: [
      'Eliminasi: jumlahkan kedua persamaan untuk menghilangkan Y',
      'X + Y = 10 dan X - Y = 4 → dijumlahkan: 2X = 14 → X = 7',
      'Substitusi kembali: 7 + Y = 10 → Y = 3',
      'Cek: X × Y = 7 × 3 = 21'
    ],
    example: {
      question: 'X + Y = 10 dan X - Y = 4. Nilai X × Y?',
      solution: 'Jumlahkan: (X+Y) + (X-Y) = 10+4 → 2X = 14 → X = 7. Substitusi: 7 + Y = 10 → Y = 3. Maka X × Y = 7 × 3 = 21.'
    },
    tip: 'Metode eliminasi biasanya lebih cepat. Jika koefisien variabel sama/berlawanan, langsung jumlahkan atau kurangkan persamaannya.'
  },
  {
    title: 'Operasi Pecahan Dasar', concept_id: 'num_fraction', content_url: '#', level_target: 2, estimated_minutes: 4,
    explanation: 'Penjumlahan pecahan memerlukan penyebut yang sama (KPK dari semua penyebut). Setelah menyamakan penyebut, jumlahkan pembilangnya. Untuk pecahan ½, ¼, ⅛ — penyebut KPK-nya adalah 8.',
    keyPoints: [
      'Samakan penyebut dengan mencari KPK: KPK(2, 4, 8) = 8',
      '½ = 4/8, ¼ = 2/8, ⅛ = 1/8',
      'Jumlahkan pembilang: 4 + 2 + 1 = 7, penyebut tetap: 8',
      'Hasil: 7/8'
    ],
    example: {
      question: '½ + ¼ + ⅛ = ?',
      solution: 'Samakan penyebut ke 8: ½ = 4/8, ¼ = 2/8, ⅛ = 1/8. Jumlah: (4+2+1)/8 = 7/8.'
    },
    tip: 'Untuk pecahan dengan penyebut 2, 4, 8, 16 — penyebut terbesar selalu bisa jadi KPK. Ini mempercepat perhitungan.'
  }
];

module.exports = numericalResources;
