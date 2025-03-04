const { genesis } = require('./block');
const Block = require('./block');
const { GENESIS_DATA } = require('./config');

describe('Block', () => {
    const timestamp = 'a-date';
    const lastHash = 'foo-hash';
    const hash= 'foo-hash';
    const data = ['blockchain', 'data'];
    const block = new Block({
        timestamp,
        lastHash,
        hash,
        data
    });

    it('has a timestamp, lashHash, hash, data', () => {
        expect(block.timestamp).toEqual(timestamp);
        expect(block.lastHash).toEqual(lastHash);
        expect(block.hash).toEqual(hash);
        expect(block.data).toEqual(data);
    });
});

describe('genesis()', () => {
    const genesisBlock = Block.genesis();

    it('returns a Block instance', () => {
        expect(genesisBlock instanceof Block).toBe(true);
    });

    it('returns appropriate genesis properties', () => {
        expect(genesisBlock).toEqual(GENESIS_DATA);
    });
});

describe('mineBlock()', () => {
    const lastBlock = Block.genesis();
    const data = 'mined data';
    const minedBlock = Block.mineBlock({ lastBlock, data })

    it('returns a Block instance', () => {
        expect(minedBlock instanceof Block).toBe(true);
    });

    it('sets the `lastHash` to be `hash` of last block', () => {
        expect(minedBlock.lastHash).toEqual(lastBlock.hash)
    });

    it('sets the data', () => {
        expect(minedBlock.data).toEqual(data);
    });

    it('sets a timestamp', () => {
        expect(minedBlock.timestamp).not.toEqual(undefined);
    });
});