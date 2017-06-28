var userName = '';
var userEmail = '';
var lastPage = 'landingPage';

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
    $('#backButtonCheckout').click(previousPageFromCheckout);
    $('.backButton').click(backToLandingPage);
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
        url: "https://api.nxtdoorchef.com/api/email/confirmation",
        success: function(response){
            console.log(response);
        }
    });
}

function previousPageFromCheckout(){
    $('#orderOf_container').empty();
    if(lastPage === 'landingPage'){
        $('#checkout').hide();
        $('#landingPage').show();
    }else{
        $('#checkout').hide();
        $('#chefProfile').show();
    }
}

function backToLandingPage(){
    lastPage = 'landingPage';
    $('#chefProfile').hide();
    $('#landingPage').show();
    clearChefProfile();
}

function clearChefProfile(){
    $('#chefProfilePics').empty();
    $('#chefProfileChef').empty();
    $('#chefProfileMenu').empty();
    $('#chefProfileLocation').empty();
}
