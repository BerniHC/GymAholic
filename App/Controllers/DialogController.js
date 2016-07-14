app.controller("DialogController", ['$scope', '$uibModalInstance', 'options',
    function ($scope, $uibModalInstance, options) {

        $scope.options = options;

        // Acción
        $scope.action = function (index) {
            $uibModalInstance.close(index);
        }

        // Cerrar
        $scope.close = function () {
            $uibModalInstance.dismiss(-1);
        };


    }
]);