const fs = require('fs');
const stm = require('stream');

async function pathToBuffer(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, buffer) => {
            if (err) {
                reject(err);
            } else {
                resolve(buffer);
            }
        });
    });
}

async function bufferToReadStream(buffer) {
    const readStream = new stm.Readable();
    readStream.push(buffer);
    readStream.push(null); // Signal the end of the stream
    return readStream;
}





module.exports = {
    pathToBuffer,
    bufferToReadStream
};