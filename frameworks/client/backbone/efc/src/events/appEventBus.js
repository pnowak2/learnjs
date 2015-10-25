define(function (require) {
	var mixins =  require('app/core/mixins'),
			appEventBus = {};

	mixins.mixEvents(appEventBus);

	return appEventBus;
});