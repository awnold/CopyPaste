'use strict';

/**
 * Saved paste module for displaying saved paste content
 */

angular
    .module('koan.load', [
      'ngRoute',
      'koan.common'
    ])
    .config(function ($routeProvider) {
      $routeProvider
          .when('/:id', {
            title: 'CopyPaste - Saved',
            template: '<load></load>',
            menuItem: 'load'
          });
    });