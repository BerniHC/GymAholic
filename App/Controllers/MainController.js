app.controller("MainController", ['$scope', '$rootScope', 'Config', 'Loader', 'Auth', 'Alert', 
    function ($scope, $rootScope, Config, Loader, Auth, Alert) {

        $scope.appName = Config.AppName;
        $scope.loader = Loader;
        $scope.auth = Auth;
        $scope.alert = Alert;

    }
]);