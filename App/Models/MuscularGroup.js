app.factory('MuscularGroup', ['DataModel', 'Config',
    function (DataModel, Config) {

        // Constructor
        function MuscularGroup(data) {
            if (data) {
                this.setData(data);
            }
        };

        // Methods
        MuscularGroup.prototype = new DataModel(Config.HostServices + "/api/muscularGroup");

        return MuscularGroup;
    }
]);