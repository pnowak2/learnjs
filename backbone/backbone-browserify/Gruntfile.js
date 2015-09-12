module.exports = function(grunt) {

	grunt.initConfig({
		browserify: {
			client: {
				src: ['src/app/**/*.js'],
				dest: 'src/bundle.js',
				options: {
					watch: true,
					keepAlive: true,
					transform: ['hbsfy']
				}
			},
			specs: {
				src: ["test/spec/**/*.js"],
				dest: "test/specs.js",
				options: {
					browserifyOptions: {
						debug: true,
						paths: ["./node_modules", "./src/app"],
						transform: ['hbsfy']
					}
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-browserify');
	grunt.registerTask('default', ['browserify']);
	grunt.registerTask('test', ['browserify:specs']);
};
