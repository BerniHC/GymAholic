app.factory('Measurement', ['DataModel', 'Config',
    function (DataModel, Config) {

        // Constructor
        function Measurement(data) {
            if (data) {
                this.setData(data);
            }
        };

        // Methods
        Measurement.prototype = new DataModel(Config.HostServices + "/api/measurement");

        return Measurement;
    }
]);