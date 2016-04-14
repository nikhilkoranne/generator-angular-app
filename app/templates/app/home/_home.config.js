'use strict';

angular.module('<%= ngapp %>').run(['MenuService',
  function (MenuService) {
    MenuService.addMenu({
      title: 'Home',
      state: 'home',
    });
  }
]);