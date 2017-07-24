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
// make a factory to share data
  filmApp.factory('search', search);


  SearchController.$inject = ['$scope', 'search', '$log','$http'];
  function SearchController($scope, search, $log, $http) {


    var vm = this;
    vm.querySearch   = search.get;
    vm.searchTextChange = $scope.searchTextChange;
    vm.selectedItemChange = $scope.selectedItemChange;



   $scope.filmInfo = [];//store film data
   $scope.genres = [
          {"id": 28,"name": "Action"},
          {"id": 12,"name": "Adventure"},
          {"id": 16,"name": "Animation"},
          {"id": 35,"name": "Comedy"},
          {"id": 80,"name": "Crime"},
          {"id": 99,"name": "Documentary"},
          {"id": 18,"name": "Drama"},
          {"id": 10751,"name": "Family"},
          {"id": 14,"name": "Fantasy"},
          {"id": 10769,"name": "Foreign"},
          {"id": 36,"name": "History"},
          {"id": 27,"name": "Horror"},
          {"id": 10402,"name": "Music"},
          {"id": 9648,"name": "Mystery"},
          {"id": 10749,"name": "Romance"},
          {"id": 878,"name": "Science Fiction"},
          {"id": 10770,"name": "TV Movie"},
          {"id": 53,"name": "Thriller"},
          {"id": 10752,"name": "War"},
          {"id": 37,"name": "Western"}];


   
    $scope.searchTextChange = function (text) {
        // $log.info('Search Text changed to ' + text);
    }


    $scope.selectedItemChange = function (item) {
      $scope.value = JSON.stringify(item);
      
      if (typeof $scope.value == 'undefined' || $scope.value == null || $scope.value == "")
      {
        $scope.filmInfo = []; // Clear when search is reset 
        return false;
      }
      $log.info('Item changed to ' + $scope.value);
      return querySearch(item).then(function (results){
            $scope.results = results;
      });
 
}//.Close selectedItemChange()


  function querySearch(query) {
   return $http.get('https://api.themoviedb.org/3/search/movie?include_adult=false&page=1&primary_release_year=2017', {
         params: { 
             'query': query,
             'api_key': apiKey
         }
  }).then(function(response) {
      var data = response.data;
       $log.info(data);
      var genreNames = []; // Genre string values

    for (var i = 0; i < $scope.genres.length; i++) {
      for (var j = 0; j < data.results.length; j++) {
                // $log.info($scope.genres[i].id);
                // $log.info(data.results[j].genre_ids);
        if (data.results[j].genre_ids.includes($scope.genres[i].id)) {
              // console.log("found One " + $scope.genres[i].name );
              genreNames.push($scope.genres[i].name);
            }   
        }
      }

        for (var i = 0; i < data.results.length; i++) {

           $scope.filmInfo.push({title: data.results[i].original_title,
                                 release: data.results[i].release_date,
                                 info:    data.results[i].overview,
                                 poster:  baseImgURL+data.results[i].poster_path,
                                 genres: genreNames.toString()});

           $log.info($scope.filmInfo);    

       }
       return $scope.filmInfo;
    });
  } 
          
}

  filmApp.controller('SearchController', SearchController);

}());









// SingleFilmController.$inject = ['$scope', 'search', '$log','$rootScope'];
// function SingleFilmController($scope, search, $log, $rootScope) {

//     // $scope.results = {
//     //   values: []
//     // };


//  function querySearch(query) {
//    return $http.get('https://api.themoviedb.org/3/search/movie?include_adult=false&page=1&primary_release_year=2017', {
//          params: { 
//              'query': query,
//              'api_key': apiKey
//          }
//   }).then(function(response) {
//        var data = response.data.results.filter(function(obj) {
//         // $log.info(obj);
//         // return obj.original_title.toLowerCase().indexOf(query) != -1;
//     })
//        // $log.info(data);
//     // return data;

//         for (var i = 0; i < data.results.length; i++) {
//            // $scope.results.values.push({title: data.results[i].original_title});
//            // $log.info($scope.results.values);   
//        }
//        // return $scope.results.values;
//     })
// };








// $log.info("SingleFilmController: " + $scope.results);

// };  

// filmApp.controller('SingleFilmController', SingleFilmController);







// filmApp.controller('SingleFilmController',['$scope', '$http','$log','search',function($scope,$http,$log,search){
  
//     $scope.results = {
//       values: []
//     };

//  function querySearch(query) {
//    return $http.get('https://api.themoviedb.org/3/search/movie?include_adult=false&page=1&primary_release_year=2017', {
//          params: { 
//              'query': query,
//              'api_key': apiKey
//          }
//   }).then(function(response) {
//        var data = response.data.results.filter(function(obj) {
//         // $log.info(obj);
//         // return obj.original_title.toLowerCase().indexOf(query) != -1;
//     })
//        // $log.info(data);
//     // return data;

//         for (var i = 0; i < data.results.length; i++) {
//            $scope.results.values.push({title: data.results[i].original_title});
//            // $log.info($scope.results.values);   
//        }
//        // return $scope.results.values;
//     })
// };
// }]);
