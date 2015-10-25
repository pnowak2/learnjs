define(function (require) {
  var $ = require('jquery'),
      app = require('../../app'),
      Widget = require('../../core/widget'),
      TabSwitcherWidget = require('widgets/tab-switcher/main'),
      SearchboxWidget = require('widgets/search/searchbox/main'),
      TableResultsWidget = require('widgets/results/table/main'),
      MapResultsWidget = require('widgets/results/map/main');

  return Widget.extend({
    initialize: function () {
      var tabSwitcherWidget = new TabSwitcherWidget;
      var searchboxWidget = new SearchboxWidget;
      var tableResultsWidget = new TableResultsWidget;
      var mapResultsWidget = new MapResultsWidget;

      tableResultsWidget.view.$el.hide();
      mapResultsWidget.view.$el.hide();

      this.listenTo(searchboxWidget, 'searchbox:keyword', function (searchCriteria) {
        console.log('search', searchCriteria);
        tableResultsWidget.fetchData(searchCriteria);
      });

      this.listenTo(searchboxWidget, 'searchbox:invalid', function (errorMessage) {
        console.log('error', errorMessage);
      });

      this.listenTo(tableResultsWidget, 'results:actions:showmap', function (item) {
        tabSwitcherWidget.selectMapTab();
        $('.efc-results-map').html(item.title);
      });

      this.listenTo(tabSwitcherWidget, 'tab-switcher:selected', function (identifier) {
        if (identifier === 'list') {
          tableResultsWidget.view.$el.show();
          mapResultsWidget.view.$el.hide();
        } else if (identifier === 'map') {
          tableResultsWidget.view.$el.hide();
          mapResultsWidget.view.$el.show();
        }
      });

      this.listenTo(app, 'app:ajax:start', function () {
        console.log('ajax start');
      });

      this.listenTo(app, 'app:ajax:stop', function () {
        console.log('ajax stop');
      });  

      this.listenTo(app, 'app:ajax:error', function (event, jqxhr, settings, thrownError) {
        console.log('ajax error');
        app.showError('something went wrong');
      });   

      tabSwitcherWidget.selectListTab();

      $('.efc-searchbox-container').html(searchboxWidget.view.render().$el);
      $('.efc-tabs-container').html(tabSwitcherWidget.view.render().$el);
      $('.efc-results-container').append(tableResultsWidget.view.render().$el);
      $('.efc-results-container').append(mapResultsWidget.view.render().$el);
    }
  });
});