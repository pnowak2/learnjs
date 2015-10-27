define(function(require) {
  var Widget = require('../../core/widget'),
    widgetEventBus = require('./events/widgetEventBus'),
    PagerModel = require('./models/pagerModel'),
    PagerView = require('./views/pagerView');

  return Widget.extend({
    initialize: function(options) {
      var pagerModel = new PagerModel(options);

      this.view = new PagerView({
        model: pagerModel
      });

      this.listenTo(widgetEventBus, 'pager:page-request', function(page) {
        this.trigger('pager:page-request', page);
      });
    },

    render: function() {
      this.view.render();
    }
  });
});