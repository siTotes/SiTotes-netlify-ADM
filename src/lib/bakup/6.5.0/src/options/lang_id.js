//━━━[ Bahasa sehari hari ]━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\
exports.contoh = (prefix, command, style, style2 = "query") => {
    return `Contoh penggunaan: \n${prefix + command} ${style2}\n\n${prefix + command} ${style}`
}
exports.wait = () => {
    return `⏳ Mohon tunggu sebentar`
}
exports.ok = () => {
    return `✅ Done.`
}
exports.sending = (pe) => {
    if (pe) {
        return 'Sedang Mengirim → ✈️' + `\n${pe}`
    } else {
        return 'Sedang Mengirim → ✈️'
    }
}

exports.doneErr = (pe) => {
    if (pe) {
        return `Convert Berhasil. Tetapi bot Gagal Mengirim ${pe} ke anda. Coba ulang`
    } else {
        return `Convert Berhasil. Tetapi bot Gagal Mengirim File ke anda. Coba ulang`
    }
}

exports.waitt = () => {
    return '⏳'
}
exports.sendingg = () => {
    return '✈️'
}
exports.okk = () => {
    return `✅`
}


//━━━[ Kusus Grub ]━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\
exports.bukanadmin = () => {
    return 'Tolong Jadikan Admin grub untuk menggunakan fitur ini😉'
}

exports.adminOnly = () => {
    return 'Fitur ini khusus admin saja😉'
}

exports.targetkick = () => {
    return `Kirim nomer/tag/reply target yang ingin di kick !`
}

exports.nokickpemilik = () => {
    return `Kamu tidak dapat mengeluarkan SiTotes dan Pembuat grub`
}


exports.useradd = () => {
    return `Kirim nomer yang ingin di tambahkan !`
}


exports.userpromot = () => {
    return `Kirim nomer yang ingin di naikkan jabatannya / di jadikan admin !`
}

exports.userdemot = () => {
    return `Kirim nomer yang ingin di turunkan jabatannya / di jadikan member atau bukan admin !`
}

//━━━[ Game ]━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\
exports.JwbTrue = (soalapa, rpmoney, totalxp, mainlagi) => {
    return `╭─❒ 「 *🎉 SELAMAT 🎉* 」 
├ _🎊Jawaban Anda benar 🎊_ 
│
├→ ╭─( *🎁 Hadiah* )
│     │
│     ├💰 *Rp: ${rpmoney}* 
│     ├ 🧩 + *${totalxp}* _XP_ 
│     ╰→
╰❒ *${soalapa}* 


ketik Perintah:
*#${mainlagi}*

Untuk bermain lagi 👍`
}

exports.JwbHampir = () => {
    return `*🧐 _Ya, dikit lagi Kak_ 😅*`
}
exports.JwbErr = () => {
    return `*😮‍💨 Jawaban Salah 👻*
━━━━━━━━━━━━
 ` + '```Ketik Perintah:``` ' + `
*#bantuan*
untuk meminta bantuan 😌dan

*#nyerah*
untuk menyerah 😵`
}


//━━━[ Sticker ]━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\
exports.SmemeErr = (prefix, command) => {
    return `Kirim/Reply Foto Dengan Caption ${prefix + command} *teks nya*`
}
exports.NoToStik = (prefix, command) => {
    return `Kirim/Reply Gambar/Video Dengan Caption ${prefix + command}\n\nDurasi Sticker Video 1-9 Detik`
}


