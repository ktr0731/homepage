const gulp        = require('gulp');
const browserSync = require('browser-sync');
const fs          = require('fs');
const plumber     = require('gulp-plumber');
const ejs         = require('gulp-ejs');

gulp.task('default', () => {
  browserSync({
    server : {
      baseDir : 'www'
    }
  });

  gulp.watch('www/**/**', () => {
    browserSync.reload();
  });

  gulp.watch(['www_dev/index.html', 'www_dev/index.json'], e => {
    if (e.type == 'deleted') {
      return;
    }

    const json = JSON.parse(fs.readFileSync('www_dev/index.json'));

    gulp.src('www_dev/index.html')
      .pipe(plumber())
      .pipe(ejs(json))
      .pipe(gulp.dest('www'));
  });
});
