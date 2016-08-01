import gulp from 'gulp';
import less from 'gulp-less';
import jshint from 'gulp-jshint';

gulp.task('default', () => console.log('Default task called'));

gulp.task('lint-client', () => {
    gulp.src('./client/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('watch', () => {
    gulp.watch('client/**/*.js', ['default']);
    gulp.watch('test/client/**/*.js', ['default']);
});

gulp.task('build', ['uglify', 'minify']);