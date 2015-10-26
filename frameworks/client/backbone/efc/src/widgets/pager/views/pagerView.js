define(function(require) {
  var Backbone = require('backbone'),
    Mustache = require('mustache'),
    tpl = require('text!../templates/pager.html');

  return Backbone.View.extend({
    className: 'efc-pager',

    render: function() {
      var html = Mustache.render(tpl, this.model.toJSON());
      this.$el.html(html);
    }
  });
});