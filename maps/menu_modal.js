var current_meal = null;

function menuModal(meal){
    current_meal = meal;
    console.log(meal);
    $('.modal-title').text(meal.item_name);
    var meal_div = $('<div>',{
        class: 'meal-modal col-xs-10'
    });

    var meal_img = $('<img>',{
        src: meal.photo,
        height: '250px',
        width: '250px',
        class: 'col-xs-8'
    });
    var meal_description = $('<h4>',{
        text: 'Description'
    });
    var meal_description_info = $('<p>',{
        text: meal.description
    });
    var meal_cost = $('<h4>',{
        text: 'Cost'
    });
    var meal_cost_info = $('<p>',{
        text: '$ ' + meal.price
    });

    $(meal_div).append(meal_img, meal_description, meal_description_info, meal_cost, meal_cost_info);
    $('.menu-modal').empty().append(meal_div);
    $('#single_menu_item_modal').modal('show');
}

function ajaxCall() {
    $.ajax({
        method : 'get',
        dataType : 'json',
        data : {
            "id": 1,
            "name": "Ronald Reagan",
        },
        url : '../dummy_data/chefData.json',
        success: function (response){
            menu_item = response.menu.data[0];
            console.log(response);
            menuModal(menu_item);
        },
        error: function (response){
            console.log(response);
        }
    })
}

function placeOrder(){
    console.log('Order Placed', current_meal);
}