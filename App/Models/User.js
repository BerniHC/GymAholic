app.factory('User', ['DataModel', 'Config', '$http', 
    function (DataModel, Config, $http) {

        // Constructor
        function User(data) {
            if (data) {
                this.setData(data);
            }
        };

        // Methods
        User.prototype = new DataModel(Config.HostServices + '/api/user');

        User.prototype.getByEmail = function (email) {
            var $this = this;

            return $http.post($this.url + '/GetByEmail', '"' + email + '"').success(function (response) {
                if (response && response.Status == 0) {
                    angular.extend($this, response.Result);
                }
            });
        }

        return User;
    }
]);