//━━━[ Menu ]━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\
exports.allmenu = (prefix) => {
    return `*╭─❒ 「 Semua Fitur 」*
│
*├╭─( Media download )────•*
││
*│├╭→ #Tiktok*
│││
││├ ${prefix}tt
││├ ${prefix}downloadtiktok
││├ ${prefix}tiktokunduh
││├ ${prefix}tiktok
││╰×
││
*│├╭→ #Instagram*
│││
││├ ${prefix}ig
││├ ${prefix}igdl
││├ ${prefix}igdownload
││├ ${prefix}igunduh
││├ ${prefix}igsv
││├ ${prefix}instagramdl
││├ ${prefix}instagram
││├ ${prefix}instagrams
││├ ${prefix}instagramsdl
││├ ${prefix}instagramunduh
││├ ${prefix}igreel
││├ ${prefix}igvideo
││├ ${prefix}igimage
││├ ${prefix}igpost
││╰×
││
*│├╭→ #Youtube*
│││
││├ ${prefix}youtube
││├ ${prefix}youtubedownload
││├ ${prefix}youtubedl
││├ ${prefix}ytdl
││├ ${prefix}youtubemp4
││├ ${prefix}youtubemp3
││├ ${prefix}ytmp4
││├ ${prefix}ytmp3
││╰×
││
*│├╭→ #Youtube Music Apis*
│││
││├ ${prefix}mainkan  *judul
││├ ${prefix}music    *judul
││├ ${prefix}play     *judul
││├ ${prefix}lagu     *judul
│││
││╰×
││
*│├╭→ #Pinterest*
│││
││├ ${prefix}pinters  *srch
││├ ${prefix}pintrs    *srch
││├ ${prefix}pint     *srch
││├ ${prefix}pinterest  *srch
│││
││╰×
││
│╰──────────•
│
│
*├╭─( Funn/ Bot AI )────•*
││
*│├╭→ #ChatGpt / Openai*
│││
││├ bot   *pertanyaan
││├ ai   *pertanyaan
││╰×
││
*│├╭→ #Funn / Random Macth*
│││
││├ ${prefix}rate   *contoh seberapa alay gwe
││╰×
││
│╰─────────────•
│
*├╭─( Anime Menu )────•*
││
*│├╭→ #QuotAnime*
│││
││├ ${prefix}katakataanime
││├ ${prefix}quotesanime
││├ ${prefix}quotanim
││├ ${prefix}qanim
││├ ${prefix}quotanim
│││
││╰×
││
│╰─────────────•
│
*├╭─( Google IT )────•*
││
*│├╭→ #Google Pencarian*
│││
││├ ${prefix}google *search
│││
││╰×
││
*│├╭→ #Google Emojimix*
│││
││├ ${prefix}emojimix 😁+🥴
│││
││╰×
││
│╰─────────────•
│
*├╭─( Media Sticker )────•*
││
*│├╭→ #Sticker*
│││
││├ ${prefix}s
││├ ${prefix}sticker
││├ ${prefix}stiker
││╰×
││
*│├╭→ #Memegen Api*
│││
││├ ${prefix}smeme
││├ ${prefix}smemegen
││├ ${prefix}stickermeme
││├ ${prefix}smeme2
││╰×
││
*│├╭→ #Attp/ttp Api*
│││
││├ ${prefix}ttp
││├ ${prefix}attp
││╰×
││
│╰─────────────•
│
│
*├╭─( Admin Grub )────•*
││
*│├╭→ #Kick / Mengeluarkan*
│││
││├ ${prefix}kick
││├ ${prefix}keluarkan
││├ ${prefix}hapus
││├ ${prefix}remove
││╰×
││
*│├╭→ #Add / Menambah*
│││
││├ ${prefix}add
││├ ${prefix}tambah
││├ ${prefix}new
││╰×
││
*│├╭→ #Promote / JadikanAdmin*
│││
││├ ${prefix}promote
││├ ${prefix}naikan
││├ ${prefix}jabatkan
││╰×
││
*│├╭→ #Demote / Jadikan Tidak Admin*
│││
││├ ${prefix}demote
││├ ${prefix}turunkan
││├ ${prefix}kucilkan
││╰×
││
*│├╭→ #ListOnline / Yang on di grub*
│││
││├ ${prefix}liston
││├ ${prefix}listonline
││╰×
││
*│├╭→ #TagAll / Sebut semua orang*
│││
││├ ${prefix}tagall   *teks
││├ ${prefix}infoall   *teks
││├ ${prefix}tagsemua   *teks
││╰×
││
*│├╭→ #HideTag / TagAll tanpa Tag*
│││
││├ ${prefix}h   *teks
││├ ${prefix}hidetag   *teks
││╰×
││
│╰──────────•
│
╰❒`
}
