

$(document).ready(function() {

});

function checkoutUserFoodOptions (){
    var userFoodOptions = {
        url:'dummy_checkout.json',
        success: handleCheckoutSuccess,
        error: handleCheckoutError,
        dataType: 'json',
        method: 'get',
        crossdomain: true
    };

    /********** display food item and price, chef name and bio ************/

    function handleCheckoutSuccess(foodCheckout){
        console.log('success displaying food checkout', foodCheckout);
        var item = foodCheckout[i].food_image;
        var quantity = foodCheckout[i].food_detail;
        var unitPrice = foodCheckout[i].food_cost;
        var subtotal = foodCheckout[i].food_cost;

        // append item, quantity, unit price, subtotal /*<div class="item">Whole Roast Boar</div><div class="quantity">5</div><div class="unitPrice">2</div><div class="subTotal">10</div>*/
        // append item, quantity, unit price, subtotal /*<div class="item">Stargazy Pie</div><div class="quantity">7</div><div class="unitPrice">5</div><div class="subTotal">35</div>*/
        // append item, quantity, unit price, subtotal /*<div class="item">Toffee Apples</div><div class="quantity">5</div><div class="unitPrice">1</div><div class="subTotal">5</div>*/

        // append chef name /*<div class="chefName">Arthur Pendragon</div>*/
        // append chef bio /*<div>Legendary British King, One of the Nine Worthies, wielder of Excalibur, and destroyer of Saxons. Big fan of Bradley James' work. I specialize in cooking wild game.</div>*/

    }

    function handleCheckoutError(){
        console.log('Error displaying meals for this chef');
    }

    $.ajax(chefFoodOptions);
}

function displayFoodOption (foodImage, foodDetail, foodCost) {
    getChefFoodOptions();


}
