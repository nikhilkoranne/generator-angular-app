(function () {
    'use strict';
    var app = angular.module('<%= ngapp %>', [
        'ui.bootstrap',
        'ui.router'
    ]);

    app.config(['$stateProvider', '$urlRouterProvider', configRoutes]);

    function configRoutes($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'app/home/home.html',
                controller: 'HomeCtrl',
                controllerAs: 'vm',
            })
            .state('about', {
                url: '/about',
                templateUrl: 'app/about/about.html',
                controller: 'AboutCtrl',
                controllerAs: 'vm',
            });

        $urlRouterProvider.otherwise('/');
    }

    app.run(['$state', function ($state) {
        // Include $state to kick start the router.
    }]);
})();