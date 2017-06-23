var userName = '';
var userEmail = '';
// $(document).ready(function displayMealInfo() {
//         console.log('function works');
//
//         $.ajax({
//             url: "../dummy_data/chefData_paul.json",
//             method: 'GET',
//             dataType: "JSON",
//             success: function (response) {
//                 console.log(response);
//                 let meal_name = $('<div>').text('Meal name: ' + response.menu.data[0].item_name);
//                 let meal_photo = $('<img>').attr("src", response.menu.data[0].photo);
//                 let meal_price = $('<div>').text('Meal price: ' + response.menu.data[0].price);
//                 $('#orderOf_container').append(meal_name, meal_photo, meal_price);
//             }
//         });
//     }
// );

//Confirmation modal and calls sendEmail function
$(document).ready(function() {
    $('#confirmButton').click(function (){
        userName = $("#userName").val();
        userEmail = $("#userEmail").val();
        console.log('user name is: ', userName);
        console.log('user email is: ', userEmail);
        $('#confirmModal').modal("show");
        sendEmailConfirmation(userName, userEmail)
    });
});

//Gather order data from order object and send it via ajax network call to the backend, specifically to nodemailer module.
function sendEmailConfirmation(userName, userEmail) {
    $("#userName").val('');
    $("#userEmail").val('');
    $.ajax({
        dataType:'JSON',
        data: {
            email: userEmail,
            user: userName,
            purchase_photo: current_meal.photo,
            purchase_price: current_meal.price,
            purchase_name: current_meal.item_name
        },
        method: 'POST',
        url: "http://api.nxtdoorchef.com/api/email/confirmation",
        success: function(response){
            console.log(response);
        }
    });
}

// function checkoutConfirm(final_meal){
//     checkoutConfirm(final_meal);
//         console.log(final_meal)
// }

// $(document).ready(function displayMealInfo() {
//         console.log('function works');
//
//         $.ajax({
//             url: "../dummy_data/chefData_paul.json",
//             method: 'GET',
//             dataType: "JSON",
//             success: function (response) {
//                 console.log(response);
//                 var meal_name = $('<div>').text('Meal name: ' + response.menu.data[0].item_name);
//                 var meal_photo = $('<img>').attr("src", response.menu.data[0].photo);
//                 var meal_price = $('<div>').text('Meal price: ' + response.menu.data[0].price);
//                 $('#orderOf_container').append(meal_name, meal_photo, meal_price);
//             }
//         });
//     }
// );