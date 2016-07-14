app.factory('Payment', ['DataModel', 'Config',
    function (DataModel, Config) {

        // Constructor
        function Payment(data) {
            if (data) {
                this.setData(data);
            }
        };

        // Methods
        Payment.prototype = new DataModel(Config.HostServices + "/api/Payment");

        return Payment;
    }
]);