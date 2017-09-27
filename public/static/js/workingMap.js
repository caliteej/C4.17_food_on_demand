$(document).ready(function(){
    handleHistoryChange();
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
    // window.onbeforeunload = function(){
    //     alert("unload detected")
    // }; 
    window.onpopstate = handleHistoryChange;
});
var map, infoWindow, chefs = [], currentLocation, theChef;
/**
 * Creates a map using Irvine as the default location.
 */
function initMap(){
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 33.6305423, lng: -117.7432015},
        zoom: 13
    });
    getChefsFromDataBase([getMenu,populateChefs]);
    // if (navigator.geolocation) {
    //     navigator.geolocation.getCurrentPosition(function(position) {
    //         var pos = {
    //             lat: 33.6349741,
    //             lng: -117.7403854
    //         };
    //         map = new google.maps.Map(document.getElementById('map'), {
    //             center: {lat: pos.lat, lng: pos.lng},
    //             zoom: 13
    //         });
    //         infoWindow = new google.maps.InfoWindow;
    //         infoWindow.setPosition(pos);
    //         infoWindow.setContent('Your Location.');
    //         infoWindow.open(map);
    //         map.setCenter(pos);
    //         reverseGeocoding(position);
    //     }, function() {
    //         // handleLocationError(true, infoWindow, map.getCenter());
    //         console.log('Something went wrong');
    //     });
    // } else {
    //     // handleLocationError(false, infoWindow, map.getCenter());
    //     alert('Allow location access');
    // }

}
/**
 * This function gets the name of a city given the latitude and longitude.
 */
function reverseGeocoding(position){
    $.ajax({
        dataType: "json",
        url: 'https://nxtdoorchef.com/api/geocode/json?latlng=' + position.coords.latitude + ',' + position.coords.longitude,
        method: 'get',
        success: function(response){
            data = response;
            currentLocation = data.results[0].address_components[3].long_name;
            getChefsFromDataBase([getMenu,populateChefs]);
        },
        error: (response)=>{
            console.log("Could not achieve GeoCoding.", response);
        }
    });
}
/**
 * This function makes a call to our database requesting chefs based on location by city.
 */
