angular.module('dashkiosk.controllers')
  .controller('DisplayCtrl', function() {
    'use strict';

  })
  .controller('EditDisplayCtrl', function($scope, $q) {
    'use strict';

    var realDisplay = $scope.$parent.display,
        copyDisplay = $scope.display = angular.copy(realDisplay);
    $scope.submit = function() {
      var modified = _.omit(copyDisplay, function(v, k) {
        if (k[0] === '$') {
          return true;
        }
        if (v === realDisplay[k]) {
          return true;
        }
        return false;
      });

      var deferred = $q.defer(),
          promise = deferred.promise;
      if (!_.isEmpty(_.omit(modified, 'group'))) {
        promise.then(function() {
          return realDisplay.$update(_.omit(modified, 'group'));
        });
      }
      if (_.has(modified, 'group')) {
        promise.then(function() {
          return $scope.groups[modified.group].$attach(realDisplay.name);
        });
      }
      promise.then(function() {
        $scope.$hide();
      });
      deferred.resolve(true);
      return promise;
    };

    // Destroy the display
    $scope.delete = function() {
      realDisplay
        .$delete()
        .then(function() {
          $scope.$hide();
        });
    };

  });
