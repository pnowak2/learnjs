requirejs.config({
  waitSeconds: 10,
  paths: {
    jquery: '../lib/jquery/dist/jquery.min',
    underscore: '../lib/underscore/underscore-min',
    backbone: '../lib/backbone/backbone-min',
    mustache: '../lib/mustache.js/mustache.min',
    text: '../lib/text/text'
  }
});

define(function (require) {
  var app = require('app'),
      Backbone = require('backbone'),
      Router = require('./routers/router'),
      ApplicationWidget = require('./widgets/application/main'),
      router;

  router = new Router()
  applicationWidget = new ApplicationWidget;
  Backbone.history.start();
});
