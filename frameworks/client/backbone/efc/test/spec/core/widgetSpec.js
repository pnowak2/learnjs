define(function(require) {

    var Widget = require('app/core/widget'),
        Module = require('app/core/module');

    describe('Widget', function() {
        describe('Definition', function() {
            it('should be defined', function() {
                expect(Widget).toEqual(jasmine.any(Function));
            });

            it('should extend from module', function() {
                expect(Widget.prototype).toEqual(jasmine.any(Module));
            });

        });
    });
});