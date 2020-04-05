const crypto = require('crypto');
const keys = require('../keys');

const algorithm = keys.hashAlgo;
const password = keys.hashPass;
const key = crypto.scryptSync(password, 'salt', 24);
const iv = Buffer.alloc(16, 0);

const encrypt = function (value) {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(value, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

const decrypt = function (encrypted) {
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}


module.exports = {
    encrypt,
    decrypt
}
