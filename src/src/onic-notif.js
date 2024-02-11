const home = (path) => __base + path

const {
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

    getBuffer,
    fetchJson,
    delays,
    client,
    chalk
} = require(home('./onic'))
const fs = require('fs')

module.exports = onic = async (onic, store, state, saveCreds, version, isLatest) => {
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

    try {
        nocache('./slebeww', module => console.log(` "${module}" Telah diupdate!`))
        nocache('./storyReplay', module => console.log(` "${module}" Telah diupdate!`))

        nocache('./commands/convert-menu')
        nocache('./commands/download-media')
        nocache('./commands/game-rpg')
        nocache('./commands/google-it')
        nocache('./commands/group-only')
        nocache('./commands/openai-gpt')
        nocache('./commands/wibu-docpusat')
        
        var smgmsusu = require(home('./lib/simple'))
        var smsg = smgmsusu.smsg
        nocache(home('./lib/simple'), async module => {
            smgmsusu = require(module)
            smsg = smgmsusu.smsg
        })
        
        onic.ev.on('messages.upsert', async chatUpdate => {
            // console.log(chalk.black(chalk.bgWhite(JSON.stringify(chatUpdate ,null , 2))))
            try {
                mek = chatUpdate.messages[0]
                if (!mek.message) return
                mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
                if (!onic.public && !mek.key.fromMe && chatUpdate.type === 'notify') return
                if (mek.key.id.startsWith('BAE5') && mek.key.id.length === 16) return
                m = smsg(onic, mek, store)
                if (m.id == __nbl.chekid[m.chat]) return console.log('dobel detek')
                if (m.mtype == 'pollUpdateMessage') return
                __nbl.chekid[m.chat] = m.id
                
                if (mek.key && mek.key.remoteJid === 'status@broadcast') return require("./storyReplay")(onic, m, chatUpdate, mek, store)
                require("./slebeww")(onic, m, chatUpdate, mek, store)
            } catch (err) {
                console.log(err)
            }
        })

        onic.ev.on('poll-recipient', async chatUpdate => {
            // console.log(chalk.black(chalk.bgWhite(JSON.stringify(chatUpdate ,null , 2))))
            try {
                mek = chatUpdate.messages[0]
                if (!mek.message) return
                mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
                if (!onic.public && !mek.key.fromMe && chatUpdate.type === 'notify') if(chatUpdate.typePoll?false:true) return
                if (mek.key.id.startsWith('BAE5') && mek.key.id.length === 16) if(chatUpdate.typePoll?false:true) return
                m = smsg(onic, mek, store)
                if (m.mtype == 'pollUpdateMessage') return
                

                require("./slebeww")(onic, m, chatUpdate, mek, store)
            } catch (err) {
                console.log(err)
            }
        })

        onic.ev.on('schedule-trigger', async timeUpdate => {
            // console.log(chalk.black(chalk.bgWhite(timeUpdate)))
            
            
            //reminder message user
            
            const cmdb = await onic.mdbConnectDb('reminder');
            let remdata = await cmdb.find({}).toArray()
            
            const currentTime = new Date();
            currentTime.setHours(currentTime.getHours() + 7)
            const currentDay = currentTime.getDay();
            
            for (const reminder of remdata) {
                for (const entry of reminder.listreminder) {
                    const reminderTime = entry.jam;
                    const [hour, minute, days] = reminderTime.split(/:|\//);
            
                    const reminderDate = new Date();
                    reminderDate.setHours(parseInt(hour));
                    reminderDate.setMinutes(parseInt(minute));
            
                    const daysArray = (days === 'sen')? [1]: (days === 'sel')? [2]: (days === 'rab')? [3]: (days === 'kam')? [4]: (days === 'jum')? [5]: (days === 'sab')? [6]: (days === 'min')? [0]: (days === 'all')? [0, 1, 2, 3, 4, 5, 6]: [0];
            
                    if (reminderDate.getHours() === currentTime.getHours() && reminderDate.getMinutes() === currentTime.getMinutes() && daysArray.includes(currentDay)) {
                        // console.log(`${reminderTime}`);
                        for (const mekr of entry.send) {
                            await delays(1)
                            await onic.sendMessageJson(reminder.jid, JSON.parse(mekr)).catch(_=> console.log('error'))
                        }
                    } else {
                        // console.log(reminderTime + false);
                    }
                }
            }
        })

        onic.ev.on('messages.update', async chatUpdate => {
            // console.log(chalk.black(chalk.bgWhite(JSON.stringify(chatUpdate ,null , 2))))
            try {
                for (const { key, update } of chatUpdate) {
                    if (update.pollUpdates && key.fromMe) {
                        const pollCreation = await getMessage(key)
                        if (pollCreation) {
                            let pollUpdate = getAggregateVotesInPollMessage({
                                message: pollCreation,
                                pollUpdates: update.pollUpdates,
                            })
                            // console.log(JSON.stringify(pollUpdate ,null , 2))
                            var getPoll
                            // for(let i = 0; i < pollUpdate.length; i++){
                                // if(pollUpdate[i].voters.length>0){
                                    // getPoll = pollUpdate[i].name
                                // }
                            // }
                            var getPoll = (await pollUpdate.filter(v => v.voters.length !== 0)[0])?.name
                            // var getId = pollCreation.pollCreationMessage.name.match(/~🆔([a-z0-9A-Z]+)~/)?.[1]
                            // if (getId == undefined) getId = chatUpdate[0].key.id
                            if (getPoll == undefined) return
                            
                            console.log('#' + getPoll)
                            // console.log('#' + getId)
                            await onic.appenPollMessage('#' + getPoll, chatUpdate)
                        }
                    }
                }
            } catch (err) {
                console.log(err)
            }
        })

        onic.ev.process(
            async (events) => {
                if (events['messages.upsert']) {
                    mek = events['messages.upsert'].messages[0]
                    if (!mek.message) return
                    mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
                    m = smsg(onic, mek, store)
                    if (m.mtype == 'pollUpdateMessage') return
                    if (m.mtype == 'reactionMessage') return
                
                    
                    // console.log(events['messages.upsert'])
                    __nbl.infoMSG.push(JSON.parse(JSON.stringify(mek)))
                
                    fs.writeFileSync(__nbl.lcInfo, await onic.jsonFineFormated(__nbl.infoMSG))
                    __nbl.infoMSG = JSON.parse(fs.readFileSync(__nbl.lcInfo))
                    if (__nbl.infoMSG.length === 5000) {
                        __nbl.infoMSG.splice(0, 3000)
                        // fs.writeFileSync(__nbl.lcInfo, JSON.stringify(__nbl.infoMSG, null, 2))
                        
                        fs.writeFileSync(__nbl.lcInfo, await onic.jsonFineFormated(__nbl.infoMSG))
                        __nbl.infoMSG = JSON.parse(fs.readFileSync(__nbl.lcInfo))
                    }
                }
                
                if (events['connection.update']) {}

                if (events['creds.update']) {
                    await saveCreds()
                }

                if (events['labels.association']) {
                    // console.log(events['labels.association'])
                }


                if (events['labels.edit']) {
                    // console.log(events['labels.edit'])
                }

                if (events.call) {
                    // console.log('recv call event', events.call)
                }

                if (events['messaging-history.set']) {}

                if (events['message-receipt.update']) {
                    // console.log(events['message-receipt.update'])
                }

                if (events['messages.reaction']) {
                    // console.log(events['messages.reaction'])
                }

                if (events['presence.update']) {
                    // console.log(events['presence.update'])
                }

                if (events['chats.update']) {
                    // console.log(events['chats.update'])
                }

                if (events['contacts.update']) {}
            }
        )


        onic.decodeJid = (jid) => {
            if (!jid) return jid
            if (/:\d+@/gi.test(jid)) {
                let decode = jidDecode(jid) || {}
                return decode.user && decode.server && decode.user + '@' + decode.server || jid
            } else return jid
        }

        onic.public = true





        async function getMessage(key) {
            if (store) {
                const msg = await store.loadMessage(key.remoteJid, key.id)
                return msg?.message || undefined
            }

            return proto.Message.fromObject({})
        }

    } catch (err) {
        console.log(err.stack)
    } finally {
        /**/
        // console.log(__filename.replace('/data/data/com.termux/files/home', '.'), '→ Save');
    }
}