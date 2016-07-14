app.factory('Subscription', ['DataModel', 'Config',
    function (DataModel, Config) {

        // Constructor
        function Subscription(data) {
            if (data) {
                this.setData(data);
            }
        };

        // Methods
        Subscription.prototype = new DataModel(Config.HostServices + "/api/Subscription");

        return Subscription;
    }
]);