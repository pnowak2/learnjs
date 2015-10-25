define(function(require) {
    var $ = require('jquery'),
        mixins = require('./core/mixins'),
        Module = require('./core/module'),

        AppModule = Module.extend({
            initialize: function() {
                var self = this;
                $(document)
                    .ajaxStart(function() {
                        self.trigger('app:ajax:start');
                    }).ajaxStop(function() {
                        self.trigger('app:ajax:stop');
                    }).ajaxError(function(event, jqxhr, settings, thrownError) {
                        self.trigger('app:ajax:error', event, jqxhr, settings, thrownError);
                    });
            }
        }),

        appModule = new AppModule;
        mixins.mixNotifications(AppModule.prototype);

    return appModule;
});