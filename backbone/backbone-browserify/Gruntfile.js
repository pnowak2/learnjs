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
      src: [],
      options: {
        specs: 'test/specs.js',
        vendor: [/*'node_modules/jasmine-jquery/lib/jasmine-jquery.js'*/]
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

  grunt.registerTask('default', ['browserify']);
  grunt.registerTask('test', ['browserify:specs', 'jasmine']);
};