app.factory('Contact', ['DataModel', 'Config',
    function (DataModel, Config) {

        // Constructor
        function Contact(data) {
            if (data) {
                this.setData(data);
            }
        };

        // Methods
        Contact.prototype = new DataModel(Config.HostServices + "/api/muscularGroup");

        return Contact;
    }
]);