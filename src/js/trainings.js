export default function() {
  
  if($('.filterlist').length) {


    $('.btn-filter:not(.btn-reset)').click(function() {

      if(!$(this).hasClass('active')){
           $(this).toggleClass('active').siblings().removeClass('active');
            var selected = $('.btn-filter.active').attr('data-filter');
          console.log(selected)
            $('.box-training:not(.'+selected+')').removeClass('d-block').addClass('d-none');
            
            $('.box-training.'+selected+'').addClass('d-block').removeClass('d-none'); //.stop().fadeIn();

         

            if(selected === 'project') {
              var noHashURL = window.location.href.replace(/#.*$/, '');
              window.history.replaceState('', document.title, noHashURL);
            }else {
              location.hash = selected;

            }
          
            //trigger lazy load
          window.dispatchEvent(new Event('resize'));
          $(window).trigger('resize');
      
        } else {
           $('.box-training').addClass('d-block').removeClass('d-none');
    $('.btn-filter.active').removeClass('active');
    var noHashURL = window.location.href.replace(/#.*$/, '');
    window.history.replaceState('', document.title, noHashURL);
      }
   });
   
   //activate filter on pageload with hash
   if(location.hash) {
    $('.btn-filter[data-filter="'+location.hash.split('#')[1]+'"]').trigger('click');
   }

   $('.btn-reset').click(function() {
    $('.box-training').addClass('d-block').removeClass('d-none');
    $('.btn-filter.active').removeClass('active');
    var noHashURL = window.location.href.replace(/#.*$/, '');
    window.history.replaceState('', document.title, noHashURL);
  });

  }

  //enable SVGs in popuver
  $('.person-info').popover({sanitize:false});
  //$('.firmen-info').popover({fallbackPlacements:'top'});
}