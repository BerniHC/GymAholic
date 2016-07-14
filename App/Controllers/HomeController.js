app.controller("HomeController", ['$scope', '$http', 'Config', 'Alert', 
    function ($scope, $http, Config, Alert) {

        $scope.user = {};

        $scope.getUsers = function (keywords) {
            var search = {
                Keywords: keywords,
                Count: 10
            }

            return $http.post(Config.HostServices + '/api/user/find', search).then(function (response) {
                return response.data.Result.map(function (item) {
                    return item;
                });
            });
        };

        $scope.selectUser = function ($item, $model, $label, $event) {
            $scope.user = $item;
        }
    }
]);