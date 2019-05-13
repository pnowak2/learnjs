describe('5 Document and resource loading', () => {
  describe('5.1 Page events', () => {
    describe('DOMContentLoaded', () => {
      it('should fire when dom is ready, styles, images not loaded yet', () => {
        document.addEventListener('DOMContentLoaded', function(evt) {
          done();
        });
      });
    });

    describe('load', () => {
      it('should fire when dom and styles/images are loaded', () => {
        document.addEventListener('load', function(evt) {
          done();
        });
      });
    });

    describe('onbeforeunload', () => {
      it('should fire when document unloads', () => {
        document.addEventListener('onbeforeunload', function(evt) {
          done();
        });
      });
    });

    describe('readyState', () => {
      it('should give info about current document state', () => {
        document.readyState; // loading, interactive, complete (fully loaded)
      });
    });

    describe('readystatechange', () => {
      it('should fire when document state changes', () => {
        document.addEventListener('readystatechange', function(evt) {
          done();
        });
      });
    });
  });

  describe('5.2 Script Async/Defer', () => {
    it('should defer run as soon as dom is ready', () => { });
    it('should asyn run independent', () => { });
    it('should dynamically add scripts', () => {
      const s = document.createElement('script');
      s.src = '';
      s.async = false;
      document.body.append(s);
    });
  });

  describe('5.3 onload & onerror', () => {
    it('should fire onload when script/img was loaded and executed', () => {
      let script = document.createElement('script');
      script.src = "";
      script.onload = function() {
        // done
      };
    });

    it('should fire onerror when script/img produced error', () => {
      let script = document.createElement('script');
      script.src = "";
      script.onerror = function() {
        // done
      };
    });
  });
});