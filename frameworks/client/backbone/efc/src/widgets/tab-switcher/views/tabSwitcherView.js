define(function (require) {
  var _ = require('underscore'),
      Backbone = require('backbone'),
      TabView = require('./tabView'),
      TabsCollection = require('../collections/tabsCollection');

  return Backbone.View.extend({
    tagName: 'ul',
    className: 'efc-tabs',

    initialize: function () {
      this.subviews = [];
      this.collection = new TabsCollection([
        { title: 'Results on map', identifier: 'map' },
        { title: 'Results on List', identifier: 'list' }
      ]);

      this.collection.each(function (tabModel) {
        var tabView = new TabView({
          model: tabModel
        });

        this.listenTo(tabView, 'tab:selected', this.didSelectTab);

        this.subviews.push(tabView);
      }, this);
    },

    didSelectTab: function (identifier) {
      this.collection.each(function (tabModel) {
        if (identifier !== tabModel.get('identifier')) {
          tabModel.set('selected', false);
        }
      });

      this.trigger('tab-switcher:selected', identifier);
    },

    selectTab: function (identifier) {
      this.collection.each(function (tabModel) {
        if (identifier === tabModel.get('identifier')) {
          tabModel.set('selected', true);
        }
      }, this);
    },

    isTabSelected: function (identifier) {
      var tabModel = this.collection.findWhere({ identifier: identifier });

      if (tabModel) {
        return tabModel.get('selected');
      } else {
        return false;
      }
    },

    render: function () {
      _.each(this.subviews, function (tabView) {
        this.$el.append(tabView.render().el);
      }, this);

      return this;
    }
  });
});