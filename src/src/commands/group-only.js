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
    smsg,
    getGroupAdmins,
    formatp,
    tanggal,
    tanggal_,
    tanggal__,
    formatDate,
    getTime,
    isUrl,
    sleep,
    clockString,
    runtime,
    fetchJson,
    getBuffer,
    jsonformat,
    format,
    logic,
    generateProfilePicture,
    parseMention,
    getRandom
} = require(home('./lib/myfunc'))
const lang = require(home('./src/options/lang_id'))

//━━━[ DATA BASE ]━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\


//━━━[ If user chat download-media ]━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\
module.exports = onic = async (onic, m, command, mek, store) => {
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
        const text = q = args.join(" ")
        const nrgs = args[0]
        
        const botNumber = onic.user.id ? onic.user.id.split(":")[0] + "@s.whatsapp.net" : onic.user.id
        const groupMetadata = m.isGroup ? await onic.groupMetadata(m.chat) : ''
        const groupId = m.isGroup ? groupMetadata.id : ''
        const groupName = m.isGroup ? groupMetadata.subject : ''
        const participants = m.isGroup ? await groupMetadata.participants : ''
        const groupAdmins = m.isGroup ? await getGroupAdmins(participants) : ''
        const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false
        const isGroupAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
        const groupOwner = m.isGroup ? groupMetadata.owner : ''
        const isGroupOwner = m.isGroup ? (groupOwner ? groupOwner : groupAdmins).includes(m.sender) : false
        const groupMembers = m.isGroup ? await groupMetadata.participants : ''

        const reply = onic.reply
        const replyEmo = onic.replyEmo
        const react = onic.react
        
        if(!m.isGroup) return replyEmo('Fitur ini hanya berfungsi di dalam grub 😉', '❌')

        switch (command) {
            case 'kick':
            case 'keluarkan':
            case 'hapus':
            case 'remove':{
                await react('⏳')
                if (!isBotAdmins) return replyEmo(lang.bukanadmin(), '❌')
                if (!(isGroupAdmins || isGroupOwner)) return replyEmo(lang.adminOnly(), '❌')
                if (!m.quoted && !text) return replyEmo(lang.targetkick(), '❌')
                let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
                if(users == groupOwner) return replyEmo(lang.nokickpemilik(), '❌')
                if(users == botNumber) if(isGroupOwner){
                    return await onic.groupParticipantsUpdate(m.chat, [users], 'remove').then(async(res) => await react('✅')).catch((_) => replyEmo('*Terjadi kesalahan Coba ulang, tolong bagikan ke owner:*\n\n```'+_+'```', '❌'))
                }else{
                    return replyEmo('Yang dapat mengeluarkan bot hanya pemilik grub, admin hanya bisa mengeluarkan secara manual')
                }
                await onic.groupParticipantsUpdate(m.chat, [users], 'remove').then(async(res) => await react('✅')).catch((_) => replyEmo('*Terjadi kesalahan Coba ulang, tolong bagikan ke owner:*\n\n```'+_+'```', '❌'))
            }
            break
            case 'add':
            case 'tambah':
            case 'new':{
                await react('⏳')
                if (!isBotAdmins) return replyEmo(lang.bukanadmin(), '❌')
                if (!(isGroupAdmins || isGroupOwner)) return replyEmo(lang.adminOnly(), '❌')
                if (!m.quoted && !text) return replyEmo(lang.useradd(), '❌')
                let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
                await onic.groupParticipantsUpdate(m.chat, [users], 'add').then(async(res) => await react('✅')).catch((_) => replyEmo('*Terjadi kesalahan Coba ulang, tolong bagikan ke owner:*\n\n```'+_+'```', '❌'))
            }
            break
            case 'promote':
            case 'naikan':
            case 'jabatkan':{
                await react('⏳')
                if (!isBotAdmins) return replyEmo(lang.bukanadmin(), '❌')
                if (!(isGroupAdmins || isGroupOwner)) return replyEmo(lang.adminOnly(), '❌')
                if (!m.quoted && !text) return replyEmo(lang.userpromot(), '❌')
                let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
                await onic.groupParticipantsUpdate(m.chat, [users], 'promote').then(async(res) => await react('✅')).catch((_) => replyEmo('*Terjadi kesalahan Coba ulang, tolong bagikan ke owner:*\n\n```'+_+'```', '❌'))
            }
            break
            case 'demote':
            case 'turunkan':
            case 'kucilkan':{
                await react('⏳')
                if (!isBotAdmins) return replyEmo(lang.bukanadmin(), '❌')
                if (!(isGroupAdmins || isGroupOwner)) return replyEmo(lang.adminOnly(), '❌')
                if (!m.quoted && !text) return replyEmo(lang.userdemot(), '❌')
                let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
                //if(users.includes('@')) return
                await onic.groupParticipantsUpdate(m.chat, [users], 'demote').then(async(res) => await react('✅')).catch((_) => replyEmo('*Terjadi kesalahan Coba ulang, tolong bagikan ke owner:*\n\n```'+_+'```', '❌'))
            }
            break
            case 'liston':
            case 'listonline': {
                if (!isBotAdmins) return replyEmo(lang.bukanadmin(), '❌')
                if (!(isGroupAdmins || isGroupOwner)) return replyEmo(lang.adminOnly(), '❌')
                let id = args && /\d+\-\d+@g.us/.test(args[0]) ? args[0] : m.chat
                let online = [...Object.keys(store.presences[id]), botNumber]
                await reply('List Online:\n\n' + online.map(v => '⭔ @' + v.replace(/@.+/, '')).join(`\n`), {
                    mentionedJid: online
                })
            }
            break
            case 'tagall':
            case 'infoall':
            case 'tagsemua':{
                if (!isBotAdmins) return replyEmo(lang.bukanadmin(), '❌')
                if (!(isGroupAdmins || isGroupOwner)) return replyEmo(lang.adminOnly(), '❌')
                let tekss = `══✪〘 *👥 Sebutkan Semua* 〙✪══\n\n➲ *Pesan : ${q ? q : 'Tidak ada'}*\n\n`
                for (let mem of participants) {
                    tekss += `🏅 @${mem.id.split('@')[0]}\n`
                }
                tekss += `\n⋙ *${botname}* ⋘`
                await reply(tekss, {
                    mentionedJid: participants.map(a => a.id)
                })
            }
            break
            case 'h':
            case 'hidetag':{
                if (!isBotAdmins) return replyEmo(lang.bukanadmin(), '❌')
                if (!(isGroupAdmins || isGroupOwner)) return replyEmo(lang.adminOnly(), '❌')
                await reply(q ? q : '', {
                    mentionedJid: participants.map(a => a.id)
                })
            }
            break
        }

    } catch (err) {
        /**/console.log(err)
        await m.reply('*Terjadi kesalahan, tolong bagikan ke owner:*\n\n```' + err + '```')
    } finally {
        // onic.endProsMsg()
        await onic.presence(1)
        /**/console.log(__filename.replace('/data/data/com.termux/files/home', '.'), '→ Save');
        svdata()
    }
}