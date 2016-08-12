angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
      
        
    .state('tabsController.switchControl', {
      cache: false, 
      url: '/status',
      views: {
        'tab1': {
          templateUrl: 'templates/switchControl.html',
          controller: 'switchControlCtrl'
        }
      }
    })
        
      
    
      
        
    .state('tabsController.switchControl2', {
      url: '/manual',
      views: {
        'tab2': {
          templateUrl: 'templates/switchControl2.html',
          controller: 'switchControl2Ctrl'
        }
      }
    })
        
      
    
      
        
    .state('tabsController.switchControl3', {
      url: '/settings',
      views: {
        'tab3': {
          templateUrl: 'templates/switchControl3.html',
          controller: 'switchControl3Ctrl'
        }
      }
    })
        
      
    
      
    .state('tabsController', {
      url: '/tabs',
      abstract:true,
      templateUrl: 'templates/tabsController.html'
    })
      
    ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tabs/status');

});