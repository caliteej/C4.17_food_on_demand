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
        var icon = $(`<button class="buyButton btn pull-right" data-name="${item.item_name}">BUY</button>`).click(orderItem);
        var groupContainer = $(`<a class="list-group-item"></a>`);
        var heading = $(`<h4 class="list-group-item-heading">${item.item_name} | $${item.price}</h4>`).append(icon);
        var description = $(`<p class="list-group-item-text">${item.description}</p>`);
        groupContainer.append(heading, description);
        container.append(groupContainer);
        $('#chefProfileMenu').append(container);
    });
}

function createChefStory(){
    var chef = $('<h1 style="padding-top: 40px;">The Chef</h1>');

    var table = $('<table class="table table-bordered table-striped"><tr><th><span class="glyphicon glyphicon-home"></span></th><th><span class="glyphicon glyphicon-user"></span></th><th><span class="glyphicon glyphicon-time"></span></th><th><span class="glyphicon glyphicon-cutlery"></span></th></tr></table>');
    var tableData = $(`<tr></tr>`);
    var tableRestaurant = $(`<td>${theChef.chef.alias}</td>`);
    var tableName = $(`<td>${theChef.chef.firstName} ${theChef.chef.lastName}</td>`);
    var tableHours = $(`<td></td>`);
    var tableFoodType = $(`<td>${theChef.chef.foodType}</td>`);
    tableData.append(tableRestaurant, tableName, tableHours, tableFoodType);
    table.append(tableData);

    var chefStory = $('<h4>', {
        text: 'Story'
    });
    var chefBio = $('<p>', {
        text: theChef.chef.bio
    });
    $('#chefProfileChef').append(chef, table, chefStory, chefBio);
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
    data = {
        data: [theChef.chef]
    };
    populateChefs();
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
    var element = $(this).attr('data-name');
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