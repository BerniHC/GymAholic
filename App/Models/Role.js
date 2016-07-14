app.factory('Role', ['DataModel', 'Config',
    function (DataModel, Config) {

        // Constructor
        function Role(data) {
            if (data) {
                this.setData(data);
            }
        };

        // Methods
        Role.prototype = new DataModel(Config.HostServices + "/api/role");

        return Role;
    }
]);