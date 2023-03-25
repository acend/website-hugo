import  Flickity from 'flickity';

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


  if ($('.entry-content .carousel').length) {
		
		$('.entry-content .slides').each(function(){

      var $this = $(this);

			var flkty = new Flickity( $this.find('.carousel')[0], { // eslint-disable-line no-unused-vars
				lazyLoad: 2,
				prevNextButtons: false,
				pageDots: false,
			//	autoPlay: $this.hasClass('auto-play') ? 3000 : false,
				wrapAround: true ,
				cellAlign: 'left',
			});
			
      /*
			flkty.on( 'staticClick', function(  ) {
				flkty.selectedIndex == flkty.cells.length - 1  ? flkty.select( 0 ) : flkty.next();

			});
*/
			var carouselStatus = $this.find('.carousel-status')[0];
			var carouselCaption = $this.find('.c-caption')[0];
			
			flkty.on( 'select', function() {
				var slideNumber = flkty.selectedIndex + 1;
				carouselStatus.textContent = slideNumber + '/' + flkty.slides.length;
				carouselCaption.textContent = $this.find('.is-selected .caption').text() ? $this.find('.is-selected .caption').text() : $this.find('.carousel-cell:first-child .caption').text();
			});

      $this.find('.flickity-button.previous').on( 'click', function() {
				flkty.previous();
			});
			// next
			$this.find('.flickity-button.next').on( 'click', function() {
				flkty.next();
			});
			

		});
	}


  $('.entry-content .collapse').on('show.bs.collapse', function () {
    //trigger resize for setting carousel size
    window.dispatchEvent(new Event('resize'));
    console.log('collapse')
  });
 
}