define(function(require) {
    var _ = require('underscore'),
        mixEvents = function(obj) {
            _.extend(obj, Backbone.Events)
        },
        mixNotifications = function(obj) {
            _.extend(obj, {
                showInfo: function(message) {
                    console.log('show info ' + message);
                },

                showWarning: function(message) {
                    console.log('show warning ' + message);
                },

                showError: function(message) {
                    console.log('show error ' + message);
                }
            });
        }

    return {
        mixEvents: mixEvents,
        mixNotifications: mixNotifications,
    }
});