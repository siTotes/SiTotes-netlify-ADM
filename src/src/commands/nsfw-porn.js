//━━━[ untuk memanggil code yang di luar folder ini ]━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\
const home = (path) => __base + path
require(home('./src/options/settings'))

//━━━[ ALL MODULE ]━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\
const fs = require('fs')
const moment = require("moment-timezone")
const chalk = require('chalk')
const util = require('util');

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
    quotesAnime
} = require(home('./lib/scraper'))
const lang = require(home('./src/options/lang_id'))

//━━━[ DOWNLOADER ]━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\
const {
    xnxxdl,
    xnxxsearch
} = require(home('./lib/scraper'))
//━━━[ DATA BASE ]━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\


//━━━[ If user chat download-media ]━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\
module.exports = onic = async (onic, m, command, mek) => {
    try {
        var body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') && m.message.buttonsResponseMessage.selectedButtonId ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') && m.message.listResponseMessage.singleSelectReply.selectedRowId ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') && m.message.templateButtonReplyMessage.selectedId ? m.message.templateButtonReplyMessage.selectedId : (m.mtype == 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ""
        var budy = (typeof m.text == 'string' ? m.text : '')
        const type = Object.keys(mek.message)[0];
        const isCmd = mek.key.fromMe ? /^[$]/.test(body) : /^[°•π÷×¶∆£¢€¥®™�✓_=|~!?#/$%^&.+-,\\\©^]/.test(body)
        const prefix = isCmd ? budy[0] : ''
        const salam = moment(Date.now()).tz(timezone).locale('id').format('a')
        const pushname = m.pushName || "No Name"
        const args = body.trim().split(/ +/).slice(1)
        let text = q = args.join(" ")
        const nrgs = args[0]
        const reply = onic.reply
        const replyEmo = onic.replyEmo
        const react = onic.react


        switch (command) {
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

    } catch (err) {
        /**/
        await m.reply('*Terjadi kesalahan, tolong bagikan ke owner:*\n\n```' + err.stack + '```')
    } finally {
        /**/
        console.log(__filename.replace('/data/data/com.termux/files/home', '.'), '→ Save');
        svdata()
    }
}