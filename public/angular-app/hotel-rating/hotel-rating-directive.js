// angular.module('meanhotel').directive('hotelRating', hotelRating);

// function hotelRating() {
//   return {
//     restrict: 'E',
//     template: '<i ng-repeat="star in vm.stars track by $index" class="fa fa-star" aria-hidden="true"></i>',
//     bindToController: true,
//     controller: 'HotelController',
//     controllerAs: 'vm',
//     scope: {
//       stars: '='
//     }
//   };
// }


// Alteratively, a component can be used instead of a directive (the way things
// are done in Angular 2) when dealing with a cusom element.

angular.module('meanhotel').component('hotelRating', {
  bindings: {
    stars: '='
  },
  template: '<i ng-repeat="star in vm.stars track by $index" class="fa fa-star" aria-hidden="true"></i>',
  controller: 'HotelController',
  controllerAs: 'vm'
});
