"use strict"

angular.module('dealsApp')
.controller('dealsDataCtrl', function($scope, $filter, dealsDataSvc){

    $scope.max = 5;
    $scope.isReadonly = true;
    $scope.likes = [];

    dealsDataSvc.loadApiData().get().$promise.then(function(hits){
      $scope.apiHits = hits;
    });

    dealsDataSvc.loadDealsData().get().$promise.then(function(dealsObj){
        $scope.deals = dealsObj.deals;
        angular.forEach($scope.deals, function(deal, index) {
          $scope.likes.push(0);
        });
      });

    $scope.calcFinalPrice = function(actualPrice, discount) {
      var finalPrice,
      discountValues = discount.slice(0, -1);

      finalPrice = actualPrice - (actualPrice * (discountValues/100));
      return Math.round(finalPrice);
    };

    $scope.like = function(index) {
      if(angular.isDefined(localStorage[index])){
        $scope.likes[index] = parseInt(localStorage[index]);
      }
        $scope.likes[index] += 1;
        localStorage[index] = $scope.likes[index];
    };

    $scope.getLikes = function(index) {
      if(angular.isDefined(localStorage[index])){
        return parseInt(localStorage[index]);
      } else {
        return 0;
      }
    };

    $scope.getLikesCount = function() {
      var totalLikes = 0;
      if(localStorage.length > 0) {
        angular.forEach(localStorage, function(value) {
            totalLikes += parseInt(value);
        });
      }
      return totalLikes;
    };
  });
