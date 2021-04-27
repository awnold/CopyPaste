angular.module('koan.load').component('load', {
    templateUrl: 'modules/load/load.template.html',
    controller: function ($rootScope, api, $routeParams) {
      var ctrl = this;
      var pasteId = $routeParams.id;

      
      function loadPaste() {
        api.pastes.getPaste(pasteId).then(function success(response) {
          ctrl.paste = response.data;
        })
      }
      loadPaste();
    }
});