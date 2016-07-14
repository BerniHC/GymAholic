app.factory('DataTable', ['$http', '$timeout', '$filter', '$uibModal', '$q', 'ResponseStatus', 'Loader', 'Alert',
    function ($http, $timeout, $filter, $uibModal, $q, ResponseStatus, Loader, Alert) {

        // Constructor
        function DataTable(url) {
            this.setData({
                url: url,
                data: [],
                options: {
                    page: 1,
                    pages: [],
                    count: 10,
                    counts: [10, 25, 50, 100],
                    total: 0,
                    sort: 'Id',
                    reverse: false,
                    search: ''
                },
                isLoading: false
            });
        }

        // Methods
        DataTable.prototype = {
            setData: function (data) {
                angular.extend(this, data);
            },
            load: function () {
                var $this = this;

                if ($this.isLoading) return;
                else $this.isLoading = true;

                var url = $this.url + "/page";

                var pagination = {
                    Page: $this.options.page,
                    RowsPerPage: $this.options.count,
                    Sort: $this.options.sort,
                    Order: $this.options.reverse ? "DESC" : "ASC",
                    Search: $this.options.search
                };

                $http.post(url, pagination).then(function (response) {
                    if (response.status == 200 && response.data.Status == ResponseStatus.Success) {
                        $this.data = response.data.Result.List;
                        $this.options.total = response.data.Result.TotalRows;
                        $this.options.pages = [];

                        var pagesCount = Math.ceil($this.options.total / $this.options.count);
                        if (pagesCount <= 5) {
                            for (i = 1; i <= pagesCount; i++) {
                                $this.options.pages.push(i);
                            }
                        } else {
                            var start = $this.options.page - 2;
                            var end = $this.options.page + 2;

                            if (start < 1) {
                                end += (1 - start);
                                start = 1;
                            }

                            if (end > pagesCount) {
                                start -= (end - pagesCount);
                                end = pagesCount;
                            }

                            for (i = start; i <= end; i++) {
                                $this.options.pages.push(i);
                            }
                        }
                    }

                    $this.isLoading = false;
                }, function (response) {
                    $this.isLoading = false;
                });
            },
            checkAll: function (value) {
                var $this = this;

                if ($this.isLoading) return;

                angular.forEach($this.data, function (item) {
                    item.Checked = value;
                });
            },
            hasChecked: function () {
                var $this = this;

                var result = false;

                for (var i = 0; i < $this.data.length; i++) {
                    var item = $this.data[i];

                    if (item.Checked) {
                        result = true;
                        break;
                    };
                };

                return result;
            },
            getChecked: function () {
                var $this = this;

                var checked = [];

                for (var i = 0; i < $this.data.length; i++) {
                    var item = $this.data[i];

                    if (item.Checked) {
                        checked.push(item);
                    };
                };

                return checked;
            },
            deleteItem: function (id) {
                var $this = this;
                var url = $this.url + "/" + id;

                var modalInstance = $uibModal.open({
                    templateUrl: 'DialogModal.html',
                    controller: 'DialogController',
                    resolve: {
                        options: function () {
                            return {
                                Title: "Confirmación",
                                Message: "¿Estás seguro de eliminar el elemento seleccionado?",
                                Buttons: ["Sí", "No"]
                            };
                        }
                    }
                });

                modalInstance.result.then(function (result) {
                    if (result == 0) {
                        var processId = Loader.waitProcess("Eliminando elemento seleccionado");

                        $http({
                            url: url,
                            method: 'DELETE',
                            headers: { "Content-Type": "application/json;charset=utf-8" }
                        }).then(function (response) {
                            Loader.releaseProcess(processId);

                            if (response.status == 200 && response.data.Status == ResponseStatus.Success) {
                                $this.load();
                                Alert.success('El elemento ha sido eliminado exitósamente');
                            }
                        }, function (response) {
                            Loader.releaseProcess(processId);
                            $this.load();
                        });
                    }
                }, function (result) { });
            },
            deleteChecked: function () {
                var $this = this;

                var checked = $this.getChecked();
                var confirmMsg = $filter('format')("Se seleccionaron {0} elemento(s) para eliminar. ¿Realmente desea continuar?", checked.length);

                if (checked.length > 0) {
                    var modalInstance = $uibModal.open({
                        templateUrl: 'DialogModal.html',
                        controller: 'DialogController',
                        resolve: {
                            options: function () {
                                return {
                                    Title: "Confirmación",
                                    Message: confirmMsg,
                                    Buttons: ["Sí", "No"]
                                };
                            }
                        }
                    });

                    modalInstance.result.then(function (result) {
                        if (result == 0) {
                            var failed = 0;
                            var success = 0;
                            var requests = [];

                            var processMsg = $filter('format')("Eliminando {0} elemento(s) seleccionado(s)", checked.length);
                            var processId = Loader.waitProcess(processMsg);

                            for(var i = 0; i < checked.length; i++) {
                                var item = checked[i];

                                var request = $http({
                                    url: $this.url + "/" + item.Id,
                                    method: 'DELETE',
                                    headers: { "Content-Type": "application/json;charset=utf-8" }
                                });

                                requests.push(request);
                            }

                            $q.all(requests).then(function (results) {
                                angular.forEach(results, function (response) {
                                    if (response.status == 200 && response.data.Status == ResponseStatus.Success) {
                                        success++;
                                    } else {
                                        failed++;
                                    }
                                });

                                Loader.releaseProcess(processId);

                                var message = $filter('format')("Se eliminaron {0} de {1} elemento(s) seleccionado(s)", success, checked.length);

                                var modalInstance = $uibModal.open({
                                    templateUrl: 'DialogModal.html',
                                    controller: 'DialogController',
                                    resolve: {
                                        options: function () {
                                            return {
                                                Title: "Eliminación completada",
                                                Message: message,
                                                Buttons: ["Aceptar"]
                                            };
                                        }
                                    }
                                });

                                $this.load();
                            });
                        }
                    }, function (result) { });
                }
            },
            setPage: function (page) {
                var $this = this;

                if ($this.isLoading) return;

                $this.options.page = page;
                $this.load();
            },
            first: function () {
                var $this = this;

                if ($this.isLoading) return;

                $this.options.page = 1;
                $this.load();
            },
            last: function () {
                var $this = this;

                if ($this.isLoading) return;

                var pagesCount = Math.ceil($this.options.total / $this.options.count);
                $this.options.page = pagesCount;
                $this.load();
            },
            previous: function () {
                var $this = this;

                if ($this.isLoading) return;

                if ($this.hasPrevious()) {
                    $this.options.page--;
                    $this.load();
                }
            },
            next: function () {
                var $this = this;

                if ($this.isLoading) return;

                if ($this.hasNext()) {
                    $this.options.page++;
                    $this.load();
                }
            },
            hasPrevious: function () {
                var $this = this;

                return $this.options.page > 1;
            },
            hasNext: function () {
                var $this = this;

                var pagesCount = Math.ceil($this.options.total / $this.options.count);
                return $this.options.page < pagesCount;
            },
            info: function () {
                var $this = this;

                var start = ($this.options.count * ($this.options.page - 1));
                var end = start + $this.data.length;

                return {
                    start: start,
                    end: end,
                    total: $this.options.total
                };
            },
            sort: function (sort) {
                var $this = this;

                if ($this.isLoading) return;

                $this.options.reverse = ($this.options.sort === sort) ? !$this.options.reverse : false;
                $this.options.sort = sort;

                $this.load();
            },
            order: function (sort) {
                var $this = this;

                if ($this.options.sort == sort) {
                    if ($this.options.reverse) {
                        return 'order desc';
                    } else {
                        return 'order asc';
                    }
                } else {
                    return 'order';
                }
            }
        }

        return DataTable;

    }
]);