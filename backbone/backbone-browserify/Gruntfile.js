module.exports = function(grunt) {

	grunt.initConfig({
		browserify: {
			dist: {
				src: ['src/app/app.js'],
				dest: 'src/app/bundle.js'
			}
		}
	});

	grunt.loadNpmTasks('grunt-browserify');
	grunt.registerTask('default', ['browserify']);
};
