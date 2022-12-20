const { src, dest, series, parallel, lastRun, watch } = require('gulp')

// NOTE: GENERAL
const del = require('del'),
  rename = require('gulp-rename'),
  changed = require('gulp-changed')

// NOTE: NUNJUCKS
const nunjucksRender = require('gulp-nunjucks-render'),
  data = require('gulp-data')

// NOTE: STYLES
const sass = require('gulp-sass')(require('sass'))
const prefix = require('gulp-autoprefixer'),
  cleanCss = require('gulp-clean-css')

// NOTE: SCRIPTS
const webpack = require('webpack'),
  webpackStream = require('webpack-stream'),
  webpackConfig = require('./webpack.config.js')

// NOTE: ERROR HANDLING
const plumber = require('gulp-plumber'),
  notify = require('gulp-notify')

// NOTE: IMAGES
const imagemin = require('gulp-imagemin')

// NOTE: BROWSER SYNC
const browserSync = require('browser-sync').create()

// NOTE: DEFAULT FILE PATHS
const paths = {
  input: 'src/',
  output: 'build/',
  // Nunjucks
  njk: {
    input: 'src/templates/page/**/*.{nunjucks,nj,njk,html}',
    output: 'build/'
  },
  // STYLES
  styles: {
    input: 'src/assets/scss/**/*.{scss,sass}',
    output: 'build/assets/css'
  },
  // SCRIPTS
  scripts: {
    input: 'src/assets/js/*.js',
    output: 'build/assets/js/'
  },
  // IMAGES
  img: {
    input: 'src/assets/img/**/*.{png,jpg,jpeg,gif,svg}',
    output: 'build/assets/img/'
  },
  // VIDEO
  vid: {
    input: 'src/assets/video/*.mp4',
    output: 'build/assets/video/'
  },
  // FONTS, etc.
  fonts: {
    input: 'src/assets/developer/fonts/**/*.{woff,woff2}',
    output: 'build/assets/developer/fonts/'
  },
  // RELOAD
  reload: './build/'
}

// NOTE: REMOVE EXISTING BUILD FOLDER
function clean(cb) {
  del.sync([paths.output])
  cb()
}

// NOTE: COMPILE NUNJUCKS TO HTML
function njk() {
  return (
    src(paths.njk.input)
      .pipe(changed(paths.njk.output))
      .pipe(
        data(function () {
          return require('./src/data/comp.json')
        })
      )
      .pipe(
        nunjucksRender({
          path: ['src/templates/'] // String or Array
        })
      )
      // .pipe(rename({ extname: '.html' }))
      .pipe(dest(paths.njk.output))
    // .pipe(browserSync.stream())
  )
}

// NOTE: COMPILE, LINT, CONCAT, REMOVE UNUSED AND MINIFY
function css() {
  return src(paths.styles.input)
    .pipe(changed(paths.styles.output))
    .pipe(
      plumber({
        errorHandler(err) {
          notify.onError({
            title: 'SCSS Error!',
            subtitle: 'See the terminal for more information.',
            message: '<%= error.message %>',
            wait: false,
            templateOptions: {
              date: new Date().toDateString()
            }
          })(err)
        }
      })
    )
    .pipe(sass({ outputStyle: 'expanded', sourceComments: true }))
    .on('error', sass.logError)
    .pipe(
      prefix({
        cascade: true,
        remove: true,
        grid: 'autoplace'
      })
    )
    .pipe(dest(paths.styles.output))
    .pipe(rename({ suffix: '.min' }))
    .pipe(cleanCss({ level: { 1: { specialComments: 'none' } } }))
    .pipe(
      notify({
        title: 'Stylesheet updated successfully',
        message: '<%= file.relative %>'
      })
    )
    .pipe(dest(paths.styles.output))
    .pipe(browserSync.stream())
}

function js(cb) {
  // run webpack
  return src(paths.scripts.input)
    .pipe(changed(paths.scripts.output))
    .pipe(webpackStream(webpackConfig, webpack))
    .on('error', function (error) {
      notify().write({
        message: error.message
      })
      this.emit('end')
    })
    .pipe(dest(paths.scripts.output))
    .pipe(
      notify({
        title: 'Webpack',
        message: 'Generated file: <%= file.relative %>'
      })
    )
}

// NOTE: OPTIMISE IMAGE FILES
function img() {
  return src(paths.img.input)
    .pipe(changed(paths.img.output))
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 75, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }]
        })
      ])
    )
    .pipe(dest(paths.img.output))
}

// NOTE: COPY VIDEO FILES
function video() {
  return src(paths.vid.input).pipe(changed(paths.vid.output)).pipe(dest(paths.vid.output))
}

// NOTE: COPY FONT FILES
function fonts() {
  return src(paths.fonts.input).pipe(changed(paths.fonts.output)).pipe(dest(paths.fonts.output))
}

// NOTE: INITIATE SERVER
function server(done) {
  browserSync.init({
    server: {
      baseDir: paths.reload
    }
  })
  done()
}

// NOTE: WATCH FOR CHANGES
function updated() {
  return (
    watch(
      ['src/assets/scss/**/*'],
      series(css, (done) => {
        browserSync.reload()
        done()
      })
    ),
    watch(
      ['src/templates/**'],
      series(njk, (done) => {
        browserSync.reload()
        done()
      })
    ),
    watch(
      ['src/assets/js/**'],
      series(js, (done) => {
        browserSync.reload()
        done()
      })
    )
  )
}

// CLEAN OLD AND COMPILE EVERYTHING NO BROWSER (gulp)
exports.default = series(clean, css, js, parallel(njk, img, fonts, video))

// COMPILE, WATCH AND RELOAD (gulp watch)
exports.watch = series(css, js, parallel(njk, img, video, fonts, server, updated))

// COMPILE EVERYTHING WITHOUT MEDIA RELATED FILES (gulp NoImages)
exports.NoImages = parallel(clean, css, js, njk)

// MEDIA ONLY PROCESSED (gulp media)
exports.media = parallel(img, video, fonts)

// REMOVE BUILD FOLDER (gulp clean)
exports.clean = clean
