var passport = require('passport');
var LocalStrategy = require('passport-local');

var LocallyDB = require('locallydb');
var db = new LocallyDB('./.data');
var users = db.collection('users');

var crypto = require('crypto');

function hash(password) {
	return crypto.createHash('sha512').update(password).digest('hex');
}

passport.use(new LocalStrategy(function (username, password, done) {
	var user = users.where({ username: username, passwordHash: hash(password) }).items[0];

	if(user) {
		done(null, user);
	} else {
		done(null, false)
	}
}));

passport.serializeUser(function (user, done) {
	done(null, user.cid);
});

passport.deserializeUser(function (cid, done) {
	done(null, users.get(cid));
});

var router = require('express').Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true })); // Login page
router.use(bodyParser.json()); // API
router.use(require('cookie-parser')());
router.use(require('express-session')({
	secret: 'p7345fsdfsdafsadf7f7ds77s7dfs7sdfhsgsfgs',
	resave: false,
	saveUninitialized: true
}));
router.use(passport.initialize());
router.use(passport.session());

router.get('/login', function (req, res) {
	res.render('login');
});

router.post('/signup', function (req, res, next) {
	if (users.where({ username: req.body.username }).items.length === 0) {
		var user = {
			fullname: req.body.fullname,
			email: req.body.email,
			username: req.body.username,
			passwordhash: hash(req.body.password),
			following: []
		};

		var userId = users.insert(user);

		req.login(users.get(userId), function (err) {
			if (err) return next(err);
			res.redirect('/');
		});


	} else {
		res.redirect('/login');
	}
});

router.post('/login', passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/login'
}));

router.get('/logout', function (req, res) {
	res.logout();
	res.redirect('/login');
});

function loginRequired (req, res, next) {
	if (req.isAuthenticated()) {
		next();
	} else {
		res.redirect('/login');
	}
}

function makeUserSafe (user) {
	var safeUser = {};

	var safeKeys = ['cid', 'fullname', 'email', 'username', 'following'];

	safeKeys.forEach(function (key) {
		safeUser[key] = user[key];
	});

	return safeUser;
}

exports.routes = router;
exports.required = loginRequired;
exports.safe = makeUserSafe;