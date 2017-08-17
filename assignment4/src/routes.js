(function () {
    'use strict';

    angular.module('MenuApp')
    .config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RoutesConfig($stateProvider, $urlRouterProvider) {

      // Redirect to home page if no other URL matches
      $urlRouterProvider.otherwise('/');

      // *** Set up UI states ***
      $stateProvider

      // Home page
      .state('home', {
        url: '/',
        templateUrl: 'src/menuapp/templates/home.template.html'
      })

      // Premade list page
      .state('categories', {
        url: '/categories',
        templateUrl: 'src/menuapp/templates/main-categories.template.html',
        controller: 'MenuAppCategoriesController as menucategories',
        resolve: {
          categories: ['MenuAppCategoriesService', function (MenuAppCategoriesService) {
            MenuAppCategoriesService.getAllCategories();
            return MenuAppCategoriesService.categories();
          }]
        }
      })

      // Item detail
      .state('categories.items', {
        url: '/items/{category}',
        templateUrl: 'src/menuapp/templates/item-detail.template.html',
        controller: 'MenuAppItemDetailController as itemctrl',
        resolve: {
            details: ['MenuAppCategoriesService', '$stateParams', function (MenuAppCategoriesService, $stateParams) {
                return MenuAppCategoriesService.getMenuForCategory($stateParams.category)
                .then(function(response) {
                    return response.data.menu_items;
                });
            }]
        }
      });

    }

})();
