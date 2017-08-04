	var apiKey = "d313b5dab4af5c3ad0636657c1efb5b4"; //v3 auth
	var movieDBURL = 'https://api.themoviedb.org/3/movie/upcoming?api_key='+apiKey+'&language=en-US&page=1&region=US';

	var movieDBURL2 = 'https://api.themoviedb.org/3/movie/now_playing?api_key='+apiKey+'&language=en-US&page=1';
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
          .when('/watch-list', {
                templateUrl : 'js/views/watch-list.html',
                controller  : 'WatchListController'
                
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

	$scope.results1  = [];
	$scope.results2 = [];


// Get Latest Movies
$http.get(movieDBURL).success(function(data) {

	// var results = [];

          for (var i = 0; i < data.results.length; i++) {
          	$scope.results1.push({title: data.results[i].original_title,
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


filmApp.controller('aboutController',['$scope', function($scope){

	// About Info
	$scope.appInfo = {
		heading: "About Films2Watch",
		subHeading: {
	      githubprofile: "https://github.com/Yacub93",
	      linkedinprofile: "https://uk.linkedin.com/in/yacub-ali-4898b9103"
	    }
	};

}]);



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
          return $q.when(lastSearch);
        }

        return $http.get('https://api.themoviedb.org/3/search/movie?' + 
            'include_adult=false&page=1&year=2017', {
          params: {
            query: query,
            api_key: apiKey
          }
        }).then(function (response) {

          var results = response.data.results.filter(function (result) {
            return result.original_title.toLowerCase().indexOf(normalizedQuery) !== -1;
          }).map(function (result) {
            return result.original_title;
          });

          cachedSearches[normalizedQuery] = results;

          lastSearch = results;
          return results;
        });
      }
    }
  }
// make a factory to share data
  filmApp.factory('search', search);

  SearchController.$inject = ['$scope', 'search', 'filmService','$log','$http'];
  function SearchController($scope, search, filmService, $log, $http) {


    var vm = this;
    vm.querySearch   = search.get;
    vm.searchTextChange = $scope.searchTextChange;
    vm.selectedItemChange = $scope.selectedItemChange;



   $scope.filmInfo = [];// Store film data
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
   return $http.get('https://api.themoviedb.org/3/search/movie?include_adult=false&page=1&year=2017', {
         params: { 
             'query': query,
             'api_key': apiKey
         }
  }).then(function(response) {
      var data = response.data;
      // $log.info(data);
      var genreNames = []; // Genre string values

    for (var i = 0; i < $scope.genres.length; i++) {
      for (var j = 0; j < data.results.length; j++) {
        if (data.results[j].genre_ids.includes($scope.genres[i].id)) 
        {
                genreNames.push($scope.genres[i].name);
        }   
      }
    }

        for (var i = 0; i < data.results.length; i++) {

           $scope.filmInfo.push({title: data.results[i].original_title,
                                 release: data.results[i].release_date,
                                 info:    data.results[i].overview,
                                 poster:  baseImgURL+data.results[i].poster_path,
                                 genres:  genreNames.toString()});   
       }
        filmService.filmData = $scope.filmInfo;
       return $scope.filmInfo;
    });
  }          
}
  filmApp.controller('SearchController', SearchController)
  .service('filmService', function () {
      this.filmData = null;
  });
}());



WatchListController.$inject = ['$scope', 'filmService', '$log','$http','$httpParamSerializer'];
function WatchListController($scope, filmService, $log, $http, $httpParamSerializer) {


// vm = this;
// $scope.Title = 'My Watch List';
var filmData = [];
// vm.getSelectedFilm = getSelectedFilm;

// if (typeof filmService != 'undefined' || filmService != null || filmService != [])
$scope.chosenFilm = [];


//onClick function
$scope.insertFilm = function () {  
for (var i = 0; i < filmService.filmData.length; i++) {
      filmData.push({
        title     :    filmService.filmData[i].title,
        overview  :    filmService.filmData[i].info,
        poster    :    filmService.filmData[i].poster,
        genres    :    filmService.filmData[i].genres,
        release   :    filmService.filmData[i].release

      }); 
}
  var data = angular.toJson(filmData[0]);

  $http({
        method: 'POST',
        url:'/search',
        data: data,
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
      },
    }).then(function successCallback(response) {
        var data = response.data
        console.log(data); //response received
});
}
  // var data = $httpParamSerializer({
  //   title    : $scope.filmData[0].title,
  //   overview : $scope.filmData[0].overview,
  //   poster   : $scope.filmData[0].poster,
  //   genres   : $scope.filmData[0].genres,
  //   release  : $scope.filmData[0].release
  // });

  // console.log(data);

// $http.post('/search', data).then(function successCallback(response) {
//           // this callback will be called asynchronously
//           // when the response is available
//           console.log(response);

// });
    //  $http({
    //         method: 'POST',
    //         url:'/search',
    //         data: { data },
    //         headers: {
    //           'Content-Type': 'application/json;charset=utf-8'
    //       },
    //     }).then(function successCallback(response) {
    //         console.log(response);
    // });













// getSelectedFilm();
// $scope.getSelectedFilm = function () {
// function getSelectedFilm() {

  $http({
        method: 'GET',
        url: '/watch-list',
        headers:{
          'Content-Type': 'application/json;charset=utf-8'
        },
      }).then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
            $scope.chosenFilm = angular.extend($scope.chosenFilm, response.data);     
            // $log.info(response); // Values displayed in console!
            $scope.chosenFilm; 

      });
// }

// $scope.getSelectedFilm = function () {
// function getSelectedFilm() {
  //   for (var i = 0; i < filmService.filmData.length; i++) {
  //     $scope.filmData.push({
  //       title     :    filmService.filmData[i].title,
  //       overview  :    filmService.filmData[i].info,
  //       poster    :    filmService.filmData[i].poster,
  //       genres    :    filmService.filmData[i].genres,
  //       release   :    filmService.filmData[i].release

  //     });    
  // }
  // $log.info($scope.filmData[0]);
//   return $scope.filmData;
// }

// function getSelectedFilm() {
//   console.log("getSelectedFilm called!");
//     var film = {
//         title     :    $scope.filmData[0].title,
//         overview  :    $scope.filmData[0].overview,
//         poster    :    $scope.filmData[0].poster,
//         genres    :    $scope.filmData[0].genres,
//         release   :    $scope.filmData[0].release
//     };

//     $log.info($scope.filmData[0]);
//     $log.info(vm.chosenFilm = film);

//     vm.chosenFilm = film;
//     return vm.chosenFilm;
// }


}
filmApp.controller('WatchListController', WatchListController);
