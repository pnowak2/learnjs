define(function (require) {
  var _ = require('underscore'),
    Mustache = require('mustache'),
    Backbone = require('backbone'),
    searchService = require('app/services/search/searchService'),
    ProjectCollection = require('app/widgets/results/table/collections/projectsCollection'),
    ItemView = require('app/widgets/results/table/views/itemView'),
    tpl = require('text!app/widgets/results/table/templates/result-table.html');

  return Backbone.View.extend({
    className: 'efc-results-table',

    template: _.template(tpl),

    initialize: function () {
      _.bindAll(this, 'fetchSuccess', 'fetchFailure');
      this.collection = new ProjectCollection;
      this.listenTo(this.collection, 'reset', this.render);
    },

    fetchData: function (searchCriteria) {
      searchService.searchByKeyword(
        searchCriteria.keyword,
        this.fetchSuccess, 
        this.fetchFailure
      );
    },

    fetchSuccess: function (projects) {
      this.collection.reset(projects);
    },

    fetchFailure: function (errorMessage) {

    },

    render: function () {
      this.$el.html(Mustache.render(tpl, {
        hasProjects: this.collection.isEmpty()
      }));

      var tbody = this.$el.find('tbody');

      this.collection.each(function (itemModel) {
        var itemView = new ItemView({
          model: itemModel
        });
        tbody.append(itemView.render().el);
      }, this);

      return this;
    }
  });
});