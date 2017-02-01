'use strict';

var app = angular.module('forecastApp', []);

app.controller('ForecastController', ['forecastService', function(forecastService) {

    var vm = this;

    getHello();

    function getHello() {
        forecastService.getWeather();
    }

}]);

app.factory('forecastService', ['$http', function($http) {

    var forecast = {
        getWeather: getWeather
    };
    return forecast;

    function getWeather() {
        return console.log('hello');
    }
}]);
