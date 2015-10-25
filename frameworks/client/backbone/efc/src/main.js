requirejs.config({
  waitSeconds: 10,
  baseUrl: '../',
  paths: {
    app: 'src',
    templates: 'src/templates',
    jquery: 'lib/jquery/dist/jquery.min',
    underscore: 'lib/underscore/underscore-min',
    backbone: 'lib/backbone/backbone-min',
    mustache: 'lib/mustache.js/mustache.min',
    text: 'lib/text/text'
  }
});

define(function (require) {
  var app = require('app/app'),
      Router = require('app/routers/router'),
      Backbone = require('backbone'),
      router = new Router();

  app.initialize();
  Backbone.history.start();
});
