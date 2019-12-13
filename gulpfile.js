var gulp        = require('gulp'),
    aglio       = require('gulp-aglio'),
    browserSync = require('browser-sync'),
    rename      = require('gulp-rename'),
    ejs         = require('gulp-ejs');

var TEMPLATE_FILES = ['apidocs/**/*.md'],
    LAYOUT_FILE    = 'apidocs/layout.md',
    PUBLISHED_DIR  = 'published';

gulp.task('combine', function() {
  return gulp.src(LAYOUT_FILE)
    .pipe(ejs({},{},{ ext: '.md' }))
    .pipe(rename('index.md'))
    .pipe(gulp.dest(PUBLISHED_DIR));
});

gulp.task('generate-api-docs', function() {
  return gulp.src(PUBLISHED_DIR + '/index.md')
    .pipe(aglio({template: 'default'}))
    .pipe(gulp.dest(PUBLISHED_DIR));
});

gulp.task('browserSync', function(callback) {
  browserSync.init({
    logConnections: true,
    logFileChanges: true,
    notify: true,
    port: 8080,
    open: false,
    server: {
      baseDir: PUBLISHED_DIR
    }
  });
  callback();
});

function watchFiles(callback) {
  const browserReload = () => {
    browserSync.reload();
    callback();
  };

  gulp.watch(TEMPLATE_FILES).on('change', gulp.series('combine', 'generate-api-docs', browserReload));
}

gulp.task('default', gulp.series('browserSync', watchFiles));
gulp.task('build', gulp.series('combine', 'generate-api-docs', 'browserSync'));
