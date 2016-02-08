var gulp = require("gulp"),
    minifyInline = require('gulp-minify-inline'),
    htmlmin = require('gulp-htmlmin');


gulp.task("default", ['min-html', 'cpy-images']);

gulp.task("min-html", function()
{
    gulp.src("src/*.html")
        .pipe(minifyInline())
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest("build"));
});

gulp.task("cpy-images", function()
{
    gulp.src("src/*.png").pipe(gulp.dest("build"));
});