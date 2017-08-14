(function () {
    'use strict';

    angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController )
    .service('MenuSearchService', MenuSearchService)
    .directive('foundItems', FoundItemsDirective)
    .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

    function FoundItemsDirective() {
      var ddo = {
        templateUrl: 'foundItems.html',
        scope: {
          items: '<',
          title: '@title',
          onRemove: '&'
        }
        /*controller: FoundItemsDirectiveController,
        controllerAs: 'menu',
        bindToController: true*/
      };

      return ddo;
    }
    
    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
      var menu = this;
        
      menu.searchTerm = "";
      menu.foundItems = MenuSearchService.foundItems();
      menu.title = "List of Menu Items";

      menu.searchMenuItems = function () {
          try {
              MenuSearchService.getMatchedMenuItems(menu.searchTerm);
          } catch (error) {
              console.log("Controller Error: " + error.message);
              menu.errorMessage = error.message;
          }
      }
      
      menu.removeItem = function (itemIndex) {
          MenuSearchService.removeItem(itemIndex);
      };
    }

    MenuSearchService.$inject = ['$http', 'ApiBasePath'];
    function MenuSearchService($http, ApiBasePath) {
      var service = this;
      var menuItems = [];
      var items = "";
        
      service.getMatchedMenuItems = function (searchTerm) {
            $http.get(ApiBasePath + "/menu_items.json")
            .then(function (response) {
               items = response.data;
               menuItems = processMenuItems(menuItems, items, searchTerm);
            })
            .catch(function (errorResponse) {
              console.log("Error: " + errorResponse);
              throw errorResponse;
            });
      };
                
      service.foundItems = function () {
            return menuItems;
      };
        
      service.removeItem = function (itemIndex) {
            menuItems.splice(itemIndex, 1);
      };
               
      function processMenuItems(arr, items, searchTerm) {
        for (var i = 0; i < items.menu_items.length; i++) {
            if (items.menu_items[i].name.indexOf(searchTerm) != -1) {
                arr.push({
                    'menuItem': items.menu_items[i].name
                });
            }
        }  
          
        return arr;
      };
    }

})();
