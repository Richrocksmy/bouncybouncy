// TODO - Extract dirs out to vars

import gulp from 'gulp';
import eslint from 'gulp-eslint';
import babel from 'gulp-babel';
import webserver from 'gulp-webserver';
import clean from 'gulp-clean';
import concat from 'gulp-concat';

var buildPath = 'build';
var appPath = 'app/**/';

gulp.task('lint', () => {
    return gulp.src(appPath + '*.js')
        .pipe(eslint())
        .pipe(eslint.format());
        // Linter bug - See README
        // .pipe(eslint.failOnError());
});

gulp.task('concat', ['clean'], () => {
    return gulp.src(appPath + '*.js')
        .pipe(babel())
        .pipe(concat('app.js'))
        .pipe(gulp.dest(buildPath));
});

gulp.task('js', ['clean'], () => {
    return gulp.src(appPath + '*.js')
        .pipe(babel())
        .pipe(gulp.dest(buildPath));
});

gulp.task('css', ['clean'], () => {
    return gulp.src([appPath + '*.css'])
        .pipe(gulp.dest(buildPath));
});

gulp.task('html', ['clean'], () => {
    return gulp.src([appPath + '*.html'])
        .pipe(gulp.dest(buildPath));
});

gulp.task('res', ['clean'], () => {
    return gulp.src([appPath + '*.png'])
        .pipe(gulp.dest(buildPath));
});

gulp.task('clean', ()  => {
    return gulp.src(buildPath, {read: false})
        .pipe(clean());
});

gulp.task('serve', ['build'], () => {
    return gulp.src(buildPath)
        .pipe(webserver(
            {
                open: true,
                livereload: true
            }
    ));
});

gulp.task('watch', () => {
    gulp.watch('app/**/*.js', ['js']);
    gulp.watch(['app/**/*.html'], ['html']);
    gulp.watch(['app/css/*.css'], ['css']);
});

gulp.task('build', ['lint', 'concat', 'html', 'css', 'res']);
gulp.task('deployDev', ['lint', 'js', 'html', 'css', 'serve', 'watch']);
gulp.task('default', ['serve']);