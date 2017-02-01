(function() {
    'use strict'

    var gulp = require('gulp'),
        pump = require('pump'),
        sass = require('gulp-sass'),
        concat = require('gulp-concat'),
        rename = require("gulp-rename"),
        uglify = require('gulp-uglify'),
        Server = require('karma').Server,
        htmlmin = require('gulp-htmlmin'),
        browserSync = require('browser-sync'),
        historyApiFallback = require('connect-history-api-fallback'),
        reload = browserSync.reload;

    var cleancssOptions = {
        compatibility: 'ie8'
    };

    gulp.task('styles', function() {
        gulp.src('app/style/style.scss')
            .pipe(sass().on('error', sass.logError))
            .pipe(gulp.dest('./public/'))
            .pipe(browserSync.stream());
    });

    gulp.task('htmlmin', function() {
        gulp.src('app/index.html')
            .pipe(htmlmin({ collapseWhitespace: true }))
            .pipe(gulp.dest(''))
            .pipe(browserSync.stream());
    });

    gulp.task('concat', function() {
        return gulp.src('app/js/**/*.js')
            .pipe(concat('scripts.js'))
            .pipe(gulp.dest('public'));
    });

    gulp.task('uglify', function(cb) {
        pump([
                gulp.src('public/scripts.js'),
                uglify(),
                rename({ suffix: '.min' }),
                gulp.dest('public')
            ],
            cb
        );
    });

    gulp.task('test', function(done) {
        new Server({
            configFile: __dirname + '/karma.conf.js',
            singleRun: true
        }, function() {
            done();
        }).start();
    });

    gulp.task('serve', ['styles', 'htmlmin', 'concat', 'uglify'], function() {
        browserSync({
            server: {
                baseDir: './',
                middleware: [
                    historyApiFallback()
                ]
            },
            port: 3000
        });
        gulp.watch("app/style/style.scss", ['styles']);
        gulp.watch("app/index.html", ['htmlmin']);
        gulp.watch("app/js/**/*.js", ['concat']);
        gulp.watch("app/js/**/*.js", ['uglify']);
        gulp.watch(['app/index.html', 'app/js/**/*.js', 'app/style/style.scss']).on('change', browserSync.reload);
    });

    gulp.task('default', ['serve']);
}());
