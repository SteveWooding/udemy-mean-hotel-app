angular.module('meanhotel').directive('mhNavigation', mhNavigation);

function mhNavigation() {
  return {
    restict: 'E',
    templateUrl: 'angular-app/navigation-directive/navigation-directive.html'
  };
}
