var app = angular.module("GymAholicMobile", [
    'app-config',
    'ui.router',
    'ui.bootstrap',
    'ui.mask',
    'ui.select',
    'ngAnimate',
    'angular-jwt',
    'ngSanitize',
    'angularMoment'
]);

app.run(['$rootScope', '$state', 'jwtHelper', 'Auth', 'amMoment', 
    function ($rootScope, $state, jwtHelper, Auth, amMoment) {

        amMoment.changeLocale('es');

        // Evento al iniciar cambio de ruta
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, options) {
            // Verificar autentificacion
            if (toState.auth) {
                var token = Auth.getToken();

                if (!token || jwtHelper.isTokenExpired(token)) {
                    event.preventDefault();
                    window.location = '#/logout';
                } else {
                    var expDate = jwtHelper.getTokenExpirationDate(token);
                    var minutes = moment(expDate).diff(moment(), 'minutes');

                    if (minutes <= 5) {
                        /*Auth.refreshToken().then(function (response) {
                            if (response.status == 200 && response.data.Status == ResponseStatus.Success) {
                                token = response.data.Result;
                                Auth.setToken(token);
                            }
                        });*/
                    }
                }
            }
        })

        // Evento al completar cambio de ruta
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            //console.info('State Change Success');
        });

    }
]);