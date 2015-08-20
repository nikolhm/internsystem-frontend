import angularModule from '../angularModule'
import {getService as KontoerService} from './KontoerService'

angularModule.config(function ($stateProvider) {
  "ngInject"
  $stateProvider.state('konto', {
    url: '/varer/kontoer/:id',
    templateUrl: require('./item.html'),
    controller: 'KontoerItemController as item'
  })
})

angularModule.controller('KontoerItemController', function ($scope, $stateParams) {
  "ngInject"
  var self = this

  KontoerService().get({id: $stateParams['id']}, function (res) {
    self.data = res
    $scope.$apply()
  })
})
