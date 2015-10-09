define(['jquery', 'app/views/appView'], function ($, AppView) {
	var appView = new AppView;
	$('#app').html(appView.render().el);

	return appView;
});
