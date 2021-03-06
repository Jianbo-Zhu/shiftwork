(function() {
    'use strict';

    angular
        .module('shiftworkApp')
        .controller('ShiftTypeDialogController', ShiftTypeDialogController);

    ShiftTypeDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'ShiftType', 'ShiftTypeTask'];

    function ShiftTypeDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, ShiftType, ShiftTypeTask) {
        var vm = this;
        vm.shiftType = entity;
        vm.shifttypetasks = ShiftTypeTask.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        var onSaveSuccess = function (result) {
            $scope.$emit('shiftworkApp:shiftTypeUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.shiftType.id !== null) {
                ShiftType.update(vm.shiftType, onSaveSuccess, onSaveError);
            } else {
                ShiftType.save(vm.shiftType, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };

        vm.datePickerOpenStatus = {};
        vm.datePickerOpenStatus.startTime = false;
        vm.datePickerOpenStatus.endTime = false;

        vm.openCalendar = function(date) {
            vm.datePickerOpenStatus[date] = true;
        };
    }
})();
