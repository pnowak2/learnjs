// import everything from module to local const variable
import * as basicModule from "./modules/basicExports.js";
// import chosen objects from module
import { sum, Rectangle } from "./modules/basicExports.js";
// import already renamed object from module
import { renamedSum } from "./modules/renamingExports.js";
// import already renamed object and rename it locally again
import { renamedSum as anotherRenamedSum } from "./modules/renamingExports.js";
// import default object exported from module (no need to use { name} on lhs)
import withDefaultSum from "./modules/defaultExports.js";
// import default and other objects from module
import def, { color } from "./modules/defaultExports.js";
// import renamed default and other objects from module
import {default as renamedDefault, anotherColor} from "./modules/renamingExports.js";
// import module which re exports imported object
import { reexportedSum } from "./modules/re-exportingExports.js";

describe('modules', function() {

	describe('exports', function() {
		it('always run in strict mode');
		it('variables in top level are not visible outside the module');
		it('the value of this is undefined');
		it('html comments not allowed');
		it('must export anything to be available from outside');
		it('cannot export conditionally in if blocks');

		it('should behave...', function() {
			expect(basicModule.color).toBe('red');
			expect(basicModule.name).toBe('peter');
			expect(basicModule.magicNumber).toBe(7);
			expect(basicModule.sum(1, 3)).toBe(4);

			let rect = new basicModule.Rectangle(5, 8);
			expect(rect.area()).toBe(40);

			expect(basicModule.toExport).toBeDefined();
			expect(basicModule.notExported).toBeUndefined();
		});
	});

	describe('imports', function() {
		it('imports chosen elements from module', function() {
			expect(sum).toBeDefined();
			expect(Rectangle).toBeDefined();
		});

		it('renamed object from export', function() {
			expect(renamedSum).toBeDefined();
			expect(anotherRenamedSum).toBeDefined();
		});
	});

	describe('importing and exporting defaults', function() {
		it('default export/import');
	});

	describe('re-exporting', function() {
		it('should be possible to re-export already imported things', function() {
			expect(reexportedSum(1, 9)).toBe(10);
		});
	});
});
