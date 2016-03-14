(function(Home){

    Home.init=function(){
        $(document).ready(onReady);
    };

    var onReady = function(){
        $("#motd").text(new Date().toDateString());

        var stations = BikeApp.Data.stationList;
        var numStations = stations.length;
        var totalDocks = 0;
        var availableDocks = 0;

        for(var i = 0; i < numStations; ++i) {
            var station = stations[i];
            totalDocks += station.totalDocks;
            availableDocks += station.availableDocks;
        }

        $(".percent-bikes .statistic").text(((availableDocks / totalDocks) * 100).toFixed() + "%");
        $(".total-docks .statistic").text(totalDocks);
        $(".num-locations .statistic").text(numStations);
    };

})(BikeApp.Views.Home);
