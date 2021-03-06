var pkg = JSON.parse(require('fs').readFileSync('./package.json')),
	gulp = require('gulp'),
	rjs = require('requirejs'),
	amdClean = require('gulp-amdclean'),
	scss = require('gulp-scss'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	cleanCss = require('gulp-clean-css'),
	filter = require('gulp-filter'),
	rename = require('gulp-rename'),
	webpack = require('gulp-webpack'),
	browserSync = require('browser-sync').create(),
	reload = browserSync.reload


let port = 8080
let script = function() {
	var outFile = './dist/' + pkg.name + '.' + pkg.version + '.js'
	rjs.optimize({
		findNestedDependencies: false,
		baseUrl: './src/',
		optimize: 'none',
		out: outFile,
		wrap: {
			startFile: './src/wrapper/start.frag',
			endFile: './src/wrapper/end.frag',
		},
		name: 'poe',
		onModuleBundleComplete: function(data) {
			var fs = require('fs'),
				amdclean = require('amdclean'),
				outputFile = data.path

			fs.writeFileSync(outputFile, amdclean.clean({
				'filePath': outputFile,
				transformAMDChecks: true
			}))

		}
	})
	return gulp.src(outFile)
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(uglify())
		.pipe(gulp.dest('dist'))
		.pipe(reload({
			stream: true
		}))
}
let style = function(){
	return gulp.src(['./src/scss/poe.scss'])
		.pipe(scss())
		.pipe(concat(pkg.name + '.' + pkg.version + '.css'))
		.pipe(gulp.dest('./dist'))
		.pipe(filter('**/*.css'))
		.pipe(reload({
			stream: true
		}))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(cleanCss())
		.pipe(gulp.dest('dist'))
		.pipe(reload({
			stream: true
		}))
}

let def = function() {
	browserSync.init({
		server: {
			baseDir: './',
			index: 'test/index.html'
		},
		port: port
	})

	gulp.watch('gulpfile.js', gulp.series('script', 'style', reload))
	gulp.watch(['src/**/*.js', 'src/wrapper/*.frag'], script)
	gulp.watch('src/**/*.scss', style)
	gulp.watch('test/**/*.html').on('change', reload)
}

gulp.task('script', script)
gulp.task('style', style)
gulp.task('default', gulp.series('script', 'style', def))