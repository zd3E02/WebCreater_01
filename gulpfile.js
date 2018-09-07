'use strict';

const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const del = require('del');
const plumber = require('gulp-plumber');
const autoprefixer = require('gulp-autoprefixer');

// const webpackStream = require('webpack-stream');
// const webpack = require('webpack');
// const webpackConfig = require('webpack.config');
// const sftp        = require('gulp-sftp');

gulp.task('delHtml', function() {
    del(['site/*.html']);
});
gulp.task('delJs', function() {
    del(['site/js/*.js']);
});
gulp.task('delSass', function() {
    del(['site/css/style.css']);
});

gulp.task('copyHtml', function() {
    return gulp.src(['assets/**/*.html'])
        .pipe(plumber())
        .pipe(gulp.dest('site/'))
        .pipe(browserSync.stream());
});

gulp.task('copyJs', function() {
    return gulp.src(['assets/js/*.js'])
        .pipe(plumber())
        .pipe(gulp.dest('site/js/'))
        .pipe(browserSync.stream());
});

gulp.task('sass', function() {
    return gulp.src(['assets/sass/*.scss'])
        .pipe(plumber())
        .pipe(sass({ outputStyle: 'expanded' }))
        .pipe(gulp.dest('site/css/'))
        .pipe(browserSync.stream());
});

gulp.task('default', ['delHtml', 'delJs', 'delSass', 'copyHtml', 'copyJs', 'sass'], function() {
    browserSync.init({
        server: {
            baseDir: 'site'
        }
    });
    gulp.watch(['assets/**/*.html'], ['delHtml', 'copyHtml']);
    gulp.watch(['assets/js/*.js'], ['delJs', 'copyJs']);
    gulp.watch(['assets/sass/*.scss'], ['delSass', 'sass']);
    browserSync.reload("styles.css");
})

// gulp.task('upload', function() {
//     return gulp.src([
//             "C:/Users/zd3E02/Desktop/zd3E02/myProject/vue_test/site/**/*"
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