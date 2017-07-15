	var apiKey = "d313b5dab4af5c3ad0636657c1efb5b4"; //v3 auth
	// var apiKey = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMzEzYjVkYWI0YWY1YzNhZDA2MzY2NTdjMWVmYjViNCIsInN1YiI6IjU5NWU0YWYyOTI1MTQxMGM1NjA4NDNjOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eSmWezzSAKWNn-4bkgV17KLfTShzeF4grZAg7FqCISQ";//v4 auth

	// var movieDBURL = "https://api.themoviedb.org/3/movie/500?api_key=" + apiKey;
	// var movieDBURL = "https://www.themoviedb.org/auth/access?request_token="+ apiKey;
	var movieDBURL = 'https://api.themoviedb.org/3/movie/now_playing?api_key='+apiKey+'&language=en-UK&page=1&region=US';
	var movieDBURL2 = 'https://api.themoviedb.org/3/movie/popular?api_key='+apiKey+'&language=en-UK&page=1&region=US';
	var baseImgURL = "http://image.tmdb.org/t/p/w185";

var filmApp = angular.module('filmApp', ['ngMaterial','ngAnimate']);

filmApp.controller("filmCtrl", function ($scope, $http) {

	
	$scope.results = [];
	$scope.results2 = [];
	


// Now Playing
$http.get(movieDBURL).success(function(data) {

	// console.log(movieDBURL);
	// console.log(data);
	var results = [];
	// results.push(data);


          for (var i = 0; i < data.results.length; i++) {
          	$scope.results.push({title: data.results[i].original_title,
          						image: baseImgURL + data.results[i].poster_path,
          						release: data.results[i].release_date});

              // 	$scope.results.push({title: results[i].original_title,
              // 						 image: baseImgURL + results[i].poster_path,
              // 						 genre: results[i].genres,
              // 						 release: results[i].release_date
        					 // });
        					 // console.log(data.results[i]);
              	// console.log($scope.results[i]);
              	}

});//.http.get movieDBURL


// Popular Movies
$http.get(movieDBURL2).success(function(data2) {

	// var results2 = [];
	// $scope.results = [];
	// results.push(data);


          for (var i = 0; i < data2.results.length; i++) {
          	$scope.results2.push({title: data2.results[i].original_title,
          						image: baseImgURL + data2.results[i].poster_path,
          						release: data2.results[i].release_date});

              // 	$scope.results.push({title: results[i].original_title,
              // 						 image: baseImgURL + results[i].poster_path,
              // 						 genre: results[i].genres,
              // 						 release: results[i].release_date
        					 // });
        					 // console.log(data2.results[i]);
              	// console.log($scope.results2[i]);
              	}

});//.http.get movieDBURL




// $scope.getFilm = function(value) {

// 	if (typeof value == 'undefined' || value == null || value == "") {
//       console.log("searchTerm " + value);
//       alert("Please Enter a Search Term!");
//     } 
//     else {
// 	var filmTitle = $scope.formData.searchTerm;

// 	console.log(filmTitle);
// 	var searchQueryURL = 'https://api.themoviedb.org/3/search/movie?include_adult=false&page=1&query='+filmTitle+'&language=en-UK&api_key='+apiKey;

// 	$http.get(searchQueryURL).success(function(data){
// 			          for (var i = 0; i < data.results.length; i++) {
// 			          	 //    if (data.results.length === 0 || data === null) {
//           					// 		break;
//           					// }
//           					// else{
//           	$scope.results.push({title: data.results[i].original_title,
//           						image: baseImgURL + data.results[i].poster_path,
//           						release: data.results[i].release_date});
    
//         					 console.log(data.results[i]);
//         			// }
//               	// console.log($scope.results[i]);
//               	}



// 	}).error(function(data, status, headers, config) {

//         if ($scope.status === 404) {
//         	return;
//         }
//   });
// 	}//.Close else
// }//.Close getFilm()




});//.Close Controller

// filmApp.controller('PanelController', function(){
//  vm = this;
//   vm.tab = 1;
//   vm.selectTab = function(setTab){
//     vm.tab = setTab;
//   }
//   vm.isSelected = function(checkTab){
//     return vm.tab === checkTab;
//   }
// });//.Page Controller


// function AppController($scope, $http) {
// filmApp.controller('DemoController', function($scope, $http){
// 	$scope.selectedItem = null;
// 	    $scope.SelectedCountry = null;
 
 
//     //After select country event
//     $scope.afterSelectedFilm = function (selected) {
//         if (selected) {
//             $scope.SelectedFilm = selected.originalObject;
//         }
//     }
//   $scope.query = function(searchText) {
//     return $http({
//         method: 'GET',
//         url: 'https://api.themoviedb.org/3/search/movie?include_adult=false&page=1&query='+searchText+'&language=en-UK&api_key=d313b5dab4af5c3ad0636657c1efb5b4'

//       }).then(function successCallback(response) {
//           // this callback will be called asynchronously
//           // when the response is available
//          // console.log(response.data);
//          return response.data;

//   });
//   };
// });



