export default function() {
  
  // decode E-Mail  
  $('a.email').each(function(){
    //console.log('hallo', atob( $(this).attr('href') ));
    $(this).attr('href', atob( $(this).attr('href')));
  });

}
