(function () {
'use strict';

angular.module('MenuApp')
.controller('MenuAppCategoriesController', MenuAppCategoriesController);


MenuAppCategoriesController.$inject = ['MenuAppCategoriesService', 'categories'];
function MenuAppCategoriesController(MenuAppCategoriesService, categories) {
  var menucategories = this;
  menucategories.items = categories;
}

})();
