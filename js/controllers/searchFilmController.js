'use strict';

filmApp.controller('SearchController',function ($scope, $http){
	// var vm = this;
    $scope.results = {
      values: []
    };

    // vm.data = null;
    // vm.searchText = null;
    // vm.selectedItem = null;
    // vm.throttle = 300;
	// var filmTitle = $scope.formData.searchTerm;

//querySearch method returns a promise & from the promise, it returns film data.
$scope.querySearch = function (query) {
  return $http.get('https://api.themoviedb.org/3/search/movie?include_adult=false&page=1', {
         params: { 
             'query': query,
             'api_key': apiKey
         }
  }).then(function (response, status) {
       var data = response.data;
       for (var i = 0; i < data.results.length; i++) {
           $scope.results.values.push({title: data.results[i].original_title});
           // console.log($scope.results.values);      
       }
       return $scope.results.values;
    })
};


});