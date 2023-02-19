const fs = require('fs');
const os = require('os');
const path = require('path');
const crypto = require('crypto');

 function deleteFile(filePath) {
    return new Promise((resolve, reject) => {
        fs.unlink(filePath, (err) => {
            if (err) reject(err);
            resolve();
        });
    })
}

function writeToTempFile (data = '') {
    const name = crypto.randomBytes(16).toString('hex');
    return new Promise((resolve, reject) => {
        const tempPath = path.join(os.tmpdir(), 'js-');
        fs.mkdtemp(tempPath, (err, folder) => {
            if (err) 
                return reject(err)

            const filePath = path.join(folder, name);

            fs.writeFile(filePath, data, (err) => {
                if (err) {
                    deleteFile(filePath);
                    reject(err);
                    return
                }
                resolve(filePath)
            })
        })
    })
}

module.exports = { writeToTempFile, deleteFile }