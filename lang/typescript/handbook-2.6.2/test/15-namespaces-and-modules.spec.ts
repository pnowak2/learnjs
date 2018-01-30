describe('Namespaces and Modules', () => {
  describe('Modules', () => {
    it('should import not reference with /// reference path=', () => { });
    it('should not nest needlesly namespaces, instead use simple module exports', () => {
      // recommended
      // shapes.ts

      // export class Triangle { /* ... */ }
      // export class Square { /* ... */ }
      // shapeConsumer.ts

      // import * as shapes from "./shapes";
      // let t = new shapes.Triangle();
     });
  });
});
