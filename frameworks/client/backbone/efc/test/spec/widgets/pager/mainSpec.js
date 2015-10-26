define(function(require) {

  var _ = require('underscore'),
    Backbone = require('backbone'),
    Widget = require('app/core/widget'),
    widgetEventBus = require('app/widgets/pager/events/widgetEventBus'),
    PagerView = require('app/widgets/pager/views/pagerView'),
    PagerModel = require('app/widgets/pager/models/pagerModel'),
    PagerWidget = require('app/widgets/pager/main');

  describe('Pager Widget', function() {
    describe('prototype', function() {
      it('should be a widget', function() {
        expect(PagerWidget.prototype).toEqual(jasmine.any(Widget));
      });

      it('should define initialize', function() {
        expect(PagerWidget.prototype.initialize).toEqual(jasmine.any(Function));
      });

      it('should define render', function() {
        expect(PagerWidget.prototype.render).toEqual(jasmine.any(Function));
      });
    });

    describe('initialize', function() {
      beforeEach(function() {
        spyOn(PagerWidget.prototype, 'initialize').and.callThrough();

        this.widget = new PagerWidget({
          total: 100,
          pageSize: 20
        });
      });

      it('should have view defined', function() {
        expect(this.widget.view).toEqual(jasmine.any(PagerView));
      });

      it('should have view with model', function() {
        expect(this.widget.view.model).toEqual(jasmine.any(PagerModel));
      });

      it('should have model with proper attributes', function() {
        expect(this.widget.view.model.toJSON()).toEqual({
          total: 100,
          pageSize: 20
        });
      });

      it('should accept arguments', function() {
        expect(PagerWidget.prototype.initialize).toHaveBeenCalledWith({
          total: 100,
          pageSize: 20
        });
      });
    });

    describe('events', function() {
      beforeEach(function() {
        spyOn(PagerWidget.prototype, 'trigger');
        this.widget = new PagerWidget
      });

      it('should trigger page request event', function() {
        widgetEventBus.trigger('pager:page-request', 1);
        expect(PagerWidget.prototype.trigger).toHaveBeenCalledWith('pager:page-request', 1);
      });
    });

    describe('render', function() {
      it('should call render view', function() {
        var widget = new PagerWidget;
        spyOn(widget.view, 'render');

        widget.render();

        expect(widget.view.render).toHaveBeenCalled();
      });
    });
  });
});