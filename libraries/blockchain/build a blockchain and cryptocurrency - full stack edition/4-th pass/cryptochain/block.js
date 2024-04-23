const { GENESIS_DATA } = require("./config");

class Block {
  constructor({ timestamp, lastHash, hash, data }) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
  }

  static genesis() {
    return new this(GENESIS_DATA);
  }

  static mineBlock({lastBlock, data}) {
    const lastHash = lastBlock.hash;
    const timestamp = undefined;

    const minedBlock = new Block({ lastHash, data, timestamp });

    return new Block(minedBlock);
  }
}

module.exports = Block;