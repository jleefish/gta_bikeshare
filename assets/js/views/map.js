(function(Map){

  var stationList = null;
  var openWindow = null;
  var map = null;

  Map.init = function(){
    stationList = BikeApp.Data.stationList;

    $(document).on("pageshow","#map-page", onPageShow);
  };

  var onPageShow = function(){
    if(map == null){
      createMap();
    }
  };

  var createMap = function(){
    var mapOptions = {
      center: new google.maps.LatLng(43.654188, -79.380805),
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions); 

    

    //adding markers    
    for (var i = 0; i < stationList.length; i++) {
      var position = new google.maps.LatLng(stationList[i].latitude, stationList[i].longitude);
      
      var marker = new google.maps.Marker({
        position: position,
        map: map,
        icon: getMarkerImg(i),
        title: "Bike Share Station"
      });

      attachWindowToMarker(marker, i);
    }

  };

  google.maps.event.addDomListener(window, 'load', initialize);
  google.maps.event.addDomListener(window, "resize", function() {
      var center = map.getCenter();
      google.maps.event.trigger(map, "resize");
      map.setCenter(center); 
  });

  var getMarkerImg = function(i){
    var availableBikes = stationList[i].availableBikes;
    if(availableBikes <= 0){
      return "assets/img/cycling_gray.png";
    } else if(availableBikes <= 5){
      return "assets/img/cycling_red.png";
    } else if(availableBikes > 5) {
      return "assets/img/cycling_green.png";
    }
  };

  var attachWindowToMarker = function(marker, num){
    var availableBikes = stationList[num].availableBikes;
    var totalDocks = stationList[num].totalDocks;
    var stationName = stationList[num].stationName;

    var content = $("<div>")
    .append($("<div>").html("<b>Station Name:</b> " + stationName))
    .append($("<div>").html("<b>Total Docks:</b> " + totalDocks))
    .append($("<div>").html("<b>Available Bikes:</b> "+ availableBikes));

    var infowindow = new google.maps.InfoWindow({
      content: content.html()
    });

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(marker.get('map'),marker);  
        if ( openWindow != null ) {
          openWindow.close();
        }    
        openWindow = infowindow;
    });
  };

})(BikeApp.Views.Map);








