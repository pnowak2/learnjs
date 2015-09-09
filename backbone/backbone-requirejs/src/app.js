requirejs.config({
	baseUrl: '../bower_components', // dependencies will be searched in this folder
	paths: {
		app: '../src/app', // here we need to go out of the baseUrl and get inside app to allow 'app/models/bookModel' dependency
		jquery: 'jquery/dist/jquery',
		underscore: 'underscore/underscore',
		backbone: 'backbone/backbone'
	}
});

requirejs(['app/main']);