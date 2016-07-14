app.factory('Specification', ['DataModel', 'Config',
    function (DataModel, Config) {

        // Constructor
        function Specification(data) {
            if (data) {
                this.setData(data);
            }
        };

        // Methods
        Specification.prototype = new DataModel(Config.HostServices + "/api/specification");

        return Specification;
    }
]);