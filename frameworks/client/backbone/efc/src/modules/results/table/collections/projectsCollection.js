define(function (require) {
  var Backbone = require('backbone'),
      ProjectModel = require('app/modules/results/table/models/projectModel');

  return Backbone.Collection.extend({
    model: ProjectModel
  });
});