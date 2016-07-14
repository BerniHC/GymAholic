app.factory('Alert', ['$timeout', 'Config', '$anchorScroll', '$location',
    function ($timeout, Config, $anchorScroll, $location) {

        var _alerts = [];
        var _current = null;
        var _timeout = null;
        var _new = false;
        var _isOpen = false;

        var _show = function (type, message, delay) {
            var alert = {
                Message: message,
                Type: type,
                Date: new Date(),
                Active: true
            };

            _alerts.unshift(alert);
            _current = _alerts[0];
            _new = true;

            $location.hash('top');
            $anchorScroll();

            if (_timeout)
                $timeout.cancel(_timeout);

            _timeout = $timeout(function () {
                _current = null;
            }, delay);
        }

        var _info = function (message) {
            _show('alert-info', message, Config.AlertDelay);
        }

        var _warn = function (message) {
            _show('alert-warn', message, Config.AlertDelay);
        }

        var _success = function (message) {
            _show('alert-success', message, Config.AlertDelay);
        }

        var _error = function (message) {
            _show('alert-danger', message, Config.AlertDelay);
        }

        var _close = function () {
            _current = null;
        }

        var _remove = function (alert) {
            var idx = _alerts.indexOf(alert);
            _alerts.splice(idx, 1);
        }

        var _getCurrent = function () {
            return _current;
        }

        var _hasNew = function () {
            return _new;
        }

        var _read = function () {
            if (_isOpen) {
                angular.forEach(_alerts, function (alert) {
                    alert.Active = false;
                });

                _new = false;
            }

            _isOpen = !_isOpen
        }

        var _clear = function () {
            _alerts = [];
        }

        return {
            all: _alerts,
            show: _show,
            info: _info,
            warn: _warn,
            success: _success,
            error: _error,
            close: _close,
            remove: _remove,
            getCurrent: _getCurrent,
            hasNew: _hasNew,
            read: _read,
            clear: _clear
        }

    }
]);