import { expect } from 'chai';
import { ModuleB } from './16-module-resolution/module-b/module-b';

describe('Module Resolution', () => {

  describe('Loading strategies (--moduleResolution)', () => {
    it('should support classic strategy', () => { });
    it('should support node strategy', () => { });
  });

  describe('Relative imports', () => {
    it('should start with /, ./ or ../', () => {
      // import Entry from "./components/Entry";
      // import { DefaultHeaders } from "../constants/http";
      // import "/mod";
    });
  });

  describe('Non Relative imports', () => {
    it('should by anything else than relative imports', () => {
      // import * as $ from "jquery";
      // import { Component } from "@angular/core";
    });

    it('should resolve in relation to baseUrl or path mapping or ambient module declarations', () => { });
  });

  describe('Module Resolution Strategies', () => {
    describe('Classic', () => {
      describe('Relative Imports', () => {
        // import { ModuleB } from './16-module-resolution/module-b/module-b';

        it('should look for ts file ', () => {
          // './16-module-resolution/module-b/module-b.ts';
        });

        it('should look for d.ts file ', () => {
          // './16-module-resolution/module-b/module-b.d.ts';
        });
      });

      describe('Non Relative Imports', () => {
        // we are at: /root/src/folder/me.ts
        // import { ModuleB } from 'module-b';

        it('should look in current directory for ts file', () => {
          // /root/src/folder//module-b.ts';
        });

        it('should look in current directory for d.ts file', () => {
          // /root/src/folder/module-b.d.ts';
        });

        it('should look in parent directories for ts and d.ts file', () => {
          // /root/src/module-b.ts';
          // /root/src/module-b.d.ts';

          // /root/module-b.ts';
          // /root/module-b.d.ts';

          // /module-b.ts';
          // /module-b.d.ts';
        });
      });
    });

    describe('Node', () => {
      // from official node documentation
      // require(X) from module at path Y
      // 1. If X is a core module,
      //   a. return the core module
      //   b. STOP
      // 2. If X begins with '/'
      //   a. set Y to be the filesystem root
      // 3. If X begins with './' or '/' or '../'
      //   a. LOAD_AS_FILE(Y + X)
      //   b. LOAD_AS_DIRECTORY(Y + X)
      // 4. LOAD_NODE_MODULES(X, dirname(Y))
      // 5. THROW "not found"

      // LOAD_AS_FILE(X)
      // 1. If X is a file, load X as JavaScript text.  STOP
      // 2. If X.js is a file, load X.js as JavaScript text.  STOP
      // 3. If X.json is a file, parse X.json to a JavaScript Object.  STOP
      // 4. If X.node is a file, load X.node as binary addon.  STOP

      // LOAD_INDEX(X)
      // 1. If X/index.js is a file, load X/index.js as JavaScript text.  STOP
      // 2. If X/index.json is a file, parse X/index.json to a JavaScript object. STOP
      // 3. If X/index.node is a file, load X/index.node as binary addon.  STOP

      // LOAD_AS_DIRECTORY(X)
      // 1. If X/package.json is a file,
      //   a. Parse X/package.json, and look for "main" field.
      //   b. let M = X + (json main field)
      //   c. LOAD_AS_FILE(M)
      //   d. LOAD_INDEX(M)
      // 2. LOAD_INDEX(X)

      // LOAD_NODE_MODULES(X, START)
      // 1. let DIRS=NODE_MODULES_PATHS(START)
      // 2. for each DIR in DIRS:
      //   a. LOAD_AS_FILE(DIR/X)
      //   b. LOAD_AS_DIRECTORY(DIR/X)

      // NODE_MODULES_PATHS(START)
      // 1. let PARTS = path split(START)
      // 2. let I = count of PARTS - 1
      // 3. let DIRS = []
      // 4. while I >= 0,
      //   a. if PARTS[I] = "node_modules" CONTINUE
      //   b. DIR = path join(PARTS[0 .. I] + "node_modules")
      //   c. DIRS = DIRS + DIR
      //   d. let I = I - 1
      // 5. return DIRS

      describe('Relative Imports', () => {
        // file /root/src/moduleA.js wants to do var x = require("./moduleB")

        it('should look for js file', () => {
          // './root/src/moduleB.js';
        });

        it('should look for moduleB folder and its entry "main" in package.json file', () => {
          // /root/src/moduleB/package.json contains { "main": "lib/mainModule.js" }
          // './root/src/moduleB/lib/mainModule.js';
        });
        
        it('should look for moduleB folder and file index.js inside', () => {
          // './root/src/moduleB/index.js';
        });
      });

      describe('Non Relative Imports and node_modules directory', () => {
        // file /root/src/moduleA.js wants to do var x = require("moduleB")

        it('should look for js file in node_modules in current directory', () => {
          // '/root/src/node_modules/moduleB.js';
        });

        it('should look for js file in package.json main entry in node_modules/moduleB in current directory', () => {
          // '/root/src/node_modules/moduleB/package.json#<main entry>';
        });

        it('should look for index.js file in node_modules/index.js in current directory', () => {
          // '/root/src/node_modules/moduleB/index.js;
        });

        it('should do the same as steps above trying on each parent folder until root reached', () => {
          // /root/node_modules/moduleB.js
          // /root/node_modules/moduleB/package.json (if it specifies a "main" property)
          // /root/node_modules/moduleB/index.js 

          // /node_modules/moduleB.js
          // /node_modules/moduleB/package.json (if it specifies a "main" property)
          // /node_modules/moduleB/index.js
        });
      });
    });

    describe('Typescript', () => {
      describe('Relative Imports', () => {
        // import { b } from "./moduleB" in /root/src/moduleA.ts

        it('should look for ts file', () => {
          // './root/src/moduleB.ts';
        });

        it('should look for tsx file', () => {
          // './root/src/moduleB.tsx';
        });

        it('should look for .d.ts file', () => {
          // './root/src/moduleB.d.ts';
        });

        it('should look for moduleB folder and its entry "types" in package.json file', () => {
        });

        it('should look for moduleB folder and file index.ts inside', () => {
          // './root/src/moduleB/index.ts';
        });

        it('should look for moduleB folder and file index.tsx inside', () => {
          // './root/src/moduleB/index.tsx';
        });

        it('should look for moduleB folder and file index.d.ts inside', () => {
          // './root/src/moduleB/index.d.ts';
        });
      });

      xdescribe('Non Relative Imports', () => {
        // import { b } from "moduleB" in /root/src/moduleA.ts

        it('should look for ts file', () => {
          // './root/src/moduleB.ts';
        });

        it('should look for tsx file', () => {
          // './root/src/moduleB.tsx';
        });

        it('should look for .d.ts file', () => {
          // './root/src/moduleB.d.ts';
        });

        it('should look for moduleB folder and file index.ts inside', () => {
          // './root/src/moduleB/index.ts';
        });

        it('should look for moduleB folder and file index.tsx inside', () => {
          // './root/src/moduleB/index.tsx';
        });

        it('should look for moduleB folder and file index.d.ts inside', () => {
          // './root/src/moduleB/index.d.ts';
        });

        it('should look for moduleB folder and its entry "types" in package.json file', () => {
          // /root/src/moduleB/package.json contains { "types": ".." }
          // './root/src/moduleB/lib/mainModule.js';
        });
      });
    });
  });
});
