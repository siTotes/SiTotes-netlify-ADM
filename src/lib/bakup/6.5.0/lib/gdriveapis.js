const fs = require('fs');
const path = require('path');
const mime = require('mime-types');
const {
    google
} = require('googleapis');
const axios = require('axios');
const cv = require('../lib/con2vert')


const KEYFILEPATH = './lib/.api/GDriveService.json';
const SCOPES = ['https://www.googleapis.com/auth/drive'];
const auth = new google.auth.GoogleAuth({
    keyFile: KEYFILEPATH,
    scopes: SCOPES
});


async function gdriveUpload(buffe, format, parent, name = '') {
    const now = new Date();
    const daysOfWeek = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
    const monthsOfYear = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Ags", "Sep", "Okt", "Nov", "Des"];
    const year = now.getFullYear().toString().substr(2, 2);
    const formatNumber = (num) => (num < 10 ? `0${num}` : num);
    let formattedDate = `${daysOfWeek[now.getDay()]}, ${formatNumber(now.getDate())} ${monthsOfYear[now.getMonth()]} ${year}   ||   ${formatNumber(now.getHours())}:${formatNumber(now.getMinutes())}:${formatNumber(now.getSeconds())}           by SI-TOTES`;

    let fileExtension = format;
    const mimeType = mime.lookup(fileExtension);

    fileExtension = '.' + fileExtension

    if (name == '' ? false : true) {
        formattedDate = name
        fileExtension = ''
    }

    const driveService = google.drive({
        version: 'v3',
        auth
    });



    const fileMetadata = {
        'name': formattedDate + fileExtension,
        'parents': [parent]
    };
    const media = {
        mimeType,
        body: await cv.bufferToReadStream(buffe)
    };

    try {
        const response = await driveService.files.create({
            resource: fileMetadata,
            media,
            fields: 'id, webContentLink'
        });
        return {
            id: response.data.id,
            link: response.data.webContentLink,
            pref: await getResponseUrl(response.data.webContentLink)
        }
    } catch (error) {
        return 'Error uploading the file:', error.message
    }
}





async function getResponseUrl(url) {
    return axios.head(url)
        .then(response => {
            const clientRequest = response.request;
            if (clientRequest.res.responseUrl) {
                return clientRequest.res.responseUrl
            } else if (clientRequest._redirectable._currentUrl) {
                return clientRequest._redirectable._currentUrl
            } else {
                return ''
            }
        })
        .
    catch(error => {
        if(error.code == 'ERR_SOCKET_CONNECTION_TIMEOUT'){
            getResponseUrl(url);
        }
        console.log(error)
        
    });
}
const v = async () => {

}
//v()
module.exports = {
    gdriveUpload,
    getResponseUrl
}