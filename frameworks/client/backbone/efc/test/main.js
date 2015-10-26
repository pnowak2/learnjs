requirejs.config({
  baseUrl: '../',
  paths: {
    spec: 'test/spec',
    app: 'src',
    templates: 'src/templates',
    jquery: 'lib/jquery/dist/jquery.min',
    underscore: 'lib/underscore/underscore-min',
    backbone: 'lib/backbone/backbone-min',
    mustache: 'lib/mustache.js/mustache.min',
    text: 'lib/text/text',
    jasmine: ['lib/jasmine/lib/jasmine-core/jasmine'],
    'jasmine-html': ['lib/jasmine/lib/jasmine-core/jasmine-html'],
    'jasmine-boot': ['lib/jasmine/lib/jasmine-core/boot'],
    'jasmine-jquery': ['lib/jasmine-jquery/lib/jasmine-jquery'],
    'jasmine-ajax': ['lib/jasmine-ajax/lib/mock-ajax']
  },
  shim: {
    'jasmine-html': {
      deps: ['jasmine']
    },
    'jasmine-boot': {
      deps: ['jasmine', 'jasmine-html']
    },
    'jasmine-jquery': {
      deps: ['jasmine', 'jasmine-html', 'jasmine-boot', 'jquery']
    },
    'jasmine-ajax': {
      deps: ['jasmine', 'jasmine-html', 'jasmine-boot']
    }
  }
});

require(['jasmine-boot', 'jasmine-jquery', 'jasmine-ajax'], function() {
  require([
    // core
    'spec/core/moduleSpec',
    'spec/core/widgetSpec',
    // searchbox
    'spec/widgets/search/searchbox/mainSpec',
    'spec/widgets/search/searchbox/models/searchCriteriaModelSpec',
    'spec/widgets/search/searchbox/views/searchboxViewSpec',
    // search service
    'spec/services/search/searchServiceSpec'
  ], function() {
    window.onload();
  });
});