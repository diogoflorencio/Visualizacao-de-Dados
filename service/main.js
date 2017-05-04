var home = {lat: -7.21746161, lng: -35.86995434};
var map;
var infowindow = [];
var markers = [];
var i = 1;

var dateInput = document.getElementById('dateInput');

function initMap() {     
  map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: home
  });
  setInputDate();
  loadingData();
}

function setInputDate(){
  posicaoInputDate(dateInput, map);
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(dateInput);
}

function posicaoInputDate(dateInput, map) {

        // Set CSS for the control border.
        var controlUI = document.getElementById('dateInput');
        controlUI.style.backgroundColor = '#fff';
        controlUI.style.border = '2px solid #fff';
        controlUI.style.borderRadius = '3px';
        controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
        controlUI.style.cursor = 'pointer';
        controlUI.style.marginBottom = '22px';
        controlUI.style.textAlign = 'center';
        controlUI.title = 'Click to recenter the map';
        dateInput.appendChild(controlUI);

        // Set CSS for the control interior.
        var controlText = document.getElementById('dateInput');
        controlText.style.color = 'rgb(25,25,25)';
        controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
        controlText.style.fontSize = '16px';
        controlText.style.lineHeight = '38px';
        controlText.style.paddingLeft = '5px';
        controlText.style.paddingRight = '5px';
        controlText.innerHTML = 'Center Map';
        controlUI.appendChild(controlText);
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