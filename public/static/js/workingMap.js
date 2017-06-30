

$(document).ready(function(){
    $('#checkout').hide();
    $('#chefProfile').hide();
    initMap();
    $('#icon-search').click(doSearch);
    $('.searchAll').click(getAllChefs);
    $('div').on('click', '.food_item', function(){
        menuModal(this);
    });
    $( ".foodInput" ).keydown(function(event) {
        enterKeySearch(event.which);
    });
    setTimeout(function(){
        $('#whole-navbar').css('opacity', 1);
        $('#landingPage').css('opacity', 1);
        $('body').css('background-image', 'none');
    }, 4000);
});
var map, infoWindow, chefs = [], currentLocation, theChef;
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
        alert('Allow location access');
    }
}
/**
 * This function gets the name of a city given the latitude and longitude.
 */
function reverseGeocoding(position){
    $.ajax({
        dataType: "json",
        url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + position.coords.latitude + ',' + position.coords.longitude,
        method: 'get',
        success: function(response){
            data = response;
            currentLocation = data.results[0].address_components[3].long_name;
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
        url: 'https://api.nxtdoorchef.com/api/chef/city/' + data.results[0].address_components[3].long_name,
        method: 'get',
        success: function(response){
            data = response;
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
            url: 'https://api.nxtdoorchef.com/api/menu/id/' + item.id,
            method: 'get',
            success: function(response){
                menu = response;
                chefs.push({chef: item, menu: menu});
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
            id: i,
            icon: "assets/fork_n_knife_orange.png"
        });
        markers.push(marker);
        bounds.extend(marker.position);
        marker.addListener("click", function(){
            populateInfoWindow(this, largeInfowindow);
            $('.theChefBox').empty();
            displayChef(this);
        });
    }
    map.fitBounds(bounds);
    var listener = google.maps.event.addListener(map, "idle", function() {
        if (map.getZoom() > 13){
            map.setZoom(13);
            google.maps.event.removeListener(listener);
        }
    });
    setTimeout(displayFood, 700);
}
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
function displayChef(marker){
    console.log(marker);
    for(var i = 0; i < chefs.length; i++){
        if(chefs[i].chef.alias === marker.title){
            theChef = chefs[i];
            break;
        }
    }
    var jumbotron = $('<div>', {
        class: 'jumbotron'
    });
    var theChefKitchen = $('<h2>',{
        text: theChef.chef.alias
    });
    var theChefBio = $('<p>', {
        text: theChef.chef.bio
    });
    var theChefName = $('<h3>',{
        text: 'Chef ' + theChef.chef.firstName + ' ' + theChef.chef.lastName
    });
    var theChefPicture = $('<img>',{
        src: theChef.chef.portrait,
        class: 'the_chef_picture'
    });
    var icon = $('<button>', {
        class: 'fullMenuButton btn',
        text: 'Chef Menu'
    }).click(showChef);
    jumbotron.append(theChefKitchen, theChefName, theChefPicture, theChefBio, icon);
    $('.theChefBox').append(jumbotron);
    $('.mobileChefProfile').append(jumbotron);
    displayFood(theChef);
}
/**
 * This function makes a call to our database requesting chefs based on location by city.
 * Same as getChefsFromDataBase but it uses the input value rather than users current location.
 * @param location
 */
function getChefByCityInput(location){
    $.ajax({
        dataType: "json",
        url: 'https://api.nxtdoorchef.com/api/chef/city/' + location,
        method: 'get',
        success: function(response){
            data = response;
            getMenu();
            populateChefs();
        }
    });
}
/**
 * This function makes a call to our database requesting chefs based on location by city.
 * Same as getChefsFromDataBase but it uses the input value rather than users current location.
 * @param location
 */
function getAllChefs(){
    resetMapAndData();
    $.ajax({
        dataType: "json",
        url: 'https://api.nxtdoorchef.com/api/chef',
        method: 'get',
        success: function(response){
            data = response;
            getMenu();
            populateChefs();
        }
    });
}
/**
 * This function makes a call to our database requesting menus based on location by food type.
 * @param location
 * @param foodtype
 */
function searchMenuByFood(food){
    $.ajax({
        dataType: "json",
        url: 'https://api.nxtdoorchef.com/api/menu/search/' + food,
        method: 'get',
        success: function(response){
            data = response;
            console.log(data);
            getMenu();
            populateChefs();
        }
    });
}
// function getChefByKitchen(kitchen){
//     $.ajax({
//         dataType: "json",
//         url: 'http://api.nxtdoorchef.com/api/chef/city-foodtype/' + location + '/' + foodtype,
//         method: 'get',
//         success: function(response){
//             data = response;
//             getMenu();
//             populateChefs();
//         }
//     });
// }


// function showChef(){
//     console.log('showing chef');
//     $('#landingPage').hide();
//     $('#chefProfile').show();
//     hideRightNav();
// }

function resetMapAndData(){
    chefs = [];
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13
    });
}
/**
 * Queries the database based on the input fields.
 */
function doSearch(){
    var food = $('.foodInput').val();
    // var city = $('.locationInput').val();
    // if(city === "" && food === ""){
    //     console.log('maybe make a user page');
    //     resetMapAndData();
    //     getAllChefs();
    if(food !== ""){

        resetMapAndData();
        searchMenuByFood(food);
        $('.foodInput').val('');
        // }else if(food === "" && city !== ""){
        //     resetMapAndData();
        //     getChefByCityInput(city);
        //     $('.locationInput').val('');
        // }else if(food !== "" && city !== ""){
        //     resetMapAndData();
        //     getChefByCityAndFood(city, food);
        //     $('.locationInput').val('');
        //     $('.foodInput').val('');
    }else{
        $('.foodInput').attr('placeholder','Please enter a type of cuisine');
        return;
    }
}
$(window).scroll(function(){
    var nav = $('#chefProfileMenu');
    var width = $('#chefProfileMenu').parent().width();
    var isPositionFixed = (nav.css('position') === 'fixed');
    if ($(this).scrollTop() > 430 && !isPositionFixed){
        $('#chefProfileMenu').css({'position': 'fixed', 'top': '0px', 'width': width});
    }
    if ($(this).scrollTop() < 430 && isPositionFixed){
        $('#chefProfileMenu').css({'position': 'static', 'top': '0px'});
    }
});
function backToHome(){
    $('.backToHome').hide();
    $('.right-nav').show();
}


function enterKeySearch(key){
    if(key == 13) {
        doSearch();
    }
}
