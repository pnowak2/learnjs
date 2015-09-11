module.exports = function(grunt) {

	grunt.initConfig({
		uglify: {
			options: {
				compress: true,
				mangle: true
			},
			build: {
				src: 'src/bundle.js',
				dest: 'src/bundle.min.js'
			}
		},
		browserify: {
			dist: {
				src: ['src/app/app.js'],
				dest: 'src/bundle.js'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-browserify');

	grunt.registerTask('default', ['browserify']);
	grunt.registerTask('dist', ['browserify', 'uglify']);
};
