define(function(require) {
  var _ = require('underscore'),
    Backbone = require('backbone');

  return Backbone.View.extend({
    tagName: 'li',
    className: 'efc-tab',

    template: _.template("<%= title %>"),

    events: {
      'click': 'didClickTab'
    },

    initialize: function() {
      this.listenTo(this.model, 'change:selected', this.selectionDidChange);
    },

    didClickTab: function() {
      this.model.set('selected', true);
    },

    isTabSelected: function() {
      return this.model.get('selected');
    },

    selectionDidChange: function() {
      if (this.model.get('selected')) {
        this.trigger('tab:selected', this.model.get('identifier'));
      }

      this.$el.toggleClass('efc-selected', this.model.get('selected'));
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));

      return this;
    }
  });
});