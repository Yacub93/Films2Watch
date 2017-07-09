var filmApp = angular.module('filmApp', []);

filmApp.controller("filmCtrl", function ($scope, $http) {
	// Controller
	$scope.appInfo = {
		heading: "Regent Street Cinema",
		subHeading1:"Now Showing",
		subHeading2: {
	      githubprofile: "https://github.com/Yacub93",
	      linkedinprofile: "https://uk.linkedin.com/in/yacub-ali-4898b9103"
	    }
	};

	var apiKey = "d313b5dab4af5c3ad0636657c1efb5b4"; //v3 auth
	// var apiKey = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMzEzYjVkYWI0YWY1YzNhZDA2MzY2NTdjMWVmYjViNCIsInN1YiI6IjU5NWU0YWYyOTI1MTQxMGM1NjA4NDNjOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eSmWezzSAKWNn-4bkgV17KLfTShzeF4grZAg7FqCISQ";//v4 auth

	// var movieDBURL = "https://api.themoviedb.org/3/movie/500?api_key=" + apiKey;
	// var movieDBURL = "https://www.themoviedb.org/auth/access?request_token="+ apiKey;
	var movieDBURL = 'https://api.themoviedb.org/3/movie/now_playing?api_key='+apiKey+'&language=en-UK&page=1&region=US';
	var movieDBURL2 = 'https://api.themoviedb.org/3/movie/popular?api_key='+apiKey+'&language=en-UK&page=1&region=US';

	var baseImgURL = "http://image.tmdb.org/t/p/w185";
	$scope.results = [];
	$scope.results2 = [];
	



  // Simple GET request example:
  // $http({
  //       method: 'GET',
  //       url: movieDBURL,
  //       headers:{
  //         'Content-Type': 'application/json;charset=utf-8'
  //       },
  //     }).then(function successCallback(response) {
  //         // this callback will be called asynchronously
  //         // when the response is available
  //        console.log(response.data);

  //                  for (var i = 0; i < response.data.length; i++) {

  //             	$scope.results.push({title: response.data.results[i]
  //             						 // image: baseImgURL + response.data.poster_path
 
  //       					 });
  //             	console.log($scope.results.title);
  //             	}
  // });


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




$scope.getFilm = function(value) {

	if (typeof value == 'undefined' || value == null || value == "") {
      console.log("searchTerm " + value);
      alert("Please Enter a Search Term!");
    } 
    else {
	var filmTitle = $scope.formData.searchTerm;

	console.log(filmTitle);
	var searchQueryURL = 'https://api.themoviedb.org/3/search/movie?include_adult=false&page=1&query='+filmTitle+'&language=en-UK&api_key='+apiKey;

	$http.get(searchQueryURL).success(function(data){
			          for (var i = 0; i < data.results.length; i++) {
          	$scope.results.push({title: data.results[i].original_title,
          						image: baseImgURL + data.results[i].poster_path,
          						release: data.results[i].release_date});
        					 console.log(data.results[i]);
              	// console.log($scope.results[i]);
              	}



	});
	}
}




});//.Close Controller

filmApp.controller('PanelController', function(){
  this.tab = 1;
  this.selectTab = function(setTab){
    this.tab = setTab;
  }
  this.isSelected = function(checkTab){
    return this.tab === checkTab;
  }
});//.Page Controller

