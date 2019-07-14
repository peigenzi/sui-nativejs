const path = require('path');
const fs = require('fs');
const gulp = require('gulp');
const sass = require('gulp-sass');
const nano = require('gulp-cssnano');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const rename = require('gulp-rename');
const browserSync = require('browser-sync');
const yargs = require('yargs').options({
    w: {
        alias: 'watch',
        type: 'boolean'
    },
    s: {
        alias: 'server',
        type: 'boolean'
    },
    p: {
        alias: 'port',
        type: 'number'
    }
}).argv;

let option = {
    base: 'src'
};
let dist = __dirname + '/dist';

function handleError(error) {
    console.error(error.toString());

    this.emit('end');
}

gulp.task('build:style', () => {
    gulp.src('src/style/sui.scss')
        .pipe(sass())
        .on('error', handleError)
        .pipe(postcss([autoprefixer({ overrideBrowserslist: ['iOS >= 7', 'Android >= 4.1'] })]))
        .pipe(gulp.dest(`${dist}/style`))
        // .pipe(browserSync.reload({ stream: true }))
        .pipe(
            nano({
                // zindex: false,
                // autoprefixer: false
            })
        )
        .pipe(
            rename(path => {
                path.basename += '.min';
            })
        )
        .pipe(browserSync.reload({ stream: true }))
        .pipe(gulp.dest(`${dist}/style`));
});

gulp.task('build:example:html', () => {
    gulp.src('src/example/index.html')
        // .pipe(gulp.dest('dist/example'))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('build:example', ['build:example:html']);

gulp.task('pre', ['build:style', 'build:example']);

gulp.task('watch', ['pre'], () => {
    gulp.watch('src/style/**/*', ['build:style']);
    gulp.watch('src/**/*.html', ['build:example:html']);
});

gulp.task('server', () => {
    yargs.p = yargs.p || 7777;
    browserSync.init({
        server: {
            // baseDir: 'dist'
            // baseDir: ''
        },
        port: yargs.p,
        startPath: '/src/example'
    });
});

gulp.task('default', () => {
    if (yargs.s) {
        gulp.start('server');
    }

    if (yargs.w) {
        gulp.start('watch');
    }
});
