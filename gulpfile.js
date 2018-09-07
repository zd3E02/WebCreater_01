'use strict';

const gulp        = require('gulp');
const browserSync = require('browser-sync').create();
const sass        = require('gulp-sass');
const del         = require('del');
const plumber     = require('gulp-plumber');
const autoprefixer = require('gulp-autoprefixer');

// const webpackStream = require('webpack-stream');
// const webpack = require('webpack');
// const webpackConfig = require('webpack.config');
// const sftp        = require('gulp-sftp');

gulp.task('delHtml',function() {
  del(['html/*.html']);
});
gulp.task('delJs',function() {
  del(['html/js/*.js']);
});
gulp.task('delSass',function() {
  del(['html/css/style.css']);
});

gulp.task('copyHtml',function() {
  return gulp.src(['assets/**/*.html'])
  .pipe(plumber())
  .pipe(gulp.dest('html/'))
  // return gulp.src(['html/*.html'])
  // .pipe(gulp.dest('html/'))
  .pipe(browserSync.stream());
});

gulp.task('copyJs',function() {
  return gulp.src(['assets/js/*.js'])
  .pipe(plumber())
  .pipe(gulp.dest('html/js/'))
  .pipe(browserSync.stream());
});

gulp.task('sass',function() {
  return gulp.src(['assets/scss/*.scss'])
  .pipe(plumber())
  .pipe(sass({outputStyle: 'expanded'}))
  .pipe(gulp.dest('html/css/'))
  .pipe(browserSync.stream());
});

gulp.task('default',['delHtml','delJs','delSass','copyHtml','copyJs','sass'], function() {
  browserSync.init({
    server: {
      baseDir: 'html'
    }

  });
  gulp.watch(['assets/**/*.html'],['delHtml','copyHtml']);
  gulp.watch(['assets/js/*.js'],['delJs','copyJs']);
  gulp.watch(['assets/scss/*.scss'],['delSass','sass']);
})

// gulp.task('upload', function() {
//     return gulp.src([
//             "C:/Users/zd3E02/Desktop/zd3E02/myProject/vue_test/html/**/*"
//         ])
//         .pipe(sftp({
//             host: "ftp.sim.zdrv.com",
//             user: "zd3E02",
//             pass: "Y4KNXY",
//             port: 21,
//             remotePath: "/WEB_ROOT/zd3E02.sim.zdrv.com/HtDocs/"

//         })
//     );
// });
