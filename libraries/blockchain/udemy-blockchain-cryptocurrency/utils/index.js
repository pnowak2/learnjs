module.exports = {
    cryptoHash: require('./crypto-hash'),
    verifySignature: require('./ec').verifySignature,
    ec: require('./ec').ec
}