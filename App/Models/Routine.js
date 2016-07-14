app.factory('Routine', ['DataModel', 'Config', '$http',
    function (DataModel, Config, $http) {

        // Constructor
        function Routine(data) {
            if (data) {
                this.setData(data);
            }
        };

        // Methods
        Routine.prototype = new DataModel(Config.HostServices + "/api/Routine");

        Routine.prototype.GetLastRoutine = function () {
            var $this = this;

            return $http.get($this.url + '/GetLastRoutine/').success(function (response) {
                if (response && response.Status == 0) {
                    angular.extend($this, response.Result);
                }
            });
        };

        Routine.prototype.GetByClientId = function (id) {
            var $this = this;

            return $http.get($this.url + '/GetByClientId/' + id).success(function (response) {
                if (response && response.Status == 0) {
                    angular.extend($this, response.Result);
                }
            });
        };

        Routine.prototype.HistoryClient = function (id) {
            var $this = this;

            return $http.get($this.url + '/HistoryClient/' + id).success(function (response) {
                if (response && response.Status == 0) {
                    angular.extend($this, response.Result);
                }
            });
        };
        return Routine;
    }
]);