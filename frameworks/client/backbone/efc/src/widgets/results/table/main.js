define(function (require) {
  var Widget = require('app/core/widget'),
    TableView = require('app/widgets/results/table/views/tableView'),
    tableView = new TableView,
    moduleEventBus = require('app/widgets/results/table/events/widgetEventBus');

  return Widget.extend({
    initialize: function () {
      this.listenTo(moduleEventBus, 'results:actions:showmap', function (item) {
        this.trigger('results:actions:showmap', item);
      });

      this.render();
    },

    render: function () {
      this.$el = tableView.render().$el;
      return this;
    },

    fetchData: function (searchCriteria) {
      tableView.fetchData(searchCriteria);
    }
  });
});
