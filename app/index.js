// 'use strict';
// var generators = require('yeoman-generator');
// 
// module.exports = generators.Base.extend({
//     method1: function () {
//         this.log('Helllooosssssssssssssss')
//     }
// });

'use strict';
var generators = require('yeoman-generator'),
    _ = require('lodash'),
    chalk = require('chalk'),
    yosay = require('yosay');

module.exports = generators.Base.extend({
    constructor: function () {
        generators.Base.apply(this, arguments);
        // this.log('name:',this.name)
    },

    initializing: function () {
        this.log('initializing')
    },
    prompting: function () {
        this.log(yosay('Welcome to ' +
            chalk.yellow('Angular App') + ' generator!'));

        var done = this.async();
        this.prompt([{
            type: 'input',
            name: 'appname',
            message: ' What would you like to call your application? ',
            //default: 'app'
            default: this.config.get('appname') || 'app'
            //store: true
        },
            {
                type: 'input',
                name: 'ngappname',
                message: 'Angular App Name (ng-app)',
                //default: 'app'
                default: this.config.get('ngappname') || 'app'
                //store: true
            },
            {
                type: 'checkbox',
                name: 'jslibs',
                message: 'Which JS libraries would you like to include?',
                choices: [
                    {
                        name: 'lodash',
                        value: 'lodash',
                        checked: true
                    },
                    {
                        name: 'Moment.js',
                        value: 'momentjs',
                        checked: true
                    },
                    {
                        name: 'Angular-UI Utils',
                        value: 'angularuiutils',
                        checked: true
                    },
                    {
                        name: 'JQuery',
                        value: 'jquery',
                        checked: true
                    },
                    {
                        name: 'angular-local-storage',
                        value: 'angularLocalStorage',
                        checked: true
                    },
                    {
                        name: 'angular-translate',
                        value: 'angularTranslate',
                        checked: true
                    },
                    {
                        name: 'angular-datatables',
                        value: 'angularDatatable',
                        checked: true
                    }
                ]
            }, {
                type: 'list',
                name: "installPackages",
                message: "Run npm install and bower install?",
                choices: ['Yes', 'No']
            }], function (answers) {
                this.log(answers);
                //this.ngappname = answers.ngappname;
                this.config.set('ngappname', answers.ngappname);
                this.config.save();

                this.includeLodash = _.includes(answers.jslibs, 'lodash');
                this.includeMoment = _.includes(answers.jslibs, 'momentjs');
                this.includeAngularUIUtils = _.includes(answers.jslibs, 'angularuiutils');
                this.includeJQuery = _.includes(answers.jslibs, 'jquery');
                this.includeAngularLocalStorage = _.includes(answers.jslibs, 'angularLocalStorage');
                this.includeAngularTranslate = _.includes(answers.jslibs, 'angularTranslate');
                this.includeAngularDatatable = _.includes(answers.jslibs, 'angularDatatable');
                this.installPackages = _.includes(answers.installPackages);
                done();
            }.bind(this));
    },
    configuring: function () {
        this.log('configuring')
    },
    default: function () {
        this.log('default')
    },
    writing: {
        gulpfile: function () {
            this.copy('_gulpfile.js', 'gulpfile.js');
            this.copy('_gulp.config.js', 'gulp.config.js');
            this.copy('jshintrc', '.jshintrc');
        },

        packageJSON: function () {
            this.copy('_package.json', 'package.json');
        },

        git: function () {
            //this.copy('gitignore', '.gitignore');
            this.composeWith('common', {
                options: {
                    'skip-messages': true,
                    gitignore: true,
                    gitattributes: true,
                    jshintrc: false,
                    editorconfig: false,
                    'test-jshintrc': false
                }
            });
        },

        bower: function () {
            var bowerJson = {
                name: this.appname,
                license: 'MIT',
                dependencies: {}
            };
            bowerJson.dependencies['angular'] = '~1.4.6';
            bowerJson.dependencies['angular-bootstrap'] = '~0.13.4';
            bowerJson.dependencies['angular-ui-router'] = '~0.2.15';
            bowerJson.dependencies['bootstrap'] = '~3.3.5';
            if (this.includeLodash) {
                bowerJson.dependencies['lodash'] = '~3.10.1';
            }
            if (this.includeMoment) {
                bowerJson.dependencies['moment'] = '~2.10.6';
            }
            //if (this.options.includeutils){
            if (this.includeAngularUIUtils) {
                bowerJson.dependencies['angular-ui-utils'] = '~3.0.0';
            }
            if (this.includeAngularLocalStorage) {
                bowerJson.dependencies['angular-local-storage'] = '~0.2.3';
            }
            if (this.includeAngularTranslate) {
                bowerJson.dependencies['angular-translate'] = '~2.8.1';
            }
            if (this.includeAngularDatatable) {
                bowerJson.dependencies['angular-datatables'] = '~0.5.3';
            }
            this.fs.writeJSON('bower.json', bowerJson);

            this.copy('bowerrc', '.bowerrc');
        },

        appStaticFiles: function () {
            this.copy('_favicon.ico', 'src/favicon.ico');
            this.directory('styles', 'src/client/assets/css');
        },

        scripts: function () {
            this.fs.copyTpl(
                this.templatePath('app/_app.js'),
                this.destinationPath('src/client/app/app.js'),
                {
                    //ngapp: this.ngappname
                    ngapp: this.config.get('ngappname')
                }
                );
            this.fs.copyTpl(
                this.templatePath('app/layout/_shell.controller.js'),
                this.destinationPath('src/client/app/layout/shell.controller.js'),
                {
                    ngapp: this.config.get('ngappname')
                });
            this.fs.copyTpl(
                this.templatePath('app/home/_home.controller.js'),
                this.destinationPath('src/client/app/home/home.controller.js'),
                {
                    ngapp: this.config.get('ngappname')
                });
            this.fs.copyTpl(
                this.templatePath('app/about/_about.controller.js'),
                this.destinationPath('src/client/app/about/about.controller.js'),
                {
                    ngapp: this.config.get('ngappname')
                });
            this.fs.copyTpl(
                this.templatePath('_server.js'),
                this.destinationPath('src/server/server.js'));
        },

        html: function () {
            this.fs.copyTpl(
                this.templatePath('_index.html'),
                this.destinationPath('src/client/index.html'),
                {
                    appname: _.startCase(this.appname),
                    ngapp: this.config.get('ngappname')
                }
                );
            this.fs.copy(
                this.templatePath('app/layout/_shell.html'),
                this.destinationPath('src/client/app/layout/shell.html'));
            this.fs.copy(
                this.templatePath('app/home/_home.html'),
                this.destinationPath('src/client/app/home/home.html'));
            this.fs.copy(
                this.templatePath('app/about/_about.html'),
                this.destinationPath('src/client/app/about/about.html'));
        }
    },
    conflicts: function () {
        this.log('conflicts')
    },
    install: function () {
        //this.bowerInstall();
        //this.npmInstall();
        this.log('npm      ------------',this.installPackages)
        if (this.installPackages === 'Yes') {
            this.installDependencies({
                skipInstall: this.options['skip-install']
            });
        }
    },
    end: function () {
        this.log('end')
    }
});