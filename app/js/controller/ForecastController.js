app.controller('ForecastController', ['forecastService', function(forecastService) {

    var vm = this;

    getHello();

    function getHello() {
        forecastService.getWeather();
    }

}]);
