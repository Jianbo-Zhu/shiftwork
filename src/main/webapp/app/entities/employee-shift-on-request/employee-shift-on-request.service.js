(function() {
    'use strict';
    angular
        .module('shiftworkApp')
        .factory('EmployeeShiftOnRequest', EmployeeShiftOnRequest);

    EmployeeShiftOnRequest.$inject = ['$resource'];

    function EmployeeShiftOnRequest ($resource) {
        var resourceUrl =  'api/employee-shift-on-requests/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
