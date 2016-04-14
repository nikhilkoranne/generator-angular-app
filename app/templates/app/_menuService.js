(function () {
    'use strict';

    angular
        .module('<%= ngapp %>')
        .factory('MenuService', MenuService);

    function MenuService() {
        var service = {
            getMenus: getMenus,
            addMenu: addMenu,
        };
        var menus = []

        return service;

        ////////////////
        function getMenus() {
            return menus;
        }
        function addMenu(menu) {
            menus.push(menu);
        }
    }
})();