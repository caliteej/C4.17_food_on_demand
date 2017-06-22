$(document).ready(function(){
    $('#food_listing').on('load', getFoodData());
    $('div').on('click', '.food_item', function(){
        menuModal(this)
    });
});
    function getFoodData() {
    $.ajax({
        method: 'get',
        dataType: 'json',
        url: "../dummy_data/chefData_paul.json",
        success: function displayFood(response) {
            for (var i = 0; i < response.menu.data.length; i++) {
                available_meals = response.menu.data;

                var dish_card = $('<div>').addClass('food_item');
                var dish_caption = $('<div>').addClass('food_caption');
                var dish_photo = $('<img>').attr("src", response.menu.data[i].photo);
                var dish_name = $('<h4>').addClass('food_name').text(response.menu.data[i].item_name);
                var cost = $('<div>').addClass('food_cost').text(response.menu.data[i].price);

                dish_caption.append(dish_name, cost);
                dish_card.append(dish_photo, dish_caption);
                dish_card.attr('id', response.menu.data[i].id);
                $('#food_listing').append(dish_card);
            }
        },

        error: function (response) {
            console.log(response);
        }
    })
};




