const gulp = require("gulp");
const plumber = require("gulp-plumber");
const srcmap = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sync = require("browser-sync").create();
const csso = require("gulp-csso");
const rename = require("gulp-rename");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const svgstore = require("gulp-svgstore");
const del = require("del");

//html

const html = () => {
  return gulp.src("src/*.html")
    .pipe(gulp.dest("build"))
    .pipe(sync.stream());
}

exports.html = html;

const js = () => {
  return gulp.src("src/js/**.*")
    .pipe(gulp.dest("build/js/"))
    .pipe(sync.stream());
}

exports.js = js;

// Styles

const styles = () => {
  return gulp.src("src/scss/style.scss")
    .pipe(plumber())
    // .pipe(sourcemap.init())
    .pipe(sass())
    // .pipe(postcss([
    //   autoprefixer()
    // ]))
    // .pipe(csso())
    // .pipe(rename("style.min.css"))
    // .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
}

exports.styles = styles;

//images

const images = () => {
  return gulp.src("src/img/**/*.{jpg,png,svg,mp4}")
    // .pipe(imagemin([
    //   imagemin.optipng({optimizationLevel: 3}),
    //   imagemin.mozjpeg({quality: 100, progressive: true}),
    //   imagemin.svgo()
    // ]))
    .pipe(gulp.dest("build/img"))
    .pipe(sync.stream());
}

exports.images = images;

//webp

const createWebp = () => {
  return gulp.src("src/img/**/*.{jpg,png}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("build/img"))
    .pipe(sync.stream());
}

exports.createWebp = createWebp;

//sprite

const sprite = () => {
  return gulp.src("src/img/**/icon-*.svg")
    .pipe(svgstore())
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"))
    .pipe(sync.stream());
}

exports.sprite = sprite;

//clean

const clean = () => {
  return del("build");
};

exports.clean = clean;

//copy

const copy = () => {
  return gulp.src([
    "src/img/**",
    "src/fonts/**.*{woff,woff2}",
    "src/*.ico"
  ], {
    base: "src"
  })
  .pipe(gulp.dest("build"));
};

exports.copy = copy;

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;

// Watcher

const watcher = () => {
  gulp.watch("src/*.html", gulp.series("html"));
  gulp.watch("src/scss/**/*.scss", gulp.series("styles"));
  gulp.watch("src/img/**/*.*{jpg, png, svg}", gulp.series("images"));
  gulp.watch("src/img/**/*.svg", gulp.series("sprite"));
  gulp.watch("src/js/**/*", gulp.series("js"));
}

exports.dev = gulp.series(
  clean, html, js, copy, styles, images, server, watcher);

exports.build = gulp.series(
  clean, html, js, copy, styles, images, createWebp, sprite);

exports.default = gulp.series(
  clean, html, js, copy, styles, images, createWebp, sprite, server, watcher);
