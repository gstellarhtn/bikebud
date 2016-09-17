angular
    .module('bb-app')
    .factory('bixiStationService', bixiStationService);

    bixiStationService.$inject = ['$http'];

    function bixiStationService($http){
        return {
            getMontrealBixi: getMontrealBixi,
            getTorontoBixi: getTorontoBixi
        };

        function getMontrealBixi(){
            return $http.get('https://api-core.bixi.com/gbfs/en/station_information.json')
                .then(getMontrealSuccess)
                .catch(getMontrealFailed)

            function getMontrealSuccess(response){
                var bixiStations = _.map(response.data.data.stations, function(station){
                    return translateBixiData(station);
                });
                return bixiStations;
            }

            function getMontrealFailed(error){
                console.log(error);
            }
        }

        function getTorontoBixi(){
            return $http.get('v1/stations/stations.json')
                .then(getTorontoSuccess)
                .catch(getTorontoFailed)

            function getTorontoSuccess(response){
                var bixiStations = _.map(response.data.stationBeanList, function(station){
                    return translateBixiData(station);
                });
                return bixiStations;
            }

            function getTorontoFailed(error){
                console.log(error);
            }
        }

        function translateBixiData(data){
            var result = {
                id : 0,
                longitude : 0,
                latitude : 0
            };
            if(data["station_id"] || data["id"])
                result.id = data["station_id"] || data["id"];
            if(data["lat"] || data["latitude"])
                result.latitude = data["lat"] || data["latitude"];
            if(data["lon"] || data["longitude"])
                result.longitude = data["lon"] || data["longitude"];
            
            return result;
        }
    }