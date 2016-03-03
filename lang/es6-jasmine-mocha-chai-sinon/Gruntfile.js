module.exports = function(grunt) {

  grunt.initConfig({
    browserify: {
      specs: {
        src: ["test/specs/*.js"],
        dest: "test/specs-suite.js",
        options: {
          watch: true,
          keepAlive: true,
          transform: [
            ["babelify", {
              "plugins": ['external-helpers'],
              "presets": ["es2015"]
            }]
          ]
        }
      }
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          clearRequireCache: true
        },
        src: ['test/specs-suite.js']
      }
    },
    watch: {
      all: {
        files: ['test/specs-suite.js'],
        tasks: ['mochaTest']
      },
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['mochaTest']);
};