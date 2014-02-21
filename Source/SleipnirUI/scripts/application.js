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

app.controller('SiteController', function ($scope, $http, $location) {
	$scope.SearchDocuments = function () {
		console.log($scope.SearchTerm);

		$scope.SearchResult = [];

		$http.get('/documents.js').then(function (r) {
			var listOfDocuments = r.data;
			$scope.SearchResult = listOfDocuments.findAll(function(document) {
				console.log(document.Id.startsWith($scope.SearchTerm, 0, false));
				return document.Id.startsWith($scope.SearchTerm, 0, false);
			});

			console.log($scope.SearchResult);
		});
	};
	
	$scope.GoToDocument = function(document) {
		$location.path($location.path() + document.Id);
	};
});


app.controller('DocumentController', function ($scope, $http) {
	
    var getResultingStructure = function (fields) {
        var resultingStructure = {};

        fields.forEach(function (field) {
            var result = getFieldKeyValue(field, resultingStructure);
            if (result) {
                resultingStructure[field.name] = result;
            }
        });

        return resultingStructure;
    };

    var getFieldKeyValue = function (field, result) {
        if (field.type == 'array') {
            if (!field.rows)
                return;

            var arrayValue = [];
            field.rows.forEach(function (row) {
                var rowValues = {};

                row.forEach(function (rowField) {
                    var result = getFieldKeyValue(rowField, result);
                    if (result) {
                        var resultWithName = {};
                        rowValues[rowField.name] = result;
                        
                    }
                });

                arrayValue.push(rowValues);
            });

            return arrayValue;
        }
        else if(field.type == 'object')
        {
            var objResult = {};
            field.fields.forEach(function (objField) {
                var result = getFieldKeyValue(objField, result);
                objResult[objField.name] = result;
            });

            return objResult;
        }
        else {
            if (!field.value) {
                return;
            }
            return field.value;
        }
    };


    $scope.PublishDocument = function () {
        console.log(getResultingStructure($scope.Fields));  
    };

	$http.get('/data.js').then(function (r) {
	    console.log('Loading data');
        var dataToRender = r.data;
        var fieldsToRender = r.data.fields;

        $http.get('/values.js').then(function (s) {
            var values = s.data;
            fieldsToRender.forEach(function (field) {
                console.log(field.name);
                console.log(values);
                setValueToField(field, values[field.name]);
            });
        });


        $scope.Fields = fieldsToRender;
	});

	var setValueToField = function (field, value) {
	    console.log(field.name);
	    console.log(value);
	    if (!value) {
	        return;
	    }

	    if (field.type == 'array') {
	        var resultingValue = [];
	       field.rows = [];	                   

	        value.forEach(function (valueItem) {
	            var rowFields = [];
	            field.fields.forEach(function (rowField) {
	                var entryToAdd = angular.copy(rowField);
	                setValueToField(entryToAdd, valueItem[entryToAdd.name]);
	                rowFields.push(entryToAdd);
	            });

	            field.rows.push(rowFields);	            
	        });                      
	        
	    }
	    else if (field.type == 'object')
	    {
	        console.log("In object");
	        field.fields.forEach(function (objField) {
	            setValueToField(objField, value[objField.name]);
	            
	        });
	    }
	    else {
	        field.value = value;
	    }
	};

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
	    var pathValues = $location.path().split('/');
    	
		

    	var selectedServer = $scope.Servers.find(function (server) { return server.Id == pathValues[2]; });
		if (selectedServer) {
			$scope.SelectedServer = selectedServer;
			$scope.Sites = selectedServer.Sites;

			var selectedSite = $scope.Sites.find(function (server) { return server.Id == pathValues[3]; });
			if (selectedSite) {
				$scope.SelectedSite = selectedSite;
			}
			
		}
    	

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

