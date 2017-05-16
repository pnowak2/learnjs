import Modash from './Modash';

describe('Modash', () => {
  const string = 'there was one catch, and that was CATCH-22';

  describe('truncate()', () => {
    it('truncates a string', () => {
      expect(
        Modash.truncate(string, 19)
      ).toEqual('there was one catch...');
    });

    it('no-ops if <= length', () => {
      expect(
        Modash.truncate(string, string.length)
      ).toEqual(string);
    });
  });

  describe('capitalize()', () => {
    it('capitalizes first letter, lowercases rest', () => {
      const string = 'there was one catch, and that was CATCH-22';
      
      expect(
        Modash.capitalize(string)
      ).toEqual(
        'There was one catch, and that was catch-22'
        );
    });
  });
});