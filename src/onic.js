global.__base = __dirname + '/';
global.__nbl = {}
require('./src/options/settings')

const {
    Boom
} = require('@hapi/boom')
const NodeCache = require("node-cache")
const readline = require("readline")
const {
    default: makeWASocket,
    useMultiFileAuthState,
    DisconnectReason,
    fetchLatestBaileysVersion,
    generateForwardMessageContent,
    prepareWAMessageMedia,
    generateWAMessageFromContent,
    generateMessageID,
    getAggregateVotesInPollMessage,
    downloadContentFromMessage,
    makeInMemoryStore,
    WAMessageContent,
    jidDecode,
    proto,
    makeCacheableSignalKeyStore,
    PHONENUMBER_MCC,
    WAMessageKey
} = require("@adiwajshing/baileys")

const pino = require('pino')
const fs = require('fs')

const useStore = true
const usePairingCode = false
const useMobile = false

const msgRetryCounterCache = new NodeCache()

// const rl = readline.createInterface({
    // input: process.stdin,
    // output: process.stdout
// })
// const question = (text) => new Promise((resolve) => rl.question(text, resolve))
const store = useStore ? makeInMemoryStore({
    logger: pino().child({
        level: 'silent',
        stream: 'store'
    })
}) : undefined
store?.readFromFile('./src/session/baileys_store_multi.json')
setInterval(() => {
    store?.writeToFile('./src/session/baileys_store_multi.json')
}, 10000)




const chalk = require('chalk')

const {
    smsg,
    getBuffer,
    fetchJson,
    delays
} = require('./lib/simple')
const {
    client
} = require('./lib/dbmongosle')

const cron = require('node-cron')
const figlet = require('figlet')

global.db = JSON.parse(fs.readFileSync("./src/.sitotes/data/database.json"))
global.ky_ttt = []

if (global.db) global.db.data = {
    game: {},
    proses: {},
    ...(global.db.data || {})
}

__nbl.ttlerr = 0
__nbl.isduakali = 0
__nbl.chekid = {}
__nbl.lcInfo = './src/.sitotes/data/data-msg.json'
__nbl.infoMSG = JSON.parse(fs.readFileSync(__nbl.lcInfo))

console.log(chalk.hex('#FF9F84').bold('SiTotes Bot Wait Running...'))

