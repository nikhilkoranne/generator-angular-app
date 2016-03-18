'use strict';
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')({ lazy: true });
var browserSync = require('browser-sync');
var config = require('./gulp.config')();
var wiredep = require('wiredep');
var livereload = require('gulp-livereload');

var paths = {
    appScripts: 'src/app/**/*.js'
};
var port = 8082;
gulp.task('scripts', function () {
    return gulp.src([paths.appScripts])
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter(require('jshint-stylish')))
        .pipe(plugins.size());
});

gulp.task('watch', ['serve'], function () {
    livereload.listen();

    gulp.watch([
        'src/**/*.html',
        'src/**/*.js',
        'src/styles/*.css'
    ]).on('change', function (file) {
        console.log('File changed: ' + file.path);
        livereload.changed(file.path); //YES (by itself)
        //livereload.reload(); //YES (by itself)
    });

    gulp.watch(paths.appScripts, ['scripts']);
});

gulp.task('injectjs', function () {
    var target = gulp.src(config.index);
    var sources = gulp.src([paths.appScripts]);

    return target.pipe(plugins.inject(sources, { relative: true }))
        .pipe(gulp.dest('./src'));

});

gulp.task('default', function () {
    // require('opn')('http://localhost:9000');
    var isDev = true
    var nodeOptions = {
        script: config.nodeServer,
        delayTime: 1,
        env: {
            'PORT': port,
            'NODE_ENV': isDev ? 'development' : 'production'
        },
        watch: [config.server]
    };

    return plugins.nodemon(nodeOptions)
        .on('restart',  function (event) {
            log('nodemon restarted');
            log('files changed on restart:\n' + event);
            setTimeout(function () {
                browserSync.notify('reloading now ...');
                browserSync.reload({ stream: false });
            }, 1000);
        })
        .on('start', function () {
            log('nodemon started');
            startBrowserSync(isDev);
        })
        .on('crash', function (event) {
            log('nodemon crashed: script crashed for some reason');
            log('files changed on restart:\n' + event);
        })
        .on('exit', function () {
            log('nodemon exited cleanly');
        });
});

gulp.task('connect', function () {
    //     var app = connect()
    //         .use(serveStatic('src'));
    // 
    //     require('http').createServer(app)
    //         .listen(9000)
    //         .on('listening', function () {
    //             console.log('Started connect web server on http://localhost:9000');
    //         });
});

gulp.task('wiredep', function () {
    var options = config.getWiredepDefaultOptions();
    var wiredep = require('wiredep').stream;

    return gulp
        .src(config.index)
        .pipe(wiredep(options))
        .pipe(plugins.inject(gulp.src(config.js), { relative: true }))
        .pipe(gulp.dest('src/client'));
});


function startBrowserSync(isDev) {
    if (browserSync.active) {
        return;
    }
    log('Starting browser-sync on port ' + port);
    var options = {
        proxy: 'localhost:' + port,
        port: 9001,
        files: [config.js],
        ghostMode: {
            clicks: true,
            location: false,
            forms: true,
            scroll: true
        },
        injectChanges: true,
        logFileChanges: true,
        logLevel: 'debug',
        logPrefix: 'gulp-patterns',
        notify: true,
        reloadDelay: 1000
    };
    browserSync(options);
}


function log(msg) {
    if (typeof (msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                plugins.util.log(plugins.util.colors.blue('*** ' + msg[item] + ' ***'));
            }
        }
    } else {
        plugins.util.log(plugins.util.colors.blue('*** ' + msg + ' ***'));
    }
}
