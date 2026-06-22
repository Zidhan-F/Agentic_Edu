const patternResources = [
  {
    title: 'Deret Fibonacci', concept_id: 'pattern_fibonacci', content_url: '#', level_target: 2, estimated_minutes: 3,
    explanation: 'Deret Fibonacci adalah deret dimana setiap angka merupakan penjumlahan dua angka sebelumnya. Deret ini dimulai dari 1, 1 dan berkembang: 1, 1, 2, 3, 5, 8, 13, 21, 34, ... Pola ini banyak ditemukan di alam seperti pada spiral kerang dan susunan biji bunga matahari.',
    keyPoints: [
      'Rumus: F(n) = F(n-1) + F(n-2)',
      'Dimulai dari: 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, ...',
      'Setiap angka = jumlah dua angka sebelumnya',
      'Contoh: 8+13=21, 13+21=34'
    ],
    example: {
      question: 'Angka selanjutnya: 1, 1, 2, 3, 5, 8, 13, ...?',
      solution: 'Pola Fibonacci: setiap angka = jumlah 2 sebelumnya. 5+8=13 (benar). 8+13=21. Jawaban: 21.'
    },
    tip: 'Jika deret dimulai dengan dua angka yang sama atau angka kecil, coba jumlahkan dua angka berurutan. Jika hasilnya = angka berikutnya, itu Fibonacci!'
  },
  {
    title: 'Pola Enkripsi Sederhana', concept_id: 'pattern_code', content_url: '#', level_target: 1, estimated_minutes: 2,
    explanation: 'Enkripsi pola dasar menggunakan substitusi angka-huruf: A=1, B=2, C=3, ..., Z=26. Untuk menghitung nilai sebuah kata, jumlahkan nilai setiap hurufnya.',
    keyPoints: [
      'A=1, B=2, C=3, ..., Z=26',
      'Nilai kata = jumlah nilai setiap huruf',
      'CAB: C=3, A=1, B=2 → 3+1+2=6',
      'Teknik cepat: hafal huruf-huruf kunci (A=1, E=5, J=10, O=15, T=20, Z=26)'
    ],
    example: {
      question: 'Jika A=1, B=2, C=3. Berapa nilai dari kata "CAB"?',
      solution: 'C=3, A=1, B=2. Jumlah = 3 + 1 + 2 = 6.'
    },
    tip: 'Hafal beberapa huruf patokan: A=1, F=6, K=11, P=16, U=21. Dari situ, hitung huruf lain dengan menambah/mengurang.'
  },
  {
    title: 'Deret Geometri', concept_id: 'pattern_geometric', content_url: '#', level_target: 2, estimated_minutes: 4,
    explanation: 'Deret geometri adalah deret dimana setiap angka diperoleh dengan MENGALIKAN angka sebelumnya dengan rasio tetap. Berbeda dari deret aritmatika yang menggunakan penambahan tetap. Untuk menemukan rasio: bagi angka dengan angka sebelumnya.',
    keyPoints: [
      'Rumus: a(n) = a(n-1) × r, di mana r = rasio',
      'Cari rasio: 9/3=3, 27/9=3, 81/27=3 → rasio = 3',
      'Angka berikutnya = angka terakhir × rasio = 81 × 3 = 243',
      'Deret geometri tumbuh sangat cepat (eksponensial)'
    ],
    example: {
      question: 'Deret: 3, 9, 27, 81, ...? Angka selanjutnya?',
      solution: 'Rasio = 9/3 = 3 (setiap angka dikali 3). 81 × 3 = 243.'
    },
    tip: 'Jika selisih antar angka semakin besar, coba bagi (bukan kurangi) antar angka berurutan. Jika hasilnya konstan, itu deret geometri.'
  },
  {
    title: 'Sandi Caesar Dasar', concept_id: 'pattern_cipher', content_url: '#', level_target: 3, estimated_minutes: 6,
    explanation: 'Sandi Caesar menggeser setiap huruf dengan jumlah langkah yang tetap dalam alfabet. Jika geser -1: setiap huruf diganti dengan huruf sebelumnya (B→A, C→B, dst). Untuk memecahkan kode, tentukan arah dan besar pergeseran.',
    keyPoints: [
      'Geser -1 berarti setiap huruf mundur 1 langkah: F→E, I→H, S→R, H→G',
      '"FISH" → "EHRG" (setiap huruf mundur 1)',
      'Terapkan pola yang sama: B→A, I→H, R→Q, D→C → "AHQC"',
      'Selalu cek konsistensi: pastikan SEMUA huruf bergeser dengan jumlah yang sama'
    ],
    example: {
      question: 'Jika "FISH" dikodekan sebagai "EHRG", maka "BIRD" dikodekan sebagai?',
      solution: 'Analisis: F→E (-1), I→H (-1), S→R (-1), H→G (-1). Pola: geser -1. Terapkan ke "BIRD": B→A, I→H, R→Q, D→C = "AHQC".'
    },
    tip: 'Bandingkan huruf pertama kata asli dan kode untuk menemukan besar pergeseran. Lalu verifikasi dengan huruf lainnya.'
  },
  {
    title: 'Deret Alfabet Berpola', concept_id: 'pattern_alphabet', content_url: '#', level_target: 3, estimated_minutes: 4,
    explanation: 'Deret alfabet berpola menggunakan posisi huruf dalam alfabet (A=1, B=2, ...) dan menerapkan pola numerik padanya. Konversikan huruf ke angka, temukan pola selisihnya, lalu konversikan kembali ke huruf.',
    keyPoints: [
      'A=1, C=3, F=6, J=10, O=15 → selisih: 2, 3, 4, 5 (naik 1)',
      'Pola selisih: +2, +3, +4, +5, maka selisih berikutnya = +6',
      'O=15, selanjutnya: 15+6=21 → huruf ke-21 = U',
      'Selalu konversi huruf → angka terlebih dahulu'
    ],
    example: {
      question: 'A, C, F, J, O, ... Huruf selanjutnya?',
      solution: 'Posisi: A=1, C=3, F=6, J=10, O=15. Selisih: 2, 3, 4, 5 (bertambah 1). Selisih berikutnya = 6. 15+6=21 = U.'
    },
    tip: 'Untuk soal deret huruf, SELALU konversikan ke angka dulu. Pola angka jauh lebih mudah dilihat daripada pola huruf.'
  },
  {
    title: 'Deret Kuadrat Dasar', concept_id: 'pattern_square', content_url: '#', level_target: 1, estimated_minutes: 2,
    explanation: 'Deret kuadrat (perfect squares) adalah deret bilangan yang merupakan hasil perkalian suatu angka dengan dirinya sendiri: 1²=1, 2²=4, 3²=9, 4²=16, 5²=25, 6²=36. Polanya mudah dikenali karena selisih antar angka berurutan selalu ganjil dan meningkat.',
    keyPoints: [
      'Deret: 1, 4, 9, 16, 25, 36 = 1², 2², 3², 4², 5², 6²',
      'Selisih: 3, 5, 7, 9, 11 (selalu bilangan ganjil berurutan)',
      'Rumus umum: angka ke-n = n²',
      'Cara cepat mengenali: selisih antar angka = bilangan ganjil berturut-turut'
    ],
    example: {
      question: '1, 4, 9, 16, 25, ... Angka berikutnya?',
      solution: 'Ini adalah deret kuadrat sempurna: 1², 2², 3², 4², 5² = 1, 4, 9, 16, 25. Angka berikutnya = 6² = 36.'
    },
    tip: 'Hafal kuadrat sempurna 1-15: 1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225.'
  },
  {
    title: 'Pola Teka-teki Teks', concept_id: 'pattern_riddle', content_url: '#', level_target: 4, estimated_minutes: 5,
    explanation: 'Pola ini menyembunyikan angka dalam huruf. Deret O, T, T, F, F, S, S, E, N sebenarnya adalah huruf pertama dari nama bilangan dalam bahasa Inggris: One, Two, Three, Four, Five, Six, Seven, Eight, Nine. Selanjutnya: Ten → T.',
    keyPoints: [
      'O=One(1), T=Two(2), T=Three(3), F=Four(4), F=Five(5)',
      'S=Six(6), S=Seven(7), E=Eight(8), N=Nine(9)',
      'Selanjutnya: T=Ten(10)',
      'Ini adalah pola linguistik, bukan pola matematis murni'
    ],
    example: {
      question: 'O, T, T, F, F, S, S, E, N, ... Huruf berikutnya?',
      solution: 'Huruf pertama dari bilangan Inggris: One, Two, Three, Four, Five, Six, Seven, Eight, Nine. Selanjutnya: Ten → T.'
    },
    tip: 'Jika pola huruf tidak masuk akal secara alfabet, coba pikirkan: apakah huruf-huruf ini mewakili sesuatu? Nama hari, bulan, atau angka?'
  },
  {
    title: 'Deret Kuadrat Lanjutan', concept_id: 'pattern_square_2', content_url: '#', level_target: 2, estimated_minutes: 3,
    explanation: 'Deret kuadrat lanjutan dimulai dari angka yang lebih besar. 121=11², 144=12², 169=13², 196=14². Untuk mengenali deret ini, cek apakah setiap angka memiliki akar kuadrat bulat.',
    keyPoints: [
      '121=11², 144=12², 169=13², 196=14²',
      'Selisih: 23, 25, 27 (bilangan ganjil berurutan)',
      'Angka berikutnya: 15² = 225 (atau 196+29=225)',
      'Trik cepat: angka berakhiran 1, 4, 9, 6, 5 bisa jadi kuadrat sempurna'
    ],
    example: {
      question: '121, 144, 169, 196, ... Angka berikutnya?',
      solution: '121=11², 144=12², 169=13², 196=14². Pola: n² dengan n=11,12,13,14. Berikutnya: 15² = 225.'
    },
    tip: 'Jika angka-angka dalam deret terlihat "tidak beraturan", coba cari akar kuadratnya. √121=11, √144=12 — pola langsung terlihat!'
  },
  {
    title: 'Pola Numerik dalam Teks', concept_id: 'pattern_count', content_url: '#', level_target: 1, estimated_minutes: 2,
    explanation: 'Pada soal ini, pola tersembunyi dalam jumlah HURUF dalam kata. APPLE=5 huruf, BANANA=6 huruf, STRAWBERRY=10 huruf. Jadi nilainya = jumlah huruf. MANGO = 5 huruf.',
    keyPoints: [
      'APPLE: A-P-P-L-E = 5 huruf → nilai 5',
      'BANANA: B-A-N-A-N-A = 6 huruf → nilai 6',
      'STRAWBERRY: S-T-R-A-W-B-E-R-R-Y = 10 huruf → nilai 10',
      'MANGO: M-A-N-G-O = 5 huruf → nilai 5'
    ],
    example: {
      question: 'APPLE=5, BANANA=6, STRAWBERRY=10, maka MANGO=?',
      solution: 'Polanya adalah jumlah huruf dalam kata tersebut. MANGO memiliki 5 huruf: M-A-N-G-O. Jawaban: 5.'
    },
    tip: 'Jika angka-angka terlihat tidak memiliki hubungan matematis dengan katanya, hitung jumlah hurufnya! Ini pola paling umum dalam soal "kata = angka".'
  },
  {
    title: 'Bilangan Prima dalam Pola', concept_id: 'pattern_prime', content_url: '#', level_target: 2, estimated_minutes: 3,
    explanation: 'Bilangan prima adalah bilangan yang hanya bisa dibagi oleh 1 dan dirinya sendiri. Deret bilangan prima: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31... Untuk menguji apakah suatu angka prima, coba bagi dengan semua bilangan prima yang lebih kecil dari akar kuadratnya.',
    keyPoints: [
      'Bilangan prima: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37',
      '2 adalah satu-satunya bilangan prima genap',
      'Angka yang habis dibagi 2, 3, 5, atau 7 (selain dirinya) bukan prima',
      'Selisih antar prima tidak konstan — ini yang membuatnya unik'
    ],
    example: {
      question: '2, 3, 5, 7, 11, 13, ... Angka berikutnya?',
      solution: 'Ini deret bilangan prima. Setelah 13, cek: 14(÷2), 15(÷3), 16(÷2) → bukan prima. 17: tidak habis dibagi 2, 3, atau 4 → PRIMA. Jawaban: 17.'
    },
    tip: 'Hafal bilangan prima di bawah 50: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47. Ini sangat membantu untuk tes IQ.'
  }
];

module.exports = patternResources;
