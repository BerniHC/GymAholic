app.factory('Loader', ['$filter', 
    function ($filter) {
        var processes = [];

        // Esperar proceso
        var _waitProcess = function (message) {
            var process = { Id: _getGuid(), Message: message };
            processes.push(process);

            return process.Id;
        }

        // Liberar proceso
        var _releaseProcess = function (id) {
            var process = $filter('filter')(processes, { Id: id })[0];
            
            if (process != null) {
                var idx = processes.indexOf(process);
                processes.splice(idx, 1);
            }
        }

        // Mostrar loader
        var _showLoader = function () {
            if (processes.length > 0) {
                return true;
            } else {
                return false;
            }
        }

        // Obtener proceso actual
        var _getProcesses = function () {
            var list = [];

            angular.forEach(processes, function (process, idx) {
                if (process.Message && process.Message != "") {
                    list.push(process);
                }
            });

            return list;
        }

        // Obtener Guid
        var _getGuid = function () {
            var d = new Date().getTime();
            var guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });
            return guid;
        };

        // Obtener info
        var _count = function () {
            return processes.length;
        }

        return {
            waitProcess: _waitProcess,
            releaseProcess: _releaseProcess,
            showLoader: _showLoader,
            getProcesses: _getProcesses,
            count: _count,
            getGuid: _getGuid
        }
    }
]);