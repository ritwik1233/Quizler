const prod = {
    MongoURI: process.env.MONGOURI,
    secret: process.env.COOKIEKEY,
    sendGrid: process.env.SENDGRID,
    supportEmail: process.env.SUPPORTEMAIL,
    hashPass: process.env.HASHPASS,
    hashAlgo: process.env.HASHALGO
}
module.exports = prod;