(function () {
    'use strict';

    angular.module('<%= ngapp %>').controller('LoginController', LoginController);

    LoginController.$inject = [];
    
    /* @ngInject */
    function LoginController() {
        /* jshint validthis: true */
        var vm = this;

        activate();

        function activate() {
        }
    }
})();