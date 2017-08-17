(function() {
'use strict';

angular.module('MenuApp')
  .component('items', {
    templateUrl: 'src/menuapp/templates/item-detail-component.template.html',
    bindings: {
      items: '<'
    }
  });

})();