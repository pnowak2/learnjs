const { GENESIS_DATA } = require('./config');
const cryptoHash = require('./crypto-hash');
class Block {
    constructor({ timestamp, lastHash, hash, data, nonce, difficulty }) {
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
        this.difficulty = difficulty;
    }

    static genesis() {
        return new this(GENESIS_DATA);
    }

    static mineBlock({ lastBlock, data }) {
        let timestamp = Date.now();
        const lastHash = lastBlock.hash;
        const { difficulty } = lastBlock
        let nonce = 0;
        let hash = '';

        do {
            nonce += 1;
            timestamp = Date.now();
            hash = cryptoHash(timestamp, data, lastHash, nonce, difficulty);
        } while (hash.substring(0, difficulty) !== '0'.repeat(difficulty))

        return new this({
            timestamp,
            lastHash,
            data,
            hash,
            nonce,
            difficulty
        });
    }
}

module.exports = Block;