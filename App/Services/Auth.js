app.factory('Auth', ['$http', 'jwtHelper', 'Config',
    function ($http, jwtHelper, Config) {

        // Identificar usuario
        var _login = function (credentials) {
            return $http.post(Config.HostServices + '/api/clientauth/login', credentials);
        }

        // Cerrar sesión
        var _logout = function () {
            localStorage.removeItem('token');
            localStorage.removeItem('profile');
            window.location = '#/login';
        }

        // Confirmar cuenta
        var _confirm = function (code) {
            return $http.get(Config.HostServices + '/api/clientauth/confirm/' + code);
        }

        // Obtener perfil
        var _getProfile = function () {
            var cookie = localStorage.getItem('profile');
            var profile = angular.fromJson(cookie);
            return profile;
        }

        // Establecer perfil
        var _setProfile = function (profile) {
            localStorage.setItem('profile', angular.toJson(profile));
        }

        // Obtener token
        var _getToken = function () {
            var token = localStorage.getItem('token');
            return token;
        }

        // Establecer token
        var _setToken = function (token) {
            localStorage.setItem('token', token);
        }

        // Decodificar token
        var _decodeToken = function (token) {
            return jwtHelper.decodeToken(token);
        }

        // Refrescar token
        var _refreshToken = function () {
            var token = _getToken();
            return $http.get(Config.HostServices + '/api/clientauth/refreshtoken/?token=' + token);
        }

        // Verificar si esta autentificado
        var _isAuthenticated = function () {
            var isAuth = true;
            var token = localStorage.getItem('token');

            if (jwtHelper.isTokenExpired(token)) {
                isAuth = false;
                window.location = "#/login";
            }

            return isAuth;
        }

        // Cambiar contraseña
        var _changePassword = function (data) {
            return $http.post(Config.HostServices + '/api/clientauth/changepassword', data);
        }

        return {
            login: _login,
            logout: _logout,
            getProfile: _getProfile,
            setProfile: _setProfile,
            getToken: _getToken,
            setToken: _setToken,
            decodeToken: _decodeToken,
            refreshToken: _refreshToken,
            isAuthenticated: _isAuthenticated,
            changePassword: _changePassword
        }
    }
]);