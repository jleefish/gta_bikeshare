(function(Locations){

  var stations = null;
  var selectedIndex =  0; 
  var sortDirection = -1; 
  var SORT_HIGHEST_AVAILABLE_BIKES = 0;
  var SORT_LOWEST_AVAILABLE_BIKES = 1;

  Locations.init = function(){
    $(document).on("pagecreate","#locations-page", onPageCreate);
    stations = BikeApp.Data.stationList;
  };

  var populateList = function(){
    var list = $('#locations-list');
    list.empty();
    for(var i = 0; i < stations.length; ++i){
      list.append(
        $("<li>").append(
          $("<a>").attr("href","#").attr("data-index", i).text(stations[i].stationName)));
    }
    list.listview('refresh');
  };

  var onSortClicked = function(){
    if($(this).val() == sortDirection){
      return;
    }
    
    sortDirection = $(this).val();

    if (sortDirection == SORT_LOWEST_AVAILABLE_BIKES) {     
      stations.sort(function(current, next) {
        if(current.availableBikes < next.availableBikes){
          return -1;
        }else if (current.availableBikes > next.availableBikes){        
          return 1;
        } else{
          return 0;  
        }      
      });
    } else if (sortDirection == SORT_HIGHEST_AVAILABLE_BIKES) {      
      stations.sort(function(current, next) {
        if(current.availableBikes < next.availableBikes){
          return 1;
        }else if (current.availableBikes > next.availableBikes){
          return -1;
        }else{
          return 0;  
        }      
      });
    }
    populateList();
  };

  var onLocationClicked = function(){
    selectedIndex = $(this).attr('data-index');
      $.mobile.changePage( "#location-info-page", { 
        transition: "flip", changeHash: false });
  };

  var onPageBeforeShow = function(){
    var station = stations[selectedIndex];
    var info = $("#info-panel");
    info.find(".station-name").text(station.stationName);
    info.find(".total-docks").text(station.totalDocks)
    info.find(".available-docks").text(station.availableDocks);
    info.find(".status").text(station.statusValue);
    info.find(".available-bikes").text(station.availableBikes);
  };

  var onPageCreate=function(){    
    populateList();

    $('#sort-list-dropdown').on('vclick', onSortClicked);
      
    $(document).on('vclick', '#locations-list li a', onLocationClicked);

    $(document).on('pagebeforeshow', '#location-info-page', onPageBeforeShow);

  };

})(BikeApp.Views.Locations);
