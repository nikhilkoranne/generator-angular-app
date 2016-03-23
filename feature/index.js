'use strict';
var generators = require('yeoman-generator'),
    fs = require('fs'),
    _ = require('lodash');

module.exports = generators.Base.extend({
    initializing: function () {
        this.properties = [];
    },
    _askForProperty: function (done) {
        done = done || this.async();

        var prompts = [{
            type: 'input',
            name: 'propertyName',
            message: 'Enter Property Name? ',
        }, {
                type: 'list',
                name: 'propertyType',
                message: 'Select datatype for the property ',
                choices: ['String', 'Number']
            },
            {
                type: 'confirm',
                name: 'askAgain',
                message: 'Want to add more property?'
            }];
        this.prompt(prompts, function (answers) {
            this.properties.push({ propertyName: answers.propertyName, propertyType: answers.propertyType });
            if (answers.askAgain) {
                this._askForProperty(done);
            } else {
                this.config.set(this.name + 'Entity', this.properties);
                done();
            }
        }.bind(this));

    },
    askForName: function () {
        var done = this.async();
        this.prompt([
            {
                type: 'input',
                name: 'featureName',
                message: 'Provide Feature Name:? ',
            }, {
                type: 'list',
                name: 'routeConfirmation',
                message: 'Would you like to include route file? ',
                choices: ['Yes', 'No']
            }, {
                when: function (response) {
                    if (response.routeConfirmation === 'Yes')
                        return response;
                },
                type: 'input',
                name: 'routeUrl',
                message: 'Enter a URL for the route (leave it blank to inherit it from Feature)?',
                // default: this.featureName
            }, {
                when: function (response) {
                    if (response.routeConfirmation === 'Yes')
                        return response;
                },
                type: 'list',
                name: 'includeLink',
                message: 'Would you like to include hyperlink for this feature in menubar?',
                choices: ['Yes', 'No']
            }, {
                type: 'list',
                name: 'propertyConfirmation',
                message: 'Would you like to enter properties for this feature ',
                choices: ['Yes', 'No']
            }], function (answers) {
                this.routeConfirmation = answers.routeConfirmation;
                this.name = answers.featureName;
                this.routeName = this.name;
                this.routeUrl = answers.routeUrl || this.name;
                this.includeLink = answers.includeLink;
                if (answers.propertyConfirmation === 'Yes') {
                    this._askForProperty(done);
                } else
                    done();
            }.bind(this));
    },

    createdFile: function () {
        var fileNameFragment = _.camelCase(this.name);

        this.fs.copyTpl(
            this.templatePath('_controller.js'),
            this.destinationPath('src/client/app/features/' + fileNameFragment + '/' + fileNameFragment + '.controller.js'),
            {
                ctrlName: _.upperFirst(this.name + 'Controller'),
                appName: this.config.get('ngappname'),
                entity: this.config.get(this.name + 'Entity')
            });

        this.fs.copyTpl(
            this.templatePath('_view.html'),
            this.destinationPath('src/client/app/features/' + fileNameFragment + '/' + fileNameFragment + '.html'),
            {
                name: this.name
            });

        if (this.routeConfirmation === 'Yes') {
            this.fs.copyTpl(
                this.templatePath('_routes.js'),
                this.destinationPath('src/client/app/features/' + fileNameFragment + '/' + 'routes.js'),
                {
                    ngapp: this.config.get('ngappname'),
                    state: this.routeName,
                    url: this.routeUrl,
                    htmlTemplate: 'app/features/' + fileNameFragment + '/' + fileNameFragment + '.html',
                    controller: _.upperFirst(this.name + 'Controller')
                });
        }
    },
    end: function () {
        if (this.routeConfirmation === 'Yes' && this.includeLink === 'Yes') {
            var featuresName = []
            var featureFolder = process.cwd() + '/src/client/app/features/';
            if (fs.existsSync(featureFolder)) {
                fs.readdirSync(featureFolder).forEach(function (folder) {
                    if (folder != 'login') {
                        featuresName.push(folder)
                    }
                })
            }
            this.fs.copyTpl(
                this.templatePath('_shell.html'),
                this.destinationPath('src/client/app/layout/shell.html'),
                {
                    links: featuresName
                });
            this.spawnCommand('gulp', ['wiredep'])
        }
    }
});