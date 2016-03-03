module.exports = function(grunt) {

  grunt.initConfig({
    browserify: {
      specs: {
        src: ["test/spec/**/*.js"],
        dest: "test/specs.js",
        options: {
          browserifyOptions: {
            debug: false,
            transform: ['babelify']
          }
        }
      }
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          clearRequireCache: true
        },
        src: ['test/specs.js']
      }
    },
    watch: {
      all: {
        files: ['test/**/*.*'],
        tasks: ['test']
      },
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['test']);
  grunt.registerTask('test', ['browserify:specs', 'mochaTest']);
};