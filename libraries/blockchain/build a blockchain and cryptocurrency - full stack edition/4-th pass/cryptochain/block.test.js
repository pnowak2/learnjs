const Block = require("./block");
const { GENESIS_DATA } = require("./config");

describe('Block', () => {
  const timestamp = 'a-date';
  const lastHash = 'foo-hash';
  const hash = 'bar-hash';
  const data = ['blockchain', 'data'];

  const block = new Block({
    timestamp, lastHash, hash, data
  });

  it('has a timestamp, lastHash, hash and data property', () => {
    expect(block.timestamp).toEqual(timestamp);
    expect(block.lastHash).toEqual(lastHash);
    expect(block.hash).toEqual(hash);
    expect(block.data).toEqual(data);
  });
});

describe('genesis()', () => {
  const genesisBlock = Block.genesis();

  it('returns a Block instance', () => {
    expect(genesisBlock).toBeInstanceOf(Block);
  });

  it('returns the genesis data', () => {
    expect(genesisBlock).toEqual(GENESIS_DATA);
  });
});

describe('mineBlock', () => {
  const lastBlock = Block.genesis();
  const data = 'mined data';
  const minedBlock = Block.mineBlock({lastBlock, data});

  beforeEach(() => {
    
  });

  it('returns block instance', () => {
    expect(minedBlock).toBeInstanceOf(Block);
  });

  it('sets the `lastHash` to be the `hash` of lastBlock', () => {
    expect(minedBlock.lastHash).toEqual(lastBlock.hash);
  });

  it('sets the data', () => {
    expect(minedBlock.data).toEqual(data);
  });

  it('sets a `timestamp`', () => {
    expect(minedBlock.timestamp).toBeDefined();
  });
});