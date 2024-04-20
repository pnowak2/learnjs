define(function(require) {
  var Widget = require('../../../core/widget'),
    MapView = require('./views/mapView'),
    mapView = new MapView;

  return Widget.extend({
    view: mapView
  });
});