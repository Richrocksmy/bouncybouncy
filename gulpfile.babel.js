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
    gulp.src('app/src/*.js')
        .pipe(babel())
        .pipe(gulp.dest('build'));
});

gulp.task('styles', () => {
    gulp.src(['app/**/*.html', 'app/css/*.css'])
        .pipe(gulp.dest('build/css'));
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
    gulp.watch(['app/**/*.html', 'app/css/*.css'], ['styles']);
});

gulp.task('build', ['js', 'styles']);
gulp.task('default', ['lint', 'build', 'watch', 'serve']);