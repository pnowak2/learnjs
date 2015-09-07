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
	  uglify: {
	    options: {
	      banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
	    },
	    build: {
	      src: 'js/**/*.js',
	      dest: 'build/<%= pkg.name %>.min.js'
	    }
	  },
		jasmine : {
			src : 'build/<%= pkg.name %>.min.js',
			options : {
				vendor: [
					'bower_components/jquery/dist/jquery.js', 
					'bower_components/jasmine-ajax/lib/mock-ajax.js',
					'bower_components/jasmine-jquery/lib/jasmine-jquery.js',
					'bower_components/underscore/underscore.js', 
					'bower_components/backbone/backbone.js'
				],
				specs : 'test/**/*.js'
			}
		},
		watch: {
			files: '**/*.js',
			tasks: ['jasmine']
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jasmine');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['uglify']);
};
