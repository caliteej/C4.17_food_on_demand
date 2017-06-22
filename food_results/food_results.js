$(document).ready(function(){
    $('#food_listing').on('load', getFoodData());
    $('div').on('click', '.food_item', function(){
        menuModal(this)
    });
});


function displayFood() {
    for (var i = 0; i < chefs[0].menu.data.length; i++) {
        available_meals = chefs[0].menu.data;

        var dish_card = $('<div>').addClass('food_item');
        var dish_caption = $('<div>').addClass('food_caption');
        var dish_photo = $('<img>').attr("src", chefs[0].menu.data[i].photo);
        var dish_name = $('<h4>').addClass('food_name').text(chefs[0].menu.data[i].item_name);
        var cost = $('<div>').addClass('food_cost').text(chefs[0].menu.data[i].price);

        dish_caption.append(dish_name, cost);
        dish_card.append(dish_photo, dish_caption);
        dish_card.attr('id', chefs[0].menu.data[i].id);
        $('#food_listing').append(dish_card);
    }
}
