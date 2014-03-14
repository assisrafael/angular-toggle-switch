angular.module('toggle-switch', [])
.directive('toggleSwitch', function () {
  return {
    restrict: 'EA',
    replace: true,
    scope: {
      model: '=ngModel',
      disabled: '=',
      onLabel: '@',
      onColor: '@',
      offLabel: '@',
      offColor: '@',
      knobLabel: '@',
      onAfterChange: '&'
    },
    templateUrl: 'angular-toogle-switch.html',
    controller: function($scope) {
      $scope.toggle = function toggle() {
        if(!$scope.disabled) {
          $scope.model = !$scope.model;
        }
      };
    },
    link: function(scope, element, attrs) {
      if (!attrs.onLabel) { 
        attrs.onLabel = 'On';
      }
      
      if (!attrs.offLabel) {
        attrs.offLabel = 'Off';
      }
      
      if (!attrs.knobLabel) {
        attrs.knobLabel = '\u00a0';
      }

      if (!attrs.disabled) {
        attrs.disabled = false;
      }

      element.bind('click', function() {
        if(scope.disabled) {
          return;
        }

        if(typeof scope.onAfterChange === 'function') {
          scope.onAfterChange();  
        }
      });
    },
  };
})
.run(function($templateCache) {
  $templateCache.put('angular-toogle-switch.html', 
    '<div>'+
      '<div class="switch" ng-click="toggle()" ng-hide="disabled">' +
        '<div class="switch-animate" ng-class="{\'switch-off\': !model, \'switch-on\': model}">' +
          '<span class="switch-{{onColor || \'primary\'}}" ng-bind="onLabel"></span>' +
          '<span class="knob" ng-bind="knobLabel"></span>' +
          '<span class="switch-{{offColor || \'default\'}}" ng-bind="offLabel"></span>' +
        '</div>' +
      '</div>' +
      '<div ng-show="disabled">{{(model ? onLabel : offLabel)}}</div>' +
    '</div>'
  );
});