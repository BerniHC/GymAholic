app.factory('Attendance', ['DataModel', 'Config',
    function (DataModel, Config) {

        // Constructor
        function Attendance(data) {
            if (data) {
                this.setData(data);
            }
        };

        // Methods
        Attendance.prototype = new DataModel(Config.HostServices + "/api/attendance");

        return Attendance;
    }
]);