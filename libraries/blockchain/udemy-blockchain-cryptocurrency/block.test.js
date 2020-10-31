const Block = require('./block');
const { GENESIS_DATA } = require('./config');
const cryptoHash = require('./crypto-hash');

describe('Block', () => {
    const timestamp = 'a-data';
    const lastHash = 'foo-hash';
    const hash = 'bar-hash'
    const data = ['blockchain', 'data'];
    const block = new Block({ data, lastHash, hash, timestamp });

    it('should has timestamp, lastHash, hash and data property', () => {
        expect(block.timestamp).toEqual(timestamp);
        expect(block.lastHash).toEqual(lastHash);
        expect(block.hash).toEqual(hash);
        expect(block.data).toEqual(data);
    });

    describe('genesis()', () => {
        const genesisBlock = Block.genesis();

        it('returns a Block instance', () => {
            expect(genesisBlock).toEqual(jasmine.any(Block));
        });

        it('return the genesis data', () => {
            expect(genesisBlock).toEqual(GENESIS_DATA);
        });
    });

    describe('mineBlock()', () => {
        const lastBlock = Block.genesis();
        const data = 'mined data';
        const minedBlock = Block.mineBlock({ lastBlock, data });

        it('returns a Block instance', () => {
            expect(minedBlock).toEqual(jasmine.any(Block));
        });

        it('sets the `lastHash` to be the `hash` of the lastBlock', () => {
            expect(minedBlock.lastHash).toEqual(lastBlock.hash);
        });

        it('sets the `data`', () => {
            expect(minedBlock.data).toEqual(data);
        });

        it('sets a `timestamp`', () => {
            expect(minedBlock.timestamp).toBeDefined();
        });

        it('creates a SHA-256 `hash` based on the proper inputs', () => {
            expect(minedBlock.hash).toEqual(
                cryptoHash(
                    minedBlock.data,
                    minedBlock.lastHash,
                    minedBlock.timestamp
                )
            );
        });
    });
});
