define(['app/views/bookView'], function (BookView) {

	describe('Book View', function() {
		it('should be defined', function() {
			expect(BookView.prototype).toEqual(jasmine.any(Backbone.View));
		});

		it('should have correct tag name', function() {
			expect(BookView.prototype.tagName).toEqual('li');
		});
	});

	describe('Jasmine jQuery', function() {
		it('should use text plugin', function() {
			expect('<div><%= title %></div>').toContainText('<%= title %>');
		});
	});

	describe('Jasmine ajax', function() {
		beforeEach(function () {
			jasmine.Ajax.install();
		});

		afterEach(function () {
			jasmine.Ajax.uninstall();
		});

		it('should use jasmine-ajax', function() {
			var doneFn = jasmine.createSpy();

      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function(args) {
        if (this.readyState == this.DONE) {
          doneFn(this.responseText);
        }
      };

      xhr.open("GET", "/api/books");
      xhr.send();

			expect(jasmine.Ajax.requests.mostRecent().url).toBe('/api/books');
			expect(doneFn).not.toHaveBeenCalled();

      jasmine.Ajax.requests.mostRecent().respondWith({
        "status": 200,
        "contentType": "application/json",
        "responseText": "testing"
			});

			expect(doneFn).toHaveBeenCalledWith('testing');
		});
	});

});
