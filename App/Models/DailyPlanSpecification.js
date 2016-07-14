app.factory('DailyPlanSpecification', ['DataModel', 'Config', "$http",
    function (DataModel, Config, $http) {

        // Constructor
        function DailyPlanSpecification(data) {
            if (data) {
                this.setData(data);
            }
        };

        // Methods
        DailyPlanSpecification.prototype = new DataModel(Config.HostServices + "/api/DailyPlanSpecification");

        DailyPlanSpecification.prototype.SelectByIds = function (idDailyPlan, idSpecification) {
            var $this = this;

            return $http.get($this.url + '/SelectByIds/' + idDailyPlan + "/" + idSpecification).success(function (response) {
                if (response && response.Status == 0) {
                    angular.extend($this, response.Result);
                }
            });
        };

        DailyPlanSpecification.prototype.DeleteDPS = function (idDailyPlan, idSpecification) {
            var $this = this;

            return $http.get($this.url + '/DeleteDPS/' + idDailyPlan + "/" + idSpecification).success(function (response) {
                if (response && response.Status == 0) {
                    angular.extend($this, response.Result);
                }
            });
        };

        return DailyPlanSpecification;
    }
]);