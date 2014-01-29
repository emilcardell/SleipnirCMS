var app = angular.module('nestedSortableDemoApp', [
	'ui.nestedSortable', 'ui.bootstrap'
]);

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

app.controller('navigationController', function ($scope, $http) {

    
    $http.get('/servers.js').then(function (servers) {
        $scope.Servers = servers.data;
    });

    $scope.SelectedServer = { Name: "No server selected" }

    $scope.SelectServer = function (server) {
        $scope.SelectedServer = server;
        $scope.Sites = server.Sites;
    };

    $scope.SelectedSite = { Name: "No server selected" }

    $scope.SelectSite = function (site) {
        $scope.SelectedSite = site;
    };

});

