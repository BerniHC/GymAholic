app.factory('Exercise', ['DataModel', 'Config', '$http',
    function (DataModel, Config, $http) {

        // Constructor
        function Exercise(data) {
            if (data) {
                this.setData(data);
            }
        };

        // Methods
        Exercise.prototype = new DataModel(Config.HostServices + "/api/exercise");

        Exercise.prototype.GetByMuscularGroup = function (id) {
            var $this = this;

            return $http.get($this.url + '/GetByMuscularGroup/' + id).success(function (response) {
                if (response && response.Status == 0) {
                    angular.extend($this, response.Result);
                }
            });
        };

        return Exercise;
    }
]);