angular.module('koan.new').component('new', {
    templateUrl: 'modules/new/new.template.html',
    controller: function ($rootScope, api) {
      var ctrl = this;

      
      ctrl.savePaste = function () {
        if (!ctrl.postBox.message.length || ctrl.postBox.disabled) {
          $event.preventDefault();
          return;
        }
      }
    }
});