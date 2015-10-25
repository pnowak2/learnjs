define(function (require) {
	var mixins =  require('app/core/mixins'),
			moduleEventBus = {};

	mixins.mixEvents(moduleEventBus);

	return moduleEventBus;
});