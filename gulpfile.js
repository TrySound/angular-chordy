var gulp = require('gulp');
var concat = require('gulp-concat');
var babel = require('gulp-babel');

gulp.task('build', function () {
	return gulp.src(['src/*.mdl.js', 'src/*.js'])
		.pipe(concat('angular-chordy.js'))
		.pipe(babel({
			presets: ['es2015'],
			plugins: [
				'iife-wrap'
			]
		}))
		.pipe(gulp.dest('dist'));
});

gulp.task('default', ['build']);
