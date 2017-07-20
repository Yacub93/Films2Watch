	var apiKey = "d313b5dab4af5c3ad0636657c1efb5b4"; //v3 auth
	// var apiKey = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMzEzYjVkYWI0YWY1YzNhZDA2MzY2NTdjMWVmYjViNCIsInN1YiI6IjU5NWU0YWYyOTI1MTQxMGM1NjA4NDNjOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eSmWezzSAKWNn-4bkgV17KLfTShzeF4grZAg7FqCISQ";//v4 auth

	// var movieDBURL = "https://api.themoviedb.org/3/movie/500?api_key=" + apiKey;
	// var movieDBURL = "https://www.themoviedb.org/auth/access?request_token="+ apiKey;
	var movieDBURL = 'https://api.themoviedb.org/3/movie/now_playing?api_key='+apiKey+'&language=en-UK&page=1&region=US';
	var movieDBURL2 = 'https://api.themoviedb.org/3/movie/popular?api_key='+apiKey+'&language=en-UK&page=1&region=US';
	var baseImgURL = "http://image.tmdb.org/t/p/w185";

var filmApp = angular.module('filmApp', ['ngMaterial','ngAnimate', 'ngRoute']);


filmApp.config(['$routeProvider', function($routeProvider){

        $routeProvider  
        	.when('/search', {
        		templateUrl : 'js/views/single.html',
        		controller  : 'SearchController'
        	})	
            .when('/about', {
                templateUrl : 'js/views/about.html',
                controller  : 'aboutController'
            })
            .when('/top-rated', {
                templateUrl : 'js/views/main.html',
                controller  : 'listFilmController'
            }).otherwise({
            	redirectTo: '/'
            });

}]);


// List of Popular films Page controller
filmApp.controller('listFilmController',['$scope', '$http', function($scope,$http){	

	$scope.results  = [];
	$scope.results2 = [];


// Now Playing
$http.get(movieDBURL).success(function(data) {

	var results = [];

          for (var i = 0; i < data.results.length; i++) {
          	$scope.results.push({title: data.results[i].original_title,
          						image: baseImgURL + data.results[i].poster_path,
          						release: data.results[i].release_date});

              	}

});//.http.get movieDBURL


// Popular Movies
$http.get(movieDBURL2).success(function(data2) {

          for (var i = 0; i < data2.results.length; i++) {
          	$scope.results2.push({title: data2.results[i].original_title,
          						image: baseImgURL + data2.results[i].poster_path,
          						release: data2.results[i].release_date});
              	}

	});//.http.get movieDBURL
}]);//.Close Controller

filmApp.controller('PanelController',[function(){	

 vm = this;
  vm.tab = 1;
  vm.selectTab = function(setTab){
    vm.tab = setTab;
  }
  vm.isSelected = function(checkTab){
    return vm.tab === checkTab;
  }
}]);//.Page Controller


// filmApp.controller('aboutController',['$scope', function($scope){

// 	// About Info
// 	$scope.appInfo = {
// 		heading: "About Page",
// 		subHeading: {
// 	      githubprofile: "https://github.com/Yacub93",
// 	      linkedinprofile: "https://uk.linkedin.com/in/yacub-ali-4898b9103"
// 	    }
// 	};

// }]);



(function () {
  'use strict';

  search.$inject = ['$q', '$http'];
  function search($q, $http) {
    var cachedSearches = {};
    var lastSearch;
    return {
      getLastSearch: function() {
        console.log("lastSearch "+lastSearch);
        return lastSearch;
      },
      get: function (query) {
        var normalizedQuery = query && query.toLowerCase();
        if (cachedSearches[normalizedQuery]) {
          lastSearch = cachedSearches[normalizedQuery];
          // console.log(lastSearch);
          return $q.when(lastSearch);
        }

        return $http.get('https://api.themoviedb.org/3/search/movie?' + 
            'include_adult=false&page=1&primary_release_year=2017', {
          params: {
            query: query,
            api_key: apiKey
          }
        }).then(function (response) {
          var results = response.data.results.filter(function (result) {
            return result.original_title.toLowerCase().indexOf(normalizedQuery) !== -1;
          }).map(function (result) {
            // console.log(result.original_title);
            return result.original_title;
          });

          cachedSearches[normalizedQuery] = results;

          lastSearch = results;
          // console.log(lastSearch);
          return results;
        });
      }
    }

  }
// make a factory to share data between controllers
  filmApp.factory('search', search);
  // filmApp.factory('search', function(){
  //     return {
  //     data: function get() {
  //     }
  // };
  // });

  SearchController.$inject = ['$scope', 'search', '$log'];
  function SearchController($scope, search, $log) {
    $scope.results = {
      values:[]
    };
    var vm = this;
    vm.querySearch   = search.get;
    vm.searchTextChange = $scope.searchTextChange;
    vm.selectedItemChange = $scope.selectedItemChange;



// function selectedItemChange(item) {
//   //TODO: return film data based on selection
//   $scope.value = JSON.stringify(item);
//       $log.info('Item changed to ' + $scope.value);
//       return search.get($scope.value).then(function (results) {
//         $scope.results = results;

//       });  
// }

   // $scope.querySearch = function (item) {
   //  $scope.value = JSON.stringify(item);
   //    // $log.info('Item changed to ' + $scope.value);
   //      return search.get($scope.value).then(function (results) {
   //      $scope.results = results;
   //    for (var i = 0; i < $scope.results.length; i++) {
   //         $scope.results.values.push({title: data.results[i].original_title});
   //         // $log.info($scope.results.values);   
   //     }
   //     return $scope.results.values;
      
   //    });
   //  }

    $scope.searchTextChange = function (text) {
        // $log.info('Search Text changed to ' + text);
    }


    $scope.selectedItemChange = function (item) {
      $scope.value = JSON.stringify(item);
      $log.info('Item changed to ' + $scope.value);
        return search.get($scope.value).then(function (results) {
          $scope.results = results;

      
      });
    }

  }

  filmApp.controller('SearchController', SearchController);

}());


// SingleFilmController.$inject = ['$scope', 'search', '$log', '$rootScope'];
// function SingleFilmController($scope, search, $log, $rootScope) {
// // $scope.results = $rootScope.search.get;

// // $log.info("SingleFilmController: " + $scope.results);

// };  

// filmApp.controller('SingleFilmController', SingleFilmController);







// filmApp.controller('singleFilmController',['$scope','search', function($scope,search){

// var value = search.results;
// console.log("Value Found: "+ value);
// }]);
