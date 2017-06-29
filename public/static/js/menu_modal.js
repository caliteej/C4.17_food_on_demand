var current_meal = null;
var current_chef = null;

var available_meals = [];

function menuModal(meal){
    var img_id = meal.id;

    for(var i = 0; i < available_meals.length; i++){
        for(var e = 0; e < available_meals[i].menu.data.length; e++){
            if(available_meals[i].menu.data[e].id == img_id){
                current_meal = available_meals[i].menu.data[e];
                current_chef = available_meals[i].chef;
                break;
            }
        }
    }

    $('.modal-title').text(current_meal.item_name);
    var meal_div = $('<div>',{
        class: 'meal-modal col-xs-10'
    });

    var meal_img = $('<img>',{
        src: current_meal.photo,
        height: '175px',
        width: '275px',
        class: 'col-xs-8'
    });
    var meal_description = $('<h4>',{
        text: 'Description'
    });
    var meal_description_info = $('<p>',{
        text: current_meal.description
    });
    var meal_cost = $('<h4>',{
        text: 'Cost'
    });
    var meal_cost_info = $('<p>',{
        text: '$ ' + current_meal.price
    });

    $(meal_div).append(meal_img, meal_description, meal_description_info, meal_cost, meal_cost_info);
    $('.menu-modal').empty().append(meal_div);
    $('#single_menu_item_modal').modal('show');
}

function placeOrder(){
    console.log('Order Placed', current_meal);
    $('#landingPage').hide();
    $('#checkout').show();
    var itemsOrdered = $('<h3>', {
        text: 'Item(s):'
    });
    var mealName = $('<h4>',{
        text: current_meal.item_name
    });
    var mealPhoto = $('<img>', {
        src: current_meal.photo,
        height: '100px',
        width: '150px',
        margin: '0'
    });
    var mealDescription = $('<p>',{
        text: current_meal.description
    });
    var mealCost = $('<h4>',{
        text: "$ " + current_meal.price
    });
    var chefInformation = $('<h3>', {
        text: 'Chef/Pickup Information:'
    });
    var chefName = $('<p>',{
        text: current_chef.firstName + " " + current_chef.lastName
    });
    var chefAddress = $('<p>',{
        text: current_chef.address
    });
    $('#orderOf_container').append(itemsOrdered, mealName, mealPhoto, mealDescription, mealCost);
    $('#pickupInfo_container').append(chefInformation, chefName, chefAddress);
    $('.backToHome').hide();
}