function getChefsFromDataBase(additionalCallbacks){
    $.ajax({
        dataType: "json",
        url: 'https://nxtdoorchef.com/api/chef/city/Irvine' /*+ data.results[0].address_components[3].long_name*/,
        method: 'get',
        success: function(response){
            data = response;
            additionalCallbacks.forEach(function(callBack){
                callBack.call(null);
            })
        },
        error: (response)=>{
            console.log("There was a problem getting chef's from the database.", response);
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
            url: 'https://nxtdoorchef.com/api/menu/id/' + item.id,
            method: 'get',
            success: function(response){
                menu = response;
                chefs.push({chef: item, menu: menu});
            },
            error: (response)=>{
                console.log("there was a problem getting the menu from the database", response);
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
            displayChefMobile(this);
        });
    }
    map.fitBounds(bounds);
    var listener = google.maps.event.addListener(map, "idle", function() {
        $('#whole-navbar').css('opacity', 1);
        $('#landingPage').css('opacity', 1);
        $('body').css('background-image', 'none');
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
    $('.theChefBox').val();
    for(var i = 0; i < chefs.length; i++){
        if(chefs[i].chef.alias === marker.title){
            theChef = chefs[i];
            break;
        }
    }
    var jumbotron = $('<div>', {
        class: 'jumbotron text-center'
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
        src: "./assets/default_chef.png",
        class: 'the_chef_picture'
    }).click(function(){
        changeHistory(theChef.chef.alias, "#who");
        showChef();
    }).css("cursor", "pointer");
    jumbotron.append(theChefKitchen, theChefPicture, theChefName);
    $('.theChefBox').append(jumbotron);
    displayFood(theChef);
}

function landing_order(){
    changeHistory(current_meal.item_name, "#what");
    placeOrder();
}

function displayChefMobile(marker){
    $('.mobileChefProfile').empty();
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
        src: "./assets/default_chef.png",
        class: 'the_chef_picture'
    }).click(function(){
        changeHistory(theChef.chef.alias, "#who");
        showChef;
    }).css("cursor", "pointer");
    jumbotron.append(theChefKitchen, theChefPicture, theChefName);
    $('.mobileChefProfile').append(jumbotron);
}

function displayStory(){
    for(var i = 0; i < 2; i++){
        var jumbotron = $('<div>', {
            class: 'jumbotron'
        });
        var slogan = $('<h2>',{
            text: 'A Taste of Home'
        });
        var story = $('<p>', {
            text: "Looking for a ride, open up Uber. Need a vacation rental, hop on Airbnb. Hungry...there's a nxtDoorChef for that!"
        });
        var firstPara = $('<p>', {
            text: "Simply enter the type of food you'd like to eat in the search bar, see who's cooking around you, pick the food that's gonna satisfy your craving, and order."
        });
        var secondPara = $('<p>', {
            text: "So don't wait.  Take a trip to your city's largest neighborhood eatery today."
        });
        var thirdPara = $('<p>', {
            text: "And the best part is...it's just right next door!"
        });
        jumbotron.append(slogan, story, firstPara, secondPara, thirdPara);
        if(i === 0){
            $('.theChefBox').append(jumbotron);
        }else{
            $('.mobileChefProfile').append(jumbotron);
        }
    }
}

/**
 * This function makes a call to our database requesting chefs based on location by city.
 * Same as getChefsFromDataBase but it uses the input value rather than users current location.
 * @param location
 */
function getChefByCityInput(location){
    $.ajax({
        dataType: "json",
        url: 'https://nxtdoorchef.com/api/chef/city/' + location,
        method: 'get',
        success: function(response){
            data = response;
            getMenu();
            populateChefs();
        },
        error: function(response){
            console.log("Could not retrieve the chefs by their city.", response);
        }
    });
}
/**
 * This function makes a call to our database requesting chefs based on location by city.
 * Same as getChefsFromDataBase but it uses the input value rather than users current location.
 * @param location
 */
function getAllChefs(){
    $('.theChefBox').empty();
    $('.mobileChefProfile').empty();
    resetMapAndData();
    displayStory();
    $.ajax({
        dataType: "json",
        url: 'https://nxtdoorchef.com/api/chef',
        method: 'get',
        success: function(response){
            data = response;
            getMenu();
            populateChefs();
        },
        error: function(response){
            console.log("Could not get all chefs from the database.", response);
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
        url: '/api/menu/search/' + food,
        method: 'get',
        success: function(response){
            data = response;
            getMenu();
            populateChefs();
        },
        error: function(response){
            console.log("Could not get all menus by the desired item.", response);
        }
    });
};

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
    if(food !== ""){
        resetMapAndData();
        searchMenuByFood(food);
        $('.foodInput').val('');
    }else{
        $('.foodInput').attr('placeholder','Please enter a type of cuisine');
        return;
    };
};

function enterKeySearch(key){
    if(key == 13) {
        doSearch();
    }
};

function changeHistory(data, route){
    history.pushState( null, null, route + "/" + data);
};

function navigateHome(){
    history.pushState(null, null, " ");
}

function content_clear(){
    $("#checkout").hide();
    $("#chefProfile").hide();
    clearChefProfile();
};

function searchForItemByName(name){
    $.ajax({
        dataType: "json",
        url: "https://nxtdoorchef.com/api/menu/item/" + name,
        method: "get",
        success: (res)=>{
            const chefs = data.data;
            for(var i=0; i<chefs.length;i++){
                if(chefs[i].id===res.data[0].chef_id){
                    current_meal = res.data[0]
                    current_chef = chefs[i];
                }
            }
            placeOrder();
        },
        error: (res)=>{
            console.log("Could not find the item based on the supplied name.", res);
        }
    })
}

function handleHistoryChange(){
    console.log("A change in history has occurred.");
    let url = window.location.href;
    let poundLocation = url.lastIndexOf("#");
    let lastSlashLocation =  url.lastIndexOf("/")
    let path = url.substr(poundLocation+1, lastSlashLocation - poundLocation-1);

    switch(path){
        case "who":
        let chefName = url.slice(lastSlashLocation+1);
        getChefsFromDataBase([content_clear,getMenuOfChefByAlias.bind(null,chefName)]);
        break;

        case "http://localhost/C4.17_food_on_demand/public":
        content_clear();
        backToLandingPage();
        break;

        case "what":
        let itemName = url.slice(lastSlashLocation+1);
        getChefsFromDataBase([content_clear, searchForItemByName.bind(null, itemName)]);        
        break;

        default:
        console.log("there is no way to handle this route.");
        break;
    };
};