(function () {
    'use strict';

    angular.module('<%= ngapp %>').controller('ShellCtrl', ShellCtrl);

    ShellCtrl.$inject = ['$rootScope', '$location','MenuService'];

    function ShellCtrl($rootScope, $location, MenuService) {
        /* jshint validthis:true */
        var vm = this;
        $rootScope.isAuthenticated = vm.isAuthenticated = false;
        vm.logout = logout;
        activate();

        function activate() {
            vm.menus= MenuService.getMenus();
        }

        function logout() {
            $rootScope.isAuthenticated = vm.isAuthenticated = false;
            $location.path('/login');
        }
        $rootScope.$on('loggedInSuccessfull', function () {
            $rootScope.isAuthenticated = vm.isAuthenticated = true;
        })
    }
})();
