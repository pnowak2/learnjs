define(function(require) {
  var Widget = require('../../../core/widget'),
    TableView = require('./views/tableView'),
    tableView = new TableView,
    widgetEventBus = require('./events/widgetEventBus');

  return Widget.extend({
    view: tableView,

    initialize: function() {
      this.listenTo(widgetEventBus, 'results:actions:showmap', function(item) {
        this.trigger('results:actions:showmap', item);
      });
    },

    fetchData: function(searchCriteria) {
      tableView.fetchData(searchCriteria);
    }
  });
});