import  Flickity from 'flickity-fade';
export default function() {
  
  // decode E-Mail  
  $('a.email').each(function(){
    //console.log('hallo', atob( $(this).attr('href') ));
    $(this).attr('href', atob( $(this).attr('href')));
  });


  var flkty = new Flickity( '.team-carousel', {
    wrapAround: true,
    //fade: true,
    //adaptiveHeight: false,
    //autoPlay: 5500,
    //pauseAutoPlayOnHover: false,
    prevNextButtons: false,
    pageDots: false,
    cellAlign: 'left'
});


  $('.team-info-link').on('click', function(){
    //$(this).parent().addClass('active');

    var index = $(this).parent().index();
    console.log(index)
    flkty.select( index,true,true );
  });


  $('.next-team-member').on('click', function(){
     /* let nextModal = $('.team-info-box.active').nextAll('.team-info-box').first();
      if(nextModal.length === 0) nextModal = $('.team-info-box.active').prevAll('.team-info-box').last();
     
      $('.team-info-box.active').modal('hide');
      nextModal.modal('show');*/
      flkty.next( true, true );
  });

  $('.prev-team-member').on('click', function(){
    /*  let nextModal = $('.team-info-box.active').prevAll('.team-info-box').first();
      if(nextModal.length === 0) nextModal = $('.team-info-box.active').nextAll('.team-info-box').last();
     
      $('.team-info-box.active').modal('hide');
      nextModal.modal('show');*/
      flkty.previous( true, true );
  });

  
  $('.team-info-box_').on('show.bs.modal', function (e) {
    $(this).addClass('active');
  }).on('hide.bs.modal', function (e) {
    $('.team-info-box').removeClass('active');
  });

  $('#modalTeam').on('shown.bs.modal', function (e) {
    flkty.resize();
  });


  //fix for ios?
  var tapArea, startX ;
            tapArea = document.querySelectorAll('.carousel');
            startX = 0;
            for (var item of tapArea) {
                item.ontouchstart = function(e) {
                    startX = e.touches[0].clientX;
                };
                item.ontouchmove = function(e) {
                    if (Math.abs(e.touches[0].clientX - startX) > 5 && e.cancelable ) {
                        e.preventDefault();
                    }
                };
            }


}