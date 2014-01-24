var app = angular.module('nestedSortableDemoApp', [
	'ui.nestedSortable'
]);

app.controller('sample2Ctrl', function ($scope, $http) {
	
	$http.get('/data.js').then(function (r) {
		var dataToRender = r.data;
		$scope.chapters = dataToRender.fields;
	});

	$scope.AddRow = function (field) {
		if(!field.rows) {
			field.rows = [];
		}

		var fields = [];
		field.fields.forEach(function (entry) {
			fields.push(angular.copy(entry));
		});
		field.rows.push(fields);

	};

	$scope.info = "Blahonga!";

	$scope.AddElement = function() {
		$scope.chapters.push({ name: 'Roger', type: 'Chapter' });
	};

	$scope.chaptersOptions = {
		accept: function (data, targetData) {
			
			if (data.length > 0 && targetData && targetData.length > 0) {
				return data[0].dragndropgroup == targetData[0].dragndropgroup;
			}
		},
		orderChanged: function(scope, sourceItem, sourceIndex, destIndex) {
			$scope.info = "Chapter [" + sourceItem.title + "] changed order from " + sourceIndex + " to " + destIndex;
			$scope.$apply();
		},
		
	};
	$scope.lecturesOptions = {
		accept: function(data) {
			return (data.type == 'lecture'); // only accept lecture
		},
		orderChanged: function(scope, sourceItem, sourceIndex, destIndex) {
			$scope.info = "Lecture [" + sourceItem.title + "] changed order from " + sourceIndex + " to " + destIndex;
			$scope.$apply();
		},
		itemRemoved: function(scope, sourceItem, sourceIndex) {
			var info = "Chapter [" + scope.chapter.title + "] removed a lecture [" + sourceItem.title + "] from " + sourceIndex + ".";
			console.log(info);
		},
		itemAdded: function(scope, sourceItem, destIndex) {
			var info = "Chapter [" + scope.chapter.title + "] added a lecture [" + sourceItem.title + "] to " + destIndex;
			console.log(info);
		},
		itemMoved: function(sourceScope, sourceItem, sourceIndex, destScope, destIndex) {
			$scope.info = "Lecture [" + sourceItem.title + "] moved from [" + sourceScope.chapter.title + "][" + sourceIndex + "] to [" + destScope.chapter.title + "][" + destIndex + "]";
			$scope.$apply();
		},
	};

});