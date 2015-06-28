/* eslint-env node */

const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const fs = require('fs');
const del = require('del');
const path = require('path');
const mkdirp = require('mkdirp');
const esperanto = require('esperanto');
const karma = require('karma');
const browserSync = require('browser-sync').create();

const watchJs = [
    'src/**/*.js',
    'test/tests/**/*.js',
    'demo/index.js',
    'demo/localhistory-mock.js'
];

const lintJs = watchJs.concat([
    'gulpfile.js',
    'test/karma.conf.js',
    'demo/index.js'
]);

const watchCss = ['src/**/*.css'];

const watch = watchJs.concat(watchCss);

// Lint

gulp.task('lint', function() {
    return gulp.src(lintJs)
        .pipe($.eslint())
        .pipe($.eslint.format())
        .pipe($.eslint.failOnError());
});

// Build

const src = 'src';
const dev = 'dist_dev';
const indexJs = 'index.js';
const exportedName = 'playbyplay';
const libJs = exportedName + '.js';
const libCss = exportedName + '.css';

function header() {
    const pkg = require('./package.json');
    return '/* ' + pkg.name + ' v' + pkg.version + ' | ' + pkg.homepage +
        ' | License: ' + pkg.license + ' */\n';
}

gulp.task('clean', function(done) {
    del([dev, 'test/coverage'], done);
});

gulp.task('build', function(done) {
    gulp.src(path.join(src, 'index.css'))
        .pipe($.header(header()))
        .pipe($.rename(libCss))
        .pipe(gulp.dest(dev))
        .pipe($.rename(path.basename(libCss, '.css') + '.min.css'))
        .pipe($.sourcemaps.init())
        .pipe($.minifyCss())
        .pipe($.header(header()))
        .pipe($.sourcemaps.write('./'))
        .pipe(gulp.dest(dev));

    esperanto.bundle({
        base: src,
        entry: indexJs
    }).then(function(bundle) {
        const res = bundle.toUmd({
            strict: true,
            sourceMap: true,
            sourceMapSource: indexJs,
            sourceMapFile: libJs,
            name: 'playbyplay',
            useStrict: false
        });

        mkdirp.sync(dev);
        const map = path.join(dev, 'map.json');
        fs.writeFileSync(map, res.map.toString());

        $.file(map, res.code, {src: true})
            .pipe($.header(header()))
            .pipe($.rename(libJs))
            .pipe($.sourcemaps.init({loadMaps: true}))
            .pipe($.babel({blacklist: ['useStrict']}))
            .pipe($.sourcemaps.write('./', {addComment: false, sourceRoot: './'}))
            .pipe(gulp.dest(dev))
            .pipe($.filter(['*', '!**/*.js.map']))
            .pipe($.rename(path.basename(libJs, '.js') + '.min.js'))
            .pipe($.sourcemaps.init({loadMaps: true}))
            .pipe($.uglify())
            .pipe($.header(header()))
            .pipe($.sourcemaps.write('./'))
            .pipe(gulp.dest(dev))
            .on('end', function() {
                del(map, done);
            });
    })
    .catch(done);
});

// Test

const karmaConf = path.join(__dirname, '/test/karma.conf.js');

gulp.task('test', ['lint', 'build'], function(done) {
    karma.server.start({
        configFile: karmaConf,
        singleRun: true,
        autoWatch: false
    }, done);
});

// Watch

gulp.task('watch', ['build'], function() {
    browserSync.init({
        server: {
            baseDir: './',
            directory: true
        },
        startPath: 'demo/index_dev.html',
        browser: 'google chrome'
    });

    karma.server.start({
        configFile: karmaConf,
        singleRun: false,
        autoWatch: true,
        autoWatchBatchDelay: 500
    });

    gulp.watch(watch, ['build-reload']);
});

gulp.task('build-reload', ['build'], function() {
    browserSync.reload();
});

// Dist

const dist = 'dist';

gulp.task('dist', ['test'], function() {
    gulp.src(path.join(dev, '/**/*'))
        .pipe(gulp.dest(dist));
});
