const gulp = require('gulp')
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano')

gulp.task('css', function () {
  const processors = [
    autoprefixer
  ]

  gulp.src('./scss/ryoko.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(processors))
    .pipe(sourcemaps.write('/'))
    .pipe(gulp.dest('site/css'))
})

const child = require('child_process')
const gutil = require('gulp-util')
const jekyllLogger = function (buffer) {
  buffer.toString()
    .split(/\n/)
    .forEach(function (message) {
      gutil.log('Jekyll: ' + message)
    })
}

gulp.task('jekyll', function () {
  const jekyll = child.spawn('jekyll', ['serve',
    '--watch',
    '--incremental',
    '--drafts'
  ])

  jekyll.stdout.on('data', jekyllLogger)
  jekyll.stderr.on('data', jekyllLogger)
})

gulp.task('watch', function () {
  gulp.watch('./scss/**/*.scss', ['css'])
})

gulp.task('bootstrap-css', function () {
  gulp.src('node_modules/bootstrap/dist/css/bootstrap.min.*')
    .pipe(gulp.dest('site/css'))
})

gulp.task('bootstrap-js', function () {
  gulp.src('node_modules/bootstrap/dist/js/bootstrap.min.js')
    .pipe(gulp.dest('site/js'))
})

gulp.task('jquery-js', function () {
  gulp.src('node_modules/jquery/dist/jquery.slim.min.js')
    .pipe(gulp.dest('site/js'))
})

gulp.task('tether-js', function () {
  gulp.src('node_modules/tether/dist/js/tether.min.js')
    .pipe(gulp.dest('site/js'))
})

gulp.task('bulma-css', function () {
  gulp.src('node_modules/bulma/css/bulma.*')
    .pipe(gulp.dest('site/css'))
})

gulp.task('copy', ['bootstrap-css', 'bootstrap-js', 'jquery-js', 'tether-js', 'bulma-css'])
gulp.task('default', ['css', 'jekyll', 'watch'])