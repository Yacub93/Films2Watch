'use strict';

filmApp.controller('SearchController',function ($scope, $http, $log){
	
    $scope.results = {
      values: []
    };
    var vm = this;
    vm.querySearch   = querySearch;
    vm.searchTextChange = searchTextChange;
    vm.selectedItemChange = selectedItemChange;


//querySearch() returns a promise & from the promise, it returns film Title data.
 function querySearch(query) {
   return $http.get('https://api.themoviedb.org/3/search/movie?include_adult=false&page=1&primary_release_year=2017', {
         params: { 
             'query': query,
             'api_key': apiKey
         }
  }).then(function(response) {
       var data = response.data.results.filter(function(obj) {
        // $log.info(obj);
        return obj.original_title.toLowerCase().indexOf(query) != -1;
    })
       // $log.info(data);
    return data;

        for (var i = 0; i < data.results.length; i++) {
           $scope.results.values.push({title: data.results[i].original_title});
           // $log.info($scope.results.values);   
       }
       return $scope.results.values;
    })
};
 

function searchTextChange(text) {
    $log.info('Search Text changed to ' + text);
}

function selectedItemChange(item) {
  //TODO: return film data based on selection
    $log.info('Item changed to ' + JSON.stringify(item));
}


});