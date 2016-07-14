app.factory('RoutineMeasurement', ['DataModel', 'Config',
    function (DataModel, Config) {

        // Constructor
        function RoutineMeasurement(data) {
            if (data) {
                this.setData(data);
            }
        };

        // Methods
        RoutineMeasurement.prototype = new DataModel(Config.HostServices + "/api/routinemeasurement");

        return RoutineMeasurement;
    }
]);