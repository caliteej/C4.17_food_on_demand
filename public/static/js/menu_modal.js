var current_meal = null;
var current_chef = null;

var available_meals = [];

function menuModal(meal){
    var img_id = meal.id;

    for(var i = 0; i < available_meals.length; i++){
        if(available_meals[i].menu.data[0].id == img_id){
            current_meal = available_meals[i].menu.data[0];
            current_chef = available_meals[i].chef;
            break;
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
    $('#landingPage').hide(200);
    $('#checkout').show(200);
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

    var chefName = $('<p>',{
        text: current_chef.firstName + " " + current_chef.lastName
    });

    var chefAddress = $('<p>',{
        text: current_chef.address
    });

    $('#orderOf_container').append(mealName, mealPhoto, mealDescription, mealCost);
    $('#pickupInfo_container').append(chefName, chefAddress);
}

