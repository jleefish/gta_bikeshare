$.ajax({
    type:"GET",
    url:"assets/json/bikeshare.json",
    dataType:"json",
    success:function(json){
        BikeApp.Data.stationList = json.stationBeanList;

        BikeApp.Views.Home.init();
        BikeApp.Views.Locations.init();
        BikeApp.Views.Map.init();
        BikeApp.Views.Reports.init();
  
    },
    error:function(){alert("Error while loading app data.");}
});





