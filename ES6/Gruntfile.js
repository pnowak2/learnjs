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
    jasmine: {
      src: [],
      options: {
        specs: 'test/specs.js',
        vendor: []
      }
    },
    watch: {
      all: {
        files: ['src/**/*.*', 'test/**/*.*'],
        tasks: ['test']
      },
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['test']);
  grunt.registerTask('test', ['browserify:specs', 'jasmine']);
};