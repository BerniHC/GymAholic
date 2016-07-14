// Ratio
app.directive('ngRatio', function () {
    return {
        restric: 'A',
        link: function (scope, element, attr) {
            var ratio = +(attr.ngRatio);
            element.css('width', ratio + '%');
        }
    };
});

// Enter Key
app.directive('ngEnterKey', function () {
    return function (scope, element, attrs) {

        element.bind("keydown keypress", function (event) {
            var keyCode = event.which || event.keyCode;

            // If enter key is pressed
            if (keyCode === 13) {
                scope.$apply(function () {
                    // Evaluate the expression
                    scope.$eval(attrs.ngEnterKey);
                });

                event.preventDefault();
            }
        });
    };
});

// Field Validator
app.directive('ngValidField', function () {
    return {
        restric: 'A',
        scope: { ngValidField: '=' },
        link: function (scope, element, attr) {

            var event = function (event) {
                setTimeout(function () {
                    var keyCode = event.which || event.keyCode;
                    var field = scope.ngValidField;

                    if (field.$touched && field.$invalid)
                        element.addClass('has-error');
                    else
                        element.removeClass('has-error');
                }, 20);
            };

            element.bind("focusout", event);

        }
    };
});

// Form Validator
app.directive('ngValidate', function () {
    return {
        restric: 'A',
        scope: { ngValidate: '=' },
        link: function (scope, element, attr) {
            var event = function (event) {
                setTimeout(function () {
                    var keyCode = event.which || event.keyCode;
                    var form = scope.ngValidate;

                    angular.forEach(form, function (field, name) {
                        if (name.indexOf("$") != 0) {
                            var control = angular.element('[name=' + form.$name + '] [data-valid=' + name + ']');

                            if ((form.$submitted || field.$touched) && field.$invalid) {
                                control.addClass('has-error');
                            } else {
                                control.removeClass('has-error');
                            }

                            control.removeClass('required-error');
                            control.removeClass('maxlength-error');
                            control.removeClass('minlength-error');
                            control.removeClass('email-error');
                            control.removeClass('pattern-error');
                            control.removeClass('date-error');

                            angular.forEach(field.$error, function (value, error) {
                                if(value) {
                                    control.addClass(error + '-error');
                                }
                            });
                        }
                    });
                    
                }, 20);
            };

            element.bind("focusout", event);
            element.bind("submit", event);

        }
    };
});

// Only Number - Allow only number in input
app.directive('onlyNumber', function () {
    return function (scope, element, attrs) {
        var keyCode = [8, 9, 13, 37, 39, 46, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 110, 188, 190];
        element.bind("keydown", function (event) {
            if ($.inArray(event.which, keyCode) == -1) {
                scope.$apply(function () {
                    scope.$eval(attrs.onlyNum);
                    event.preventDefault();
                });
                event.preventDefault();
            }
        });
    };
});

// Only Digits - Allow only digits in input
app.directive('onlyDigits', function () {
    return function (scope, element, attrs) {
        var keyCode = [8, 9, 13, 37, 39, 46, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105];
        element.bind("keydown", function (event) {
            if ($.inArray(event.which, keyCode) == -1) {
                scope.$apply(function () {
                    scope.$eval(attrs.onlyNum);
                    event.preventDefault();
                });
                event.preventDefault();
            }
        });
    };
});

// Submit On
app.directive('submitOn', function () {
    return {
        link: function (scope, elm, attrs) {
            scope.$on(attrs.submitOn, function () {
                //We can't trigger submit immediately, or we get $digest already in progress error :-[ (because ng-submit does an $apply of its own)
                setTimeout(function () {
                    elm.trigger('submit');
                });
            });
        }
    }
});

