import { expect } from 'chai';

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

    describe('Global Functions', () => {
      // greet("hello, world");

      // declare function greet(greeting: string): void;
    });

    describe('Objects With Properties', () => {
      // let result = myLib.greet("hello, world");
      // console.log("The computed greeting is:" + result);

      // let count = myLib.quantity;

      // declare namespace myLib {
      //   function greet(name: string);
      //   let quantity: number;
      // }

    });

    describe('Overloaded Functions', () => {
      // let x: Widget = getWidget(43);
      // let arr: Widget[] = getWidget("all of them");

      // declare function getWidget(n: number): Widget;
      // declare function getWidget(s: string): Widget[];
    });

    describe('Reusable Types, Interfaces', () => {
      // greet({
      //   greeting: "hello world",
      //   duration: 4000
      // });
      // Declaration

      // Use an interface to define a type with properties.

      // interface GreetingSettings {
      //   greeting: string;
      //   duration?: number;
      //   color?: string;
      // }

      // declare function greet(setting: GreetingSettings): void;
    });

    describe('Reusable Types, Type Aliases', () => {
      // function getGreeting() {
      //   return "howdy";
      // }
      // class MyGreeter extends Greeter { }

      // greet("hello");
      // greet(getGreeting);
      // greet(new MyGreeter());
      // Declaration

      // You can use a type alias to make a shorthand for a type:

      //   type GreetingLike = string | (() => string) | MyGreeter;

      // declare function greet(g: GreetingLike): void;
    });
  });

  describe('Dos and Donts', () => {
    it('should read the section', () => { });
  });

  describe('Deep Dive', () => {
    it('should read the section', () => { });
  });

  describe('Templates', () => {
    it('should read the section', () => { });
  });

  describe('Publishing', () => {
    it('should read the section', () => { });

    describe('Including declarations in your npm package', () => {
      describe('Bundle with your npm package', () => {
        it('should bundle types within npm', () => {
          // If your package has a main .js file, you will need to indicate the main declaration file in your package.json file as well. Set the types property to point to your bundled declaration file. For example:
  
          // {
          //     "name": "awesome",
          //     "author": "Vandelay Industries",
          //     "version": "1.0.0",
          //     "main": "./lib/main.js",
          //     "types": "./lib/main.d.ts"
          //     "typings": "./lib/main.d.ts" <-- synonim of types
          // }
          // Note that the "typings" field is synonymous with "types", and could be used as well.
  
          // Also note that if your main declaration file is named index.d.ts and lives at the root of the package (next to index.js) you do not need to mark the "types" property, though it is advisable to do so.
        });
  
        it('should use <reference types="">', () => {
          // Red flags
          // /// <reference path="..." />
          // Don’t use /// <reference path="..." /> in your declaration files.
  
          // /// <reference path="../typescript/lib/typescriptServices.d.ts" />
          // ....
          // Do use /// <reference types="..." /> instead.
        });
      });
      // or
      describe('Publish to the @types organization on npm.', () => {
        it('should read the section', () => { });
      });
    });
  });



  describe('Consumption', () => {
    it('should read the section', () => {
      // Getting type declarations in TypeScript 2.0 and above requires no tools apart from npm.

      // As an example, getting the declarations for a library like lodash takes nothing more than the following command
      
      // npm install --save @types/lodash
      // It is worth noting that if the npm package already includes its declaration file as described in Publishing, downloading the corresponding @types package is not needed.
      
      // Consuming
      // From there you’ll be able to use lodash in your TypeScript code with no fuss. This works for both modules and global code.
      
      // For example, once you’ve npm install-ed your type declarations, you can use imports and write
      
      // import * as _ from "lodash";
      // _.padStart("Hello TypeScript!", 20, " ");
      // or if you’re not using modules, you can just use the global variable _.
      
      // _.padStart("Hello TypeScript!", 20, " ");
    });
  });
});
