var application_root = __dirname,
		express = require('express'),
		path = require('path'),
		port = 4711,
		app = express();

app.configure(function () {
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(path.join(application_root, '.')));
	app.use(express.errorHandler({dumpExceptions: true, showStack: true}));
});

app.listen(port, function () {
	console.log('Express listening on port %d in %s mode', port, app.settings.env);
});
