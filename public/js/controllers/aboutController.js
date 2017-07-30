//About controller
'use strict';

filmApp.controller('aboutController',['$scope', function($scope){

	// About Info
	$scope.appInfo = {
		heading: "About Page",
		subHeading: {
	      githubprofile: "https://github.com/Yacub93",
	      linkedinprofile: "https://uk.linkedin.com/in/yacub-ali-4898b9103"
	    }
	};

}]);
