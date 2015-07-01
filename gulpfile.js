var gulp = require('gulp');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var util = require('gulp-util');


var onError = function (err) {  
  util.beep();
  console.log(err);
  this.emit('end');
};

gulp.task('js', function() {
  return gulp.src('components/js/*.js')
    .pipe(concat('script.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./components'));
});

gulp.task('sass', function(){
  return gulp.src('components/scss/style.scss')
  .pipe(plumber({
      errorHandler: onError
    }))
  .pipe(sass())
  .pipe(gulp.dest('components'))
  .pipe(livereload());
});



gulp.task('watch',function(){
  livereload.listen();
  gulp.watch(['components/scss/*.scss','components/js/*.js'],['sass','js']);
});


gulp.task('default', [ 'sass', 'watch']);