// // List of Popular films Page controller
// filmApp.controller('listFilmController',['$scope', '$http', function($scope,$http){	

// 	$scope.results = [];
// 	$scope.results2 = [];
	


// // Now Playing
// $http.get(movieDBURL).success(function(data) {

// 	// console.log(movieDBURL);
// 	// console.log(data);
// 	var results = [];
// 	// results.push(data);


//           for (var i = 0; i < data.results.length; i++) {
//           	$scope.results.push({title: data.results[i].original_title,
//           						image: baseImgURL + data.results[i].poster_path,
//           						release: data.results[i].release_date});

//               // 	$scope.results.push({title: results[i].original_title,
//               // 						 image: baseImgURL + results[i].poster_path,
//               // 						 genre: results[i].genres,
//               // 						 release: results[i].release_date
//         					 // });
//         					 // console.log(data.results[i]);
//               	// console.log($scope.results[i]);
//               	}

// });//.http.get movieDBURL


// // Popular Movies
// $http.get(movieDBURL2).success(function(data2) {

// 	// var results2 = [];
// 	// $scope.results = [];
// 	// results.push(data);


//           for (var i = 0; i < data2.results.length; i++) {
//           	$scope.results2.push({title: data2.results[i].original_title,
//           						image: baseImgURL + data2.results[i].poster_path,
//           						release: data2.results[i].release_date});

//               // 	$scope.results.push({title: results[i].original_title,
//               // 						 image: baseImgURL + results[i].poster_path,
//               // 						 genre: results[i].genres,
//               // 						 release: results[i].release_date
//         					 // });
//         					 // console.log(data2.results[i]);
//               	// console.log($scope.results2[i]);
//               	}

// 	});//.http.get movieDBURL
// }]);//.Close Controller
