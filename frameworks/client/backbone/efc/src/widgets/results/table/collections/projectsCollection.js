define(function(require) {
  var Backbone = require('backbone'),
    ProjectModel = require('../models/projectModel');

  return Backbone.Collection.extend({
    model: ProjectModel
  });
});