const cron = require('node-cron');

/*/ Definisikan fungsi untuk mengirim pesan pada pukul 18.31 setiap hari Senin
function sendScheduledMessage() {
    const date = new Date();
    const dayOfWeek = date.getDay(); // Mendapatkan hari dalam seminggu (0 untuk Minggu, 1 untuk Senin, dst.)

    // Periksa apakah hari ini adalah hari Senin dan waktu saat ini adalah 18.31
    if (dayOfWeek === 4 && date.getHours() === 18 && date.getMinutes() === 53) {
        // Panggil fungsi untuk mengirim pesan
        console.log('alok')
    }
}

// Jadwalkan cron job untuk dijalankan setiap menit
cron.schedule('* * * * *', () => {
    // Panggil fungsi untuk memeriksa dan mengirim pesan
    sendScheduledMessage();
});*/



function getGreetingTime() {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();

  if (currentHour < 4) {
    return 'Selamat Malam';
  } else if (currentHour < 11) {
    return 'Halo Pagi-pagi';
  } else if (currentHour < 15) {
    return 'Hai Siang';
  } else if (currentHour < 19) {
    return 'Yo Sore-sore';
  } else {
    return 'Selamat Malam';
  }
}

const waktuSekarang = getGreetingTime();
const pushname = "Zaki"; // Ganti dengan nama pengguna yang sesuai
const sambutan = `${waktuSekarang}, *${pushname}*!   Selamat datang di bot asisten!\nsaya, SiTotes Bot, diciptakan oleh     ${"```m.saiful.anam.r.```"}\n\nAyo mulai petualanganmu dengan mengetik *#menu*. Stay awesome! 🚀`;
console.log(sambutan);