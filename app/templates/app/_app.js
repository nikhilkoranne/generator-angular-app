(function () {
    'use strict';
    var app = angular.module('<%= ngapp %>', [
        'ui.bootstrap',
        'ui.router'
    ]);

    app.run(['$state', function ($state) {
        // Include $state to kick start the router.
    }]);
})();