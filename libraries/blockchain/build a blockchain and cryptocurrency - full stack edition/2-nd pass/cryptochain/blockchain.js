const Block = require("./block");
const cryptoHash = require("./crypto-hash");

class Blockchain {
    constructor() {
        this.chain = [Block.genesis()];
    }

    addBlock({ data }) {
        const lastBlock = this.chain[this.chain.length - 1];
        const newBlock = Block.mineBlock({ lastBlock, data });

        this.chain.push(newBlock);
    }

    replaceChain(newChain) {
        const isNewChainValid = Blockchain.isValidChain(newChain);
        const isNewChainLonger = newChain.length > this.chain.length;

        if (!isNewChainLonger) {
            console.error('New chain has to be longer than the current one');
            return;
        }

        if (!isNewChainValid) {
            console.error('New chain is invalid');
            return;
        }

        this.chain = newChain;

        console.log('The chain has been replaced')
    }

    static isValidChain(chain) {
        if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
            return false;
        }

        for (let i = 1; i < chain.length; i++) {
            const { timestamp, lastHash, hash, data } = chain[i];
            const actualLashHash = chain[i - 1].hash;

            if (lastHash !== actualLashHash) {
                return false;
            }

            const validatedHash = cryptoHash(timestamp, lastHash, data);

            if (hash !== validatedHash) {
                return false;
            }

        }

        return true;
    }
}

module.exports = Blockchain;