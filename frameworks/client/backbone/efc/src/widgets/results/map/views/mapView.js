define(function (require) {
  var _ = require('underscore'),
      Backbone = require('backbone'),
      tpl = require('text!app/widgets/results/map/templates/result-map.html');

  return Backbone.View.extend({
    className: 'efc-results-map',

    template: _.template(tpl),

    render: function () {
      this.$el.html(this.template());

      return this;
    }
  });
});