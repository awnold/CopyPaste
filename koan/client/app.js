'use strict';

/**
 * Top level module. Lists all the other modules as dependencies.
 */

angular
    .module('koan', [
      'ngRoute',
      'angular-loading-bar',
      'koan.common',
      'koan.new',
      'koan.load'

    ])

    .config(function ($routeProvider, $locationProvider, cfpLoadingBarProvider) {
      cfpLoadingBarProvider.includeSpinner = false;
      cfpLoadingBarProvider.latencyThreshold = 500;//ms
      $locationProvider.html5Mode(true);
      $routeProvider
          .otherwise({
            redirectTo: '/'
          });
    })

    .run(function ($location, $rootScope, $window, $route, api) {
      // attach commonly used info to root scope to be available to all components/views
      var common = $rootScope.common = $rootScope.common || {
        active: {},
        user: JSON.parse($window.sessionStorage.user || $window.localStorage.user),
        goHome: function () {
          window.location.href="/";
        },
        savePaste: function () {
          // var pasteContent = document.getElementById("pasteInput").value;
          var pasteElem = document.getElementById("pasteInput");
          if (pasteElem) {
            var pasteContent = pasteElem.value;
            if (pasteContent.length > 0) {
              var obj = {
                paste: pasteContent
              }
              api.pastes.createPaste(obj).then(function success(response) {
                var newPaste = response.data;
                window.location.href="/" + newPaste;
                console.log(newPaste);
              })
            }
          }
        }
      };

      // declare websocket event listeners for backend api
      api.connected.subscribe(function () {
        common.onlineIndicatorStyle = {'background-color': 'green'};
      });

      api.disconnected.subscribe(function () {
        common.onlineIndicatorStyle = {'background-color': 'lightgrey'};
      });

      // set actions to be taken each time the user navigates
      $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        // set page title
        $rootScope.common.title = current.title;

        // set active menu class for the left navigation (.sidenav)
        $rootScope.common.active[current.menuItem] = 'active';
        if (previous) {
          delete $rootScope.common.active[previous.menuItem];
        }
      });
    });