define(function (require) {
  var Module = require('app/core/module'),
      $ = require('jquery'),
      TabSwitcherModule = require('app/modules/tab-switcher/main'),
      SearchboxModule = require('app/modules/search/searchbox/main'),
      TableResultsWidget = require('app/modules/results/table/main'),
      MapResultsModule = require('app/modules/results/map/main');

  return Module.extend({
    initialize: function () {
      var tabSwitcherModule = new TabSwitcherModule;
      var searchboxModule = new SearchboxModule;
      var tableResultsWidget = new TableResultsWidget;
      var mapResultsModule = new MapResultsModule;

      tableResultsWidget.$el.hide();
      mapResultsModule.view.$el.hide();

      this.listenTo(searchboxModule, 'searchbox:keyword', function (searchCriteria) {
        console.log('search', searchCriteria);
        tableResultsWidget.fetchData(searchCriteria);
      });

      this.listenTo(searchboxModule, 'searchbox:invalid', function (errorMessage) {
        console.log('error', errorMessage);
      });

      this.listenTo(tableResultsWidget, 'results:actions:showmap', function (item) {
        tabSwitcherModule.selectMapTab();
        $('.efc-results-map').html(item.title);
      });

      this.listenTo(tabSwitcherModule, 'tab-switcher:selected', function (identifier) {
        if (identifier === 'list') {
          tableResultsWidget.$el.show();
          mapResultsModule.view.$el.hide();
        } else if (identifier === 'map') {
          tableResultsWidget.$el.hide();
          mapResultsModule.view.$el.show();
        }
      });

      tabSwitcherModule.selectListTab();

      $('.efc-searchbox-container').html(searchboxModule.view.render().el);
      $('.efc-tabs-container').html(tabSwitcherModule.view.render().el);
      $('.efc-results-container').append(tableResultsWidget.$el);
      $('.efc-results-container').append(mapResultsModule.view.render().el);
    }
  });
});