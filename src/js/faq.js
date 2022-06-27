export default function() {

  
  const $stickyTop = document.querySelector('.sticky-top');

  if ($stickyTop) {
    console.log('$stickyTop');
    
    const observer = new IntersectionObserver( 
      ([e]) => e.target.toggleAttribute('stuck', e.intersectionRatio < 0.5),
      {threshold: [1]}
      
      );
      
      observer.observe($stickyTop);
    }


    function scrollTo(el) {
      // An offset to push the content down from the top.
      var offset = 200;

      var target = $(el).offset().top - offset;

      $('html, body').animate({scrollTop:target}, 500);

      //prevent the page from jumping down to our section.
      window.location.hash = el;
    }




  if($('.topic-selector').length) {

      $('.topic-selector').on('change', function(e) {
         const val =  this.value;

         if(val) {
          scrollTo(val);
         }else {
          var noHashURL = window.location.href.replace(/#.*$/, '');
          window.history.replaceState('', document.title, noHashURL);
         }
         e.preventDefault();

      });

   //activate filter on pageload with hash
   if(location.hash) {
    scrollTo(location.hash);
   }
 
  }
 
}