var gulp        = require('gulp');
var browserSync = require('browser-sync');
var fs          = require('fs');
var plumber     = require('gulp-plumber');
var ejs         = require('gulp-ejs');

gulp.task('default', function() {
  browserSync({
    server : {
      baseDir : 'www'
    }
  });

  gulp.watch('www/**/**', function() {
    browserSync.reload();
  });

  gulp.watch(['www_dev/*.html', 'www_dev/index.json'], function (e) {
    if (e.type != 'deleted') {
      var json = JSON.parse(fs.readFileSync('www_dev/index.json'));

      gulp.src('www_dev/index.html')
          .pipe(plumber())
          .pipe(ejs(json))
          .pipe(gulp.dest('www'));
    }
  });

});
