angular.module('CronAsAService.services', []).
      factory('apiService', function($http) {

        var API = {};

        API.getJobs = function() {
          return $http({
            method: 'GET', 
            url: '/api/jobs?apikey='+apiKey
          });
        };

        API.newJob = function(formData){
            return $http({
                method  : 'POST',
                url     : '/api/jobs?apikey='+apiKey,
                data    : formData, 
                headers : { 'Content-Type': 'application/json' }
            });

        };

        API.delete = function(id){
             return $http({
                method  : 'DELETE',
                url     : '/api/jobs/' + id + '?apikey='+apiKey, 
                headers : { 'Content-Type': 'application/json' }
            });
        };

        API.tourComplete = function(){
            return $http({
                method  : 'POST',
                url     : '/tourcomplete',
                headers : { 'Content-Type': 'application/json' }
            });
        };

        return API;
      })
      .factory('utils', function() {

        var UTILS = {};

        UTILS.readCookie = function(name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for(var i=0;i < ca.length;i++) {
                var c = ca[i];
                while (c.charAt(0) === ' ') {
                    c = c.substring(1,c.length);
                }
                if (c.indexOf(nameEQ) === 0) {
                    return c.substring(nameEQ.length,c.length);
                }
            }
            return null;
        }

        UTILS.createCookie = function(name, value, days) {
            var expires;
            if (days) {
                var date = new Date();
                date.setTime(date.getTime()+(days*24*60*60*1000));
                expires = "; expires="+date.toGMTString();
            }
            else {
                expires = "";
            }
            document.cookie = name+"="+value+expires+"; path=/";
        }

        return UTILS;
      });