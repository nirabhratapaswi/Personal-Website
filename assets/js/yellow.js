/**
 *	Contains projects options
 **/
// var $ = require("jquery");
// import * as $ from 'jquery';
var resized = false;

var resizeBasedOnWindowForProjects = () => {
    // console.log("resizeBasedOnWindowForProjects called.");
    if ($(window).width() > 1100) {
        $(".projects_internal").css("width", 9 * $(window).width() / 20);
        // $(".projects_internal").css("height", $(window).height() / 3);
        $(".projects_internal").css("height", "350px");
        $(".projects_title").css("height", "80px");
        $(".projects_content").css("height", "220px");
        $(".projects_footer").css("height", "50px");
        $(".spacer").css("height", "5px");
        // $(".projects_internal").css("background-size", (9 * $(window).width() / 20).toString().concat("px ", ($(window).height() / 3).toString(), "px"));
    } else {
        $(".projects_internal").css("width", 9 * $(window).width() / 10);
        // $(".projects_internal").css("height", $(window).height() / 3);
        $(".projects_internal").css("height", "280px");
        $(".projects_title").css("height", "60px");
        $(".projects_content").css("height", "180px");
        $(".projects_footer").css("height", "35px");
        $(".spacer").css("height", "2px");
        // $(".projects_internal").css("background-size", (9 * $(window).width() / 10).toString().concat("px ", ($(window).height() / 3).toString(), "px"));
    }
    $(".sectionContent").css({
        "max-height": ($(window).height() - $(".sectionTitle").height()).toString().concat("px")
    });
    $("#aboutMe > .sectionContent.left").css({
        "max-height": (2*($(window).height() - $(".sectionTitle").height())/5).toString().concat("px")
    });
    $("#aboutMe > .sectionContent.right").css({
        "max-height": (3*($(window).height() - $(".sectionTitle").height())/5).toString().concat("px")
    });
    $("#skills > .sectionContent").css({
        "max-height": ($(window).height() - $(".sectionTitle").height() - $("#skills > .sectionFooter").height()).toString().concat("px")
    });
    resized = true;
}

$(document).ready(() => {
    ityped.init(".ityped", {
        strings: ["C++", "javascript", "java", "python", "Angular 6", "node JS"],
        typeSpeed: 100,
        backSpeed: 50,
        startDelay: 500,
        backDelay: 800,
        loop: true,
        showCursor: true
    });
    $(".sectionContent").css({
        "max-height": ($(window).height() - $(".sectionTitle").height()).toString().concat("px")
    });
    console.log("Window height: ", $(window).height(), ", section height:", $(".sectionTitle").height());
	resizeBasedOnWindowForProjects();
	$(window).resize(resizeBasedOnWindowForProjects);
});
