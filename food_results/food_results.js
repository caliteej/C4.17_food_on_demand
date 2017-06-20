
function getFoodData() {
    $.ajax({
        method: 'get',
        dataType: 'json',
        url: "../dummy_data/dummy_chef_data.json",
        success: function(result) {
            console.log('success', result);
            menu_item = response[i].menu[i];
            displayFood(menu_item);
        },

        error: function(result) {
            console.log(result);
        }
    })
}

function displayFood() {
    for(var i = 0; i < 6; i++) {

        var dish_name = meal[i].name;
        var cost = meal[i].credits;

        var food_item_div = $('<div>', {
            class: "col-sm-3"
        });

        var food_pic_div = $('<img>', {
            src: meal.photo
        });

        var food_info_div = $('<div>', {
            class: "dish_info"
        });

        var dish_name_div = $('<h2>', {
            class: "dish_name",
            text: meal.name
        });

        var cost_value_div = $('<p>', {
            class: "dish_cost",
            text: meal.credits
        });

        $(food_info_div).append(dish_name_div, cost_value_div);
        $(food_item_div).append(food_pic_div, food_info_div);
        $('body').append(food_item_div);
    }
}