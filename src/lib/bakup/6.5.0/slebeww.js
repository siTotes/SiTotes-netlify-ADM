require('./src/options/settings')
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
} = require('./lib/simple')
const {
    client
} = require('./lib/dbmongosle')
const {
    TelegraPh
} = require('./lib/uploader')
const {
    xnxxdl,
    xnxxsearch
} = require('./lib/scraper')

const lang = require('./src/options/lang_id')
const svdata = () => fs.writeFileSync(`./src/.sitotes/data/database.json`, JSON.stringify(global.db, null, 2))


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

        const reply = onic.reply
        const replyEmo = onic.replyEmo
        const react = onic.react

        const msgFilter = require('./lib/antispam');
        if (!isCreator && !m.key.fromMe && isCmd && msgFilter.isFiltered(m.sender)) {
            console.log(chalk.black(chalk.bgWhite('[ SPAM ]')), chalk.black(chalk.bgGreen(new Date)), chalk.black(chalk.bgBlue(budy || m.mtype)) + '\n' + chalk.magenta('=> Dari'), chalk.green(pushname), chalk.yellow(m.sender) + '\n' + chalk.blueBright('=> Di'), chalk.green(m.isGroup ? pushname : 'Private Chat', m.chat))
            await reply('Jangan spam, Antri 3 detik!!!')
            return
        }
        if (isCmd) {
            msgFilter.addFilter(m.sender)
        }

        const casee = (lib) => './src/commands/' + lib
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

        }
        if (!ownstatus && m.sender.includes('6288989781626@s.what')) return

        if (m.sender.includes('6288989781626@s.what') || m.sender.includes('6285176916306@s.whats') || m.sender.includes('6285176919013@s.whats')) {
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

        if (m.message) {
            await delays(1)
            await onic.readMessages([m.key])
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
        }*/

        switch (command) {
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
            case 'u': {
                await reply(`Runtime : ${runtime(process.uptime())}`)
            }
            break
            case 'antidelete':
            case 'antihapus': {
                const alur = 'Anti Hapus pesan ';
                await client.connect();
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

                await client.close();

            }
            break
            case 'ggpp': {
                await client.connect();
                const dbb = client.db('BD_BotOl');
                const collection = dbb.collection('hitung-chat');

                const nomor = m.sender
                const axios = require('axios')
                const Jimp = require('jimp')
                const topUsers = await collection.aggregate([{
                        $sort: {
                            value: -1
                        }
                    }, // Urutkan secara descending berdasarkan nilai
                    {
                        $limit: 3
                    }, // Ambil tiga data pertama
                    {
                        $project: {
                            _id: 0,
                            nomor: 1,
                            value: 1
                        }
                    } // Hanya tampilkan nomor dan nilai
                ]).toArray();

                for (let i = 0; i < topUsers.length; i++) {
                    let ppnu = ''
                    try {
                        ppnu = await onic.profilePictureUrl(topUsers[i].nomor, 'image')
                    } catch {
                        ppnu = 'https://telegra.ph/file/6880771a42bad09dd6087.jpg'
                    }
                    axios({
                            method: 'get',
                            url: ppnu,
                            responseType: 'stream',
                        })
                        .then(function(response) {
                            response.data.pipe(fs.createWriteStream('./pp' + (i + 1) + '.png'));
                        })
                        .catch(function(error) {
                            console.log(error);
                        });
                }
                await client.close();

                const date = new Date();
                date.setHours(date.getHours() + 7);
                const desiredHour = date.getHours();
                const desiredMinute = date.getMinutes();

                const background = await Jimp.read('./burk.png');
                const cilik = await Jimp.read('./cilik.png');
                const gede = await Jimp.read('./gede.png');

                const pp1 = await Jimp.read('./pp1.png');
                const pp2 = await Jimp.read('./pp2.png');
                const pp3 = await Jimp.read('./pp3.png');


                background.composite(gede.clone().rotate(-(desiredMinute * 6), false), 0, 0);
                background.composite(cilik.clone().rotate(-(desiredHour * 30), false), 0, 0);

                background.composite(pp1.clone().resize(50, 50).circle(), 99, 402);
                background.composite(pp2.clone().resize(50, 50).circle(), 349, 402);
                background.composite(pp3.clone().resize(50, 50).circle(), 225, 443);


                await background.writeAsync('./output.png');

                await onic.updateProfilePicture(onic.user.id, {
                    url: './output.png'
                })

                await onic.setStatus(`Onlen tok wis : ${runtime(process.uptime())}`)

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
                case 'emojimix': {
                    await runCase('convert-sticker', true)
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

                case 'asu': {
                    await onic.sendPoll(m.chat, 'alok', ['1 polls', '2 polls'])
                }
                break
                case 'cok': {
                    // await reply(`*•━━━━[ 😴  🤤 ]━━━━•*\nFitur By: SiTotes 2022\nSaran Feature by: M. Fajar\n\n\n•━━( 1 )━━━━━━━━━━━━━━━━━━•\n*🍂: Subil Arch & his Russian friend*\n📎: https://www.xnxx.com/video-6kc7q11/subil_arch_and_his_russian_friend\n\n•━━( 2 )━━━━━━━━━━━━━━━━━━•\n*🍂: Candid Photography - by Sapphic Ero...*\n📎: https://www.xnxx.com/video-ct4pxf2/candid_photography_-_by_sapphic_erotica_lesbian_sex_with_nikitta_sascha\n\n•━━( 3 )━━━━━━━━━━━━━━━━━━•\n*🍂: Vintage Transgender*\n📎: https://www.xnxx.com/video-18ui51ee/vintage_transgender\n\n•━━( 4 )━━━━━━━━━━━━━━━━━━•\n*🍂: Amazing Girl with Natural Hairy Pus...*\n📎: https://www.xnxx.com/video-hyo4982/amazing_girl_with_natural_hairy_pussy_21\n\n•━━( 5 )━━━━━━━━━━━━━━━━━━•\n*🍂: SLUT TRAINING girl dick sucking and...*\n📎: https://www.xnxx.com/video-19v0nn56/slut_training_girl_dick_sucking_and_ass_shaking\n\n•━━( 6 )━━━━━━━━━━━━━━━━━━•\n*🍂: Hot pussy fisted creamy*\n📎: https://www.xnxx.com/video-l2zud29/hot_pussy_fisted_creamy\n\n•━━( 7 )━━━━━━━━━━━━━━━━━━•\n*🍂: Wife rubs clit while fucked with Cu...*\n📎: https://www.xnxx.com/video-kxdzn21/wife_rubs_clit_while_fucked_with_cucumber\n\n•━━( 8 )━━━━━━━━━━━━━━━━━━•\n*🍂: StrapOn Amazing blonde babe fucks h...*\n📎: https://www.xnxx.com/video-3z1xi09/strapon_amazing_blonde_babe_fucks_her_gf_with_vibrating_strapon\n\n•━━( 9 )━━━━━━━━━━━━━━━━━━•\n*🍂: Surgiram com vendas de produtos per...*\n📎: https://www.xnxx.com/video-1as3g17e/surgiram_com_vendas_de_produtos_personalizados_tem_ate_dados_lgbt_e_o_objetivo_e_apimentar_relacoes_e_fazer_jogos_-_rai_dobler_diversao_ao_cubo_sheer_red_\n\n•━━( 10 )━━━━━━━━━━━━━━━━━━•\n*🍂: COROA TESUDO METENDO GOSTOSO (DELIC...*\n📎: https://www.xnxx.com/video-c1l8z55/coroa_tesudo_metendo_gostoso_delicia_........_\n\n•━━( 11 )━━━━━━━━━━━━━━━━━━•\n*🍂: CARLOS SIMOES*\n📎: https://www.xnxx.com/video-ljljt77/carlos_simoes\n\n•━━( 12 )━━━━━━━━━━━━━━━━━━•\n*🍂: i myself am not into other males, o...*\n📎: https://www.xnxx.com/video-vcg3t51/i_myself_am_not_into_other_males_or_men_i_would_much_rather_instead_prefer_born_and_raised_female_person_women_representing_the_opposite_sex_being_of_whatsoever_races_and_or_being_of_whatever_walks_of_life_factions_of_society_or_lifestyle_prefer\n\n•━━( 13 )━━━━━━━━━━━━━━━━━━•\n*🍂: Stepsister pussy is always so sweet...*\n📎: https://www.xnxx.com/video-1402jr31/stepsister_pussy_is_always_so_sweet_licked_and_fingered_until_loud_moaning_orgasm\n\n•━━( 14 )━━━━━━━━━━━━━━━━━━•\n*🍂: FFFM 3 french sluts give their ass ...*\n📎: https://www.xnxx.com/video-7mco381/fffm_3_french_sluts_give_their_ass_to_one_lucky_cock_outdoor\n\n•━━( 15 )━━━━━━━━━━━━━━━━━━•\n*🍂: Amateur babe can't live without to ...*\n📎: https://www.xnxx.com/video-teaiv89/amateur_babe_can_t_live_without_to_take_huge_one-eyed_monster_up_her_love_hole\n\n•━━( 16 )━━━━━━━━━━━━━━━━━━•\n*🍂: Parada Paraiso*\n📎: https://www.xnxx.com/video-2gfz841/parada_paraiso\n\n•━━( 17 )━━━━━━━━━━━━━━━━━━•\n*🍂: Teen lesbo fucking*\n📎: https://www.xnxx.com/video-66g1h0c/teen_lesbo_fucking\n\n•━━( 18 )━━━━━━━━━━━━━━━━━━•\n*🍂: She Worships her Friend's Feet afte...*\n📎: https://www.xnxx.com/video-8r81re7/she_worships_her_friend_s_feet_after_a_date\n\n•━━( 19 )━━━━━━━━━━━━━━━━━━•\n*🍂: Lesbea Stunning blondes ride each o...*\n📎: https://www.xnxx.com/video-24ug79f/lesbea_stunning_blondes_ride_each_other\n\n•━━( 20 )━━━━━━━━━━━━━━━━━━•\n*🍂: 18yo Hot Ebony College Hookup, Insa...*\n📎: https://www.xnxx.com/video-1ao3hz9b/18yo_hot_ebony_college_hookup._insanely_hot_teen_black_girl_dildo_riding_competition.\n\n•━━( 21 )━━━━━━━━━━━━━━━━━━•\n*🍂: Crazy dykes*\n📎: https://www.xnxx.com/video-999pnff/crazy_dykes\n\n•━━( 22 )━━━━━━━━━━━━━━━━━━•\n*🍂: Straight chicks eat pussy for the f...*\n📎: https://www.xnxx.com/video-tekctae/straight_chicks_eat_pussy_for_the_first_time\n\n•━━( 23 )━━━━━━━━━━━━━━━━━━•\n*🍂: IMG 0348,MOV*\n📎: https://www.xnxx.com/video-5trl85b/img_0348.mov\n\n•━━( 24 )━━━━━━━━━━━━━━━━━━•\n*🍂: true lesbian sex*\n📎: https://www.xnxx.com/video-163at5bb/true_lesbian_sex\n\n•━━( 25 )━━━━━━━━━━━━━━━━━━•\n*🍂: Arma's Quest [sex games] Ep,2 massi...*\n📎: https://www.xnxx.com/video-168x7b25/arma_s_quest_sex_games_ep.2_massive_furry_dick_cumshot\n\n•━━( 26 )━━━━━━━━━━━━━━━━━━•\n*🍂: Asian Kendra Spade is talking durin...*\n📎: https://www.xnxx.com/video-p085lb4/asian_kendra_spade_is_talking_during_her_nap_her_room_mate_sabina_rouge_recorded_what_shes_saying._after_that_sabina_lets_kendra_lick_her_tits_and_wet_pussy._in_return_kendra_does_the_same_to_sabina_before_they_switch_to_scissor_sex.\n\n•━━( 27 )━━━━━━━━━━━━━━━━━━•\n*🍂: Marica Hase Fucks Lily*\n📎: https://www.xnxx.com/video-dh5l553/marica_hase_fucks_lily\n\n•━━( 28 )━━━━━━━━━━━━━━━━━━•\n*🍂: That’s wild*\n📎: https://www.xnxx.com/video-15gz4j03/that_s_wild\n\n•━━( 29 )━━━━━━━━━━━━━━━━━━•\n*🍂: slim young lesbians eating tight pu...*\n📎: https://www.xnxx.com/video-y62b183/slim_young_lesbians_eating_tight_pussies\n\n•━━( 30 )━━━━━━━━━━━━━━━━━━•\n*🍂: X1X*\n📎: https://www.xnxx.com/video-vyj9n13/x1x\n\n•━━( 31 )━━━━━━━━━━━━━━━━━━•\n*🍂: Scissoring at Motel - Khalessi 69*\n📎: https://www.xnxx.com/video-15x4u935/scissoring_at_motel_-_khalessi_69\n\n•━━( 32 )━━━━━━━━━━━━━━━━━━•\n*🍂: Pride 5*\n📎: https://www.xnxx.com/video-32bz024/pride_5\n\n•━━( 33 )━━━━━━━━━━━━━━━━━━•\n*🍂: Cougar pussy*\n📎: https://www.xnxx.com/video-svsk104/cougar_pussy\n\n•━━( 34 )━━━━━━━━━━━━━━━━━━•\n*🍂: Hot blonde MILF with perfect tits r...*\n📎: https://www.xnxx.com/video-wq97721/hot_blonde_milf_with_perfect_tits_rides_hard_dick_by_her_wet_twat\n\n•━━( 35 )━━━━━━━━━━━━━━━━━━•\n*🍂: Adrianna Meehan*\n📎: https://www.xnxx.com/video-q9xp57/adrianna_meehan\n\n•━━( 36 )━━━━━━━━━━━━━━━━━━•\n*🍂: Blow JOb,MP4*\n📎: https://www.xnxx.com/video-fup2p8e/blow_job.mp4\n\n(#)xdl\n(#€)`)
                }
                break
                case 'xnxxs':
                case 'xs':
                case 'xnxxsearch': {
                    if (!text) return reply(lang.contoh(prefix, command, 'sakura'))

                    await xnxxsearch(`${q}`).then(async data => {
                        let txt = `*•━━━━[ 😴 ~XNXX~ 🤤 ]━━━━•*\nFitur By: SiTotes 2022\nSaran Feature by: M. Fajar\n\n\n`
                        let n = 0
                        for (let i of data.result) {
                            n++
                            if (i.title.length > 35) {
                                txt += `•━━( ${n} )━━━━━━━━━━━━━━━━━━•\n*🍂: ${i.title.substring(0, 35).replaceAll('https', 'ht-s').replaceAll('.',',')}...*\n📎: ${i.link}\n\n`
                            } else {
                                txt += `•━━( ${n} )━━━━━━━━━━━━━━━━━━•\n*🍂: ${i.title.replaceAll('https', 'ht-s').replaceAll('.',',')}*\n📎: ${i.link}\n\n`
                            }
                        }
                        txt += `\n\n(#)xdl\n(#€)`
                        await reply(txt)
                    }).catch(async (err) => {
                        await reply(util.format(err))
                    })
                }
                break
                case 'xnxxdl':
                case 'xdl':
                case 'xnxxdownload': {
                    text = text.split('|•||•|')[0]
                    if (!text) return reply(lang.contoh(prefix, command, 'https://www.xnxx.com/video-136f9p3a/attrape_ma_demi-soeur_vierge_de_18_ans_en_train_de_se_masturber_avec_le_controle_de_ma_console_hentai'))
                    if (!text.includes('https://www.xnxx.com/')) return reply(lang.contoh(prefix, command, 'https://www.xnxx.com/video-136f9p3a/attrape_ma_demi-soeur_vierge_de_18_ans_en_train_de_se_masturber_avec_le_controle_de_ma_console_hentai'))


                    await xnxxdl(args[0]).then(async data => {
                        let txt = `*----「 DOWNLOAD 」----*
    	
    📬 Title : ${data.result.title}
    ⏰ Durasi : ${data.result.durasi}
    🎭 Width : ${data.result.videoWidth}
    🌐 Height : ${data.result.videoHeight}
    🔗 Url : ${data.result.URL}`
                        await reply(txt)
                        await react('✈️')
                        await onic.sendVideoUrl(m.chat, data.result.files.high, false, '', m).catch(async _ => {
                            await react('❌')
                            await onic.sendPesan(m.chat, {
                                text: '*Terjadi kesalahan mengirim kan ke anda Coba ulang kak,*\n*jika masih tidak bisa, tolong bagikan ke owner:*\n\n```' + _ + '```'
                            }, {
                                quoted: m
                            })
                            return ''
                        })
                    }).catch(async (err) => {
                        await reply(util.format(err))
                    })
                }
                break
            }
        }

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
    } finally {
        /**/
        console.log(__filename.replace('/data/data/com.termux/files/home', '.'), '→ Save');
        svdata()
    }
}