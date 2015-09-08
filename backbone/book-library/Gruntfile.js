module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			all: ['js/**/*.js'],
			options: {
				globals: {
					_: false,
					$: false
				},
				browser: true,
				devel: true
			}
		},
		concat: {
			options: {
				separator: ';',
			},
			dist: {
				src: ['site/js/app.js', 'site/js/models/*.js', 'site/js/collections/*.js', 'site/js/views/*.js'],
				dest: 'site/build/<%= pkg.name %>.js',
			},
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
				compress: true
			},
			build: {
				src: 'site/build/<%= pkg.name %>.js',
				dest: 'site/build/<%= pkg.name %>.min.js'
			}
		},
		jasmine : {
			src : 'build/<%= pkg.name %>.min.js',
			options : {
				vendor: [
				'site/bower_components/jquery/dist/jquery.js', 
				'site/bower_components/jasmine-ajax/lib/mock-ajax.js',
				'site/bower_components/jasmine-jquery/lib/jasmine-jquery.js',
				'site/bower_components/underscore/underscore.js', 
				'site/bower_components/backbone/backbone.js'
				],
				specs : 'test/**/*.js'
			}
		},
		watch: {
			files: ['js/**/*.js', 'test/**/*.js'],
			tasks: ['concat', 'uglify', 'jasmine']
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jasmine');

	grunt.registerTask('default', ['watch']);
};
