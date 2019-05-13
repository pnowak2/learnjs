describe('5 Document and resource loading', () => {
  describe('5.1 Page events', () => {
    describe('DOMContentLoaded', () => {
      it('should fire when dom is ready, styles, images not loaded yet', (done) => {
        document.addEventListener('DOMContentLoaded', function(evt) {
          done();
        });
      });
    });

    describe('load', () => {
      it('should fire when dom and styles/images are loaded', (done) => {
        document.addEventListener('load', function(evt) {
          done();
        });
      });
    });

    describe('onbeforeunload', () => {
      it('should fire when document unloads', (done) => {
        document.addEventListener('onbeforeunload', function(evt) {
          done();
        });
      });
    });

    describe('readyState', () => {
      it('should give info about current document state', (done) => {
        document.readyState; // loading, interactive, complete (fully loaded)
      });
    });

    describe('readystatechange', () => {
      it('should fire when document state changes', (done) => {
        document.addEventListener('readystatechange', function(evt) {
          done();
        });
      });
    });
  });
});