(function () {
    'use strict';

    angular
        .module('<%= ngapp %>')
        .config(Config);

    Config.$inject = ['$stateProvider'];
    function Config($stateProvider) {
        $stateProvider
            .state('<%= state %>', {
                url: '/'+'<%= url %>',
                templateUrl: '<%= htmlTemplate %>',
                controller: '<%= controller %>',
                controllerAs: 'vm',
            })
    }
})();