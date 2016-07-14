app.factory('Permission', ['DataModel', 'Config',
    function (DataModel, Config) {

        // Constructor
        function Permission(data) {
            if (data) {
                this.setData(data);
            }
        };

        // Methods
        Permission.prototype = new DataModel(Config.HostServices + "/api/permission");

        return Permission;
    }
]);