(function () {
    'use strict';

    angular.module('<%= appName %>').controller('<%= ctrlName %>', <%= ctrlName %>);

    <%= ctrlName %>.$inject = [];

    /* @ngInject */
    function <%= ctrlName %>() {
        /* jshint validthis: true */
        var vm = this;
        vm.entity =  <%- JSON.stringify(entity) %>;
        vm.formData={};
        vm.list=[]
        vm.onSubmit=onSubmit;
        activate();
      
        ////////////////

        function activate() { }
        
       function onSubmit(){
           vm.list.push(vm.formData);
           vm.formData={};
       }
    }
})();