// Gulpfile example
var gulp = require('gulp');
var browserify = require('browserify');
var reactify = require('reactify');
var through2 = require('through2')
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');


gulp.task('browserify', function () {

	gulp.src('./src/main.js')
		.pipe(plumber())
		//instead of using the blacklisted and unmaintained gulp-browserify, we'll run browserify using through2
	    .pipe(through2.obj(function (file, enc, next){
	            browserify(file.path, {'debug': true})
	                .transform('reactify')
	                .bundle(function(err, res){
	                    file.contents = res;
	                    next(null, file);
	                });
	        }))
 	  	.pipe(concat('main.js'))
	    .pipe(gulp.dest('public'))
});

gulp.task('default', ['browserify']);

gulp.task('watch', function () {
  gulp.watch('src/**/*.*', ['default']);
});

// Gruntfile example 
module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['src/**/*.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    qunit: {
      files: ['test/**/*.html']
    },
    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint', 'qunit']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('test', ['jshint', 'qunit']);

  grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);

};
