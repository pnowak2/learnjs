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

      describe('Non Relative Imports', () => {
        // import { b } from "moduleB" in source file /root/src/moduleA.ts

        it('should look for ts file in node_modules', () => {
          // /root/src/node_modules/moduleB.ts
        });

        it('should look for tsx file in node_modules', () => {
          // /root/src/node_modules/moduleB.tsx
        });

        it('should look for .d.ts file in node_modules', () => {
          // /root/src/node_modules/moduleB.d.ts
        });

        it('should look for moduleB folder in node_modules and its entry "types" in package.json file', () => {
          // /root/src/node_modules/moduleB/package.json (if it specifies a "types" property)
        });

        it('should look for moduleB folder in node_modules and file index.ts inside', () => {
          // /root/src/node_modules/moduleB/index.ts
        });

        it('should look for moduleB folder in node_modules and file index.tsx inside', () => {
          // /root/src/node_modules/moduleB/index.tsx
        });

        it('should look for moduleB folder in node_modules and file index.d.ts inside', () => {
          // /root/src/node_modules/moduleB/index.d.ts 
        });

        it('should repeat above up the tree until root node_modules', () => {
          // /root/node_modules/moduleB.ts
          // /root/node_modules/moduleB.tsx
          // /root/node_modules/moduleB.d.ts
          // /root/node_modules/moduleB/package.json (if it specifies a "types" property)
          // /root/node_modules/moduleB/index.ts
          // /root/node_modules/moduleB/index.tsx
          // /root/node_modules/moduleB/index.d.ts 

          // /node_modules/moduleB.ts
          // /node_modules/moduleB.tsx
          // /node_modules/moduleB.d.ts
          // /node_modules/moduleB/package.json (if it specifies a "types" property)
          // /node_modules/moduleB/index.ts
          // /node_modules/moduleB/index.tsx
          // /node_modules/moduleB/index.d.ts
        });

      });

      describe('Additional Module Resolution Flags', () => {
        describe('Base URL', () => {
          it('should inform where to find modules. All non-relative names are assumed to be relative to baseUrl', () => { });
          it('should be provided as cmd line argument', () => { });
          it('should be provided as entry in tsconfig.json file (relative to tsconfig.json)', () => { });
          it('should not impact relative modules resolution', () => { });
        });

        describe('Path mapping', () => {
          it('should always work with baseUrl', () => { });
          it('should point exact folder for non relative modules under baseUrl', () => { });
          it('should work as entry in tsconfig.json', () => {
            // {
            //   "compilerOptions": {
            //     "baseUrl": ".", // This must be specified if "paths" is.
            //     "paths": {
            //       "jquery": ["node_modules/jquery/dist/jquery"] // This mapping is relative to "baseUrl"
            //     }
            //   }
            // }
          });
          it('should allow to have many search areas using star', () => {
            // {
            //   "compilerOptions": {
            //     "baseUrl": ".",
            //     "paths": {
            //       "*": [
            //         "*",
            //         "generated/*"
            //       ]
            //     }
            //   }
            // }

            // "*": meaning the same name unchanged, so map <moduleName> => <baseUrl>/<moduleName>
            // "generated/*" meaning the module name with an appended prefix “generated”, so map <moduleName> => <baseUrl>/generated/<moduleName>


            // Following this logic, the compiler will attempt to resolve the two imports as such:

            // import ‘folder1/file2’
            // pattern ‘*’ is matched and wildcard captures the whole module name
            // try first substitution in the list: ‘*’ -> folder1/file2
            // result of substitution is non-relative name - combine it with baseUrl -> projectRoot/folder1/file2.ts.
            // File exists. Done.
            // import ‘folder2/file3’
            // pattern ‘*’ is matched and wildcard captures the whole module name
            // try first substitution in the list: ‘*’ -> folder2/file3
            // result of substitution is non-relative name - combine it with baseUrl -> projectRoot/folder2/file3.ts.
            // File does not exist, move to the second substitution
            // second substitution ‘generated/*’ -> generated/folder2/file3
            // result of substitution is non-relative name - combine it with baseUrl -> projectRoot/generated/folder2/file3.ts.
            // File exists. Done.
          });
        });

        describe('Virtual Directories With rootDirs', () => {
          // Every time the compiler sees a relative module import in a subfolder of one of the rootDirs, 
          // it will attempt to look for this import in each of the entries of rootDirs.
          it('should inform compiler that files from different dirs will be in one dir after build is done', () => {

            // A build step will copy the files in /src/views and /generated/templates/views to the same directory 
            // in the output. 
            //
            // At run-time, a view can expect its template to exist next to it, and thus should import it using
            //  a relative name as "./template".
            //
            //  src
            //  └── views
            //      └── view1.ts (imports './template1')
            //      └── view2.ts

            //  generated
            //  └── templates
            //          └── views
            //              └── template1.ts (imports './view2')

            // tsconfig.json
            // {
            //   "compilerOptions": {
            //     "rootDirs": [
            //       "src/views",
            //       "generated/templates/views"
            //     ]
            //   }
            // }

          });

        });

        describe('Tracing Module Resolution', () => {
          it('should activate with --traceResolution compiler flag', () => { });

          it('should print detailed infos where module is being searched', () => {
            // tsc --traceResolution
            // Results in an output such as:

            // ======== Resolving module 'typescript' from 'src/app.ts'. ========
            // Module resolution kind is not specified, using 'NodeJs'.
            // Loading module 'typescript' from 'node_modules' folder.
            // File 'src/node_modules/typescript.ts' does not exist.
            // File 'src/node_modules/typescript.tsx' does not exist.
            // File 'src/node_modules/typescript.d.ts' does not exist.
            // File 'src/node_modules/typescript/package.json' does not exist.
            // File 'node_modules/typescript.ts' does not exist.
            // File 'node_modules/typescript.tsx' does not exist.
            // File 'node_modules/typescript.d.ts' does not exist.
            // Found 'package.json' at 'node_modules/typescript/package.json'.
            // 'package.json' has 'types' field './lib/typescript.d.ts' that references 'node_modules/typescript/lib/typescript.d.ts'.
            // File 'node_modules/typescript/lib/typescript.d.ts' exist - use it as a module resolution result.
            // ======== Module name 'typescript' was successfully resolved to 'node_modules/typescript/lib/typescript.d.ts'. ========
          });
        });
        
        describe('--noResolve flag', () => {
          it('should instruct the compiler not to "add" any files to the compilation that were not passed on the command line', () => {
            // Normally the compiler will attempt to resolve all module imports before it starts the compilation process. Every time it successfully resolves an import to a file, the file is added to the set of files the compiler will process later on.

            // The --noResolve compiler options instructs the compiler not to “add” any files to the compilation that were not passed on the command line. It will still try to resolve the module to files, but if the file is not specified, it will not be included.

            // For instance:

            // app.ts

            // import * as A from "moduleA" // OK, 'moduleA' passed on the command-line
            // import * as B from "moduleB" // Error TS2307: Cannot find module 'moduleB'.
            // tsc app.ts moduleA.ts --noResolve
            // Compiling app.ts using --noResolve should result in:

            // Correctly finding moduleA as it was passed on the command-line.
            // Error for not finding moduleB as it was not passed.
          });
        });
      });
    });
  });
});
