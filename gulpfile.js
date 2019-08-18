const { src,dest,series,watch } = require('gulp');
const sass = require('gulp-sass');
const progeny = require('gulp-progeny');
const plumber = require('gulp-plumber');
const print = require('gulp-print').default;
const notify  = require('gulp-notify');
const sourcemaps  = require('gulp-sourcemaps');

var paths = {
    "scssFile" : "./scss/**/*.scss",
    "scssDir" : "./scss/",
    "cssDir" : "./css"
};

// コンパイル
function sassCompile(){
    return src(paths.scssFile)
        .pipe(sourcemaps.init())
        .pipe(plumber({
            errorHandler:notify.onError("Error: <%= error.message %>")
        }))
        .pipe(progeny())
        .pipe(sass({outputStyle:'compact'}))
        .pipe(sourcemaps.write())
        .pipe(dest(paths.cssDir))
        .pipe(print());
}

// watchタスク
function watching(){
    watch(paths.scssFile,series('sassCompile'));
}

exports.sassCompile = sassCompile;
exports.default = watching;
