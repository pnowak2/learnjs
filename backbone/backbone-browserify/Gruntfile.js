module.exports = function(grunt) {

	grunt.initConfig({
		browserify: {
			client: {
				src: ['src/app/**/*.js'],
				dest: 'src/bundle.js',
				options: {
					watch: true,
					keepAlive: true
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-browserify');
	grunt.registerTask('default', ['browserify']);
};
