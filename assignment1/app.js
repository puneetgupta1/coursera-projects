(function () {
    'use strict';

    angular.module('LunchCheck', [])
    .controller('LunchCheckController', LunchCheckController);

    LunchCheckController.$inject = ['$scope'];
    function LunchCheckController ($scope) {
        $scope.menu = "";
        $scope.message = "Please enter data first"; 
        
        $scope.check = function () {
            var total = count($scope.menu);

            if (total == 0) {
                $scope.message = "Please enter data first";
            } else if (total <= 3) {
                $scope.message = "Enjoy!";
            } else {
                $scope.message = "Too much!";
            }
        };

        function count(entry) {
            console.log(entry);
            
            var val = 0;

            if (entry == null || entry == "") {
                return val;
            } else {
                var parts = entry.split(",");
                
                for (var i = 0; i < parts.length; i++) {
                    if (parts[i] == null || parts[i] == "" || parts[i] == " ") {
                        continue;
                    } else {
                        val++;
                    }
                }
                console.log(val);
            }

            return val;
        }
    }
})();
