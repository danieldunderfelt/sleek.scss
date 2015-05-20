var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var reload = browserSync.reload;

gulp.task('browser-sync', function() {
    browserSync({
    	server: {
    		baseDir: "./"
    	},
        open: false
    });
});

gulp.task('bs-reload', function () {
    browserSync.reload();
});

gulp.task('sass', function() {
	gulp.src('scss/**/*.scss')
		.pipe(sass().on('error', console.error))
		.pipe(autoprefixer())
		.pipe(gulp.dest('./css'))
		.pipe(reload({stream: true}))
})

gulp.task('default', ['browser-sync'], function () {
    gulp.watch(["scss/**/*.scss"], ['sass']);
});