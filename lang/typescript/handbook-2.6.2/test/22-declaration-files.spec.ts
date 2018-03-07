import { expect } from 'chai';
import { foo } from 'c22-declaration-files';

describe('Declaration Files', () => {
  describe('Introduction', () => {
    it('should read the section', () => { });
  });

  describe('Library Structures', () => {
    it('should read the section', () => { });

    describe('Global Libraries', () => {
      it('should be accessed from the global scope (i.e. without using any form of import)', () => { });
      it('should see examples', () => {
        // Global library code is usually extremely simple. A global “Hello, world” library might look like this:

        // function createGreeting(s) {
        //     return "Hello, " + s;
        // }
        // or like this:

        // window.createGreeting = function(s) {
        //     return "Hello, " + s;
        // }
        // When looking at the code of a global library, you’ll usually see:

        // Top-level var statements or function declarations
        // One or more assignments to window.someName
        // Assumptions that DOM primitives like document or window exist
        // You won’t see:

        // Checks for, or usage of, module loaders like require or define
        // CommonJS/Node.js-style imports of the form var fs = require("fs");
        // Calls to define(...)
        // Documentation describing how to require or import the library
      });
    });

    describe('Modular Libraries', () => {
      it('should only work in a module loader environment', () => {
        // Unconditional calls to require or define
        // Declarations like import * as a from 'b'; or export c;
        // Assignments to exports or module.exports

        // var fs = require("fs");
        // In TypeScript or ES6, the import keyword serves the same purpose:

        // import fs = require("fs");
        // You’ll typically see modular libraries include one of these lines in their documentation:

        // var someLib = require('someLib');
        // or

        // define(..., ['someLib'], function(someLib) {

        // });
      });

      it('should identify UMD library', () => {
        // UMD modules check for the existence of a module loader environment. This is an easy-to-spot pattern that looks something like this:

        // (function (root, factory) {
        //     if (typeof define === "function" && define.amd) {
        //         define(["libName"], factory);
        //     } else if (typeof module === "object" && module.exports) {
        //         module.exports = factory(require("libName"));
        //     } else {
        //         root.returnExports = factory(root.libName);
        //     }
        // }(this, function (b) {
      });
    });

    describe('Module Plugin or UMD Plugin', () => {
      it('should change the shape of another module (either UMD or module)', () => {
        // For example, in Moment.js, moment-range adds a new range method to the moment object.
      });

      it('should provide Global Plugin', () => {
        // A global plugin is global code that changes the shape of some global. As with global-modifying modules, these raise the possibility of runtime conflict.

        // For example, some libraries add new functions to Array.prototype or String.prototype.
      });

      it('should provide Global Modifying Modules', () => {
        // A global-modifying module alters existing values in the global scope when they are imported. For example, there might exist a library which adds new members to String.prototype when imported. This pattern is somewhat dangerous due to the possibility of runtime conflicts, but we can still write a declaration file for it.

        // // 'require' call that doesn't use its return value
        // var unused = require("magic-string-time");
        // /* or */
        // require("magic-string-time");

        // var x = "hello, world";
        // // Creates new methods on built-in types
        // console.log(x.startsWithHello());

        // var y = [1, 2, 3];
        // // Creates new methods on built-in types
        // console.log(y.reverseAndSort());
      });
    });

    describe('Consuming Dependencies', () => {
      describe('Dependence on Global Libraries', () => {
        it('should use <reference types=.../>', () => {
          // If your library depends on a global library, use a /// <reference types="..." /> directive:

          // /// <reference types="someLib" />
          
          // function getThing(): someLib.thing;
        });
      });

      describe('Dependence on Modules / UMD Modules', () => {
        it('should use normal imports', () => {
          // If your library depends on a module, use an import statement:

          // import * as moment from "moment";
          
          // function getThing(): moment;
        });
      });
    });
  });

  describe('By Example', () => {
    describe('Global Variables', () => {
      // console.log("Half the number of widgets is " + (foo / 2));
      // Declaration
      
      // Use declare var to declare variables. If the variable is read-only, you can use declare const. You can also use declare let if the variable is block-scoped.
      
      // /** The number of widgets present */
      // declare var foo: number;
    });
  });
});
