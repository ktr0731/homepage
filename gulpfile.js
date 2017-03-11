const gulp        = require('gulp');
const browserSync = require('browser-sync');
const fs          = require('fs');
const plumber     = require('gulp-plumber');
const ejs         = require('gulp-ejs');

gulp.task('default', () => {
  browserSync({
    server : {
      baseDir : 'dest'
    }
  });

  gulp.watch('dest/**/*', () => {
    browserSync.reload();
  });

  gulp.watch('src/**/*', e => {
    if (e.type == 'deleted') {
      return;
    }

    const json = JSON.parse(fs.readFileSync('src/index.json'));

    gulp.src('dest/index.html')
      .pipe(plumber())
      .pipe(ejs(json))
      .pipe(gulp.dest('www'));
  });
});

gulp.task('build', () => {
  gulp.src(['src/**/', '!src/index.html', '!src/index.json'])
    .pipe(gulp.dest('dest'));

  const json = JSON.parse(fs.readFileSync('src/index.json'));
  gulp.src('src/index.html')
    .pipe(plumber())
    .pipe(ejs(json))
    .pipe(gulp.dest('dest'));
});
