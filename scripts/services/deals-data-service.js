"use strict"

angular.module('dealsApp')
.factory('dealsDataSvc', function($resource){
  return {
    loadDealsData: function(){
      return $resource("https://nutanix.0x10.info/api/deals?type=json&query=list_deals");
    },
    loadApiData: function(){
      return $resource("https://nutanix.0x10.info/api/deals?type=json&query=api_hits");
    }
  };
});
