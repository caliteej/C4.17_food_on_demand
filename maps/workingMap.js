$(document).ready(function(){
    initMap();
    // $('.submit').click(initMap);
});

function initMap(){
    // map = new google.maps.Map(document.getElementById('map'), {
    //     center: {lat: 34.052235, lng: -118.243683},
    //     zoom: 10
    // });
    // infoWindow = new google.maps.InfoWindow;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            map = new google.maps.Map(document.getElementById('map'), {
                center: {lat: 34.052235, lng: -118.243683},
                zoom: 10
            });
            infoWindow = new google.maps.InfoWindow;

            infoWindow.setPosition(pos);
            infoWindow.setContent('Your Location.');
            infoWindow.open(map);
            map.setCenter(pos);
            $.ajax({
                dataType: "json",
                url: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}`,
                method: 'get',
                success: function(response){
                    data = response;
                    $.ajax({
                        dataType: "json",
                        url: `http://localhost:3000/api/chef/city/${data.results[0].address_components[3].long_name}`,
                        method: 'get',
                        success: function(response){
                            data = response;
                            console.log(data);
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
                    });
                }
            });
        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        handleLocationError(false, infoWindow, map.getCenter());
    }

    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
            'Error: The Geolocation service failed.' :
            'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
    }
}