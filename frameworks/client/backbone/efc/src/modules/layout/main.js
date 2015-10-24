define(function (require) {
  var Module = require('app/core/module'),
      $ = require('jquery'),
      TabSwitcherModule = require('app/modules/tab-switcher/main'),
      SearchboxModule = require('app/modules/search/searchbox/main'),
      TableResultsModule = require('app/modules/results/table/main'),
      MapResultsModule = require('app/modules/results/map/main');

  return Module.extend({
    app: {
      ui: {
        searchboxContainerSelector: '.efc-searchbox-container',
        resultsContainerSelector: '.efc-results-container',
        tabsContainerSelector: '.efc-tabs-container'
      }
    },

    initialize: function () {
      var tabSwitcherModule = new TabSwitcherModule;
      var searchboxModule = new SearchboxModule;
      var tableResultsModule = new TableResultsModule;
      var mapResultsModule = new MapResultsModule;

      tableResultsModule.view.$el.hide();
      mapResultsModule.view.$el.hide();

      this.listenTo(searchboxModule, searchboxModule.events.search_keyword, function (searchCriteria) {
        console.log('search', searchCriteria);
        tableResultsModule.fetchData(searchCriteria);
      });

      this.listenTo(searchboxModule, searchboxModule.events.search_invalid, function (errorMessage) {
        console.log('error', errorMessage);
      });

      this.listenTo(tableResultsModule, tableResultsModule.events.showmap, function (item) {
        tabSwitcherModule.selectMapTab();
        $('.efc-results-map').html(item.title);
      });

      this.listenTo(tabSwitcherModule, tabSwitcherModule.events.selected, function (identifier) {
        if (identifier === 'list') {
          tableResultsModule.view.$el.show();
          mapResultsModule.view.$el.hide();
        } else if (identifier === 'map') {
          tableResultsModule.view.$el.hide();
          mapResultsModule.view.$el.show();
        }
      });

      tabSwitcherModule.selectListTab();

      $(this.app.ui.searchboxContainerSelector).html(searchboxModule.view.render().el);
      $(this.app.ui.tabsContainerSelector).html(tabSwitcherModule.view.render().el);
      $(this.app.ui.resultsContainerSelector).append(tableResultsModule.view.render().el);
      $(this.app.ui.resultsContainerSelector).append(mapResultsModule.view.render().el);
    }
  });
});