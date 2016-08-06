// TODO - Extract dirs out to vars

import gulp from 'gulp';
import eslint from 'gulp-eslint';
import babel from 'gulp-babel';
import webserver from 'gulp-webserver';

gulp.task('lint', () => {
    gulp.src('./app/**/*.js')
        .pipe(eslint())
        .pipe(eslint.format());
        // Linter bug - See README
        // .pipe(eslint.failOnError());
});

gulp.task('js', () => {
    gulp.src('app/src/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('build'));
});

gulp.task('css', () => {
    gulp.src(['app/**/*.css'])
        .pipe(gulp.dest('build'));
});

gulp.task('html', () => {
    gulp.src(['app/**/*.html'])
        .pipe(gulp.dest('build'));
    gulp.src(['app/**/*.jpg'])
        .pipe(gulp.dest('build'));
});

gulp.task('serve', ['build'], () => {
    gulp.src('build')
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

gulp.task('build', ['js', 'html', 'css']);
gulp.task('default', ['lint', 'build', 'serve', 'watch']);