var userName = '';
var userEmail = '';


$(document).ready(function displayMealInfo() {
        console.log('function works');

        $.ajax({
            url: './chefData_checkout.json',
            method: 'GET',
            dataType: "JSON",
            success: function (response) {
                console.log(response);
                var meal_name = $('<div>').text('Meal name: ' + response.menu.data[0].item_name);
                var meal_photo = $('<img>').attr("src", response.menu.data[0].photo);
                var meal_price = $('<div>').text('Meal price: ' + response.menu.data[0].price);
                $('#orderOf_container').append(meal_name, meal_photo, meal_price);
            }
        });
    }
)

//Confirmation modal and calls sendEmail function
$(document).ready(function() {
    $('button').click(function (){
        userName = $("#userName").val();
        userEmail = $("#userEmail").val();
        console.log('user name is: ', userName);
        console.log('user email is: ', userEmail);
        $('#confirmModal').modal("show");
        sendEmailConfirmation(userName, userEmail)
    });
});

//send email function
function sendEmailConfirmation(userName, userEmail) {
    console.log('user email is: ' + userEmail);
    console.log('user name is: ' + userName);
    userName = $("#userName").val('');
    userEmail = $("#userEmail").val('');


}