function showChef(){
    $('#landingPage').hide(200);
    $('#chefProfile').show(200);
    createMenu();
    createChefStory();
    createLocation();
    createPics();
}

function createMenu(){
    $('#chefProfileMenu').append($('<h1 style="padding-top: 40px;">Menu</h1>'));
    var container = $('<div class="list-group">');
    theChef.menu.data.forEach(function(item){
        var icon = $('<div>', {
            class: 'glyphicon glyphicon-plus-sign pull-right'
        }).click(orderItem);
        var groupContainer = $(`<a class="list-group-item"></a>`);
        var heading = $(`<h4 class="list-group-item-heading">${item.item_name}</h4>`).append(icon);
        var description = $(`<p class="list-group-item-text">${item.description} - $${item.price}</p>`);
        groupContainer.append(heading, description);
        container.append(groupContainer);
        $('#chefProfileMenu').append(container);
    });
}

function createChefStory(){
    var chef = $('<h1 style="padding-top: 40px;">The Chef</h1>');
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

/**
 * Dynamically creates the location section of the chef profile page which includes a map.
 */
function createLocation(){
    var location = $('<h1 style="padding-top: 40px;">Location</h1>');
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
/**
 * Dynamically creates a bootstrap carousel for the pictures on the chef profile page.
 */
function createPics(){
    var food = theChef.menu.data;
    $('#chefProfilePics').append($('<div id="chefCarousel" class="carousel slide" data-ride="carousel"></div>'));
    $('#chefCarousel').append($('<ol class="carousel-indicators"></ol>'));
    $('#chefCarousel').append($('<div class="carousel-inner" role="listbox"></div>'));

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

function orderItem(){
    var element = $(this).closest('h4').text();
    var menu = theChef.menu.data;
    lastPage = 'profilePage';
    $('#chefProfile').hide();
    for(var i = 0; i < menu.length; i++){
        if(menu[i].item_name === element){
            current_meal = menu[i];
            placeOrder();
        }
    }
}