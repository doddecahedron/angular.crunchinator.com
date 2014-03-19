'use strict';

angular.module('crunchinatorApp.models', []);
angular.module('crunchinatorApp.directives', []);
angular.module('crunchinatorApp.services', []);
angular.module('crunchinatorApp.controllers', [
    'ui.state',
    'ui.bootstrap',
    'configuration',
    'crunchinatorApp.models',
    'crunchinatorApp.directives',
    'crunchinatorApp.services',
    'infinite-scroll',
]).config(function config($stateProvider) {
    $stateProvider.state('crunchinator', {
        url: '/crunchinator',
        views: {
            main: {
                controller: 'CrunchinatorCtrl',
                templateUrl: 'views/main.tpl.html'
            },
            about: {
                controller: 'AboutCtrl',
                templateUrl: 'views/about.tpl.html'
            }
        },
        data:{ pageTitle: 'Crunchinator - A Cloudspace Project' }
    });
});

angular.module('crunchinatorApp', [
    'ui.state',
    'ui.route',
    'crunchinatorApp.controllers'
])

.config(function myAppConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise( '/crunchinator' );
})

.run(function run() {
})

.controller('AppCtrl', function AppCtrl($scope, $location) {
    $scope.isIE = function() {
        var myNav = navigator.userAgent.toLowerCase();
        return (myNav.indexOf('msie') !== -1) ? parseInt(myNav.split('msie')[1]) : false;
    };

    $scope.shared_results = !!$location.search().filters;

    $scope.$on('$stateChangeSuccess', function(event, toState){
        if (angular.isDefined(toState.data.pageTitle)) {
            $scope.pageTitle = toState.data.pageTitle;
        }
    });

    if($scope.isIE()){
        angular.element('html, body').css({
            'overflow': 'visible'
        });
    }
});
