angular
    .module('bb-app')
    .factory('bixiPathService', bixiPathService);

    function bixiPathService(){
        return {
            getShortestPath: getShortestPath
        };

        function getShortestPath(data){
            // var G = new jsnx.Graph();
            // _.forEach(data, function(e){
            //     G.addNode([e.coords.lat, e.coords.lon]);
            // })
            // console.log(G.numberOfNodes());

            _.forEach(data, function(e){
                
            })
        }

        function getHaversineDistance()
    };