$(document).ready(function(){
    // $('#food_listing').on('load', getFoodData());
    $('div').on('click', '.food_item', function(){
        menuModal(this);
    });
});


function displayFood() {
    $('#food_listing').empty();
    for (var i = 0; i < chefs.length; i++) {
        // available_meals = chefs[i].menu.data[0];
        available_meals = chefs;

        var dish_card = $('<div>').addClass('food_item');
        var dish_caption = $('<div>').addClass('food_caption');
        var dish_photo = $('<img>').attr("src", chefs[i].menu.data[0].photo);
        var dish_name = $('<h4>').addClass('food_name').text(chefs[i].menu.data[0].item_name);
        var cost = $('<div>').addClass('food_cost').text(chefs[i].menu.data[0].price);

        dish_caption.append(dish_name, cost);
        dish_card.append(dish_photo, dish_caption);
        dish_card.attr('id', chefs[i].menu.data[0].id);
        $('#food_listing').append(dish_card);
    }
}
