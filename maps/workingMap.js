$(document).ready(function(){
    initMap();
    // $('.submit').click(initMap);
});

var map, infoWindow, chefs = [];

/**
 * Creates a map using the users current location.
 */
function initMap(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            map = new google.maps.Map(document.getElementById('map'), {
                center: {lat: pos.lat, lng: pos.lng},
                zoom: 13
            });
            infoWindow = new google.maps.InfoWindow;

            infoWindow.setPosition(pos);
            infoWindow.setContent('Your Location.');
            infoWindow.open(map);
            map.setCenter(pos);
            reverseGeocoding(position);
        }, function() {
            // handleLocationError(true, infoWindow, map.getCenter());
            console.log('Something went wrong');
        });
    } else {
        // handleLocationError(false, infoWindow, map.getCenter());
        console.log('Allow location access');
    }
}

/**
 * This function gets the name of a city given the latitude and longitude.
 */
function reverseGeocoding(position){
    $.ajax({
        dataType: "json",
        url: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}`,
        method: 'get',
        success: function(response){
            data = response;
            getChefsFromDataBase();
        }
    });
}

/**
 * This function makes a call to our database requesting chefs based on location by city.
 */
function getChefsFromDataBase(){
    $.ajax({
        dataType: "json",
        url: `http://localhost:3000/api/chef/city/${data.results[0].address_components[3].long_name}`,
        method: 'get',
        success: function(response){
            data = response;
            console.log(data);
            getMenu();
            populateChefs();
        }
    });
}

/**
 * This function will use the chef profile id and use it to retrieve their menu from the database.
 */
function getMenu(){
    data.data.forEach(function(item){
        $.ajax({
            dataType: "json",
            url: `http://localhost:3000/api/menu/id/${item.id}`,
            method: 'get',
            success: function(response){
                menu = response;
                console.log(data);
                chefs.push({chef: item, menu: menu});
                console.log(chefs);
            }
        });
    });
}

/**
 * This function will populate the map with chefs in the users current city.
 * It takes usese data returned from out database api call.
 */
function populateChefs(){
    var locations = [];
    var markers = [];
    data.data.forEach(function(item){
        locations.push({title: item.alias, location: {lat: item.lat, lng: item.lng}});
    });
    var largeInfowindow = new google.maps.InfoWindow();
    var bounds = new google.maps.LatLngBounds();
    for(var i = 0; i < locations.length; i++){
        var position = locations[i].location;
        var title = locations[i].title;
        var marker = new google.maps.Marker({
            map: map,
            position: position,
            title: title,
            id: i
        });
        markers.push(marker);
        bounds.extend(marker.position);
        marker.addListener("click", function(){
            populateInfoWindow(this, largeInfowindow);
        });
    }
    map.fitBounds(bounds);
    function populateInfoWindow(marker, infowindow){
        if(infowindow.marker != marker){
            infowindow.marker = marker;
            infowindow.setContent('<div>' + marker.title + '</div>');
            infowindow.open(map, marker);
            infowindow.addListener('closeclick', function(){
                infowindow.setMarker(null);
            });
        }
    }
}
