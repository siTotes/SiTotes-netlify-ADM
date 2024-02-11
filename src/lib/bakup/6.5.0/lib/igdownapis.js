const axios = require("axios")
const cheerio = require('cheerio')

async function igGetUrlDownload(url) {
    return new Promise(async (resolve) => {
        try {
            let json = await (await axios.post("https://saveig.app/api/ajaxSearch", require('querystring').stringify({
                q: url,
                t: "media",
                lang: "en"
            }), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'Accept-Encoding': 'gzip, deflate, br',
                    'Origin': 'https://saveig.app/en',
                    'Referer': 'https://saveig.app/en',
                    'Referrer-Policy': 'strict-origin-when-cross-origin',
                    'User-Agent': 'PostmanRuntime/7.31.1'
                }
            })).data
            let $ = cheerio.load(json.data)
            let data = []
            $('div[class="download-items__btn"]').each((i, e) => data.push({
                type: $(e).find('a').attr('href').match('.jpg') ? 'image' : 'video',
                url: $(e).find('a').attr('href')
            }))
            if (!data.length) return resolve({
                pembuat:'@m.saiful.anam.r',
                status: false
            })
            resolve({
                pembuat:'@m.saiful.anam.r',
                status: true,
                data
            })
        } catch (e) {
            return resolve({
                pembuat:'@m.saiful.anam.r',
                status: false,
                msg: e.message
            })
        }
    })
}

module.exports = {
    igGetUrlDownload
}