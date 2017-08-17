(function () {
'use strict';

angular.module('MenuApp')
.service('MenuAppCategoriesService', MenuAppCategoriesService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");


MenuAppCategoriesService.$inject = ['$http', 'ApiBasePath']
function MenuAppCategoriesService($http, ApiBasePath) {
  var service = this;
  var items = "";
  var details = "";
  var processeditems = [];
  var itemdetails = [];

  service.getAllCategories = function () {
        $http.get(ApiBasePath + "/categories.json")
        .then(function (response) {
           items = response.data;
            processeditems = processItems(processeditems, items);
        })
        .catch(function (errorResponse) {
          console.log("Error: " + errorResponse);
          throw errorResponse;
        });
  };

  service.categories = function () {
        return processeditems;
  };
    
  function processItems(arr, items) {
      for (var i = 0; i < items.length; i++) {    
        arr.push({
            'name': items[i].name,
            'short_name': items[i].short_name
        });
      }  
          
      return arr;
  }
    
  service.getMenuForCategory = function (shortName) {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json"),
      params: {
        category: shortName
      }
    });
      
    return response;
  }
}
    
})();