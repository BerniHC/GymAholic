app.factory('DataModel', ['$http',
    function ($http) {

        // Constructor
        function DataModel(url) {
            this.setData({
                url: url
            });
        };

        // --------------------------------------
        // Public Methods
        // --------------------------------------

        DataModel.prototype = {
            setData: function (data) {
                angular.extend(this, data);
            },
            list: function () {
                var $this = this;

                return $http.get($this.url);
            },
            get: function (id) {
                var $this = this;

                return $http.get($this.url + '/' + id).success(function (response) {
                    if (response && response.Status == 0) {
                        angular.extend($this, response.Result);
                    }
                });
            },
            delete: function () {
                var $this = this;

                return $http.delete($this.url + '/' + $this.Id);
            },
            save: function () {
                var $this = this;

                if ($this.Id) {
                    return $http.put($this.url + '/' + $this.Id, $this);
                } else {
                    return $http.post($this.url, $this);
                }
            }
        };
        
        return DataModel;
    }
]);
