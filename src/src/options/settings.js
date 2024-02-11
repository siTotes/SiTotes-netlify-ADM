const home = (path) => __base + path

const fs = require('fs')
const chalk = require('chalk')

global.firtsChat = true //send firts message to new user
global.autoread = true // auto read message
global.anticall = true //anti call, jika true maka org yg nelpon bot auto di blokir
global.allowGrub = true

global.botdata = "BD_SiTotes"
global.botname = "SiTotes-Md" //namabot kalian
global.ownername = 'Bot᭄ SiTotes ×፝֟͜×  |  v' + fs.readFileSync(home('./versi'), 'utf-8').trim()+'-dev' //nama kalian
global.myweb = "https://web.sitotes.repl.co" //bebas asal jan hapus
global.email = "si.totes.ofc@gmail.com" //bebas
global.negara = "Indonesia" //bebas
global.timezone = 'Asia/Jakarta' //  timezone wib

global.pairingNumber = ""
global.ownnochat = ["6288989781626", "62889897816262"] //ganti agar fitur owner bisa di gunakan
global.ownno = "6288989781626" // nomor wa kalian
global.ownnoplus = "+6288989781626" //nmr wa kalian

global.logo = fs.readFileSync("./src/.sitotes/media/image/sitotes.jpg") // ini lol.jpg adalah nama foto di folder image. untuk foto bot

global.packname = '© SiTotes-Md' //sticker wm ubah
global.author = 'Slebeww' //sticker wm ganti nama kalian

global.sessionName = 'session'

global.sp = '⭔'

let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.redBright(`Update'${__filename}'`))
    delete require.cache[file]
    require(file)
})