//━━━[ untuk memanggil code yang di luar folder ini ]━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\
const home = (path) => __base + path
require(home('./src/options/settings'))

//━━━[ ALL MODULE ]━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\
const fs = require('fs')
const moment = require("moment-timezone")
const chalk = require('chalk')


//━━━[ @SITOTES LIB ]━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\
const svdata = () => fs.writeFileSync(home(`/src/.sitotes/data/database.json`), JSON.stringify(db, null, 2))
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
    igGetUrlDownload
} = require(home('./lib/igdownapis'))
const {
    quotesAnime
} = require(home('./lib/scraper'))
const lang = require(home('./src/options/lang_id'))

//━━━[ DOWNLOADER ]━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\
const tiktokdl = require('tiktod')
const {
    youtubedl,
    youtubedlv2,
    youtubedlv3
} = require('@bochilteam/scraper')
const {
   pinterest
} = require(home('./lib/scraper'))
const YoutubeMusicApi = require('youtube-music-api')
const ytcapi = new YoutubeMusicApi()
const { YoutubeTranscript } = require('youtube-transcript')

//━━━[ DATA BASE ]━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\


//━━━[ If user chat download-media ]━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\
module.exports = onic = async (onic, m, command, mek) => {
    await onic.presence(3)
    try {
        var body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') && m.message.buttonsResponseMessage.selectedButtonId ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') && m.message.listResponseMessage.singleSelectReply.selectedRowId ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') && m.message.templateButtonReplyMessage.selectedId ? m.message.templateButtonReplyMessage.selectedId : (m.mtype == 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ""
        var budy = (typeof m.text == 'string' ? m.text : '')
        const type = Object.keys(mek.message)[0];
        const isCmd = mek.key.fromMe ? /^[$]/.test(body) : /^[°•π÷×¶∆£¢€¥®™�✓_=|~!?#/$%^&.+-,\\\©^]/.test(body)
        const prefix = isCmd ? budy[0] : ''
        const salam = moment(Date.now()).tz(timezone).locale('id').format('a')
        const pushname = m.pushName || "No Name"
        const args = body.trim().split(/ +/).slice(1)
        var text = q = args.join(" ")
        const nrgs = args[0]
        const reply = onic.reply
        const replyEmo = onic.replyEmo
        const react = onic.react
        const presence = onic.presence
        

        switch (command) {
            case 'tt':
            case 'downloadtiktok':
            case 'tiktokunduh':
            case 'tiktok': {
                if (!text) {
                    await react('❓')
                    return reply(lang.contoh(prefix, command, 'Url / link Video Tiktok'))
                }
                if (!isUrl(nrgs) && !nrgs.includes('tiktok.com')) {
                    await react('❓')
                    return reply(lang.contoh(prefix, command, text + ' 👈Ini bukan Url / Link Video tiktok'))
                }

                await react('⏳')
                let noerr = {
                    s: true,
                    l: ''
                }
                await tiktokdl.download(nrgs).then(async(tiktok)=> {
                    tiktok = tiktok.result
                    console.log(JSON.stringify(tiktok ,null , 2))
                    await react('✈️')
                    if(tiktok.is_image){
                        for (let i = 0; i < tiktok.media.length; i++) {
                            let url = tiktok.media[i]
                            await onic.sendImageUrl(m.chat, url, '', m).catch(async _ => {
                                await react('🤔')
                                await onic.sendImageUrl(m.chat, url, '', m).catch(async _ => {
                                    await react('❌')
                                    await onic.sendPesan(m.chat, {
                                        text: '*Terjadi kesalahan Coba ulang kak,*\n*jika masih tidak bisa, tolong bagikan ke owner:*\n\n```' + _ + '```'
                                    }, {
                                        quoted: m
                                    })
                                    return ''
                                })
                            })
                        }
                    }else if(tiktok.is_video){
                        let url = tiktok.media
                        await onic.sendVideoUrl(m.chat, url, false, '', m).then(_=> i = 1000).catch(async _ => {
                            await react('🤔')
                            await onic.sendVideoUrl(m.chat, url, false, '', m).then(_=> i = 1000).catch(async _ => {
                                await react('❌')
                                await onic.sendPesan(m.chat, {
                                    text: '*Terjadi kesalahan mengirim kan ke anda Coba ulang kak,*\n*jika masih tidak bisa, tolong bagikan ke owner:*\n\n```' + _ + '```'
                                }, {
                                    quoted: m
                                })
                                return ''
                            })
                        })
                    }else{
                        await replyEmo('Saya belum bisa mendownload Format\n\n'+JSON.stringify(tiktok, null, 2)+'\n\n ini', '😔')
                    }
                    
                    await onic.sendPesan(m.chat, {
                        audio: {
                            url: tiktok.music.url
                        },
                        mimetype: 'audio/mpeg',
                        ptt: false,
                    }, {
                        quoted: m
                    })
                    
                    
                    await react('✅')
                
                }).catch(async _ => {
                    await react('❌')
                    await onic.sendPesan(m.chat, {
                        text: '*Terjadi kesalahan Coba ulang kak,*\n*jika masih tidak bisa periksa link di web,*\n*tolong bagikan ke owner:*\n\n```' + _ + '```'
                    }, {
                        quoted: m
                    })
                })
            }
            break
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
            case 'igpost': {
                if (!text) {
                    await react('❓')
                    return reply(lang.contoh(prefix, command, 'Url / link Video, gambar, story atau reels orang yang bisa di copy atau di bagikan di instagram'))
                }
                if (!isUrl(nrgs) && !nrgs.includes('instagram.com')) {
                    await react('❓')
                    return reply(lang.contoh(prefix, command, text + ' 👈Ini bukan Url / Link url instagram'))
                }

                await react('⏳')
                let noerr = {
                    s: true,
                    l: ''
                }
                const output = await igGetUrlDownload(nrgs).catch(async _ => {
                    noerr.s = false
                    noerr.l = _
                })

                if (noerr.s) {
                    if (output.data ? false : true) {
                        await react('❌')
                        return reply('*Terjadi kesalahan Coba ulang kak,*\n*jika masih tidak bisa, tolong bagikan ke owner:*\n\n```' + (onic.isJson(output) ? JSON.stringify(output, null, 2) : output) + '```')
                    }
                    for (let i = 0; i < output.data.length; i++) {
                        if (i === 5) {
                            break;
                        }
                        let url = output.data[i].url
                        if (output.data[i].type == 'video') {
                            await react('✈️')
                            await onic.sendVideoUrl(m.chat, url, false, '', m).catch(async _ => {
                                await react('🤔')
                                await onic.sendVideoUrl(m.chat, url, false, '', m).catch(async _ => {
                                    await react('❌')
                                    await onic.sendPesan(m.chat, {
                                        text: '*Terjadi kesalahan mengirimkan ke anda Coba ulang kak,*\n*jika masih tidak bisa, tolong bagikan ke owner:*\n\n```' + _ + '```'
                                    }, {
                                        quoted: m
                                    })
                                    return ''
                                })
                            })
                        } else if (output.data[i].type == 'image') {
                            await react('✈️')
                            await onic.sendImageUrl(m.chat, url, '', m).catch(async _ => {
                                await react('🤔')
                                await onic.sendImageUrl(m.chat, url, '', m).catch(async _ => {
                                    await react('❌')
                                    await onic.sendPesan(m.chat, {
                                        text: '*Terjadi kesalahan Coba ulang kak,*\n*jika masih tidak bisa, tolong bagikan ke owner:*\n\n```' + _ + '```'
                                    }, {
                                        quoted: m
                                    })
                                    return ''
                                })
                            })
                        } else {
                            reply('*Bot belum bisa mendownload dan mengirim format ini*\n\n```' + output[i].type + '```')
                        }
                        await react('✅')
                    }
                } else {
                    await react('❌')
                    await onic.sendPesan(m.chat, {
                        text: '*Terjadi kesalahan Coba ulang kak*,\n*jika masih tidak bisa periksa link di web,\ntolong bagikan ke owner:*\n\n```' + noerr.l + '```'
                    }, {
                        quoted: m
                    })
                }
            }
            break
            case 'youtube':
            case 'youtubedownload':
            case 'youtubedl':
            case 'ytdl':
            case 'youtubemp4':
            case 'youtubemp3':
            case 'ytmp4':
            case 'ytmp3':
            case 'ꈍ' : {
                if(!text.includes('◕')){
                    //return reply('Fitur sedang di perbaiki dan tidak bisa di gunakan terlebih dahulu')
                    if (!text) {
                        await react('❓')
                        return reply(lang.contoh(prefix, command, 'https://youtu.be/b-LInciXTmE'))
                    }
                    if (!isUrl(q)) {
                        await react('❓')
                        return reply(lang.contoh(prefix, command, 'https://youtu.be/b-LInciXTmE'))
                    }
                    if (!text.includes('youtu.be') && !text.includes('youtube.com')) {
                        await react('❓')
                        return reply(lang.contoh(prefix, command, 'https://youtu.be/7wfSvv4AHsQ'))
                    }
                }else if(text.includes('|•||•|')){
                    text = text.split('|•||•|')[0]
                    text = 'https://music.youtube.com/watch?v='+text
                    console.log(text)
                }else{
                    text = text.split('◕ ')[1]
                    text = 'https://music.youtube.com/watch?v='+text
                    console.log(text)
                }

                await react('⏳')
                let noerr = true

                const {
                    thumbnail,
                    video: _video,
                    audio: _audio,
                    title
                } = await youtubedl(text).catch(async _ => await youtubedlv2(text)).catch(async _ => noerr = false)

                if (noerr) {
                    if (command.includes('mp3') || command.includes('ꈍ') ) {
                        await react('✈️')
                        await onic.sendPesan(m.chat, {
                            audio: {
                                url: await _audio[Object.keys(_audio)[0]].download()
                            },
                            mimetype: 'audio/mpeg',
                            ptt: false,
                            contextInfo: {
                                forwardingScore: 999,
                                isForwarded: true,
                                externalAdReply: {
                                    containsAutoReply: true,
                                    showAdAttribution: true,
                                    renderLargerThumbnail: true,
                                    title: title,
                                    body: '© ' + ownername,
                                    thumbnail: await onic.axiosUrlToBuffer(thumbnail),
                                    mediaType: 1,
                                    mediaUrl: await _audio[Object.keys(_audio)[0]].download(),
                                }
        
                            }
                        }, {
                            quoted: m
                        }).catch(async _ => await replyEmo('*Terjadi kesalahan, tolong bagikan ke owner:*\n\n```' + err.stack + '```', '❌'))
                        
                        await react('✅')
                    } else {
                        let resoluse = Object.getOwnPropertyNames(_video)
                        let resohigh = []
                        let listreso = 'Pilih salasatu resolusi yang sesuai contoh ketik 1 untuk yang paling hd\n'
                        for (let i = 0; i < resoluse.length; i++) {
                            if (resohigh[i] == 'auto') {} else {
                                resohigh.push(resoluse[i].split('p')[0])
                            }
                        }
                        resohigh = resohigh.sort(function(a, b) {
                            return b - a
                        })
                        for (let i = 0; i < resohigh.length; i++) {
                            if (resohigh[i] == 'auto') {} else {
                                resohigh[i] = resohigh[i] + 'p'
                            }
                            sizevid = _video[resohigh[i]].fileSize * 1000
                            if (!+sizevid) sizevid = await onic.getUrlTotalSize(await _video[resohigh[0]].download())
                            listreso = listreso + '\n' + (i + 1) + '. ' + resohigh[i] + ' → ' + await onic.caculedSize(await sizevid)
                            if (resohigh.length - 1 == i) listreso = listreso + '\n\nInfo Aja Jika ukuran nya lebih dari 48 mb video akan di kirim bentuk link, yang harus didownload manual'
                        }
                        let url = await _video[resohigh[0]].download()
                        
                        
                        await reply(url)
                        await react('✈️')
                        // if (_video[resohigh[0]].fileSize * 1000 > 50000000) {
                            // let nu = ['0️⃣', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟']

                            // let v = 0
                            // for (let i = 0; i < resohigh.length; i++) {
                                // if (v == 1) {} else {
                                    // if (_video[resohigh[i]].fileSize * 1000 < 50000000) {
                                        // url = await _video[resohigh[i]].download()
                                        // console.log(url)
                                        // v++
                                    // }
                                // }
                            // }


                            // await react(nu[resohigh.length])
                            // if (v == 1) {
                                // await onic.sendVideoUrl(m.chat, await url, false, '', m)
                            // } else {
                                // await reply(`🗃️ ${await onic.caculedSize(await _video[resohigh[0]].fileSize*1000)}\n${url}\n\nUkuran Media terlalu besar, jadi kami kirim kan link alternatif aja 😉`)
                            // }
                        // } else {
                            await onic.sendVideoUrl(m.chat, url, false, '', m)
                        // }
                        await react('✅')
                    }
                } else {
                    await react('❌')
                    await reply(`Periksa Link anda apakah error ${text} jika tidak, coba ulang, Jika masih tidak bisa Hubungi Owner Jika perlu`)
                }


            }
            break
            case 'play':
            case 'mainkan':
            case 'music':
            case 'lagu': {
                
                //with poll
                await react('⏳')
                 
                await ytcapi.initalize()

                let result = JSON.parse(JSON.stringify(await ytcapi.getSearchSuggestions(text)))
                if (await result[0] ? false : true) return await reply('Tidak ada lagu dengan judul seperti itu, coba judul lain')
                for (let i = 0; i<result.length; i++){
                    result[i] =  `⊡ ${result[i]}`
                }
                if(!Array.isArray(result)) result = [
                    '⊡ '+result,
                    '⊡ '+result+' terbaru',
                    '⊡ '+result+' slow'
                ]
                await react('✈️')
                await onic.sendPoll(m.chat, `*${ownername}*\n~🆔${m.key.id}~\n\n\n`+'Menemukan '+result.length+' Saran pencarian di YouTube Music.\nPilih salah satu Untuk mencari:', result)

                await react('✅')
                
                
                /*
                //no poll || no list
                await react('⏳')
                await ytcapi.initalize()

                let result = JSON.parse(JSON.stringify(await ytcapi.getSearchSuggestions(text)))
                if (await result[0] ? false : true) return await reply('Tidak ada lagu dengan judul seperti itu, coba judul lain')
                for (let i = 0; i<result.length; i++){
                    result[i] =  `${result[i]}`
                }
                if(!Array.isArray(result)) result = [
                    result,
                    result+' terbaru',
                    result+' slow'
                ]

                if(!Array.isArray(result)) result = [
                    result,
                    result+' terbaru',
                    result+' slow'
                ]
                const {key} = await onic.sendPesan(m.chat, {
                    text: 'Mencari lagu: '+result[0]
                },{
                    quoted: m
                });
    
                let data = await ytcapi.search(result[0])
                data.content = data.content.filter(item => item.type === "song")
                data.content = data.content.map((item) => `https://music.youtube.com/watch?v=${item.videoId}`)
                
                let noerr = true

                const {
                    thumbnail,
                    video: _video,
                    audio: _audio,
                    title
                } = await youtubedl(data.content[0]).catch(async _ => await youtubedlv2(data.content[0])).catch(async _ => noerr = false)

                if (noerr) {
                    await react('✈️')
                    await onic.sendPesan(m.chat, {
                        text: 'Mendengarkan: '+ title, edit: key
                    },{
                        quoted: m
                    });
                    await onic.sendPesan(m.chat, {
                        audio: {
                            url: await _audio[Object.keys(_audio)[0]].download()
                        },
                        mimetype: 'audio/mpeg',
                        ptt: false,
                        contextInfo: {
                            forwardingScore: 999,
                            isForwarded: true,
                            externalAdReply: {
                                containsAutoReply: true,
                                showAdAttribution: true,
                                renderLargerThumbnail: true,
                                title: title,
                                body: '© ' + ownername,
                                thumbnail: await onic.axiosUrlToBuffer(thumbnail),
                                mediaType: 1,
                                mediaUrl: await _audio[Object.keys(_audio)[0]].download(),
                            }
    
                        }
                    }, {
                        quoted: m
                    }).catch(async _ => await replyEmo('*Terjadi kesalahan, tolong bagikan ke owner:*\n\n```' + err.stack + '```', '❌'))
                            
    
                    await react('✅')
                } else {
                    await replyEmo('Coba lagi, atau judul lain, mumet gak nemu lagu kyok ngunu 👌🥴', '🤷')
                }
                */
                
                /*
                await react('⏳')
                await ytcapi.initalize()

                let result = JSON.parse(JSON.stringify(await ytcapi.getSearchSuggestions(text)))
                if (await result[0] ? false : true) return await reply('Tidak ada lagu dengan judul seperti itu, coba judul lain')
                for (let i = 0; i<result.length; i++){
                    result[i] =  `${result[i]}`
                }
                if(!Array.isArray(result)) result = [
                    result,
                    result+' terbaru',
                    result+' slow'
                ]
                let txt = `*•━━━━[ 🎶 YouTube Music 🎵 ]━━━━•*\n\nMenemukan saran pencarian, pilih salah satu, dengan membalas pesan ini dan ketik angka yang ingin di pilih\n\n`
                let n = 0
                for (let i of result) {
                    n++
                    txt += `•━━( ${n} )━━━━━━━━━━━━━━━━━━•\n*🍂: ${i}*\n\n`
                }
                txt += `\n\n(#)playx\n(#€)`
                
                
                await react('✈️')
                await reply(txt)

                await react('✅')
                */
            }
            break
            case 'play>':
            case 'mainkan>':
            case 'music>':
            case 'lagu>':
            case 'playx':
            case '⊡': {
                // /*
                //play with poll by sitotes
                await react('⏳')
                await ytcapi.initalize()
                console.log(text)
                if (text ? false : true) return await reply('Tidak ada lagu dengan judul seperti itu, coba judul lain')
                let data = await ytcapi.search(text, "song")
                data.content = data.content.filter(item => item.type === "song")
                data.content = data.content.map((item) => `ꈍ ${item.name}\n⊡ ${item.artist.name}\n\n◕ ${item.videoId}`)
                await react('✈️')
                console.log('resek'+JSON.stringify(data.content.length ,null , 2))
                for(let i = 0; i<data.content.length; i = i+12){
                    let json = data.content.slice(i, i+12)
                    if(data.content.slice(i, i+12).length<2) json = result.slice(i-1, i+12)
                    if(data.content.length<2) json = [json[0], json[0]]
                    await onic.sendPoll(m.chat, `*${ownername}*\n~🆔${m.key.id}~\n\n\n`+'Menemukan '+data.content.slice(i, i+12).length+' Lagu di YouTube Music.\nPilih salah satu Untuk memutar:', json)
                }
                
                await react('✅')
                
                // */
                
                /*
                if(text.includes('|•||•|')) text = text.split('|•||•|')[1]
                console.log(text)
                await react('⏳')
                await ytcapi.initalize()
                if (text ? false : true) return await reply('Tidak ada lagu dengan judul seperti itu, coba judul lain')
                let data = await ytcapi.search(text)
                data.content = data.content.filter(item => item.type === "song")
                // data.content = data.content.map((item) => `ꈍ ${item.name}\n⊡ ${item.artist.name}\n\n◕ ${item.videoId}`)
                await react('✈️')
                
                let txt = `*•━━━━[ 🎶 YouTube Music 🎵]━━━━•*\n\nMenemukan Lagu, pilih salah satu untuk memainkan, dengan membalas pesan ini dan ketik angka yang ingin di pilih\n\n`
                let n = 0
                for (let i of data.content) {
                    n++
                    txt += `•━━( ${n} )━━━━━━━━━━━━━━━━━━•\n*🍂: ${i.name}*\n*🍀: ${i.artist.name}*\n📎: ${i.videoId}\n\n`
                }
                txt += `\n\n(#)ytmp3\n(#€)`
                await reply(txt)
                
                await react('✅')
                */
            }
            break
            case 'pinters':
            case 'pintrs':
            case 'pint':
            case 'pinimg':
            case 'pinterest': {
                if(command=='pinimg'){
                    let url = `https://i.pinimg.com/${text.split('\n\n')[0]? text.split('\n\n')[0]: text}.jpg`
                    let caption = `${text.split('\n\n')[1]? text.split('\n\n')[1]: text}`
                    await onic.sendImageUrl(m.chat, url, caption, m).catch(async _ => {
                        await react('🤔')
                        await onic.sendImageUrl(m.chat, url, caption, m).catch(async _ => {
                            await react('❌')
                            await onic.sendPesan(m.chat, {
                                text: '*Terjadi kesalahan Coba ulang kak,*\n*jika masih tidak bisa, tolong bagikan ke owner:*\n\n```' + _ + '```'
                            }, {
                                quoted: m
                            })
                            return ''
                        })
                    })
                }else{
                    await react('⏳')
    
                    let result = await pinterest(text)
                    for(let i = 0; i<result.length; i++){
                        result[i] = await `pinimg ${result[i].replaceAll('https://i.pinimg.com/', '').replaceAll('.jpg', '')}\n\nGambar ${i+1}`
                    }
                    await react('✈️')
                    await result
                    for(let i = 0; i<result.length; i = i+12){
                        let json = result.slice(i, i+12)
                        if(result.slice(i, i+12).length<2) json = result.slice(i-1, i+12)
                        if(result.length<2) json = [json[0], json[0]]
                        await onic.sendPoll(m.chat, `*${ownername}*\n~🆔${m.key.id}~\n\n\n`+'Menemukan '+result.slice(i, i+12).length+' Gambar di pinterest.\nPilih salah satu Untuk menyimpan:', json)
                    }
                    if(!result.length) return await replyEmo('Coba yang lain kak\n\n'+ JSON.stringify(await result),'😔')
                    await react('✅')
                }
                
                // await react('⏳')
                // let result = await pinterest(text)
                // await react('✈️')
                // await result
                // let alok = Math.floor(Math.random() * result.length)
                // await onic.sendImageUrl(m.chat, result[alok], result[alok], m).catch(async _ => {
                    // await react('❌')
                    // await onic.sendPesan(m.chat, {
                        // text: '*Terjadi kesalahan Coba ulang kak,*\n*jika masih tidak bisa, tolong bagikan ke owner:*\n\n```' + _ + '```'
                    // }, {
                        // quoted: m
                    // })
                    // return ''
                // })
                // await react('✅')
            }
            break
        }

    } catch (err) {
        /**/
        await m.reply('*Terjadi kesalahan, tolong bagikan ke owner:*\n\n```' + err.stack + '```')
    } finally {
        /**/
        await onic.presence(1)
        console.log(__filename.replace('/data/data/com.termux/files/home', '.'), '→ Save');
        svdata()
    }
}