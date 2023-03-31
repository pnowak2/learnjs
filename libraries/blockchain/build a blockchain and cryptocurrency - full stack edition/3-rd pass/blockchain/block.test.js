const Block = require('./block');

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

// const block1 = new Block({
//     data: 'foo-data',
//     lastHash: 'foo-lastHash',
//     hash: 'foo-hash',
//     timestamp: '01/01/01',
// });

// console.log('block1', block1);