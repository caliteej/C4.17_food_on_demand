$(document).ready(function(){
    // $('#food_listing').on('load', getFoodData());
    $('div').on('click', '.food_item', function(){
        menuModal(this);
    });
});


function displayFood(selected_chef = null) {
    if(selected_chef==null) {

        $('#food_listing').empty();
        for (var i = 0; i < chefs.length; i++) {
            // available_meals = chefs[i].menu.data[0];
            available_meals = chefs;
            for (var e = 0; e < chefs[i].menu.data.length; e++) {
                var dish_card = $('<div>').addClass('food_item');
                var dish_caption = $('<div>').addClass('food_caption');
                var dish_photo = $('<img>').attr("src", chefs[i].menu.data[e].photo);
                var dish_name = $('<h4>').addClass('food_name').text(chefs[i].menu.data[e].item_name);


                dish_caption.append(dish_name);
                dish_card.append(dish_photo, dish_caption);
                dish_card.attr('id', chefs[i].menu.data[e].id);
                $('#food_listing').append(dish_card);
            }
        }
    }else{
        $('#food_listing').empty();
        //console.log('this is the chosen one:', selected_chef);
        for (var e = 0; e < selected_chef.menu.data.length; e++) {
            var dish_card = $('<div>').addClass('food_item');
            var dish_caption = $('<div>').addClass('food_caption');
            var dish_photo = $('<img>').attr("src", selected_chef.menu.data[e].photo);
            var dish_name = $('<h4>').addClass('food_name').text(selected_chef.menu.data[e].item_name);

            dish_caption.append(dish_name);
            dish_card.append(dish_photo, dish_caption);
            dish_card.attr('id', selected_chef.menu.data[e].id);
            $('#food_listing').append(dish_card);
        }
    }
}



