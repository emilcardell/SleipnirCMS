var app = angular.module('nestedSortableDemoApp', [
	'ui.nestedSortable', 'ui.bootstrap', 'ngRoute'
]);

app.config(['$routeProvider',
  function ($routeProvider) {
  	$routeProvider.
      when('/', {
      	templateUrl: '/templates/dashboard.html',
      	controller: 'DashboardController'
      }).
	  when('/edit/:serverId', {
		 	templateUrl: 'templates/server.html',
		 	controller: 'ServerController'
		 }).
      when('/edit/:serverId/:siteId/', {
      	templateUrl: 'templates/site.html',
      	controller: 'SiteController'
      }).
	when('/edit/:serverId/:siteId/:documentId', {
			templateUrl: 'templates/document.html',
			controller: 'DocumentController'
	}).
		when('/edit/:serverId/:siteId/:documentId/:versionId', {
			templateUrl: 'templates/document.html',
			controller: 'DocumentController'
		}).
      otherwise({
      	redirectTo: '/'
      });
  }]);



app.controller('DashboardController', function ($scope) {

});

app.controller('ServerController', function ($scope) {

});

app.controller('SiteController', function ($scope) {

});

app.controller('DocumentController', function ($scope) {

});

app.controller('fieldsRenderController', function ($scope, $http) {
	
	$http.get('/data.js').then(function (r) {
	    var dataToRender = r.data;


		$scope.Fields = dataToRender.fields;
	});

	$scope.AddRow = function (field) {
		if(!field.rows) {
			field.rows = [];
		}

		var fields = [];
		field.fields.forEach(function (entry) {
		    var entryToAdd = angular.copy(entry);
		    entryToAdd.dragndropgroup = field.objectName;
		    fields.push(entryToAdd);
		});
		field.rows.push(fields);

	};

	$scope.DeleteRow = function (field, rowToDelete) {
	    if (!field.rows) {
	        return;
	    }

	    field.rows.remove(function(row) {
	        return row === rowToDelete;
	    });
	};

	$scope.info = "Blahonga!";

	$scope.arrayOptions = {
	    accept: function (data, targetData) {
	        if (data.length > 0 && targetData && targetData.length > 0) {
			    return data[0].dragndropgroup == targetData[0].dragndropgroup;		   
			}
			return false;
		},
		orderChanged: function(scope, sourceItem, sourceIndex, destIndex) {
			$scope.info = "Chapter [" + sourceItem.title + "] changed order from " + sourceIndex + " to " + destIndex;
			$scope.$apply();
		},
		
	};	
	
});

app.controller('navigationController', function ($scope, $http, $location) {

    
    $http.get('/servers.js').then(function (servers) {
        $scope.Servers = servers.data;
    });

	$scope.SelectedServer = { Name: "No server selected" };

	$scope.SelectServer = function (server) {
		if ($scope.SelectServer === server) {
			return;
		}

        $scope.SelectedServer = server;
        $scope.Sites = server.Sites;
        $location.path('/edit/' + server.Id);
        
	};

	$scope.SelectedSite = { Name: "No server selected" };

	$scope.SelectSite = function (site) {
		if ($scope.SelectedSite === site) {
			return;
		}
		$scope.SelectedSite = site;
		$location.path('/edit/' + $scope.SelectedServer.Id + "/" + $scope.SelectedSite.Id);

    };


});

