var gulp        = require('gulp'),
    aglio       = require('gulp-aglio'),
    browserSync = require('browser-sync'),
    rename      = require('gulp-rename'),
    rimraf      = require('rimraf'),
    ejs         = require('gulp-ejs'),
    ApiMock     = require('api-mock'),
    Drakov      = require('drakov');

var reload = browserSync.reload;

var TEMPLATE_FILES = ['apidocs/**/*.md'],
    LAYOUT_FILE = 'apidocs/layout.md',
    PUBLISHED_DIR = 'published';

gulp.task('combine', function() {
  return gulp.src(LAYOUT_FILE)
    .pipe(ejs({},{ ext: '.md' }))
    .pipe(rename('index.md'))
    .pipe(gulp.dest(PUBLISHED_DIR));
});

gulp.task('generate-api-docs', function(callback) {
  gulp.src(PUBLISHED_DIR + '/index.md')
    .pipe(aglio({template: 'default'}))
    .pipe(gulp.dest(PUBLISHED_DIR));
  callback();
});


gulp.task('watch', function () {
  gulp.watch(TEMPLATE_FILES, gulp.task('generate-api-docs', reload))
});

gulp.task('browserSync', function(collback) {
  browserSync({
    logConnections: true,
    logFileChanges: true,
    notify: true,
    port: 8080,
    open: false,
    server: {
      baseDir: PUBLISHED_DIR
    }
  });
  collback();
});

gulp.task('api-mock', function () {
  var mockServer = new Drakov({
    blueprintPath: PUBLISHED_DIR + '/index.md',
    options: {
      port: 3000
    }
  });
  mockServer.run();
});

// gulp.task('clean', function(callback) {
//   rimraf(PUBLISHED_DIR, callback());
// });

// gulp.task('published', gulp.series('generate-api-docs'));
gulp.task('default', gulp.series('combine', 'generate-api-docs', gulp.parallel('watch', 'browserSync')));
gulp.task('published', gulp.series('api-mock'));
