const home = (path) => __base + path

require('./options/settings')
let ownstatus = true
const {
    BufferJSON,
    WA_DEFAULT_EPHEMERAL,
    generateWAMessageFromContent,
    proto,
    generateWAMessageContent,
    generateWAMessage,
    prepareWAMessageMedia,
    areJidsSameUser,
    getContentType
} = require('@adiwajshing/baileys')

const {smsg} = require(home('./onic'))

const fs = require('fs');
const util = require('util');
const chalk = require('chalk');
const moment = require('moment-timezone');
const {
    getBuffer,
    hitungmundur,
    bytesToSize,
    checkBandwidth,
    runtime,
    fetchJson,
    getGroupAdmins,
    msToDate,
    isUrl,
    tanggal,
    delays
} = require(home('./lib/simple'))
const {
    client
} = require(home('./lib/dbmongosle'))
const {
    TelegraPh
} = require(home('./lib/uploader'))

const lang = require('./options/lang_id')
const svdata = () => fs.writeFileSync(home(`./src/.sitotes/data/database.json`), JSON.stringify(global.db, null, 2))
let disablee = []

module.exports = onic = async (onic, m, chatUpdate, mek, store) => {
    try {
        var body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : '' //omzee
        var budy = (typeof m.text == 'string' ? m.text : '')
        var isCmd = /^[°•π÷×¶∆£¢€¥®™�✓_=|~!?#/$%^&.+-,\\\©^]/.test(body)
        // const isCmd = /≈/.test(body)
        const prefix = isCmd ? budy[0] : ''
        var command = isCmd ? body.slice(1).trim().split(' ').shift().toLowerCase() : ''
        var cimmind = isCmd ? body.slice(1).trim().split(' ').shift().toLowerCase() : body.trim().split(' ').shift().toLowerCase()
        var args = body.trim().split(/ +/).slice(1)
        const pushname = m.pushName || "No Name"
        const botNumber = await onic.decodeJid(onic.user.id)
        const tanggal = moment().tz("Asia/Makassar").format("dddd, ll")
        const jam = moment(Date.now()).tz('Asia/Makassar').locale('id').format('HH:mm:ss z')
        const salam = moment(Date.now()).tz("Asia/Makassar").locale('id').format('a')
        const isCreator = ["62887435047326@s.whatsapp.net", botNumber, ...global.ownno].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
        var text = q = args.join(" ")
        const quoted = m.quoted ? m.quoted : m
        const from = m.chat
        const mime = (quoted.msg || quoted).mimetype || ''
        const isMedia = /image|video|sticker|audio/.test(mime)
        const groupMetadata = m.isGroup ? await onic.groupMetadata(m.chat).catch(e => {}) : ''
        const groupName = m.isGroup ? groupMetadata.subject : ''
        const participants = m.isGroup ? await groupMetadata.participants : ''
        const groupAdmins = m.isGroup ? await getGroupAdmins(participants) : ''
        const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false
        const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
        const time = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('HH:mm:ss z')
        const timestamp = m.messageTimestamp
        
        const currentTime = new Date();
        const currentHour = currentTime.getHours();

        

        const reply = onic.reply
        const replyEmo = onic.replyEmo
        const react = onic.react
        const presence = onic.presence
        
        const casee = (lib) => './commands/' + lib
        const runCase = async (runto, perfic = true) => {
            if (perfic) {
                if (isCmd) require(casee(runto))(onic, m, command, mek)
            } else {
                if (!isCmd) require(casee(runto))(onic, m, cimmind, mek)
            }

        }
        const checkcid = async (dataapa, chatny, jalok, runto) => {
            for (let i = 0; i < chatny.length; i++) {
                var ver = dataapa[chatny[i]] ? dataapa[chatny[i]] : false
                ver = ver[m.chat] ? ver[m.chat] : 'emanf eak'
                if (m.quoted) {
                    if (!isCmd) {
                        if (ver[jalok] == m.quoted.id) {
                            require(casee(runto))(onic, m, command, mek, store)
                        }
                    }
                }
            }
        }

        switch (command) {
            case 'ownon': {
                if (__base.includes('/data/data/com.termux/')) return console.log
                ownstatus = true
                await reply('Owner On')
            }
            break
            case 'ownoff': {
                if (__base.includes('/data/data/com.termux/')) return console.log
                ownstatus = false
                await reply('Owner Off')
            }
            break
            case 'ldis': {
                if (__base.includes('/data/data/com.termux/')) return console.log
                await reply(JSON.stringify(disablee ,null , 2))
            }
            break
            case 'dis': {
                if (__base.includes('/data/data/com.termux/')) return console.log
                if (!disablee.includes(m.chat)) disablee.push(m.chat)
                console.log(JSON.stringify(disablee ,null , 2))
                await reply('Bot status Off')
            }
            break
            case 'pub': {
                if (__base.includes('/data/data/com.termux/')) return console.log
                disablee = disablee.filter(item => item !== m.chat);
                console.log(JSON.stringify(disablee ,null , 2))
                await reply('Bot status on')
            }
            break

        }
        if (disablee.includes(m.chat)) return
        if (!ownstatus && m.sender.includes('6288989781626@s.what')) return

        if (m.sender.includes('6288989781626@s.what') || m.sender.includes('6285176916306@s.whats') || m.sender.includes('6285176919013@s.whats') || m.sender.includes('628819764143@s.whats')) {
            if (__base.includes('/data/data/com.termux/') && m.chat.includes('@g.us')? m.chat!=='120363199931873932@g.us' : false) return console.log
            console.log(
                chalk.black(chalk.bgGray(' \n|=| MSG |-> ')),
                chalk.black(chalk.bgRed(` ${moment(timestamp * 1000).format(`HH:mm: s`) + ' | ' + ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jum\'at', 'Sabtu', 'Minggu'][Number(moment(timestamp * 1000).format(`E`))] + ', ' + moment(timestamp * 1000).format(`DD MMMM y`)} --> fromMe (${m.key.fromMe}) `)),
                chalk.black(chalk.bgGreen(`\n ${budy || m.mtype} `)),
                chalk.black(chalk.bgWhite(`\n |=> ${m.sender} -> ( ${pushname} ) `)),
                chalk.greenBright(chalk.bgMagenta.bold(`\n |=> `, m.isGroup ? groupName : 'Private Chat', m.chat))
            )

        } else {
            console.log(
                chalk.black(chalk.bgWhite(' \n|=| MSG |-> ')),
                chalk.black(chalk.bgYellow(` ${moment(timestamp * 1000).format(`HH:mm: s`) + ' | ' + ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jum\'at', 'Sabtu', 'Minggu'][Number(moment(timestamp * 1000).format(`E`))] + ', ' + moment(timestamp * 1000).format(`DD MMMM y`)} --> fromMe (${m.key.fromMe}) `)),
                chalk.black(chalk.bgBlue(`\n ${budy || m.mtype} `)),
                chalk.black(chalk.bgMagenta(`\n |=> ${m.sender} -> ( ${pushname} ) `)),
                chalk.greenBright(chalk.bgGray.bold(`\n |=> `, m.isGroup ? groupName : 'Private Chat', m.chat))
            )
            if (__base.includes('/data/data/com.termux/')) return console.log
        }
        
        const msgFilter = require(home('./lib/antispam'));
        if (!isCreator && !m.key.fromMe && isCmd && msgFilter.isFiltered(m.sender)) {
            console.log(chalk.black(chalk.bgWhite('[ SPAM ]')), chalk.black(chalk.bgGreen(new Date)), chalk.black(chalk.bgBlue(budy || m.mtype)) + '\n' + chalk.magenta('=> Dari'), chalk.green(pushname), chalk.yellow(m.sender) + '\n' + chalk.blueBright('=> Di'), chalk.green(m.isGroup ? pushname : 'Private Chat', m.chat))
            await reply('Jangan spam, Tunggu 3 detik!!!')
            return
        }
        if (isCmd) msgFilter.addFilter(m.sender)

        if (m.message) {
            await delays(1)
            await onic.readMessages([m.key])
        }
        
        const mdb = await onic.mdbConnectDb('users')
        let users = await mdb.findOne({ nomer: m.sender })
        
        if(!users){
            await mdb.insertOne({
                nomer: m.sender
            })
            users = await mdb.findOne({ nomer: m.sender })
        }
        
        //setelah satu hari berlangsung, maka akan di masukan ke function ini
        if (!m.isGroup && !m.key.fromMe && m.message && !(new Date - users.pc < 86400000)) {
            let greetingsChat = '\nHai 🍩'
            if (currentHour < 4) {
                greetingsChat = '\nMalam 🌃';
            } else if (currentHour < 11) {
                greetingsChat = '\nPagi 🌄';
            } else if (currentHour < 15) {
                greetingsChat = '\nSiang 🏖️';
            } else if (currentHour < 19) {
                greetingsChat = '\nSore 🌅';
            } else {
                greetingsChat = '\nMalam 🌌';
            }
            await onic.sendPesan(m.chat, {
                text: `${greetingsChat}, *${pushname}*!\nSelamat datang di Bot Asisten!\n\nSaya, SiTotes Bot, Diciptakan Oleh     ${"```m.saiful.anam.r.```"}\n\nAyo mulai petualanganmu dengan mengetik *#menu*. Stay awesome! 🚀`,
                contextInfo: {
                    externalAdReply: {
                        title: 'Selamat ' + salam + ' ' + pushname,
                        body: '© ' + ownername,
                        thumbnail: logo,
                        sourceUrl: myweb,
                        mediaUrl: '',
                        renderLargerThumbnail: true,
                        showAdAttribution: true,
                        mediaType: 1
                    }
                }
            })
            await onic.sendPoll(m.chat, 'Pilih menu untuk menulai, atau Pilih Owner untuk menghubungi pemilik / pembuat bot', ['Menu / Feature','Owner / Pembuat', 'Status Bot?'] )
            await mdb.updateOne({ nomer: m.sender }, { $set: { pc: new Date * 1, name: pushname } })
        }
        
        
        
        
        

        if (ky_ttt.filter(ghg => ghg.id.includes(m.chat))[0]?.id == m.chat) {
            require(casee('game-rpg'))(onic, m, command, mek)
        }
        if (m.quoted && m.quoted.text.includes('(#)')) {
            const sfg = m.quoted.text
            const uus = parseInt(budy)

            //(#€) tambahkan ini jika ingin reques nomer
            if (sfg.includes('(#€)'))
                if (uus == 0) {
                    return await reply('List dimulai dari angka 1')
                } else if (!uus) return await reply('Hanya angka kak, contoh reply list lalu ketik 1')

            const regex = /🍂:\s(.*?)\*\n/g;
            const regexx = /🍂:\s(.*?)\*\n📎:\s(.*?)\n/g;
            const regexxx = /🍂:\s(.*?)\*\n\*🍀:\s(.*?)\*\n📎:\s(.*?)\n/g;
            const cmdss = m.quoted.text.match(/\(#\)(\w+)/)[1]
            let i = 1;
            let matchh;

            while ((matchh = regexxx.exec(sfg) || regexx.exec(sfg) || regex.exec(sfg)) !== null) {
                const judul = matchh[1] || matchh[2] || matchh[3];
                const textr = matchh[3] || matchh[2] || matchh[1];

                if (i === uus) {
                    command = cmdss;
                    cimmind = cmdss;
                    m.text = `#${cmdss} ${textr}|•||•|${judul}`;
                    m.body = `#${cmdss} ${textr}|•||•|${judul}`;
                    m.msg.text = `#${cmdss} ${textr}|•||•|${judul}`;
                    body = `#${cmdss} ${textr}|•||•|${judul}`;
                    isCmd = /^[°•π÷×¶∆£¢€¥®™�✓_=|~!?#/$%^&.+-,\\\©^]/.test(body);
                    args = body.trim().split(/ +/).slice(1);
                    text = q = args.join(" ");
                    console.log(body)

                    break;
                }

                i++;
            }

            if (i < uus) {
                await reply("Nomor video tidak valid.");
            }
        }

        /*
        if(!m.isGroup && !isCmd) {
            await onic.sendPresenceUpdate('composing', m.chat)
            const jawbn = await onic.axiosUrlToJson(`https://tiktod.eu.org/ai?system=Your+Name+is+Nakano&question=${m.text}`)
            await react('🐣')
            if(!jawbn.result){
                await react('🤯')
                await reply('SiTotes Error nihh, Tanya Owner Yu\n\n'+JSON.stringify(jawbn ,null , 2))
                return await onic.sendPresenceUpdate('available', m.chat)
            }
            // await react('✈️')
            await reply(jawbn.result+'\n\n©m.saiful.anam.r → AI')
            await react('')
            await onic.sendPresenceUpdate('available', m.chat)
        }
        */
        
        
        
        
        

        switch (m.isGroup?command:cimmind) {
            case 'info':
            case 'menu':
            case 'fitur': {
                let fakedoc = ['application/vnd.openxmlformats-officedocument.presentationml.presentation', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/pdf']
                fakedoc = fakedoc[Math.floor(fakedoc.length * Math.random())]

                onic.sendPesan(m.chat, {
                    document: logo,
                    mimetype: fakedoc,
                    fileName: 'Author : @m.saiful.anam.r',
                    fileLength: '999999999999',
                    pageCount: '999',
                    caption: lang.allmenu(prefix),
                    contextInfo: {
                        externalAdReply: {
                            title: 'Selamat ' + salam + ' ' + pushname,
                            body: '© ' + ownername,
                            thumbnail: logo,
                            sourceUrl: myweb,
                            mediaUrl: '',
                            renderLargerThumbnail: true,
                            showAdAttribution: true,
                            mediaType: 1
                        }
                    }
                }, {
                    m
                })
            }
            break
            case 'u':
            case 'test':
            case 'status':
            case 'p':
            case 'Runtime':
            case 'Uptime': {
                await reply(`Runtime : ${runtime(process.uptime())}`)
            }
            break
            case 'owner':
            case 'pembuat':
            case 'creator': {
                await onic.sendContact(m.chat, ['6288989781626', '6285176916306'], ['ꈍ Owner Bot', 'ꈍ Bot'], [`item1.EMAIL;type=INTERNET: si.totes.ofc@gmail.com\nitem1.X-ABLabel:Gmail\n\nitem2.ADR:;;@m.saiful.anam.r;@si.totes;\nitem2.X-ABLabel:instagrams`, ''], m)
            }
            break
            case 'antidelete':
            case 'antihapus': {
                const alur = 'Anti Hapus pesan ';
                const db = client.db(botdata);
                const dbgrub = db.collection('grub-db');
                const sitotesv = await dbgrub.findOne({
                    _id: m.chat
                });

                if (sitotesv) {
                    const updateValue = !sitotesv.antidelete;

                    await dbgrub.updateOne({
                        _id: m.chat
                    }, {
                        $set: {
                            antidelete: updateValue
                        }
                    });

                    await reply(alur + (updateValue ? '*Aktif*' : '*Mati*'));
                } else {
                    const dataToInsert = {
                        antidelete: true
                    };

                    try {
                        await dbgrub.insertOne({
                            _id: m.chat,
                            ...dataToInsert
                        });

                        await reply(alur + '*Aktif*');
                    } catch (error) {
                        await reply('*Terjadi kesalahan, tolong bagikan ke owner:*\n\n```' + error + '```');
                    }
                }

            }
            break
        }

        async function swicherCommand(alokk) {
            // switch (false){
            switch (alokk) {
                case 'tt':
                case 'downloadtiktok':
                case 'tiktokunduh':
                case 'tiktok':
                case '---------------':
                case 'ig':
                case 'igdl':
                case 'igdownload':
                case 'igunduh':
                case 'igsv':
                case 'instagramdl':
                case 'instagram':
                case 'instagrams':
                case 'instagramsdl':
                case 'instagramunduh':
                case 'igreel':
                case 'igvideo':
                case 'igimage':
                case 'igpost':
                case '---------------':
                case 'youtube':
                case 'youtubedownload':
                case 'youtubedl':
                case 'ytdl':
                case 'youtubemp4':
                case 'youtubemp3':
                case 'ytmp4':
                case 'ytmp3':
                case 'ꈍ':
                case '---------------':
                case 'play':
                case 'mainkan':
                case 'music':
                case 'lagu':
                case '---------------':
                case 'play>':
                case 'mainkan>':
                case 'music>':
                case 'lagu>':
                case 'playx':
                case '⊡':
                case '---------------':
                case 'pinters':
                case 'pintrs':
                case 'pint':
                case 'pinimg':
                case 'pinterest': {
                    await runCase('download-media', true)
                }
                break
                case 'bantuan':
                case 'hint':
                case '---------------':
                case 'nyerah':
                case 'menyerah':
                case 'quit':
                case 'metu':
                case 'kalah':
                case 'out':
                case '---------------':
                case 'tg':
                case 'tega':
                case 'tbkg':
                case 'tbkgam':
                case 'tebakgam':
                case 'tebakgambar':
                case '---------------':
                case 'cl':
                case 'ckl':
                case 'cakl':
                case 'caklon':
                case 'caklontong':
                case '---------------':
                case 'f100':
                case 'familyseratus':
                case 'family100':
                case '---------------':
                case 'ttt':
                case 'tictactoe': {
                    await runCase('game-rpg', true)
                }
                break
                case 's':
                case 'sticker':
                case 'stiker':
                case '---------------':
                case 'smeme':
                case 'smemegen':
                case 'stickermeme':
                case 'smeme2':
                case '---------------':
                case 'ttp':
                case 'attp':
                case '---------------':
                case 'emojimix':
                case '---------------':
                case 'tomp3': {
                    await runCase('convert-menu', true)
                }
                break
                case 'kick':
                case 'keluarkan':
                case 'hapus':
                case 'remove':
                case '---------------':
                case 'add':
                case 'tambah':
                case 'new':
                case '---------------':
                case 'promote':
                case 'naikan':
                case 'jabatkan':
                case '---------------':
                case 'demote':
                case 'turunkan':
                case 'kucilkan':
                case '---------------':
                case 'liston':
                case 'listonline':
                case '---------------':
                case 'tagall':
                case 'infoall':
                case 'tagsemua':
                case '---------------':
                case 'h':
                case 'hidetag': {
                    await runCase('group-only', true)
                }
                break
                case 'gambarkan':
                case 'bot':
                case 'ai': {
                    await runCase('openai-gpt', false)
                }
                break
                case 'rate': {
                    await runCase('openai-gpt', true)
                }
                break
                case 'katakataanime':
                case 'quotesanime':
                case 'quotanim':
                case 'qanim':
                case 'quotanim': {
                    await runCase('wibu-docpusat', true)
                }
                break
                case 'gsearch':
                case 'googlesearch':
                case 'google': {
                    await runCase('google-it', true)
                }
                break
                case 'xnxxdl':
                case 'xdl':
                case 'xnxxdownload':
                case 'xnxxs':
                case 'xs':
                case 'xnxxsearch': {
                    await runCase('nsfw-porn', true)
                }
                break

                case 'setrr':
                case 'setrmdr':
                case 'setreminder':{
                    if(!m.quoted) return await reply('Balas/reply pesan yang mau di ingatkan 😄')
                    const objquoted = JSON.stringify(__nbl.infoMSG.find(item => item.key.id === m.quoted.id))
                    let [jam, menit, hari] = text.split(/:|\//);
                    console.log(body.split(/:|\//))

                    if (jam && menit && hari && (/^[0-9]{1,2}$/.test(jam) && /^[0-9]{1,2}$/.test(menit) && jam >= 0 && jam <= 23 && menit >= 0 && menit <= 59) && ['sen', 'sel', 'rab', 'kam', 'jum', 'sab', 'min', 'all'].includes(hari)) {
                        if(hari.includes('all')) hari = ''
                        
                        const rmdb = await onic.mdbConnectDb('reminder');
                        let remm = await rmdb.findOne({ jid: m.chat });
                
                        if (!remm) {
                            await rmdb.insertOne({
                                jid: m.chat,
                                listreminder: [
                                    {
                                        jam: text,
                                        send: [
                                            objquoted // objquoted disini adalah bentuk value yang ingin Anda tambahkan ke dalam array
                                        ]
                                    }
                                ]
                            });
                        } else {
                            let existingReminder = await remm.listreminder.find(reminder => reminder.jam === text)
                            if (existingReminder) {
                                existingReminder.send.push(objquoted); // Menambahkan data ke dalam array send yang sesuai dengan jam
                            } else {
                                remm.listreminder.push({ jam: text, send: [objquoted] }); // Menambahkan objek baru ke dalam listreminder
                            }
                            await rmdb.updateOne({ jid: m.chat }, { $set: { listreminder: remm.listreminder } })
                        }
                        await reply(`Baik saya akan mengingatkan anda ketika jam ${jam}:${menit} setiap hari ${hari}`)
                    }else{
                        await reply(`format salah berikut contoh yang benar:\nReply/balas pesan setelah itu kasih balasan\n\n*${prefix}${command} jam:menit/hari*\n\ncontoh:\n*${prefix}${command} 11:30/sen*\n\nhari list: sen, sel, rab, kam, jum, sab, min, all`)
                    }
                }
                break
                case 'todat':{
                    if(!m.quoted) return await reply('Balas/reply pesan yang mau dijadikan data 😄')
                    await console.log(await store.loadMessage(m.chat, m.quoted.id, onic))
                }
                break
                case 'dat':{
                    if(!text) return await reply('Data tidak benar, data harus berupa json')
                    console.log(text)
                    await onic.sendMessageJson(m.chat, JSON.parse(text))
                }
                break
                default:{
                    
                    
                }
            }
        }
        // console.log(rmdrdata)

        await swicherCommand(cimmind)
        await checkcid(
            db.data.game,
            [
                'tebakgambar',
                'caklontong',
                'family100',
                'asahotak',
                'tebakkata',
                'tekateki',
                'tebakkimia',
                'tebakkabupaten',
                'siapakahaku',
                'susunkata',
                'tebakbendera',
                'tebaklirik',
                'tebaktebakan',

                'm.saiful.anam.r.creator'
            ],
            'gameid',
            'game-rpg'
        )

    } catch (err) {
        m.reply(util.format(err))
        console.log(util.format(err))
    } finally {
        /**/
        console.log(__filename.replace('/data/data/com.termux/files/home', '.'), '→ Save');
        svdata()
    }
}