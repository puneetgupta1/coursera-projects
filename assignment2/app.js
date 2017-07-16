(function () {
    'use strict';

    angular.module('CheckOffApp', [])
    .controller('CheckOffToBuyController', CheckOffToBuyController)
    .controller('CheckOffAlreadyBoughtController', CheckOffAlreadyBoughtController)
    .provider('CheckOffService', CheckOffServiceProvider)
    .config(Config);

    Config.$inject = ['CheckOffServiceProvider'];
    function Config(CheckOffServiceProvider) {
        CheckOffServiceProvider.maxItems = 5;
        CheckOffServiceProvider.items = [
            {
                "name": "cookies",
                "quantity": 10
            },
            {
                "name": "chips",
                "quantity": 5
            },
            {
                "name": "coke",
                "quantity": 2
            },
            {
                "name": "pepsi",
                "quantity": 5
            },
            {
                "name": "peanuts",
                "quantity": "10 bags"
            }
        ];
    }
    
    CheckOffToBuyController.$inject = ['CheckOffService'];
    function CheckOffToBuyController(CheckOffService) {
        var checkToBuy = this;

        checkToBuy.toBuyItems = CheckOffService.getToBuyItems();
        
        checkToBuy.removeItemFromToBuyList = function (itemIndex) {
            CheckOffService.addItemToAlreadyBoughtList(itemIndex);
            
            try {
                CheckOffService.removeItemFromToBuyList(itemIndex);  
            } catch (error) {
                checkToBuy.errorMessage = error.message;
            }
        };
    }
    
    CheckOffAlreadyBoughtController.$inject = ['CheckOffService'];
    function CheckOffAlreadyBoughtController(CheckOffService) {
        var checkAlreadyBought = this;
        
        checkAlreadyBought.alreadyBoughtItems = CheckOffService.getAlreadyBoughtItems();
    }
    
    function CheckOffService(items, maxItems) {
        var service = this;

        // List of shopping items
        //var items = [];
        var toBuyItems = [];
        var alreadyBoughtItems = [];
        
        toBuyItems = items;
        
        service.getToBuyItems = function () {
            return toBuyItems;
        };
        
        service.getAlreadyBoughtItems = function () {
            return alreadyBoughtItems;
        };
        
        service.addItemToAlreadyBoughtList = function (itemIndex) {
            var item = {
                name: toBuyItems[itemIndex].name,
                quantity: toBuyItems[itemIndex].quantity
            };
            
            alreadyBoughtItems.push(item);
        }
        
        service.removeItemFromToBuyList = function (itemIndex) {
            toBuyItems.splice(itemIndex, 1);
            
            if (toBuyItems.length === 0) {
                throw new Error("Everything bought!");
            }
        }
    }


    function CheckOffServiceProvider() {
        var provider = this;

        //provider.defaults = {
        //    maxItems: 5,
        //    items: []
        //};
        
        provider.maxItems = 5;
        provider.items = [];

        provider.$get = function () {
            var checkOffList = new CheckOffService(provider.items, provider.maxItems);

            return checkOffList;
        };
    }
})();