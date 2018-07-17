$(()=>{

  const $button = $('.btn');
  $button.on('click', function(){
    var index = $button.index(this);
    $(this).attr('id','buttonClick');
    setTimeout(function(){
      $button.removeAttr('id');
    },100);
  });

})
