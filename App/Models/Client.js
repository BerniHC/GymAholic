app.factory('Client', ['DataModel', 'Config', '$http',
    function (DataModel, Config, $http) {

        // Constructor
        function Client(data) {
            if (data) {
                this.setData(data);
            }
        };

        // Methods
        Client.prototype = new DataModel(Config.HostServices + "/api/client");

        Client.prototype.getByEmail = function (email) {
            var $this = this;

            return $http.post($this.url + '/GetByEmail', '"' + email + '"').success(function (response) {
                if (response && response.Status == 0) {
                    angular.extend($this, response.Result);
                }
            });
        }

        return Client;
    }
]);