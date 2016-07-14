app.controller('AccountController', ['$scope', '$stateParams', '$http', 'Auth', 'Client', 'ResponseStatus', 'Loader', 'Config', 'Alert',
    function ($scope, $stateParams, $http, Auth, Client, ResponseStatus, Loader, Config, Alert) {

        $scope.credentials = {};
        $scope.code = "";
        $scope.client = new Client();
        $scope.passRequest = {};

        // Iniciar sesión
        $scope.login = function () {
            if ($scope.loginForm.$invalid)
                return;

            var processId = Loader.waitProcess("Iniciando sesión");

            Auth.login($scope.credentials).then(function (response) {
                Loader.releaseProcess(processId);

                if (response.status == 200 && response.data.Status == ResponseStatus.Success) {
                    var token = response.data.Result;
                    var payload = Auth.decodeToken(token);

                    Auth.setToken(token);

                    processId = Loader.waitProcess("Obteniendo datos del usuario");

                    $scope.client.getByEmail(payload.Uid).then(function (response) {
                        Loader.releaseProcess(processId);

                        if (response.status == 200 && response.data.Status == ResponseStatus.Success) {
                            Auth.setProfile(response.data.Result);
                        }
                    }, function (response) {
                        Loader.releaseProcess(processId);
                    });

                    window.location = '#/';
                }
            }, function (response) {
                Loader.releaseProcess(processId);
            });
        }

        // Confirmar cuenta
        $scope.confirm = function (isForm) {
            $scope.code = isForm ? $scope.code : $stateParams.code;

            if (!angular.isUndefined($stateParams.code) || $scope.confirmForm.$valid) {
                var processId = Loader.waitProcess("Confirmando cuenta");

                Auth.confirm($scope.code).then(function (response) {
                    Loader.releaseProcess(processId);

                    if (response.status == 200 && response.data.Status == ResponseStatus.Success) {
                        window.location = "#/login";
                    }
                }, function (response) {
                    Loader.releaseProcess(processId);
                });
            }
        }

        // Cargar perfil
        $scope.loadProfile = function () {
            $scope.client = Auth.getProfile();
        }

        // Cambiar contraseña
        $scope.changePassword = function () {
            if ($scope.changePasswordForm.$valid) {
                $scope.passRequest.Email = Auth.getProfile().Email;

                var processId = Loader.waitProcess("Confirmando cuenta");

                Auth.changePassword($scope.passRequest).then(function (response) {
                    Loader.releaseProcess(processId);

                    if (response.status == 200 && response.data.Status == ResponseStatus.Success) {
                        Auth.logout();
                        Alert.success('Contraseña cambiada exitósamente');
                    }
                }, function (response) {
                    Loader.releaseProcess(processId);
                });

            } else {
                Alert.error('Corrija los errores e inténtelo de nuevo');
            }
        }

    }
]);