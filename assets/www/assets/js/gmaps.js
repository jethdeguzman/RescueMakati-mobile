      var map;
      var pos;
      var lat;
      var lng;
      var address;
function initialize() {
  
  var mapOptions = {
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    mapTypeControl : false,
    panControl: false,
    scrollwheel: false,
    navigationControl: false,
    scaleControl: false,
    draggable: false,
    zoomControl: false,
    enableHighAccuracy: true
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  // Try HTML5 geolocation
  if(navigator.geolocation) {

    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      var infowindow = new google.maps.InfoWindow({
        map: map,
        position: pos,
        content: '<b><i class="fa fa-map-marker fa-lg"></i> You are here.</b>'
      });

      map.setCenter(pos);
      

      lat = position.coords.latitude;
      lng = position.coords.longitude; 
      // lat = 14.567676;
      // lng = 121.04431;
      var url = "http://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+lng+"&sensor=true"; 
      
       
       $.ajax({
          type : "get",
          url: url,
          success:function(data){
      //alert(data.results[0].formatted_address);
          //   console.log(data);
            localStorage.location = "false";
            address = data.results[0].formatted_address;
            $("#location").html(data.results[0].formatted_address);
            add_comp = data.results[0].address_components;
            for(var i in add_comp){
              for (var j in add_comp[i]){
                if(add_comp[i][j] == "Makati"){
                  localStorage.location = "true";
                }
                  
                
              }
            } 
          // //  alert(data.results[0].geometry.location.lat);
          //   $$(".lat-span").text(data.results[0].geometry.location.lat);
          //   $$(".lng-span").text(data.results[0].geometry.location.lng);
          //    $$(".address-span").text(address);
        }
      });
      

       // var circle = new google.maps.Circle({
       //   center: pos,
       //   radius: position.coords.accuracy,
       //   map: map,
       //   fillColor: '#0000FF',
       //   fillOpacity: 0.5,
       //   strokeColor: '#0000FF',
       //   strokeOpacity: 1.0
       // });

       // mapObject.fitBounds(circle.getBounds());

    }, function() {
      handleNoGeolocation(true);
    }, {enableHighAccuracy: true});

    

  } else {
    // Browser doesn't support Geolocation
    handleNoGeolocation(false);
  }



}

function handleNoGeolocation(errorFlag) {
  if (errorFlag) {
    var content = 'Error: The Geolocation service failed.';
  } else {
    var content = 'Error: Your browser doesn\'t support geolocation.';
  }

  var options = {
    map: map,
    position: new google.maps.LatLng(60, 105),
    content: content
  };

  var infowindow = new google.maps.InfoWindow(options);
  map.setCenter(options.position);
}

