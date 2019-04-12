import { months, MODULES_BECAME_STANDARD_YEAR, User } from './13.modules/1.export-before-declarations';

import { sayHi, sayBye } from './13.modules/2.export-apart-from-declarations';

import * as starImport from './13.modules/3.import-as-star';

import { sayHi as asSayHi, sayBye as asSayBye } from './13.modules/4.import-as-rename';

import { anotherHi, anotherBye } from './13.modules/5.export-as-rename';

import AdminUser from './13.modules/6.export-default';

import sayDefault from './13.modules/7.default-alias';
import { default as Def, other } from './13.modules/7.default-alias';

import { iMonths, iSayHi, iSayBye, iAdminUser, iAnotherHi, iSh } from './13.modules/8.re-export';

describe('13 Modules', () => {
  describe('13.1 Modules Introduction', () => {
    it('should read the section, make html excercises', () => { });
  });

  describe('13.2 Export and Import', () => {
    describe('Export before declaration', () => {
      it('should import module contents', () => {
        expect(months).toEqual(['Jan', 'Feb', 'Mar','Apr', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']);
        expect(MODULES_BECAME_STANDARD_YEAR).toEqual(2015);
        expect(new User('peter').name).toEqual('peter');
      });
    });

    describe('Export apart from declarations', () => {
      it('should import module contents', () => {
        expect(sayHi('peter')).toEqual('hi, peter');
        expect(sayBye('peter')).toEqual('bye, peter');
      });
    });
    
    describe('Import * (avoid because of tree shaking issues)', () => {
      it('should import everything as an object using import * as <obj>', () => {       
        expect(starImport.sayHi('peter')).toEqual('hi, peter');
        expect(starImport.sayBye('peter')).toEqual('bye, peter');
      });
    });

    describe('Import as to rename imported members', () => {
      it('should import everything as an object using import * as <obj>', () => {       
        expect(asSayHi('peter')).toEqual('hi, peter');
        expect(asSayBye('peter')).toEqual('bye, peter');
      });
    });

    describe('Export as to rename exported members', () => {
      it('should import everything as an object using import * as <obj>', () => {       
        expect(anotherHi('peter')).toEqual('hi, peter');
        expect(anotherBye('peter')).toEqual('bye, peter');
      });
    });

    describe('Export default', () => {
      it('should export only one thing from file with same name', () => {       
        expect(new AdminUser('peter').name).toEqual('peter');
      });

      it('should use default alias', () => {
        expect(sayDefault('peter')).toEqual('Hello, peter!');
      });

      it('should use default alias', () => {
        expect(Def('peter')).toEqual('Hello, peter!');
      });

      it('should use default alias', () => {
        expect(other).toEqual({});
      });
    });

    describe('Re-export', () => {
      it('should gather all members in one convenient import', () => {
        expect(iMonths).toEqual(['Jan', 'Feb', 'Mar','Apr', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']);
      });
    });
  });

  describe('13.3 Dynamic imports', () => {
    it('should perform dynamic import', async () => {
      const { months } = await import('./13.modules/1.export-before-declarations');
      expect(months).toEqual(['Jan', 'Feb', 'Mar','Apr', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']);
    });
  });
});