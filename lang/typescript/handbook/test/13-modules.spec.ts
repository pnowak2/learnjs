import { expect } from 'chai';

/// exports
import { ZipCodeValidator } from './modules/exporting-declaration';
import { ZipCodeValidator as MyZipCodeValidator } from './modules/exporting-declaration';
import * as validator from './modules/exporting-reexport-all';
import jq from './modules/exporting-default-exports';
import z = require('./modules/exporting-export-equals');
// import './modules/validation'; // does not work for some reason

describe('Modules', () => {
  describe('Module exports', () => {
  });

  describe('Module imports', () => {
    // validator.StringValidator // imported to object
    // jq(); // imported from default export
  });

  describe('Module export = and import = require()', () => {
    // z();
  });
});