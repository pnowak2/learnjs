define(function(require) {

  var _ = require('underscore'),
    Backbone = require('backbone'),
    SearchboxWidget = require('app/widgets/search/searchbox/main'),
    SearchboxView = require('app/widgets/search/searchbox/views/searchboxView'),
    widgetEventBus = require('app/widgets/search/searchbox/events/widgetEventBus'),
    Widget = require('app/core/widget');

  describe('Searchbox Widget', function() {
    describe('prototype', function() {
      it('should be defined', function() {
        expect(SearchboxWidget.prototype).toEqual(jasmine.any(Widget));
      });

      it('should have defined view', function() {
        expect(SearchboxWidget.prototype.view).toEqual(jasmine.any(SearchboxView));
      });
    });

    describe('events', function() {

      beforeEach(function() {
        this.widget = new SearchboxWidget();
        spyOn(this.widget, 'trigger');
      });

      it('should trigger searchbox:keyword', function() {
        expect(this.widget.trigger).not.toHaveBeenCalled();

        widgetEventBus.trigger('searchbox:keyword', 'hello');

        expect(this.widget.trigger).toHaveBeenCalledWith('searchbox:keyword', 'hello');
        expect(this.widget.trigger.calls.count()).toBe(1);
      });

      it('should trigger searchbox:invalid', function() {
        expect(this.widget.trigger).not.toHaveBeenCalled();

        widgetEventBus.trigger('searchbox:invalid', 'validation message');

        expect(this.widget.trigger).toHaveBeenCalledWith('searchbox:invalid', 'validation message');
        expect(this.widget.trigger.calls.count()).toBe(1);
      });
    });
  });

});