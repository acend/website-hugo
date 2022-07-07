// JS Goes here - ES6 supported
import 'bootstrap';
//import 'jquery';
import $ from 'jquery';
window.jQuery = $;
window.$ = $;

import ScrollOut from "scroll-out";
import Sticky from "sticky-js";

import home from "./js/home";
import trainings from "./js/trainings";
import about from "./js/about";
import faq from "./js/faq";

import { map, lerp, getMousePos, calcWinsize, getRandomNumber } from './js/utils';

//jQuery(document).ready(() => {




ScrollOut({
    /* options */
    once: true,
  });


  ScrollOut({
    targets: ".header",
    offset: 100
  });

 
  var sticky = new Sticky('.sticky');


  let root = document.documentElement;
  const colors = [
    "7 71 97", //#E6ECEE", //AC-Blue
    "125 15 75", //#E8D4DF", //AC-Red
    "54 115 92", //#36735c //AC-Green
    "208 143 76", //#F6E8DB", //AC-Yellow
  ];
  const colors_light = [
      "230 236 238",        //"#E6ECEE", //AC-Blue
      "232 212 223",        //"#E8D4DF", //AC-Red
      "230 237 234",        //"#E6EDEA", //AC-Green
      "246 232 219",        //"#F6E8DB", //AC-Yellow
          ];
  let randomColor =  Math.floor(Math.random() * colors.length);       

  root.style.setProperty('--primary', 'rgb('+colors[randomColor]+')');
  root.style.setProperty('--primary-light', 'rgb('+colors_light[randomColor]+')');
  //root.style.setProperty('--color', colors[randomColor]);
  root.style.setProperty('--shadowColor', 'rgba('+colors[randomColor].split(' ').join(',')+', 0.3)');
  root.style.setProperty('--primary-opaque', 'rgba('+colors[randomColor].split(' ').join(',')+', 0.96)');
  root.style.setProperty('--primary-opaque-light', 'rgba('+colors_light[randomColor].split(' ').join(',')+', 0.75)');


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
  trainings();
  about();
  faq();
 

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

    $('body').addClass('signup-modal');

    const selectedTraining = e.relatedTarget.dataset.kurs;
    if(selectedTraining){
      $(this).find('.custom-select option[value="'+selectedTraining+'"]').prop('selected', true);
    }
    
  }).on('hidden.bs.modal', function (e) {
    $('body').removeClass('signup-modal');
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

  const $form = $(this);
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
