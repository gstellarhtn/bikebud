// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular
// modules 'starter' is the name of this angular module example (also set in a
// <body> attribute in index.html) the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('bb-app', ['ionic', 'uiGmapgoogle-maps'])
  .constant('_', window._)
  .run(function($ionicPlatform, $rootScope) {
    $rootScope._ = window._;
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar
      // above the keyboard for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })

  .config(function($stateProvider, $urlRouterProvider, uiGmapGoogleMapApiProvider) {

    $stateProvider
      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
      })
      .state('app.map', {
        url: '/map',
        views: {
          'menuContent': {
            templateUrl: 'templates/map.html',
            controller: 'MapCtrl'
          }
        }
      })
      .state('app.location', {
        url: '/location',
        views: {
          'menuContent': {
            templateUrl: 'templates/location.html',
            controller: 'LocationCtrl'
          }
        }
      })
      .state('app.login', {
        url: '/login',
        views: {
          'menuContent': {
            templateUrl: 'templates/login.html',
            controller: 'LoginCtrl'
          }
        }
      });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/location');

    uiGmapGoogleMapApiProvider.configure({
      key: 'AIzaSyDRqIfcKVWQTRIfmP5pwW80ECPe90U0PMY',
      v: '3.24',
      libraries: 'places'
    });

  });
