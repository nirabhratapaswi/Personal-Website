/**
*	Contains nav-bar and page interaction options, see orange.js for scrollify
**/

/*import '../scss/red.scss'; // SCSS import
import '../css/red.css'; // built with webpack
import '../css/orange.css'; // built with webpack
import '../css/yellow.css'; // built with webpack
import '../css/green.css'; // built with webpack
import '../css/blue.css'; // built with webpack
// var $ = require("jquery");
import * as $ from 'jquery';
import 'bootstrap'; // bootstrap js import
// import 'jquery-scrollify';*/

$(document).ready(function() {
    // console.log("Jquery loaded.");
    let toggle = true;
    $('#sidebarCollapse').on('click', function() {
        if (toggle) {
            $("#sidebarToggle").animate({
                left: $("#nav").width().toString()
            }, 500);
            $("#nav").addClass("active");
            $(this).removeClass('active');
            toggle = false;
        } else {
        	$("#sidebarToggle").animate({
                left: 0
            }, 500);
            $("#nav").removeClass("active");
            $(this).addClass('active');
            toggle = true;
        }
    });
});
