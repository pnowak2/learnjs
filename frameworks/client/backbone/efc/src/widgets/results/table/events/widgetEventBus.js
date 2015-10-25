define(function (require) {
	var mixins =  require('../../../../core/mixins'),
			widgetEventBus = {};

	mixins.mixEvents(widgetEventBus);

	return widgetEventBus;
});