define(function (require) {
  var Module = require('app/core/module'),
    TableView = require('app/modules/results/table/views/tableView'),
    tableView = new TableView,
    moduleEventBus = require('app/modules/results/table/events/moduleEventBus');

  return Module.extend({
    view: tableView,

    events: {
      showmap: 'results:actions:showmap'
    },

    initialize: function () {
      this.listenTo(moduleEventBus, 'results:actions:showmap', function (item) {
        this.trigger(this.events.showmap, item);
      });
    },

    fetchData: function (searchCriteria) {
      tableView.fetchData(searchCriteria);
    }
  });
});
