const gulp        = require('gulp');
const browserSync = require('browser-sync');
const fs          = require('fs');
const plumber     = require('gulp-plumber');

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

    gulp.src('src/**/')
      .pipe(gulp.dest('dest'));
  });
});

gulp.task('build', () => {
  gulp.src('src/**/')
    .pipe(gulp.dest('dest'));
});
