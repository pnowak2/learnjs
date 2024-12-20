requirejs.config({
	baseUrl: '../bower_components',
	paths: {
		app: '../src/app',
		test: '../test/spec',
		templates: '../src/app/templates',
		jquery: 'jquery/dist/jquery',
		underscore: 'underscore/underscore',
		backbone: 'backbone/backbone',
		text: 'text/text',
		jasmine: ['jasmine/lib/jasmine-core/jasmine'],
		'jasmine-html': ['jasmine/lib/jasmine-core/jasmine-html'],
		'jasmine-boot': ['jasmine/lib/jasmine-core/boot'],
		'jasmine-jquery': ['jasmine-jquery/lib/jasmine-jquery'],
		'jasmine-ajax': ['jasmine-ajax/lib/mock-ajax']
	},
	shim: {
		'jasmine-html': {
			deps : ['jasmine']
		},
		'jasmine-boot': {
			deps : ['jasmine', 'jasmine-html']
		},
		'jasmine-jquery': {
			deps : ['jasmine', 'jasmine-html', 'jasmine-boot', 'jquery']
		},
		'jasmine-ajax': {
			deps : ['jasmine', 'jasmine-html', 'jasmine-boot']
		}
	}
});

require(['jasmine-boot', 'jasmine-jquery', 'jasmine-ajax'], function () {
	require([
		'test/views/bookViewSpec'//, more specs here. Figure out why text plugin does not work from tests, but works from src folder.
	], function () {
		window.onload();
	});
});
