var home = {lat: -7.21746161, lng: -35.86995434};
var map;
var infowindow = [];
var markers = [];
var i = 1;

function initMap() {
       
  map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: home
  });
  loadingData();
}

function loadingData(){
  d3.json("data.json", function(error, data) {
    if (error) throw error;

      data.forEach(function (d) {
        markers[i] = new google.maps.Marker({
          position: new google.maps.LatLng(d.lat, d.lng),
          title: d.hora,
          map: map,
          label: (i).toString(),   
        });

        infowindow[i] = new google.maps.InfoWindow({
          content: d.hora,
          position: markers[i].getPosition()
        });

        markers[i].addListener('click', function() {
          infowindow[Number(this.getLabel())].open(map, markers[i]);
        });

        i++;
      });
  });
}