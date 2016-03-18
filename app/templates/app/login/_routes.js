(function () {
    'use strict';

    angular
        .module('<%= ngapp %>')
        .config(Config);

    Config.$inject = ['$stateProvider'];
    function Config($stateProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'app/features/login/login.html',
                controller: 'LoginController',
                controllerAs: 'vm',
            });
    }
})();