(function () {
    'use strict';
    angular
        .module('<%= ngapp %>')
        .run(runBlock);

    runBlock.$inject = ['MenuService'];

    function runBlock(MenuService) {
        MenuService.addMenu({
            title: 'About',
            state: 'about',
        });
    }
})();