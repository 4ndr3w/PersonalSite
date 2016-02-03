var gulp = require("gulp"),
    minifyInline = require('gulp-minify-inline'),
    htmlmin = require('gulp-htmlmin'),
    base64 = require('gulp-base64');


gulp.task("default", function()
{
    gulp.src("src/index.html")
        .pipe(base64("."))
        .pipe(minifyInline())
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest("build"));
});