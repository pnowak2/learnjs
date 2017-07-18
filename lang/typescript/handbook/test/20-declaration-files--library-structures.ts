import { expect } from 'chai';
import * as sinon from 'sinon';

/// <reference path="..." />

describe('Declaration Files', () => {
  describe('Library Structures', () => {
    describe('Global Libraries, global variables', () => {

    });

    describe('Modular Libraries, using require() or amd style', () => {

    });

    describe('UMD - one that can either be used as module (through an import), or as a global (when run in an environment without a module loader)', () => {

    });

    describe('Module Plugin - A module plugin changes the shape of another module (either UMD or module)', () => {

    });

    describe('Global Plugin - A global plugin is global code that changes the shape of some global. As with global-modifying modules, these raise the possibility of runtime conflict.', () => {

    });

    describe('Global Modifying Modules - A global-modifying module alters existing values in the global scope when they are imported.', () => {

    });
  });


  describe('Consuming Dependencies', () => {

    describe('Dependencies on Global Libraries', () => {
      // If your library depends on a global library, use a /// <reference types="..." /> directive:

      /// <reference types="someLib" />
      // function getThing(): someLib.thing;
    });

    describe('Dependencies on Modules', () => {
      // import * as moment from "moment";

      // function getThing(): moment;
    });

    describe('Dependencies on UMD libraries', () => {

      describe('From Global Library', () => {
        /// <reference types="moment" />

        // function getThing(): moment;
      });

      describe('From Module or UMD Library', () => {
        // import * as someLib from 'someLib';
        // Do not use a /// <reference directive to declare a dependency to a UMD library!
      });
    });

  });

});