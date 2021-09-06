//PopUps
$(document).on('click', '[data-toggle="class"]', function (e) {
  e.stopPropagation();
  //console.log('CLICK EDIT');
  var $target = $($(this).data('target'));
  var classes = $(this).data('classes');
  $target.toggleClass(classes).toggleClass('show');
  $('body').toggleClass('overlay');
  return false;
});

//$(".switch__wrapper").click(function(e){
//  e.stopPropagation();
//  $(this).toggleClass('active');
//  if ($(this).find('.switch__input').is(':checked')) {
//    $(this).find('.switch__input').prop('checked', false);
//  }else{
//    $(this).find('.switch__input').prop('checked', true);
//  };
//});


// Switcher
$(".switch__input").click(function(e){
  e.stopPropagation();
  //console.log('click');
  $(this).parents('.switch__wrapper').toggleClass('active');
});


// Show notification on family switch track
$(".settings__row--notifications .block__title .switch__input").click(function(e){
  e.stopPropagation();
  //console.log('click');
  $(".sidebar__nav").find('.family').toggleClass('show-notification ');
});

//Show medicine menu 
$(".courses__add .medicine__timeAdoze .btn-menu").click(function(e){
  e.stopPropagation();
  //console.log('click');
  $(this).parents('.medicine__timeAdoze').toggleClass('show-menu');
});

$(".medicines__columns .card__menu .btn-menu").click(function(e){
  e.stopPropagation();
  //console.log('click');
  $(this).parents('.card').toggleClass('show-menu');
});
