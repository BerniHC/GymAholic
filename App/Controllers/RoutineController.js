app.controller("RoutineController", ['$scope', '$stateParams', '$filter', '$uibModal', '$http', 'Config', 'Routine', 'DailyPlan', 'DailyPlanSpecification', 'Specification', 'Exercise', 'MuscularGroup', 'User', 'Measurement', 'DataTable', 'Loader', 'ResponseStatus', 'Auth',
    function ($scope, $stateParams, $filter, $uibModal, $http, Config, Routine, DailyPlan, DailyPlanSpecification, Specification, Exercise, MuscularGroup, User, Measurement, DataTable, Loader, ResponseStatus, Auth) {

        $scope.routine = new Routine();
        $scope.routines = [];
        $scope.tableRoutines = new DataTable(Config.HostServices + "/api/routine");
        $scope.user = new User();

        //Estas son usadas para los select del progreso
        $scope.routineA = new Routine();
        $scope.routineB = new Routine();
        $scope.measurementsA = [];
        $scope.measurementsB = [];

        $scope.dailyplans = [];
        $scope.dailyplan = new DailyPlan();
        $scope.routine.DailyPlan = [];

        $scope.measurement = new Measurement();
        $scope.measurements = [];

        $scope.history = [];


        // Cargar rutina
        $scope.loadRoutine = function () {
            var processId = Loader.waitProcess("Consultando rutina");
            var client = Auth.getProfile();
            $scope.routine = new Routine();
            $scope.routine.GetByClientId(client.Id).then(function (response) {
                Loader.releaseProcess(processId);

                $scope.listMeasurements();
                $scope.listUsers();
            }, function (response) {
                Loader.releaseProcess(processId);
            });
        }

        // Listar todas las rutinas
        $scope.listUsers = function () {
            var processId = Loader.waitProcess("Obteniendo lista de usuarios");

            $scope.user.list().then(function (response) {
                Loader.releaseProcess(processId);

                if (response.status == 200 && response.data.Status == ResponseStatus.Success) {
                    $scope.users = response.data.Result;

                    if ($scope.routine.User) {
                        var selectedUser = $filter('filter')($scope.users, { Id: $scope.routine.User.Id })[0];
                        $scope.routine.User = selectedUser ? selectedUser : $scope.users[0];
                    } else {
                        $scope.routine.User = $scope.users[0];
                    }
                }
            }, function (response) {
                Loader.releaseProcess(processId);
            });
        }

        //--------------------------------------
        // Medidas
        //--------------------------------------

        $scope.listMeasurements = function () {
            var processId = Loader.waitProcess("Obteniendo lista de medidas");

            $scope.measurement.list().then(function (response) {
                Loader.releaseProcess(processId);

                if (response.status == 200 && response.data.Status == ResponseStatus.Success) {
                    $scope.measurements = response.data.Result;

                    angular.forEach($scope.measurements, function (measurement) {
                        var routineMeasurement = $filter('filter')($scope.routine.RoutineMeasurement, { IdMeasurement: measurement.Id })[0];

                        if (routineMeasurement) {
                            measurement.Value = routineMeasurement.Value;
                        } else {
                            measurement.Value = 0;
                        }
                    });
                }
            }, function (response) {
                Loader.releaseProcess(processId);
            });
        }

        $scope.loadHistory = function () {
            var processId = Loader.waitProcess("Obteniendo rutinas anteriores");

            var client = Auth.getProfile();
            $scope.routine = new Routine();

            $scope.routine.HistoryClient(client.Id).then(function (response) {
                Loader.releaseProcess(processId);

                if (response.status == 200 && response.data.Status == ResponseStatus.Success) {
                    $scope.history = response.data.Result;                    
                }
            }, function (response) {
                Loader.releaseProcess(processId);
            });

        }

        //Carga los Select para las rutinas
        $scope.LoadSelect = function () {
            $scope.routine = new Routine();
            $scope.routines = [];
            var client = Auth.getProfile();
            var processId = Loader.waitProcess("Obteniendo rutinas del cliente");

            $scope.routine.HistoryClient(client.Id).then(function (response) {
                Loader.releaseProcess(processId);

                if (response.status == 200 && response.data.Status == ResponseStatus.Success) {
                    $scope.routines = response.data.Result;
                }

                $scope.routineA.Selected = $scope.routines[0];
                if ($scope.routines.length > 1) {
                    $scope.routineB.Selected = $scope.routines[$scope.routines.length - 1];
                } else {
                    $scope.routineB.Selected = $scope.routines[0];
                }
                $scope.listMeasurementsSelects();
            }, function (response) {
                Loader.releaseProcess(processId);
            });
        }


        $scope.listMeasurementsSelects = function () {
            var processId = Loader.waitProcess("Obteniendo lista de medidas");

            $scope.measurement.list().then(function (response) {
                Loader.releaseProcess(processId);

                if (response.status == 200 && response.data.Status == ResponseStatus.Success) {
                    $scope.measurementsA = angular.copy(response.data.Result);
                    $scope.measurementsB = angular.copy(response.data.Result);

                    $scope.SetMeasurementA();
                    $scope.SetMeasurementB();
                    
                }
            }, function (response) {
                Loader.releaseProcess(processId);
            });
        }

        $scope.SetMeasurementA = function () {
            if ($scope.routineA.Selected.RoutineMeasurement != null) {
                angular.forEach($scope.measurementsA, function (measurement) {
                    var routineMeasurement = $filter('filter')($scope.routineA.Selected.RoutineMeasurement, { IdMeasurement: measurement.Id })[0];

                    if (routineMeasurement) {
                        measurement.Value = routineMeasurement.Value;
                    } else {
                        measurement.Value = 0;
                    }
                });
            }
        }

        $scope.SetMeasurementB = function () {
            if ($scope.routineB.Selected.RoutineMeasurement != null) {
                angular.forEach($scope.measurementsB, function (measurement) {
                    var routineMeasurement = $filter('filter')($scope.routineB.Selected.RoutineMeasurement, { IdMeasurement: measurement.Id })[0];

                    if (routineMeasurement) {
                        measurement.Value = routineMeasurement.Value;
                    } else {
                        measurement.Value = 0;
                    }
                });
            }
        }

    }
]);