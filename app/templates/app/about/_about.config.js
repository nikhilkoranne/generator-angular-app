'use strict';

angular.module('<%= ngapp %>').run(['MenuService',
  function (MenuService) {
    MenuService.addMenu({
      title: 'About',
      state: 'about',
    });
  }
]);
