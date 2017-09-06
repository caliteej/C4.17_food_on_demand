

// Google Map popover demo

$(document).ready(function(){
    $('[data-toggle="popover"]').popover();
});

// $("[data-toggle=popover]")
//     .popover({html:true});



// $(document).ready(function(){
//     $('#map_chef_9').popover({
//         title: "Header",
//         content: "Blabla",
//         container: 'body',
//         delay: {
//             show: 500,
//             hide: 100
//         }
//     });
// });

// $('.modal').on('hidden.bs.modal', function (e) {
//     if($('.modal').hasClass('in')) {
//         $('body').addClass('modal-open');
//     }
// });

// $('.modal')
//     .on('shown', function(){
//         console.log('show');
//         $('body').css({overflow: 'hidden'});
//     })
//     .on('hidden', function(){
//         $('body').css({overflow: ''});
//     });


// $('.modal').on("hidden.bs.modal", function (e) {
//     if($('.modal:visible').length)
//     {
//         $('.modal-backdrop').first().css('z-index', parseInt($('.modal:visible').last().css('z-index')) - 10);
//         $('body').addClass('modal-open');
//     }
// }).on("show.bs.modal", function (e) {
//     if($('.modal:visible').length)
//     {
//         $('.modal-backdrop.in').first().css('z-index', parseInt($('.modal:visible').last().css('z-index')) + 10);
//         $(this).css('z-index', parseInt($('.modal-backdrop.in').first().css('z-index')) + 10);
//     }
// });
//
// $("#modal_cooking_1").modal().on('hidden.bs.modal', function (e) {
//     $("body").addClass("modal-open");
// });







