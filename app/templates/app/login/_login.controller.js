(function () {
    'use strict';

    angular.module('<%= ngapp %>').controller('LoginController', LoginController);

    LoginController.$inject = ['authService', '$location', '$rootScope'];
    
    /* @ngInject */
    function LoginController(authService, $location, $rootScope) {
        /* jshint validthis: true */
        var vm = this;
        vm.login = login;
        activate();

        function activate() {
            if ($rootScope.isAuthenticated) {
                $location.path('/');
            }
        }
        function login() {
            authService.login(vm.user).success(function (response) {
                localStorage.setItem('token', response.token);
                $rootScope.$broadcast('loggedInSuccessfull')
                $location.path('/');
            }).error(function (err) {
                vm.isRouteLoading = false;
            });
        }
    }
})();