async function startonic() {

    const {
        state,
        saveCreds
    } = await useMultiFileAuthState('./src/session/creds-file')
    const {
        version,
        isLatest
    } = await fetchLatestBaileysVersion()

    const onic = makeWASocket({
        version,
        logger: pino({
            level: "fatal"
        }).child({
            level: "fatal"
        }),
        printQRInTerminal: !usePairingCode,
        mobile: useMobile,
        auth: {
            creds: state.creds,
            keys: makeCacheableSignalKeyStore(state.keys, pino({
                level: "fatal"
            }).child({
                level: "fatal"
            }))
        },
        msgRetryCounterCache,
        generateHighQualityLinkPreview: true,
        getMessage,
    })
    
    store?.bind(onic.ev)
    onic.sendPesan = async (...args) => {
        await delays(0.5)
        return await onic.sendMessage(...args)
    }
    
    if (__nbl.isduakali < 1) {
        console.log(chalk.hex('#9AFF78').bold(figlet.textSync('SI-TOTES', {
            font: 'Standard',
            horizontalLayout: 'default',
            vertivalLayout: 'default',
            whitespaceBreak: false
        })))

        console.log(chalk.hex('#FFDF66')(`\nModules: WhiskeySockets/Baileys v${version.join('.')} ${isLatest} +\n\nBOT INFO:→ +\n←======================→ +\nBot By: m.saiful.anam.r +\nBot Name: SiTotes Bot +\n\nDibuat: 3,mei,2019 +\nUp: Kamis, 25, Mei +\n\n\nMenunggu terhubung ke WhatsApp...\n`))
        __nbl.isduakali++
    } else {
        console.log(chalk.hex('#FF9F84').bold('SiTotes Bot Menghubungkan ulang...'))
    }
    
    function nocache(module, cb = () => {}) {
        fs.watchFile(require.resolve(module), async () => {
            await uncache(require.resolve(module))
            cb(module)
        })
    }
    
    function uncache(module = '.') {
        return new Promise((resolve, reject) => {
            try {
                delete require.cache[require.resolve(module)]
                resolve()
            } catch (e) {
                reject(e)
            }
        })
    }
    
    require('./src/onic-func')(onic, store)
    nocache('./src/onic-func', module => {
        require(module)(onic, store)
        console.log(` "${module}" Telah diupdate!`)
    })
    
    require('./src/onic-notif')(onic, store, state, saveCreds, version, isLatest)
    nocache('./src/onic-notif', async module => {
        onic.ev.removeAllListeners('messages.upsert');
        onic.ev.removeAllListeners('messages.update');
        onic.ev.removeAllListeners('poll-recipient');
        onic.ev.removeAllListeners('schedule-trigger');
        require(module)(onic, store, state, saveCreds, version, isLatest)
        console.log(` "${module}" Telah diupdate!`)
    })
    
    onic.ev.on('connection.update', async (update) => {
        const {
            connection,
            lastDisconnect,
        } = update
        if (connection === 'close') {
            __nbl.ttlerr++
            await onic.mdbClosed()
            let reason = new Boom(lastDisconnect?.error)?.output.statusCode
            if (reason === DisconnectReason.badSession) {
                console.log(chalk.hex('#FF6158')(`SENDER → File Sesi Buruk, Harap Hapus Sesi dan Pindai Lagi`));
                // setTimeout(startonic, 10000)
                throw new Error('Bot Crash → By sitotes anti Stuck reload')
            } else if (reason === DisconnectReason.connectionClosed) {
                console.log(chalk.hex('#FF6158')("SENDER → Koneksi ditutup, menghubungkan kembali...."));
                //setTimeout(startonic, 10000)
                throw new Error('Bot Crash → By sitotes anti Stuck reload')
            } else if (reason === DisconnectReason.connectionLost) {
                console.log(chalk.hex('#FF6158')("SENDER → Koneksi Hilang dari Server, menyambungkan kembali..."));
                //setTimeout(startonic, 10000)
                throw new Error('Bot Crash → By sitotes anti Stuck reload')
            } else if (reason === DisconnectReason.connectionReplaced) {
                console.log(chalk.hex('#FF6158')("SENDER → Koneksi Diganti, Sesi Baru Lain Dibuka, menghubungkan kembali..."));
                setTimeout(startonic, 10000)
            } else if (reason === DisconnectReason.loggedOut) {
                console.log(chalk.hex('#FF6158')(`SENDER → Perangkat Keluar, Harap Pindai Lagi Dan Jalankan.`));
                setTimeout(startonic, 10000)
            } else if (reason === DisconnectReason.restartRequired) {
                console.log(chalk.hex('#FF6158')("SENDER → Restart Diperlukan, Restart..."));
                setTimeout(startonic, 10000)
            } else if (reason === DisconnectReason.timedOut) {
                console.log(chalk.hex('#FF6158')("SENDER → Koneksi Habis, Menghubungkan..."));
                setTimeout(startonic, 10000)
            } else onic.end(chalk.hex('#FF6158')(`SENDER → Alasan Putus Tidak Diketahui: ${reason}|${connection}`))

            if (__nbl.ttlerr > 3) {
                console.log(chalk.white.bgRed.bold('Crash by → Connection Loop'))
                throw new Error('Bot Crash → By sitotes anti loop')
            }
        }
        if (update.connection == "open" || update.receivedPendingNotifications == "true") {
            await store.chats.all()
            console.log(chalk.hex('#FFAD99').bold(`Terhubung dengan = ` + JSON.stringify(onic.user, null, 2)))
            await onic.mdbConnect();

        }
    })
    
    cron.schedule('* * * * *', async() => {
        await onic.ev.emit('schedule-trigger', new Date())
    });

    
    return onic

    async function getMessage(key) {
        if (store) {
            const msg = await store.loadMessage(key.remoteJid, key.id)
            return msg?.message || undefined
        }

        return proto.Message.fromObject({})
    }
    

    /*
        
        onic.ev.on('connection.update', async (update) => {
            const {
                connection,
                lastDisconnect,
            } = update
            if (connection === 'close') {
                __nbl.ttlerr++
                let reason = new Boom(lastDisconnect?.error)?.output.statusCode
                if (reason === DisconnectReason.badSession) {
                    console.log(chalk.hex('#FF6158')(`SENDER → File Sesi Buruk, Harap Hapus Sesi dan Pindai Lagi`));
                    setTimeout(startonic, 10000)
                } else if (reason === DisconnectReason.connectionClosed) {
                    console.log(chalk.hex('#FF6158')("SENDER → Koneksi ditutup, menghubungkan kembali...."));
                    //setTimeout(startonic, 10000)
                    throw new Error('Bot Crash → By sitotes anti Stuck reload')
                } else if (reason === DisconnectReason.connectionLost) {
                    console.log(chalk.hex('#FF6158')("SENDER → Koneksi Hilang dari Server, menyambungkan kembali..."));
                    //setTimeout(startonic, 10000)
                    throw new Error('Bot Crash → By sitotes anti Stuck reload')
                } else if (reason === DisconnectReason.connectionReplaced) {
                    console.log(chalk.hex('#FF6158')("SENDER → Koneksi Diganti, Sesi Baru Lain Dibuka, menghubungkan kembali..."));
                    setTimeout(startonic, 10000)
                } else if (reason === DisconnectReason.loggedOut) {
                    console.log(chalk.hex('#FF6158')(`SENDER → Perangkat Keluar, Harap Pindai Lagi Dan Jalankan.`));
                    setTimeout(startonic, 10000)
                } else if (reason === DisconnectReason.restartRequired) {
                    console.log(chalk.hex('#FF6158')("SENDER → Restart Diperlukan, Restart..."));
                    setTimeout(startonic, 10000)
                } else if (reason === DisconnectReason.timedOut) {
                    console.log(chalk.hex('#FF6158')("SENDER → Koneksi Habis, Menghubungkan..."));
                    setTimeout(startonic, 10000)
                } else onic.end(chalk.hex('#FF6158')(`SENDER → Alasan Putus Tidak Diketahui: ${reason}|${connection}`))

                if (__nbl.ttlerr > 3) {
                    console.log(chalk.white.bgRed.bold('Crash by → Connection Loop'))
                    throw new Error('Bot Crash → By sitotes anti loop')
                }
            }
            if (update.connection == "open" || update.receivedPendingNotifications == "true") {
                await store.chats.all()
                console.log(chalk.hex('#FFAD99').bold(`Terhubung dengan = ` + JSON.stringify(onic.user, null, 2)))

                await checkCommitUpdate().then(async bcsk => {
                    let vcp = bcsk.versi.split('.')
                    vcp = (((vcp[2]) + (vcp[1])) + (vcp[0])).trim()
                    let ccp = bcsk.commit.split('.')
                    ccp = (((ccp[2]) + (ccp[1])) + (ccp[0])).trim()

                    if (parseInt(ccp) > parseInt(vcp)) {
                        await onic.sendPesan('6288989781626@s.whatsapp.net', {
                            text: `Refresh Deploy SiTotes : v${bcsk.commit}Dev`
                        }).then((result) => setVersiCommited(bcsk.commit))
                    }
                })

            }
        })

        onic.ev.on('creds.update', saveCreds)
        
        
        return onic
        
        async function getMessage(key) {
            if (store) {
                const msg = await onic.loadMessage(key.remoteJid, key.id);
                return msg?.message || undefined;
            }
            
            return proto.Message.fromObject({});
        }
    }
    */
}
startonic()




fs.watchFile(require.resolve(__filename), () => { throw new Error('Ini Memang Di buat Error Untuk menghentikan kode dan memulai ulang ')})

setInterval(() => {
    if (__nbl.ttlerr > 3) {
        console.log(chalk.white.bgRed.bold('Crash by → Connection Loop'))
        throw new Error('Bot Crash → By sitotes anti loop')
    } else {
        __nbl.ttlerr = __nbl.ttlerr * 0
    }
}, 60000)






module.exports = {
    useMultiFileAuthState,
    DisconnectReason,
    fetchLatestBaileysVersion,
    generateForwardMessageContent,
    prepareWAMessageMedia,
    generateWAMessageFromContent,
    generateMessageID,
    getAggregateVotesInPollMessage,
    downloadContentFromMessage,
    makeInMemoryStore,
    WAMessageContent,
    jidDecode,
    proto,
    makeCacheableSignalKeyStore,
    PHONENUMBER_MCC,
    WAMessageKey,
    
    smsg,
    getBuffer,
    fetchJson,
    delays,
    client,
    chalk
    
};