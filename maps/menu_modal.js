var current_meal = null;

var available_meals = [];

function menuModal(meal){
    var img_id = meal.id;

    for(var i = 0; i < available_meals.length; i++){
        if(available_meals[i].id == img_id){
            current_meal = available_meals[i];
        }
    }
    console.log(current_meal);

    $('.modal-title').text(current_meal.item_name);
    var meal_div = $('<div>',{
        class: 'meal-modal col-xs-10'
    });

    var meal_img = $('<img>',{
        src: current_meal.photo,
        height: '250px',
        width: '250px',
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
}