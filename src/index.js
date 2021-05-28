// JS Goes here - ES6 supported
import 'bootstrap';
//import 'jquery';
import $ from 'jquery';
window.jQuery = $;
window.$ = $;

import ScrollOut from "scroll-out";
import Sticky from "sticky-js";

import home from "./js/home";

import { map, lerp, getMousePos, calcWinsize, getRandomNumber } from './js/utils';

//jQuery(document).ready(() => {




ScrollOut({
    /* options */
  });


  ScrollOut({
    targets: ".header",
    offset: 100
  });

 
  var sticky = new Sticky('.sticky');


  let root = document.documentElement;
  const colors = ["#074761","#7d0f4b",  "#36735c", "#d08f4c"];
  const colors_light = [
              "#E6ECEE", //AC-Blue
              "#E8D4DF", //AC-Red
              "#E6EDEA", //AC-Green
              "#F6E8DB", //AC-Yellow
          ];
  let randomColor =  Math.floor(Math.random() * colors.length);       

  root.style.setProperty('--primary', colors[randomColor]);
  root.style.setProperty('--primary-light', colors_light[randomColor]);


  $('.navbar-collapse').on('show.bs.collapse', function(){
    $('.header').addClass('nav-open');
  }).on('hide.bs.collapse', function(){
    $('.header').removeClass('nav-open');
  });

// Preloader js    
$(window).on('load', function () {
	$('.preloader').fadeOut(100);
});

(function ($) {
	'use strict';

  
  home();
 

	// Background-images
	$('[data-background]').each(function () {
		$(this).css({
			'background-image': 'url(' + $(this).data('background') + ')'
		});
	});

 

  $(".anmelde-toggler").click(function(){
    $('.sticky').toggleClass('d-none');
  });


  $('#signupModal').on('show.bs.modal', function (e) {
    const selectedTraining = e.relatedTarget.dataset.kurs;
    if(selectedTraining){
      $(this).find('.custom-select option[value="'+selectedTraining+'"]').prop('selected', true);

    }

  });


  //$('[data-toggle="popover"]').popover();

  $('[data-toggle="popover"]').popover({ trigger: "manual" , html: true, animation:true})
    .on("mouseenter", function () {
        var _this = this;
        $(this).popover("show");
        $(".popover").on("mouseleave", function () {
            $(_this).popover('hide');
        });
    }).on("mouseleave", function () {
        var _this = this;
        setTimeout(function () {
            if (!$(".popover:hover").length) {
                $(_this).popover("hide");
            }
        }, 200);
});


// StartslideShow Animation:

// Calculate the viewport size
let winsize = calcWinsize();
window.addEventListener('resize', () => winsize = calcWinsize());

// Track the mouse position
let mousepos = {x: winsize.width/2, y: winsize.height/2};
window.addEventListener('mousemove', ev => mousepos = getMousePos(ev));



  function move(obj) {
    // amount to move in each axis
    let translationVals = {tx: 0, ty: 0};
    // get random start and end movement boundaries
    const xstart = getRandomNumber(20,50);
    const ystart = getRandomNumber(20,50);
   
    // infinite loop
    const render = () => {
        // Calculate the amount to move.
        // Using linear interpolation to smooth things out.
        // Translation values will be in the range of [-start, start] for a cursor movement from 0 to the window's width/height
        translationVals.tx = lerp(translationVals.tx, map(mousepos.x, 0, winsize.width, -xstart, xstart), 0.07);
        translationVals.ty = lerp(translationVals.ty, map(mousepos.y, 0, winsize.height, -ystart, ystart), 0.07);
       
       // gsap.set(this.DOM.el, {x: translationVals.tx, y: translationVals.ty});  
       obj.style.transform = "translate("+ ( translationVals.tx) + "px,"+  (translationVals.ty) + "px)";
       //console.log( getMousePos.x)
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}

const els = document.querySelectorAll('.img-container');

els.forEach(item => move(item));
 


  /* ########################################### /hero parallax ############################################## */
  


/* FORMULAR : for gold only */
 

$( 'form' ).submit(function ( e ) {

  const $form = $(this)
  const formdata = $form.serializeArray();

  $.ajax({
    url:  $form.attr("action"),
    method: "POST",
    dataType: "json",
     data: formdata,
    success: function (msg) {
 
      //console.log(msg);
 
      if (msg.ok == true) {
          
      
          //$(formular).next('.successmessage').removeClass('d-none');
          // $(formular).parent().find('.introtext').addClass('d-none');
            if (($form.attr('id') === "signupModal") || ($form.attr('id') === "newsletterform")) {
              $form.replaceWith("<p>Danke für deine Anmeldung.</p>");
            }else {
              $form.replaceWith("<p>Danke für deine Nachricht.</p>");

            }



      } else {
          //response = '<div class="error">' + msg.errors + '</div>';
          alert(msg );
      }
      

  }
  });

  e.preventDefault();
});

 





})(jQuery);

import "./css/main.css";

// Say hello
//console.log("🦊 Hello! Edit me in src/index.js");
