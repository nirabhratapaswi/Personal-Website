/**
 *	Contains scrollify options
 **/

var $ = require("jquery");
import 'jquery-scrollify';
require('webpack-jquery-ui/slide-effect');
require('webpack-jquery-ui/blind-effect');
require('webpack-jquery-ui/bounce-effect');
require('webpack-jquery-ui/clip-effect');
require('webpack-jquery-ui/drop-effect');
require('webpack-jquery-ui/explode-effect');
require('webpack-jquery-ui/fade-effect');
require('webpack-jquery-ui/fold-effect');
require('webpack-jquery-ui/highlight-effect');
require('webpack-jquery-ui/puff-effect');
require('webpack-jquery-ui/pulsate-effect');
require('webpack-jquery-ui/scale-effect');
require('webpack-jquery-ui/shake-effect');
require('webpack-jquery-ui/size-effect');

var scrollify_class_list = ["scrollify"],
    sidebar_active_href = null,
    current_section = null;

var showPage = () => {
    $("#content > div").each(index => {
        // console.log("Searching:", sidebar_active_href.attr("href"), " :: ", "#".concat($($("#content > div")[index]).attr("id")));
        if (sidebar_active_href.attr("href") == "#".concat($($("#content > div")[index]).attr("id"))) {
            // console.log("Flag 1 for: ", "#".concat($($("#content > div")[index]).attr("id")));
            console.log("Index: ", index);
            if (index > 0) {
                $("#content > div:nth-child(".concat((index + 1).toString(), ") .sectionTitle")).show("slide", {
                    direction: "up"
                }, 900, () => {});
                setTimeout(index => {
                    $("#content > div:nth-child(".concat((index + 1).toString(), ") .sectionContent.left")).show("slide", {
                        direction: "right"
                    }, 1500, () => {});
                    $("#content > div:nth-child(".concat((index + 1).toString(), ") .sectionContent.right")).show("slide", {
                        direction: "left"
                    }, 1800, () => {});
                    $("#content > div:nth-child(".concat((index + 1).toString(), ") .sectionContent.center")).show("fade", {}, 1500, () => {});
                    if (index != 5) {
                        $("#content > div:nth-child(".concat((index + 1).toString(), ") .sectionContent.center")).show("fade", {}, 1500, () => {});
                    } else {
                        $("#content > div:nth-child(".concat((index + 1).toString(), ") .sectionContent.center")).show("fade", {}, 600, () => {});
                        setTimeout(() => {
                            $('.skillbar').each(index_1 => {
                                $("#content > div:nth-child(".concat((index + 1).toString(), ") .sectionFooter")).show("slide", {
                                    direction: "down"
                                }, 1000, () => {});
                                $('.skillbar:nth-child('.concat((index_1 + 1).toString(), ")")).find('.skillbar-bar').animate({
                                    width: $('.skillbar:nth-child('.concat((index_1 + 1).toString(), ")")).attr('data-percent')
                                }, 1500);
                            });
                        }, 600);
                    }
                }, 1000, index);
            }
        } else {
            $(this).hide();
        }
    });
    return;
}

var addScrollifyToElements = () => {
    $.scrollify({
        section: ".scrollify",
        sectionName: "scrollify",
        interstitialSection: "",
        easing: "easeOutExpo",
        scrollSpeed: 1000,
        offset: 0,
        scrollbars: true,
        standardScrollElements: "p,.projects_internal",
        setHeights: true,
        overflowScroll: true,
        updateHash: false,
        touchScroll: true,
        before: (index, array_of_children) => {},
        after: (index, array_of_children) => {
            console.log("After called.");
            console.log(sidebar_active_href.attr("href"), " :: ", "#".concat($.scrollify.current().attr("id")));
            $(".header_class > ul li").each(function(index) {
                if ($(".header_class > ul li:nth-child(".concat((index + 1).toString(), ") a")).attr("href") == "#".concat($.scrollify.current().attr("id"))) {
                    $(".header_class > ul li:nth-child(".concat((index + 1).toString(), ") a")).addClass("active");
                    sidebar_active_href = $(".header_class > ul li:nth-child(".concat((index + 1).toString(), ") a"));
                } else {
                    $(".header_class > ul li:nth-child(".concat((index + 1).toString(), ") a")).removeClass("active");
                }
            });
            showPage();
        },
        afterResize: () => {},
        afterRender: () => {}
    });
    $.scrollify.enable();
}



$(document).ready(() => {
    sidebar_active_href = $(".header_class .active");
    $(".scrollify").css('height', $(window).height());
    addScrollifyToElements();
    showPage();
    $(".header_class a").click(function(e) {
        // e.preventDefault();	// uncomment this and fix move!
        $(this).parent().siblings("li").children("a").removeClass("active");
        $(this).addClass("active");
        sidebar_active_href = $(this);
        showPage();
        // $.scrollify("move", $(this).attr("href"));
    });
});