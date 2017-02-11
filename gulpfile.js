'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    cleanCSS = require('gulp-clean-css'),
    clean = require('gulp-clean'),
    htmlReplace = require('gulp-html-replace');

var path = {
    dist: {
        html: 'dist/',
        js: 'dist/js/',
        css: 'dist/css/',
        img: 'dist/img/',
        fonts: 'dist/fonts/'
    },
    src: {
        html: 'src/*.html',
        js: 'src/js/script.js',
        css: 'src/css/style.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    watch: {
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        css: 'src/css/**/*.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    clean: 'dist'
};

gulp.task('clean', function () {
    gulp.src(path.clean)
        .pipe(clean())
});

gulp.task('build:html', function () {
    gulp.src(path.src.html)
        .pipe(rigger())
        .pipe(htmlReplace({
            css: 'css/style.css',
            js: 'js/script.js'
        }))
        .pipe(gulp.dest(path.dist.html))
});

gulp.task('build:js', function () {
    gulp.src(path.src.js)
        .pipe(rigger())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.dist.js))
});

gulp.task('build:css', function () {
    gulp.src(path.src.css)
        .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: ['src/style/'],
            outputStyle: 'compressed',
            sourceMap: true,
            errLogToConsole: true
        }))
        .pipe(prefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.dist.css))
});

gulp.task('build:img', function () {
    gulp.src(path.src.img)
        .pipe(gulp.dest(path.dist.img))
});

gulp.task('build:fonts', function () {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.dist.fonts))
});

gulp.task('build', [
    'build:html',
    'build:js',
    'build:css',
    'build:img',
    'build:fonts',
]);


gulp.task('watch', function () {
    watch(path.watch.html, function () {
        gulp.start('build:html');
    });
    watch(path.watch.css, function () {
        gulp.start('build:css')
    });
    watch(path.watch.js, function () {
        gulp.start('build:js')
    });
    watch(path.watch.img, function () {
        gulp.start('build:img')
    });
    watch(path.watch.fonts, function () {
        gulp.start('build:fonts')
    });
});


gulp.task('default', ['build', 'watch']);