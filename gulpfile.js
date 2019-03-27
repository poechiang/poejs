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




// 静态服务器
gulp.task('default', ['rjs','scss'],function() {
	browserSync.exit()
    browserSync.init({
        server: {
            baseDir: './',
            index:'test/index.html'
        },
        port:1080
    })

    gulp.watch('gulpfile.js', ['default'])
    gulp.watch(['src/**/*.js','src/wrapper/*.frag'], ['rjs'])
    gulp.watch('src/scss/**/*.scss', ['scss'])
    gulp.watch('test/**/*.html').on('change', reload)
})



gulp.task('rjs', function() {
	var outFile = './build/'+pkg.name+'.'+pkg.version+'.js'
	rjs.optimize({
	    findNestedDependencies: false,
	    baseUrl: './src/',
	    optimize: 'none',
	    //include: ['poe'],
	    out: outFile,
	    wrap:{
	    	startFile:'./src/wrapper/start.frag',
	    	endFile:'./src/wrapper/end.frag',
	    },
	    name:'poe',
	    onModuleBundleComplete: function(data) {
	      var fs = require('fs'),
	        amdclean = require('amdclean'),
	        outputFile = data.path;
	 
	      fs.writeFileSync(outputFile, amdclean.clean({
	        'filePath': outputFile,
	      //   wrap:{
		    	// start:'',
		    	// end:''
	      //   },
	        transformAMDChecks:true
	      }));
	    }
  	})  
	gulp.src(outFile)
		.pipe(rename({suffix:'.min'})) 
		.pipe(uglify())              
		.pipe(gulp.dest('build')) 
		.pipe(reload({stream: true}))   
})

gulp.task('scss', function() {
	gulp.src(['./src/scss/poe.scss'])
		.pipe(scss())
		.pipe(concat(pkg.name+'.'+pkg.version+'.css'))
		.pipe(gulp.dest('./build'))
		.pipe(filter('**/*.css')) 
		.pipe(reload({stream: true})) 
		.pipe(rename({suffix:'.min'})) 
		.pipe(cleanCss())              
		.pipe(gulp.dest('build')) 
		.pipe(reload({stream: true}))     
})