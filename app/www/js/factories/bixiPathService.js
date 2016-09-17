angular
    .module('bb-app')
    .factory('bixiPathService', bixiPathService);

    function bixiPathService(){
        return {
            getShortestPath: getShortestPath
        };

        function getShortestPath(){
            console.log(jsnx);
        }
    };