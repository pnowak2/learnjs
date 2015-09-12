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
						debug: false,
						transform: ['hbsfy']
					}
				}
			}
		},
    jasmine: {
        src: 'src/bundle.js',
        options: {
            specs: 'test/specs.js',
            vendor: []
        }
    }
	});

	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-jasmine');

	grunt.registerTask('default', ['browserify']);
	grunt.registerTask('test', ['browserify:specs', 'jasmine']);
};
