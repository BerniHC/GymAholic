app.factory('HttpInterceptor', ['$q', '$filter', 'ResponseStatus', 'Alert', 
    function ($q, $filter, ResponseStatus, Alert) {

        // Validate Response
        var validateResponse = function (response) {
            var data = response.data;
            var status = response.status;

            switch (status) {
                case -1: // Service Unavailable
                    Alert.error('Error de conexión');
                    break;
                case 200: // OK
                    switch (data.Status) {
                        case ResponseStatus.Success:
                            return response || $q.when(response);
                            break;
                        case ResponseStatus.Error:
                            Alert.error('Lo sentimos, ha ocurrido un error');
                            console.error(data.Message);
                            break;
                        case ResponseStatus.InvalidRequest:
                            Alert.error('Solicitud inválida, corrija los errores e inténtelo de nuevo.');
                            break;
                        case ResponseStatus.InvalidUser:
                            Alert.error('Usuario inválido');
                            break;
                        case ResponseStatus.InvalidPass:
                            Alert.error('Contraseña inválida');
                            break;
                        case ResponseStatus.InvalidCode:
                            Alert.error('Código de confirmación inválido');
                            break;
                        case ResponseStatus.NotConfirmed:
                            Alert.error('Cuenta no confirmada. Por favor confirma tu cuenta para poder ingresar');
                            break;
                        case ResponseStatus.InvalidToken:
                            Alert.error('Token inválido, inicie sesión nuevamente');
                            break;
                        case ResponseStatus.DisabledAccount:
                            Alert.error('Cuenta deshabilitada, contacte con el administrador si es un error');
                            break;
                        case ResponseStatus.DuplicatedItem:
                            Alert.error('El elemento ya ha sido agregado con anterioridad');
                            break;
                        default:
                            return response || $q.when(response);
                            break;
                    }
                    break;
                case 400: // Bad Request
                    Alert.error('Solicitud inválida, corrija los errores e inténtelo de nuevo.');
                    break;
                case 401: // Unauthorized
                    Alert.error('Acceso no autorizado, inicie sesión para continuar');
                    window.location = "#/logout";
                    break;
                case 403: // Forbidden
                    Alert.error('Acceso denegado, no cuenta con los permisos necesarios');
                    break;
                case 404: // Not Found
                    Alert.error('Recurso no encontrado.');
                    break;
                case 405: // Method Not Allowed
                    Alert.error('Método no permitido');
                    break;
                case 408: // Request Timeout
                    Alert.error('Tiempo de espera agotado');
                    break;
                case 500: // Server Error
                    Alert.error('Error de servidor');
                    break;
                case 501: // Not Implemented
                    Alert.error('Error no implementado');
                    break;
                case 503: // Service Unavailable
                    Alert.error('Servicio no disponible');
                    break;
                default: // Other
                    Alert.error('Error no controlado');
                    break;
            }
            return response || $q.when(response);
        }

        return {
            // Request
            request: function (config) {
                config.headers = config.headers || {};

                var token = localStorage.getItem('token');

                if (token) {
                    config.headers.Authorization = 'Basic ' + token;
                }

                return config || $q.when(config);
            },
            // Response Success
            response: function (response) {
                return validateResponse(response);
            },
            // Response Error
            responseError: function (response) {
                return validateResponse(response);
            }
        };

    }]);
