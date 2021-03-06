module.exports = function(config) {
    config.set({
        basePath: '../',
        files: [
            'node_modules/babel-core/browser-polyfill.js',
            'localhistory/localhistory.min.js',
            'dist_dev/playbyplay.js',
            'test/utils.js',
            'test/tests/**/*.js'
        ],
        frameworks: ['mocha', 'chai-as-promised', 'chai-jquery', 'chai', 'jquery-2.1.0'],
        reporters: ['progress', 'coverage'],
        browsers: ['PhantomJS'],
        preprocessors: {
            'dist_dev/playbyplay.js': ['coverage'],
            'test/utils.js': ['babel'],
            'test/tests/**/*.js': ['babel']
        },
        babelPreprocessor: {
            options: {
                sourceMap: 'inline',
                optional: ['es7.asyncFunctions']
            },
            filename: function(file) {
                return file.originalPath.replace(/\.js$/, '.es5.js');
            },
            sourceFileName: function(file) {
                return file.originalPath;
            }
        },
        coverageReporter: {
            type: 'lcov',
            dir: 'test/coverage'
        }
    });
};
