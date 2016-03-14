(function(Reports){

    var stations = null;

    Reports.init = function(){
        stations = BikeApp.Data.stationList;
        $(document).on("pagecreate","#detailed-reports-page",onPageCreate);

    };

    var onPageCreate = function(){
        
        var tableBody = $("#report-table tbody");
        var station = null;

        var totalDocks = 0;
        var availableDocks = 0;
        var availableBikes = 0;

        for(var i = 0; i < stations.length; ++i){
            station = stations[i];

            tableBody.append(
                $("<tr>").append(
                    $("<td>").text(station.stationName)
                ).append(
                    $("<td>").text(station.totalDocks)
                ).append(
                    $("<td>").text(station.availableDocks)
                ).append(
                    $("<td>").text(station.availableBikes)
                )
            );

            totalDocks += station.totalDocks;
            availableDocks += station.availableDocks;
            availableBikes += station.availableBikes;
        }

        $("#report-table tfoot").append(
            $("<tr>").append(
                $("<td>").text("Total:")
            ).append(
                $("<td>").text(totalDocks)
            ).append(
                $("<td>").text(availableDocks)
            ).append(
                $("<td>").text(availableBikes)
            )
        );
    };


})(BikeApp.Views.Reports);

