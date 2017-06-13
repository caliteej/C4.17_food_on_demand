$(document).ready(function() {

});

/**
 * postMealClicked - Event Handler when user clicks the cancel button, calls clearPostMealForm function.
 */
function postMealClicked() {
    postMealData();
}

/**
 * cancelClicked - Event Handler when user clicks the cancel button, calls clearPostMealForm function.
 */
function cancelClicked() {
    clearPostMealForm();
}

/**
 * clearPostMealForm - Clears Post Meal Form.
 */
function clearPostMealForm() {
    $('#dish').val('');
    $('#description').val('');
    $('#cost').val('100 Tokens');
}

/**
 * jQuery ajax call to post to database.
 */
function postMealData(){
    $.ajax({
        url: "",
        method: "POST",
        dataType: 'json',
        success: function() {
            console.log('success');
        },
        error: function() {
            console.log('failure');
        }
    })