//Root controller
filmApp.controller('rootController',['$scope', function($scope){

	// Root Controller
	$scope.appInfo = {
		heading: "Films2Watch",
		subHeading: {
	      githubprofile: "https://github.com/Yacub93",
	      linkedinprofile: "https://uk.linkedin.com/in/yacub-ali-4898b9103"
	    }
	}

	$scope.footer = {
		copyright: "Yacub A. Ali 2017. All Rights Reserved"
	};

}]);