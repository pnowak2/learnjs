define(function(require) {
    var _ = require('underscore'),
        mixEvents = function(obj) {
            _.extend(obj, Backbone.Events)
        }

    return {
        mixEvents: mixEvents
    }
});