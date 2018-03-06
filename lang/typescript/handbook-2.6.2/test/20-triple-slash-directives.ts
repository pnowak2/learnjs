import { expect } from 'chai';

describe('Triple Slash Directives', () => {
  describe('Purpose', () => {
    it('should be used as compiler directives', () => { });
    it('should be valid ONLY at the top of containing file', () => { });
    it('should instruct the compiler to include additional files in the compilation process.', () => { });
  });

  describe('Preprocessing Input Files', () => {
    it('should do preprocessing pass on input files to resolve all triple-slash reference directives. During this process, additional files are added to the compilation.', () => { });
    it('should ignore references if --noResolve is specified', () => { });
  });

  describe('/// <reference types="..." />', () => {
    it('should serve as a declaration of dependency; a /// <reference types="..." /> directive, however, declares a dependency on a package', () => { });
  });

  describe('/// <reference no-default-lib="true"/>', () => {
    it('should mark a file as a default library. This directive instructs the compiler to not include the default library (i.e. lib.d.ts) in the compilation', () => { });
  });

  describe('/// <amd-module />', () => {
    it('should allow passing an optional module name to the compiler', () => {
      // Will result in assigning the name NamedModule to the module as part of calling the AMD define:

      // amdModule.js
      // define("NamedModule", ["require", "exports"], function (require, exports) {
      //   var C = (function () {
      //     function C() {
      //     }
      //     return C;
      //   })();
      //   exports.C = C;
      // });
    });
  });
});
