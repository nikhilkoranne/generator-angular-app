'use strict';
var generators = require('yeoman-generator'),
    _ = require('lodash'),
    chalk = require('chalk'),
    yosay = require('yosay');

module.exports = generators.Base.extend({
    constructor: function(){
        generators.Base.apply(this, arguments);
        
        this.argument('appname', { type: String, required: true });
        this.appname = _.kebabCase(this.appname);
        
        this.option('includeutils', {
           desc: 'Optionally includes Angular-UI Utils library.',
           type: Boolean,
           default: false 
        });
    },
    
    initializing: function(){
    },
    prompting: function(){
        this.log(yosay('Welcome to ' + 
            chalk.yellow('YANG (Yet Another Angular)') + ' generator!'));
            
            var done = this.async();
            this.prompt([{
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
                    }
                ]
            }], function(answers){
               this.log(answers);
               //this.ngappname = answers.ngappname;
               this.config.set('ngappname', answers.ngappname);
               this.config.save();
               
               this.includeLodash = _.includes(answers.jslibs, 'lodash');
               this.includeMoment = _.includes(answers.jslibs, 'momentjs');
               this.includeAngularUIUtils = _.includes(answers.jslibs, 'angularuiutils');               
               done(); 
            }.bind(this));
            
    },
    configuring: function(){
    },
    writing: {
        gulpfile: function(){
            this.copy('_gulpfile.js', 'gulpfile.js');
            this.copy('_gulp.config.js', 'gulp.config.js');
            this.copy('jshintrc', '.jshintrc');
        },

        packageJSON: function(){
            this.copy('_package.json', 'package.json');
        },

        git: function(){
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

        bower: function(){
            var bowerJson = {
                name: this.appname,
                license: 'MIT',
                dependencies: {}  
            };
            bowerJson.dependencies['angular'] = '~1.4.6';
            bowerJson.dependencies['angular-bootstrap'] = '~0.13.4';
            bowerJson.dependencies['angular-ui-router'] = '~0.2.15';
            bowerJson.dependencies['bootstrap-css-only'] = '~3.3.5';
            if (this.includeLodash){
                bowerJson.dependencies['lodash'] = '~3.10.1';                
            }
            if (this.includeMoment){
                bowerJson.dependencies['moment'] = '~2.10.6';                
            }
            //if (this.options.includeutils){
            if (this.includeAngularUIUtils){
                bowerJson.dependencies['angular-ui-utils'] = '~3.0.0';
            }
            this.fs.writeJSON('bower.json', bowerJson);
            
            this.copy('bowerrc', '.bowerrc');
        },

        appStaticFiles: function(){
            this.copy('_favicon.ico', 'src/favicon.ico');
            this.directory('styles', 'src/styles');
        },

        scripts: function(){
            this.fs.copyTpl(
                this.templatePath('app/_app.js'),
                this.destinationPath('src/app/app.js'),
                {
                    //ngapp: this.ngappname
                    ngapp: this.config.get('ngappname')
                }
            );
            this.fs.copyTpl(
                this.templatePath('app/layout/_shell.controller.js'),
                this.destinationPath('src/app/layout/shell.controller.js'),
                {
                    ngapp: this.config.get('ngappname')
                });
            this.fs.copyTpl(
                this.templatePath('app/home/_home.controller.js'),
                this.destinationPath('src/app/home/home.controller.js'),
                {
                    ngapp: this.config.get('ngappname')
                });
            this.fs.copyTpl(
                this.templatePath('app/about/_about.controller.js'),
                this.destinationPath('src/app/about/about.controller.js'),
                {
                    ngapp: this.config.get('ngappname')
                });
        },

        html: function(){
            this.fs.copyTpl(
                this.templatePath('_index.html'),
                this.destinationPath('src/index.html'),
                {
                    appname: _.startCase(this.appname),
                    ngapp: this.config.get('ngappname')
                }
            );
            this.fs.copy(
                this.templatePath('app/layout/_shell.html'),
                this.destinationPath('src/app/layout/shell.html'));
            this.fs.copy(
                this.templatePath('app/home/_home.html'),
                this.destinationPath('src/app/home/home.html'));
            this.fs.copy(
                this.templatePath('app/about/_about.html'),
                this.destinationPath('src/app/about/about.html'));
        }
    },
    conflicts: function(){
    },
    install: function(){
        //this.bowerInstall();
        //this.npmInstall();
        this.installDependencies({
            skipInstall: this.options['skip-install']
        });
    },
    end: function(){
        this.log(chalk.yellow.bold('Installation successful!'));

        var howToInstall =
            '\nAfter running ' + chalk.yellow.bold('npm install & bower install') +
            ', inject your front end dependencies by running ' +
            chalk.yellow.bold('gulp wiredep') +
            '.';

        if (this.options['skip-install']) {
            this.log(howToInstall);
            return;
        }
    }
});