define(function (require) {
  var Module = require('app/core/module'),
      TabSwitcherView = require('app/modules/tab-switcher/views/tabSwitcherView'),
      tabSwitcherView = new TabSwitcherView;

  return Module.extend({
    view: tabSwitcherView,

    events: {
      selected: 'tab-switcher:selected'
    },

    initialize: function () {
      this.listenTo(tabSwitcherView, 'tab-switcher:selected', function (identifier) {
        this.trigger(this.events.selected, identifier);
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