import  Flickity from 'flickity-fade';
export default function() {
  
   if($('.main-carousel').length) {

        var flkty = new Flickity( '.main-carousel', {
            wrapAround: true,
            fade: true,
            adaptiveHeight: false,
            autoPlay: 4700,
            pauseAutoPlayOnHover: false,
            prevNextButtons: false,
            pageDots: $('.main-carousel .carousel-cell').length > 1 ? true : false,
            draggable: false,
        });


       setTimeout(function(){
            flkty.resize();
        },1000);
       /*
        $(window).on('load', function () {
            flkty.resize();
        }); 
         */
    }

    if($('.testimonial-carousel .carousel-cell').length > 1){
     
        var flkty_testimonial = new Flickity( '.testimonial-carousel', {
            wrapAround: true,
            fade: true,
            adaptiveHeight: false,
            autoPlay: 5500,
            pauseAutoPlayOnHover: false,
            prevNextButtons: false,
        });
    }

    if($('.partner-carousel .carousel-cell').length > 1) {
     
        var flkty_partner = new Flickity( '.partner-carousel', {
            wrapAround: true,
            //fade: true,
            //adaptiveHeight: false,
            autoPlay: 2500,
            //pauseAutoPlayOnHover: false,
            prevNextButtons: false,
            cellAlign: 'left',
            on: {
                ready: function() {
                    console.log('Flickity ready');
                    window.dispatchEvent(new Event('resize'));
                },
            }, 
        });
    }
}
