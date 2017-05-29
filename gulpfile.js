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

gulp.task('bootstrap', function () {
  gulp.src('node_modules/bootstrap/dist/css/bootstrap.min.*')
    .pipe(gulp.dest('site/css'))
})

gulp.task('purecss', function () {
  gulp.src('node_modules/purecss/build/pure-min.css')
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
  gulp.watch('./scss/ryoko.scss', ['css'])
})

gulp.task('default', ['css', 'jekyll', 'watch'])
