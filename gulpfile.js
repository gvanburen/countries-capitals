var gulp = require('gulp');
var minifyCSS = require('gulp-minify-css');
var rename = require('gulp-rename');
 
gulp.task('minify-css', function() {
  return gulp.src('./css/**/*.css')
    .pipe(minifyCSS({keepBreaks:true}))
    .pipe(rename({
    	suffix: '.min'
    }))
    .pipe(gulp.dest('./build/'))
});

gulp.task('watch', function(){
	gulp.watch('./css/**/*.css', ['minify-css']);
})

gulp.task('default', ['minify-css', 'watch']);