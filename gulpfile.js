var gulp = require("gulp"),
    minifyInline = require('gulp-minify-inline'),
    htmlmin = require('gulp-htmlmin'),
    exec = require('child_process').exec;


gulp.task("default", ['min-html', 'cpy-images', 'cpy-robot-images']);

gulp.task("min-html", function()
{
    gulp.src("src/*.html")
        .pipe(minifyInline())
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest("build"));
});

gulp.task("cpy-images", function(cb)
{
    exec("cp src/*.png build/", function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

gulp.task("cpy-robot-images", function(cb)
{
    exec("cp -r src/robotimages build/", function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});