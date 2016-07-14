app.config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise(function ($injector) {
            var $state = $injector.get('$state');
            return $state.go('home');
        });

        $stateProvider
            // Auth
            .state('login', {
                url: "/login",
                templateUrl: "App/Views/Account/Login.html",
                controller: "AccountController",
                auth: false
            })
            .state('logout', {
                url: "/logout",
                controller: ['Auth', function (Auth) {
                    Auth.logout();
                }],
                auth: false
            })
            .state('confirm', {
                url: "/confirm/:code",
                templateUrl: "App/Views/Account/Confirm.html",
                controller: "AccountController",
                auth: false
            })
            .state('profile', {
                url: "/profile",
                templateUrl: "App/Views/Account/Profile.html",
                controller: "AccountController",
                auth: true
            })
            .state('change-password', {
                url: "/change-password",
                templateUrl: "App/Views/Account/ChangePassword.html",
                controller: "AccountController",
                auth: true
            })

            // Home
            .state('home', {
                url: "/",
                templateUrl: "App/Views/Home.html",
                controller: "HomeController",
                auth: true
            })
            

            // Routine
                .state('current-routine', {
                    url: "/currentroutine",
                    templateUrl: "App/Views/Routine/CurrentRoutine.html",
                    controller: "RoutineController",
                    auth: true
                })
                .state('history-routine', {
                    url: "/historyroutine",
                    templateUrl: "App/Views/Routine/HistoryRoutine.html",
                    controller: "RoutineController",
                    auth: true
                })
            .state('view-routine', {
            url: "/viewroutine/:id",
            templateUrl: "App/Views/Routine/ViewRoutine.html",
            controller: "RoutineController",
            auth: true
            })
        .state('progress', {
            url: "/progress",
            templateUrl: "App/Views/Routine/Progress.html",
            controller: "RoutineController",
            auth: true
        })
    }
]);