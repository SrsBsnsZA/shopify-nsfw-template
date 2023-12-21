$(".block-languages").click(function(){
    if($(".language-selector").hasClass('active')){
      $(".language-selector").removeClass('active');
      $(".language-selector").hide();
    } else {
      $(".language-selector").addClass('active');
      $(".language-selector").show();
    }
});