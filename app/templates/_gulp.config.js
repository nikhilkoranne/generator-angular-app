module.exports = function () {
    var app = 'src/client/app/';
    var server = './src/server/';
    //var homeViews = 'views/home/';

    var config = {
        //homeViews: homeViews,
        //index: homeViews + 'index.cshtml',
        index: 'src/client/index.html',
        appJs: app + '/',

        js: [
            app + '**/*.js',
            'src/client/assets/css/*.css'
        ],

        bower: {
            json: require('./bower.json'),
            directory: './vendor',
            ignorePath: './src',
            relative: true
        },
        server: server,
        /**
       *  Node settings
       */
        defaultPort: 9001,
        nodeServer: './src/server/server.js',
    };

    config.getWiredepDefaultOptions = function () {
        var options = {
            bowerJson: config.bower.json,
            directory: config.bower.directory,
            ignorePath: config.bower.ignorePath
        };
        return options;
    }

    return config;
};