export default function() {
  
  if($('.filterlist').length) {


      // helper function
      function containsAll(needles, haystack) {
        for (var i = 0, len = needles.length; i < len; i++) {
          if ($.inArray(needles[i], haystack) === -1) {
            return false;
          }
        }
        return true;
      }


    const doFilter = function () {

      var checked_values =  $('.btn-filter.active').map(function () {
                          return $(this).attr('data-filter') != 'all' ? $(this).attr('data-filter') : null;
                      }).get(); // ["cat1", "cat2", "cat3"]
      
            console.log(checked_values, checked_values.length)
            
            if (checked_values.length) {
      
              $('.box-training').each(function () {
                // get all the classes from the object:
                var catsArray = $(this).attr('class').split(' ');
      
                // variante 1 : alle filter müssen zutreffen:
                if (containsAll(checked_values, catsArray)) {
                  $(this).removeClass('d-none filtered');
                } else {
                  $(this).addClass('d-none filtered');
                }
              });
      
              //location.hash = checked_values.join(',');
            }else {
              $('.box-training').removeClass('d-none filtered');
              //location.hash = '';
            }
            // triger lozad 
            window.dispatchEvent(new Event('resize'));
          }





    $('.btn-filter:not(.btn-reset)').on('click', function (e) {
        e.preventDefault();
        $(this).toggleClass('active').siblings().removeClass('active');
        doFilter();
      });

/*
      if(!$(this).hasClass('active')){
           $(this).toggleClass('active').siblings().removeClass('active');
            var selected = $('.btn-filter.active').attr('data-filter');
            //console.log(selected);
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
   */

   //activate filter on pageload with hash
   if(location.hash) {
    $('.btn-filter[data-filter="'+location.hash.split('#')[1]+'"]').trigger('click');
   }
/*
   $('.btn-reset').click(function() {
    $('.box-training').addClass('d-block').removeClass('d-none');
    $('.btn-filter.active').removeClass('active');
    var noHashURL = window.location.href.replace(/#.*$/, '');
    window.history.replaceState('', document.title, noHashURL);
  });
*/
  }

  //enable SVGs in popuver
  $('.person-info').popover({sanitize:false});
  //$('.firmen-info').popover({fallbackPlacements:'top'});
}