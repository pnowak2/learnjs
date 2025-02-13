module.exports = function(grunt) {

	grunt.initConfig({
		jshint: {
			all: ['src/**/*.js'],
			options: {
				globals: {
					_: false,
					$: false
				},
				browser: true,
				devel: true
			}
		},
		jasmine : {
			src : 'src/**/*.js',
			options : {
				specs : 'test/**/*.js'
			}
		},
		watch: {
			files: '**/*.js',
			tasks: ['jasmine']
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-jasmine');
	grunt.loadNpmTasks('grunt-contrib-watch');
};