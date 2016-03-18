(function () {
    'use strict';

    angular.module('<%= ngapp %>').controller('HomeCtrl', HomeCtrl);

    HomeCtrl.$inject = ['$rootScope','$location'];
    
    /* @ngInject */
    function HomeCtrl($rootScope,$location) {
        /* jshint validthis: true */
        var vm = this;

        activate();

        function activate() {
            if (!$rootScope.isAuthenticated) {
                $location.path('/login');
            }
        }
    }
})();