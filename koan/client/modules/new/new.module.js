'use strict';

/**
 * New paste module for displaying new paste content
 */

angular
    .module('koan.new', [
      'ngRoute',
      'koan.common'
    ])
    .config(function ($routeProvider) {
      $routeProvider
          .when('/', {
            title: 'CopyPaste - New Doc',
            template: '<new></new>',
            menuItem: 'new'
          });
    });