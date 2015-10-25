define(function (require) {
  var Widget = require('../../core/widget'),
      TabSwitcherView = require('./views/tabSwitcherView'),
      tabSwitcherView = new TabSwitcherView;

  return Widget.extend({
    view: tabSwitcherView,

    initialize: function () {
      this.listenTo(tabSwitcherView, 'tab-switcher:selected', function (identifier) {
        this.trigger('tab-switcher:selected', identifier);
      });
    },

    selectListTab: function () {
      tabSwitcherView.selectTab('list');
    },

    selectMapTab: function () {
      tabSwitcherView.selectTab('map');
    },

    isListTabSelected: function () {
      return tabSwitcherView.isTabSelected('list');
    },

    isMapTabSelected: function () {
      return tabSwitcherView.isTabSelected('map');
    }
  });
});