(function() {
    'use strict'

    var gulp = require('gulp'),
        sass = require('gulp-sass'),
        uglify = require('gulp-uglify'),
        htmlmin = require('gulp-htmlmin'),
        // cleanCSS = require('gulp-clean-css'),
        browserSync = require('browser-sync'),
        historyApiFallback = require('connect-history-api-fallback'),
        pump = require('pump'),
        Server = require('karma').Server;
    reload = browserSync.reload;

    var cleancssOptions = {
        compatibility: 'ie8'
    };

    gulp.task('styles', function() {
        gulp.src('app/styles/style.scss')
            .pipe(sass().on('error', sass.logError))
            // .pipe(cleanCSS(cleancssOptions))
            .pipe(gulp.dest('./public/'))
            .pipe(browserSync.stream());
    });

    gulp.task('htmlmin', function() {
        gulp.src('app/index.html')
            .pipe(htmlmin({ collapseWhitespace: true }))
            .pipe(gulp.dest(''))
            .pipe(browserSync.stream());
    });

    gulp.task('uglify', function(cb) {
        pump([
                gulp.src('app/js/*.js'),
                uglify(),
                gulp.dest('public')
            ],
            cb
        );
    });

    gulp.task('test', function(done) {
        new Server({
            configFile: __dirname + '/karma.conf.js',
            singleRun: true
        }, done).start();
    });

    gulp.task('serve', ['styles', 'htmlmin', 'uglify', 'test'], function() {
        browserSync({
            server: {
                baseDir: './',
                middleware: [
                    historyApiFallback()
                ]
            },
            port: 3000
        });
        gulp.watch("app/styles/style.scss", ['styles']);
        gulp.watch("app/index.html", ['htmlmin']);
        gulp.watch("app/js/*.js", ['uglify', 'test']);
        gulp.watch(['app/index.html', 'app/js/*.js', 'app/styles/style.scss']).on('change', browserSync.reload);
    });

    gulp.task('default', ['serve']);
}());
