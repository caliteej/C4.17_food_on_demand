function showChef(){
    $('#landingPage').hide(200);
    $('#chefProfile').show(200);
    createMenu();
    createChefStory();
    createLocation();
    createPics();
}

function createMenu(){
    $('#chefProfileMenu').append($('<h1>', {
        text: 'Menu'
    }));
    theChef.menu.data.forEach(function(item){
        var menuItem = $('<p>', {
            html: '<strong>' + item.item_name + '</strong>' + " - " + item.description + " | $" + item.price + " " + '<span class="glyphicon glyphicon-plus-sign"></span>'
        });
        $('#chefProfileMenu').append(menuItem);
    });
}

function createChefStory(){
    var chef = $('<h1>', {
        text: 'The Chef'
    });
    var chefStory = $('<h4>', {
        text: 'Story'
    });
    var chefBio = $('<p>', {
        text: theChef.chef.bio
    });
    var chefHours = $('<h4>', {
        text: 'Hours'
    });
    $('#chefProfileChef').append(chef, chefStory, chefBio, chefHours);
}

function createLocation(){
    var location = $('<h1>', {
        text: 'Location'
    });
    var chefAddress = $('<p>', {
        text: theChef.chef.address
    });
    var chefMap = $('<div>', {
        id: 'mapTwo'
    });
    $('#chefProfileLocation').append(location, chefAddress, chefMap);
    map = new google.maps.Map(document.getElementById('mapTwo'), {
        zoom: 13
    });
    var locations = [];
    var markers = [];
    locations.push({title: theChef.chef.alias, location: {lat: theChef.chef.lat, lng: theChef.chef.lng}});
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
    var listener = google.maps.event.addListener(map, "idle", function() {
        if (map.getZoom() > 13){
            map.setZoom(13);
            google.maps.event.removeListener(listener);
        }
    });
}

{/*<div class="carousel-inner" role="listbox">*/}

function createPics(){
    var food = theChef.menu.data;
    $('#chefProfilePics').append($('<div id="chefCarousel" class="carousel slide" data-ride="carousel"></div>'));

    $('<ol>', {
        class: 'carousel-indicators'
    }).appendTo('#chefCarousel');
    $('<div>', {
        class: 'carousel-inner',
        role: 'listbox'
    }).appendTo('#chefCarousel');

    var leftControl = $('<a class="left carousel-control" href="#chefCarousel" role="button" data-slide="prev"></a>');
    var leftArrow = $('<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>');
    var previous = $('<span class="sr-only">Previous</span>');
    leftControl.append(leftArrow, previous);
    $('#chefCarousel').append(leftControl);

    var rightControl = $('<a class="right carousel-control" href="#chefCarousel" role="button" data-slide="next"></a>');
    var rightArrow = $('<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>');
    var next = $('<span class="sr-only">Next</span>');
    rightControl.append(rightArrow, next);
    $('#chefCarousel').append(rightControl);

    for(var i = 0; i < food.length; i++){
        $('<div class="item"><img src="'+food[i].photo+'"></div>').appendTo('.carousel-inner');
        $('<li data-target="#chefCarousel" data-slide-to="'+i+'"></li>').appendTo('.carousel-indicators');
        if(i === 0){
            $('.item').addClass('active');
            $('li').addClass('active');
        }
    }
}

