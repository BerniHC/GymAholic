/// <reference path="Config.js" />
// --------------------------------------
// Constants 
// --------------------------------------

angular.module('app-config', [])
.constant('Config', {
    AppName: 'GymAholic',
    HostServices: 'http://gymaholic.azurewebsites.net',
    AlertDelay: 5000
})
.constant('ResponseStatus', {
    Success: 0,
    Error: 1,
    InvalidRequest: 2,
    InvalidUser: 3,
    InvalidPass: 4,
    InvalidCode: 5,
    NotConfirmed: 6,
    InvalidToken: 7,
    DisabledAccount: 8,
    DuplicatedItem: 9
})
.constant('Currency', {
    CurrencySymbol: '₡',
    CurrencyCode: 'CRC',
    DecimalSeparator: '.',
    ThousandsSeparator: ',',
    DecimalDigits: 2
});

// --------------------------------------
// Http Provider 
// --------------------------------------

app.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('HttpInterceptor');
}]);