      var map;
      var pos;
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
    zoomControl: false
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
      

      var lat = position.coords.latitude;
      var lng = position.coords.longitude; 
      
      var url = "http://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+lng+"&sensor=true"; 
      var address; 
       
       $.ajax({
          type : "get",
          url: url,
          success:function(data){
      //alert(data.results[0].formatted_address);
          //   console.log(data);
            address = data.results[0].formatted_address;
            $("#location").html(data.results[0].formatted_address);
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
    });

    

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

