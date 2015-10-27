define(function(require) {
  var _ = require('underscore'),
    Backbone = require('backbone'),
    Mustache = require('mustache'),
    PagerView = require('app/widgets/pager/views/pagerView'),
    PagerModel = require('app/widgets/pager/models/pagerModel'),
    tpl = require('text!app/widgets/pager/templates/pager.html');

  describe('Pager View', function() {
    describe('prototype', function() {
      it('should be a view', function() {
        expect(PagerView.prototype).toEqual(jasmine.any(Backbone.View));
      });

      it('should have correct css class', function() {
        expect(PagerView.prototype.className).toEqual('efc-pager');
      });
    });

    describe('render', function() {
      it('should be defined', function() {
        expect(PagerView.prototype.render).toEqual(jasmine.any(Function));
      });

      it('should render with model', function() {
        var view = new PagerView({
          model: new PagerModel
        });

        spyOn(Mustache, 'render');

        view.render();

        expect(Mustache.render).toHaveBeenCalledWith(tpl, view.model.toJSON());
      });

      it('should render correct html', function() {
        var view = new PagerView({
          model: new PagerModel
        });

        spyOn(Mustache, 'render').and.returnValue('content');

        view.render();

        expect(view.$el.html()).toEqual('content');
      });
    });
  });
});