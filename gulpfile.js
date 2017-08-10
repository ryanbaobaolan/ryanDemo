/**
 * Created by Raby on 2015/11/16.
 */
var gulp = require('gulp'),
  sass = require('gulp-ruby-sass'),
  jshint = require('gulp-jshint'),
  uglify = require('gulp-uglify'),
  watch = require('gulp-watch'),
  rename = require('gulp-rename'),
  plumber = require('gulp-plumber'),
  ejs = require('gulp-ejs'),
  clean = require('gulp-clean'),
  minifycss = require('gulp-minify-css'),
  browserSync = require('browser-sync');

var reload = browserSync.reload;

gulp.task('style', function() {
  return sass(['scss/*.scss'], {
      style: 'expanded'
    })
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.reload({
      stream: true
    }));
});


// 无论做不做数据分离，利用模板引擎把公用的部分提取出来避免重复修改都是必要的
gulp.task('templates', function() {
  gulp.src('templates/*.html')
    .pipe(plumber())
    .pipe(ejs())
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('clean', function() {
  return gulp.src(['dist/css/*.m.css', 'dist/js/*.m.js'], {
      read: false
    })
    .pipe(clean());
});

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: './dist/'
    }
  });
  gulp.watch('scss/*.scss', ['style']);
  gulp.watch('templates/**/*.html', ['templates']);
  gulp.watch('dist/**/*.*').on('change', reload);
});

gulp.task('default', ['clean'], function() {
  gulp.start('style', 'templates', 'browser-sync');
});