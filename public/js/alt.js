$(()=>{

  const $button = $('.btn');
  $button.on('click',()=>{
    $button.attr('id','buttonClick');
    setTimeout(function(){
      $button.removeAttr('id');
    },100);
  });
  
})
