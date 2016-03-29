var gulp = require('gulp');
var concat = require('gulp-concat');
var babel = require('gulp-babel');
var Server = require('karma').Server;
var pkg = require('./package.json');

gulp.task('build', function () {
	return gulp.src(['src/*.mdl.js', 'src/*.js'])
		.pipe(concat(pkg.name + '.js'))
		.pipe(babel({
			presets: ['es2015'],
			plugins: [
				'iife-wrap'
			]
		}))
		.pipe(gulp.dest('dist'));
});

gulp.task('tdd', function (done) {
	new Server({
		configFile: __dirname + '/karma.conf.js',
		autoWatch: true,
		singleRun: false
	}, done).start();
});

gulp.task('test', function (done) {
	new Server({
		configFile: __dirname + '/karma.conf.js',
		autoWatch: false,
		singleRun: true
	}, done).start();
});

gulp.task('default', ['build']);
