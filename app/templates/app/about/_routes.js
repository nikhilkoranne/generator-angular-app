(function () {
    'use strict';

    angular
        .module('<%= ngapp %>')
        .config(Config);

    Config.$inject = ['$stateProvider'];
    function Config($stateProvider) {
        $stateProvider
            .state('about', {
                url: '/about',
                templateUrl: 'app/features/about/about.html',
                controller: 'AboutCtrl',
                controllerAs: 'vm',
            })
    }
})();