requirejs.config({
	baseUrl: '../bower_components',
	paths: {
		app: '../src/app',
		test: '../test/spec',
		jquery: 'jquery/dist/jquery',
		underscore: 'underscore/underscore',
		backbone: 'backbone/backbone',
		text: 'text/text',
		jasmine: ['jasmine/lib/jasmine-core/jasmine'],
		'jasmine-html': ['jasmine/lib/jasmine-core/jasmine-html'],
		'jasmine-boot': ['jasmine/lib/jasmine-core/boot']
	},
	shim: {
		'jasmine-html': {
			deps : ['jasmine']
		},
		'jasmine-boot': {
			deps : ['jasmine', 'jasmine-html']
		}
	}
});

require(['jasmine-boot'], function () {
	require([
		'test/appSpec', 
		'test/models/bookModelSpec', 
		'test/views/bookViewSpec'
	], function () {
		window.onload();
	});
});
