define(function (require) {
  var _ = require('underscore'),
    Mustache = require('mustache'),
    Backbone = require('backbone'),
    moduleEventBus = require('app/modules/results/table/events/moduleEventBus'),
    tpl = require('text!app/modules/results/table/templates/result-table-item.html');

  return Backbone.View.extend({
    tagName: 'tr',

    template: _.template(tpl),

    events: {
      'click a.efc-result-showmap': 'didClickShowMap'
    },

    didClickShowMap: function (e) {
      e.preventDefault();
      moduleEventBus.trigger('results:actions:showmap', this.model.toJSON());
    },

    render: function () {
      var html = Mustache.render(tpl, this.model.toJSON());
      this.$el.html(html);

      return this;
    }
  });
});