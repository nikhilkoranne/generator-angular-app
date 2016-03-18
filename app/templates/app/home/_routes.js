(function () {
    'use strict';

    angular
        .module('<%= ngapp %>')
        .config(Config);

    Config.$inject = ['$stateProvider','$urlRouterProvider'];
    function Config($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'app/features/home/home.html',
                controller: 'HomeCtrl',
                controllerAs: 'vm',
            });
        $urlRouterProvider.otherwise('/login');
    }
})();