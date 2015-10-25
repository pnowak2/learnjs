define(function(require) {
    var Module = require('app/core/module'),
        $ = require('jquery'),

        AppModule = Module.extend({
            initialize: function() {
                var self = this;

                $(document)
                    .ajaxStart(function() {
                        self.trigger('app:busy:start');
                    }).ajaxStop(function() {
                        self.trigger('app:busy:stop');
                    });
            },

            showInfo: function(message) {
                console.log('show info ' + message);
            }
        }),
        appModule = new AppModule;

    appModule
        .on('app:busy:start', function() {
            this.showInfo('busy started');
        })
        .on('app:busy:stop', function() {
            this.showInfo('busy stopped');
        });

    return appModule;
});