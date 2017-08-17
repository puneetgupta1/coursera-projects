(function () {
'use strict';

angular.module('MenuApp')
.controller('MenuAppItemDetailController', MenuAppItemDetailController);

// Version with resolving to 1 item based on $stateParams in route config
MenuAppItemDetailController.$inject = ['MenuAppCategoriesService', 'details'];
function MenuAppItemDetailController(MenuAppCategoriesService, details) {
  var itemctrl = this;
  itemctrl.details = details;
}

})();