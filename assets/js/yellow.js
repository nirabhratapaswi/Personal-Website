/**
 *	Contains projects options
 **/
var $ = require("jquery");

var resizeBasedOnWindow = () => {
    if ($(window).width() > 1100) {
        $(".projects_internal").css("width", 9 * $(window).width() / 20);
        // $(".projects_internal").css("height", $(window).height() / 3);
        $(".projects_internal").css("background-size", (9 * $(window).width() / 20).toString().concat("px ", ($(window).height() / 3).toString(), "px"));
    } else {
        $(".projects_internal").css("width", 9 * $(window).width() / 10);
        // $(".projects_internal").css("height", $(window).height() / 3);
        $(".projects_internal").css("background-size", (9 * $(window).width() / 10).toString().concat("px ", ($(window).height() / 3).toString(), "px"));
    }
}

$(document).ready(() => {
	console.log("Yellow.js is ready.");
	resizeBasedOnWindow();
	$(window).resize(function() {
        resizeBasedOnWindow();
    });
});
