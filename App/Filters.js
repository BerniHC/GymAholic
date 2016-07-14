
// Format
app.filter("format", function () {
    return function (input) {
        var args = arguments;
        return input.replace(/\{(\d+)\}/g, function (match, capture) {
            return args[1 * capture + 1];
        });
    };
});

// Currency
app.filter("currency", ['numberFilter', 'Currency',
    function (numberFilter, Currency) {

        function isNumeric(value) {
            return (!isNaN(parseFloat(value)) && isFinite(value));
        }

        return function (inputNumber, code) {
            if (isNumeric(inputNumber)) {

                // Default values for the optional arguments
                currencySymbol = Currency.CurrencySymbol;
                currencyCode = Currency.CurrencyCode;
                decimalSeparator = Currency.DecimalSeparator;
                thousandsSeparator = Currency.ThousandsSeparator;
                decimalDigits = Currency.DecimalDigits;

                if (decimalDigits < 0) decimalDigits = 0;

                // Format the input number through the number filter
                // The resulting number will have "," as a thousands separator
                // and "." as a decimal separator.
                var formattedNumber = numberFilter(inputNumber, decimalDigits);

                // Extract the integral and the decimal parts
                var numberParts = formattedNumber.split(".");

                // Replace the "," symbol in the integral part
                // with the specified thousands separator.
                numberParts[0] = numberParts[0].split(",").join(thousandsSeparator);

                // Compose the final result
                var result = currencySymbol + numberParts[0];

                if (numberParts.length == 2) {
                    result += decimalSeparator + numberParts[1];
                }

                if (code) {
                    result = result + " " + currencyCode
                }

                return result;
            }
            else {
                return inputNumber;
            }
        };
    }
]);


// Digits
app.filter("digits", function () {
    return function (value, digits) {
        if (value && value != '') {
            digits = digits && Number.isInteger(digits) && digits > 0 ? digits : 4;

            var pre = '';

            for (i = 1; i < digits; i++)
                pre = pre + '0';

            return (pre + value).slice(-digits);
        } else {
            return value;
        }
    }
});
