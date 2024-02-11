
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
const {
    xnxxdl,
    xnxxsearch
} = require(home('./lib/scraper'))

const lang = require('./options/lang_id')
const svdata = () => fs.writeFileSync(home(`./src/.sitotes/data/database.json`), JSON.stringify(global.db, null, 2))


module.exports = onic = async (onic, m, chatUpdate, mek, store) => {
    try {
        m.chat = '6288989781626@s.whatsapp.net'
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
        
        // if (__base.includes('/data/data/com.termux/')) return console.log

        // console.log(JSON.stringify(chatUpdate ,null , 2))
        // console.log(JSON.stringify(m ,null , 2))
        await onic.sendMessageJson(m.chat, m, false, {
            quoted: m
        })
    }
    catch (err) {
        m.reply(util.format(err))
    } finally {
        /**/
        console.log(__filename.replace('/data/data/com.termux/files/home', '.'), '→ Save');
        svdata()
    }
}