import gulp from 'gulp';
import jshint from 'gulp-jshint';
import babel from 'gulp-babel';
import webserver from 'gulp-webserver';

gulp.task('lint', () => {
    gulp.src('./app/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('js', () => {
    return gulp.src('app/src/*.js')
        .pipe(babel())
        .pipe(gulp.dest('build'));
});

gulp.task('styles', () => {
    return gulp.src(['app/**/*.html', 'app/**/*.css'])
        .pipe(gulp.dest('build'));
});

gulp.task('serve', ['build'], () => {
    gulp.src('build')
        .pipe(webserver({open: true}));
});

gulp.task('watch', () => {
    gulp.watch('app/**/*.js', ['build']);
});

gulp.task('build', ['js', 'styles']);
gulp.task('default', ['lint', 'build', 'serve']);