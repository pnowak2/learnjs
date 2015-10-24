define(function (require) {
  var Module = require('app/core/module'),
      MapView = require('app/modules/results/map/views/mapView'),
      mapView = new MapView;

  return Module.extend({
    view: mapView,

    initialize: function () {

    }
  });
});
