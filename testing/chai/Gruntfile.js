module.exports = function(grunt) {

  grunt.initConfig({
    mochaTest: {
      test: {
        options: {
          reporter: 'mocha-osx-reporter',
          clearRequireCache: true
        },
        src: ['test/**/*.js']
      }
    },

    watch: {
      js: {
        options: {
          spawn: false,
        },
        files: ['test/**/*.js'],
        tasks: ['default']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.registerTask('default', 'mochaTest');
};