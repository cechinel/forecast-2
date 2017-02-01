app.factory('forecastService', ['$http', function($http) {

    var forecast = {
        getWeather: getWeather
    };
    return forecast;

    function getWeather() {
        return console.log('hello');
    }
}]);
