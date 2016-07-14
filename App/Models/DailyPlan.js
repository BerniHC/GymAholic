app.factory('DailyPlan', ['DataModel', 'Config',
    function (DataModel, Config) {

        // Constructor
        function DailyPlan(data) {
            if (data) {
                this.setData(data);
            }
        };

        // Methods
        DailyPlan.prototype = new DataModel(Config.HostServices + "/api/dailyplan");

        return DailyPlan;
    }
]);