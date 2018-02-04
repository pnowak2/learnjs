// /// <reference path="./modules/declarations.d.ts" />

import { expect } from 'chai';
import { StringValidator } from './13-modules/validation';
import { ZipCodeValidator } from './13-modules/exporting-declaration';
import { EmailValidator, ElectronicMailValidator } from './13-modules/exporting-statements';
import { Boo } from './13-modules/exporting-reexporting';
import { StringValidator as SV } from './13-modules/exporting-reexporting-all';
import * as All from './13-modules/exporting-reexporting';
import MyJquery, { vr } from './13-modules/exporting-default-export';
import AmdValidator = require('./13-modules/exporting-export-amd-cjs');

// declare typings for existing module without type definitions
// /// <reference path="./modules/mynode.d" />
// import * as URL from "url";
// let myUrl = URL.parse("http://www.typescriptlang.org");

describe('Modules', () => {

  describe('Exporting', () => {
    it('should export items', () => {
      // export const numberRegexp = /^[0-9]+$/;

      // export class ZipCodeValidator implements StringValidator {
      //   isAcceptable(s: string) {
      //     return s.length === 5 && numberRegexp.test(s);
      //   }
      // }
    });

    it('should export statements', () => {
      // import { StringValidator } from './validation';

      // const numberRegexp = /^[0-9]+$/;

      // class EmailValidator implements StringValidator {
      //   isAcceptable(s: string) {
      //     return s.length === 5 && numberRegexp.test(s);
      //   }
      // }

      // export { EmailValidator }
      // export { EmailValidator as ElectronicMailValidator }
    });

    it('should reexport', () => {
      // export { EmailValidator as RegexpEmailValidator } from './exporting-statements';
      // export { ZipCodeValidator as RegexpZipCodeValidator } from './exporting-declaration';
    });

    it('should reexport all', () => {
      // export * from './validation';
      // export * from './exporting-declaration';
      // export * from './exporting-statements';
    });

    it('should perform default exports', () => {
      // export default class myJquery {}
    });

    it('should perform export =, for amd, commonjs modules', () => {
      // let numberRegexp = /abc/;

      // class ZipCodeValidator {
      //   isAcceptable(s: string) {
      //     return s;
      //   }
      // }

      // export = ZipCodeValidator;
    });


  });

  describe('Importing', () => {
    it('should import ', () => {
      // import { StringValidator} from './modules/validation';
    });

    it('should import all to object', () => {
      // import * as All from './modules/exporting-reexporting';
    });

    it('should import with renaming', () => {
      // import { StringValidator as SV} from './modules/validation';
    });

    it('should import for side effects only', () => {
      // import "./my-module.js";
    });

    it('should import from default export', () => {
      // import MyJquery from './modules/my-jquery';
    });

    it('should perform import from export =, for amd, commonjs modules', () => {
      // import AmdValidator = require('./modules/exporting-export-amd-cjs');
    });
  });

  describe('Code Generation done by TS for AMD / CJS', () => {
    it('should generate specific output for specific module type', () => {
      // sample module
      // import m = require("mod");
      // export let t = m.something + 1;

      // AMD / RequireJS SimpleModule.js

      // define(["require", "exports", "./mod"], function (require, exports, mod_1) {
      //     exports.t = mod_1.something + 1;
      // });
      // CommonJS / Node SimpleModule.js

      // var mod_1 = require("./mod");
      // exports.t = mod_1.something + 1;
      // UMD SimpleModule.js

      // (function (factory) {
      //     if (typeof module === "object" && typeof module.exports === "object") {
      //         var v = factory(require, exports); if (v !== undefined) module.exports = v;
      //     }
      //     else if (typeof define === "function" && define.amd) {
      //         define(["require", "exports", "./mod"], factory);
      //     }
      // })(function (require, exports) {
      //     var mod_1 = require("./mod");
      //     exports.t = mod_1.something + 1;
      // });
      // System SimpleModule.js

      // System.register(["./mod"], function(exports_1) {
      //     var mod_1;
      //     var t;
      //     return {
      //         setters:[
      //             function (mod_1_1) {
      //                 mod_1 = mod_1_1;
      //             }],
      //         execute: function() {
      //             exports_1("t", t = mod_1.something + 1);
      //         }
      //     }
      // });
      // Native ECMAScript 2015 modules SimpleModule.js

      // import { something } from "./mod";
      // export var t = something + 1;
    });

    it('should use command line for generating js file for amd, cjs etc', () => {
      // tsc --module commonjs exporting-statements.ts
    });
  });

  describe('Optional Module Loading And Other Advanced Loading Scenarios', () => {
    it('should conditionally load a module with type safety', () => {
      // declare function require(moduleName: string): any;

      // import { StringValidator as Zip } from "./modules/validation";

      // if (needZipValidation) {
      //     let ZipCodeValidator: typeof Zip = require("./ZipCodeValidator");
      //     let validator = new ZipCodeValidator();
      //     if (validator.isAcceptable("...")) { /* ... */ }
      // }
    });
  });

  describe('Working wiht Other JavaScript Libraries', () => {
    // To describe the shape of libraries not written in TypeScript, we need to declare the API that the library exposes.
    // We call declarations that don’t define an implementation “ambient”. Typically, these are defined in .d.ts files. If you’re familiar with C/C++, you can think of these as .h files. Let’s look at a few examples.
    it('should make declaration of existing library so typings are known for ts, in one file, thus module keyword', () => {
      // /// <reference path="./modules/mynode.d" />
      // import * as URL from "url";
      // let myUrl = URL.parse("http://www.typescriptlang.org");
    });

    it('should make shorthand ambient module always giving type <any> to imported things', () => {
      // declare module "hot-new-module";
      // import x, {y} from "hot-new-module";
    });

    it('should make wildcard module declarations for other types than ts files', () => {
      // in .d.ts file need to declare possibility to import from '/path/folder/asset.txt'
      // declare module "*!text" {
      //     const content: string;
      //     export default content;
      // }

      // then can import like below

      // import fileContent from "./xyz.txt!text";

      // needs to be supported by transpiler like webpack etc.
    });

    it('should use UMD modules', () => {
      // in d.ts file
      // export function isPrime(x: number): boolean;
      // export as namespace mathLib;

      // then can import like below

      // import { isPrime } from "math-lib";
      // isPrime(2);
      // mathLib.isPrime(2); // ERROR: can't use the global definition from inside a module
      // It can also be used as a global variable, but only inside of a script. (A script is a file with no imports or exports.)

      // mathLib.isPrime(2);
    });
  });

  describe('Guidance For Structuring Modules', () => {
    it('should not export too nested resources', () => { });

    it('should export as default if possible', () => {
      // MyClass.ts

      // export default class SomeType {
      //   constructor() { ... }
      // }
      // MyFunc.ts

      // export default function getThing() { return "thing"; }
      // Consumer.ts

      // import t from "./MyClass";
      // import f from "./MyFunc";
      // let x = new t();
      // console.log(f());
    });

    it('should put exports at the same level', () => {
      // MyThings.ts

      // export class SomeType { /* ... */ }
      // export function someFunc() { /* ... */ }
      // Conversely when importing:

      // Explicitly list imported names

      // Consumer.ts

      // import { SomeType, someFunc } from "./MyThings";
      // let x = new SomeType();
      // let y = someFunc();
    });

    it('should use namespace import pattern for importing large number of things', () => {
      // MyLargeModule.ts

      // export class Dog { ... }
      // export class Cat { ... }
      // export class Tree { ... }
      // export class Flower { ... }
      // Consumer.ts

      // import * as myLargeModule from "./MyLargeModule.ts";
      // let x = new myLargeModule.Dog();
    });

    it('should not use namespaces in modules', () => { });
  });
});
