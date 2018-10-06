var previous_top = 0,
    div_id_list = ["aboutMe", "portfolio", "projects", "workedAt", "skills"],
    pages_loaded = [false, false, false, false, false],
    current_div = div_id_list[0],
    div_range = new Object(),
    sidebar_active_href = null;

const delay_time_for_event_listener = 1000;

var progress_bar_list = [{
    class_name: ".my_progress_bar_00",
    text: "C++",
    percentage: 75
}, {
    class_name: ".my_progress_bar_01",
    text: "Java Spring Boot",
    percentage: 50
}, {
    class_name: ".my_progress_bar_02",
    text: "Javascript",
    percentage: 85
}, {
    class_name: ".my_progress_bar_03",
    text: "Angular 6",
    percentage: 65
}, {
    class_name: ".my_progress_bar_04",
    text: "Python",
    percentage: 70
}, {
    class_name: ".my_progress_bar_05",
    text: "MATLAB",
    percentage: 60
}, {
    class_name: ".my_progress_bar_06",
    text: "Git",
    percentage: 65
}, {
    class_name: ".my_progress_bar_07",
    text: "Mongo DB",
    percentage: 70
}, {
    class_name: ".my_progress_bar_08",
    text: "MySQL",
    percentage: 75
}];

var showPage = () => { // NOTE: This takes the active href for current page calculation, so be sure to udpate active href before calling this!!
    $("#content > div").each(index => {
        // console.log("Searching:", sidebar_active_href.attr("href"), " :: ", "#".concat($($("#content > div")[index]).attr("id")));
        if (sidebar_active_href.attr("href") == "#".concat($($("#content > div")[index]).attr("id"))) {
            if (index > 0) {
                $(".header_class > ul li img").each(function(index_1) {
                    if ($(this).siblings("a").attr("href") == sidebar_active_href.attr("href")) {
                        if (index_1 % 2 == 0) {
                            $(this).removeClass("icon_inactive");
                        } else {
                            $(this).addClass("icon_inactive");
                        }
                    } else {
                        if (index_1 % 2 == 0) {
                            $(this).addClass("icon_inactive");
                        } else {
                            $(this).removeClass("icon_inactive");
                        }
                    }
                });
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
                    $("#content > div:nth-child(".concat((index + 1).toString(), ") .sectionContent > .about_me_left > .appear_from_left:nth-child(1)")).show("slide", {
                        direction: "left"
                    }, 1000, () => {
                        $("#content > div:nth-child(".concat((index + 1).toString(), ") .sectionContent > .about_me_left > .appear_from_left:nth-child(2)")).show("slide", {
                            direction: "up"
                        }, 800, () => {
                            $("#content > div:nth-child(".concat((index + 1).toString(), ") .sectionContent > .appear_from_right")).show("fade", {}, 1500, () => {
                                $(".about_me_right, .about_me_left").css({
                                    "overflow-y": "auto"
                                });
                            });
                        });
                    });
                    // $("#content > div:nth-child(".concat((index + 1).toString(), ") .sectionContent.center")).show("fade", {}, 1500, () => {});
                    if (index != div_id_list.indexOf("skills") + 1) {
                        $("#content > div:nth-child(".concat((index + 1).toString(), ") .sectionContent.center")).show("fade", {}, 1500, () => {});
                    } else {
                        $("#content > div:nth-child(".concat((index + 1).toString(), ") .sectionContent.center")).show("fade", {}, 600, () => {});
                        setTimeout(index => {
                            $("#content > div:nth-child(".concat((index + 1).toString(), ") .sectionFooter")).show("slide", {
                                direction: "down"
                            }, 1000, () => {});
                            $('.skillbar').each(function() {
                                $(this).find('.skillbar-bar').animate({
                                    width: $(this).attr('data-percent')
                                }, 1500);
                            });
                            setTimeout(() => {
                                $(".skillbar-bar").html("<div class='skillbar-square' style='display: none;'></div><div class='skillbar-square-new' style='display: none;'></div>");
                                $(".skillbar-square, .skillbar-square-new").show("fade", {}, 1000, () => {});
                            }, 1500);
                        }, 600, index);
                    }
                }, 1000, index);
            }
        } else {
            $(this).hide();
        }
    });
    return;
}

var checkIfDivEnd = (div_id, scroll_top, down_direction) => { // to check if div end hits window bottom
    // console.log("For div: ", div_id, ", scroll_top: ", scroll_top, ", window_height: ", $(window).height(), ", div_height: ", $("#".concat(div_id)).height());
    if (down_direction) {
        if ((scroll_top - div_range[div_id][0]) + $(window).height() > $("#".concat(div_id)).height()) {
            return true;
        } else {
            return false;
        }
    } else {
        if (scroll_top < div_range[div_id][0]) {
            return true;
        } else {
            return false;
        }
    }
}

var whichDiv = (scroll_top) => {
    for (let x in div_id_list) {
        if (scroll_top >= div_range[div_id_list[x]][0] && scroll_top < div_range[div_id_list[x]][1]) {
            return div_id_list[x];
        }
    }
    return null;
}

var gotoDiv = (div_index) => {
    $("html, body").animate({
        scrollTop: div_range[div_index][0] + 10 // or .offset().top() can be used of the next jQuery element
    }, delay_time_for_event_listener, "swing", () => {
        console.log("Transition finished");
    });
}

var showPageIfNotShown = page_index => {
    if (!pages_loaded[page_index]) {
        pages_loaded[page_index] = true;
        showPage();
        // return false;
    }
    // return true;
}

var changeIconForNav = () => { // Changes nav svg icon color to active
    console.log("changeIconForNav called.");
    $(".header_class > ul li img").each(function(index_1) {
        if ($(this).siblings("a").attr("href") == sidebar_active_href.attr("href")) {
            if (index_1 % 2 == 0) {
                $(this).removeClass("icon_inactive");
            } else {
                $(this).addClass("icon_inactive");
            }
        } else {
            if (index_1 % 2 == 0) {
                $(this).addClass("icon_inactive");
            } else {
                $(this).removeClass("icon_inactive");
            }
        }
    });
}

var scrollEventListener = (scroll_top) => {
    let scroll_delay_subtraction = 0;
    scroll_top = $(this).scrollTop();
    if (scroll_top > previous_top) {
        // console.log("Scrolling down");
        current_div = whichDiv(scroll_top);
        if (checkIfDivEnd(current_div, scroll_top, true)) { // changing divs!!
            if (div_id_list.indexOf(current_div) < div_id_list.length - 1) {
                // console.log("Scrolling down, going to next div. Current div: ", current_div, ", target: ", div_range[div_id_list[div_id_list.indexOf(current_div) + 1]][0]);
                gotoDiv(div_id_list[div_id_list.indexOf(current_div) + 1]);
                $(window).off("scroll", scrollEventListener);
                setTimeout(() => {
                    $(window).on("scroll", scrollEventListener);
                }, delay_time_for_event_listener);
            }
        }
        scroll_delay_subtraction = delay_time_for_event_listener;
    } else if (scroll_top < previous_top) {
        // console.log("Scrolling up")
        if (checkIfDivEnd(current_div, scroll_top, false)) { // changing divs!!
            gotoDiv(div_id_list[div_id_list.indexOf(current_div) - 1]);
            $(window).off("scroll", scrollEventListener);
            setTimeout(() => {
                $(window).on("scroll", scrollEventListener);
            }, delay_time_for_event_listener);
            // console.log("Scrolling up, going to previous div Current div: ", current_div);
        }
        current_div = whichDiv(scroll_top);
    }
    $("#".concat(current_div, " > .hiddenSectionTitle")).css({
        "display": "none"
    });
    $(".header_class > ul li").each(function(index) {
        if ($(".header_class > ul li:nth-child(".concat((index + 1).toString(), ") a")).attr("href") == "#".concat(current_div)) {
            $(".header_class > ul li:nth-child(".concat((index + 1).toString(), ") a")).addClass("active");
            sidebar_active_href = $(".header_class > ul li:nth-child(".concat((index + 1).toString(), ") a"));
        } else {
            $(".header_class > ul li:nth-child(".concat((index + 1).toString(), ") a")).removeClass("active");
        }
    });
    changeIconForNav();
    setTimeout(() => {
        showPageIfNotShown(div_id_list.indexOf(current_div));
    }, delay_time_for_event_listener - scroll_delay_subtraction);
    previous_top = scroll_top;
}

var summation = () => {
    for (let i = 1; i < arguments.length; i++) {
        arguments[i] += arguments[i - 1];
    }
    return arguments[arguments.length - 1];
}

var resizeBasedOnWindowForScroll = () => {
    if (resized) {
        for (let x in div_id_list) {
            if ($("#".concat(div_id_list[x])).height() < $(window).height() + 25) {
                $("#".concat(div_id_list[x])).css({
                    "height": ($(window).height() + 25).toString()
                });
            }
        }
        let start_pos = 0,
            end_pos;
        for (let div in div_id_list) {
            if (div < div_id_list.length - 1) {
                // console.log($("#".concat(div_id_list[div])), " : ", $("#".concat(div_id_list[parseInt(div)+1])));
                div_range[div_id_list[div]] = [$("#".concat(div_id_list[div])).offset().top, $("#".concat(div_id_list[parseInt(div) + 1])).offset().top];
            } else {
                // console.log($("#".concat(div_id_list[div])).offset().top, " : ", $("#".concat(div_id_list[div])).offset().top + $("#".concat(div_id_list[div])).height());
                div_range[div_id_list[div]] = [$("#".concat(div_id_list[div])).offset().top, $("#".concat(div_id_list[div])).offset().top + $("#".concat(div_id_list[div])).height()];
            }
            // console.log("For index: ", div, ", ele: ", div_id_list[div], ", height: ", div_range[div_id_list[div]][1] - div_range[div_id_list[div]][0]);
        }
        resized = false;
    } else {
        setTimeout(resizeBasedOnWindowForScroll, 50);
    }
}

var disableScrollClickAndEventListeners = () => {
    $(window).off("scroll", scrollEventListener);
    $(".scroll_down, .scroll_up").off("click");
    setTimeout(() => {
        $(window).on("scroll", scrollEventListener);
        $(".scroll_down").on("click", scrollDownClickEvent);
        $(".scroll_up").on("click", scrollUpClickEvent);
    }, delay_time_for_event_listener + 100);
}

var scrollDownClickEvent = scroll_top => {
    current_div = whichDiv($(this).scrollTop());
    if (div_id_list.indexOf(current_div) < div_id_list.length - 1) {
        gotoDiv(div_id_list[div_id_list.indexOf(current_div) + 1]);
        disableScrollClickAndEventListeners(delay_time_for_event_listener);
    }
    setTimeout(() => { // to display the target page.
        scroll_top = $(this).scrollTop();
        current_div = whichDiv(scroll_top);
        $("#".concat(current_div, " > .hiddenSectionTitle")).css({
            "display": "none"
        });
        $(".header_class > ul li").each(function(index) {
            if ($(".header_class > ul li:nth-child(".concat((index + 1).toString(), ") a")).attr("href") == "#".concat(current_div)) {
                $(".header_class > ul li:nth-child(".concat((index + 1).toString(), ") a")).addClass("active");
                sidebar_active_href = $(".header_class > ul li:nth-child(".concat((index + 1).toString(), ") a"));
            } else {
                $(".header_class > ul li:nth-child(".concat((index + 1).toString(), ") a")).removeClass("active");
            }
        });
        changeIconForNav();
        showPageIfNotShown(div_id_list.indexOf(current_div));
    }, delay_time_for_event_listener);
}

var scrollUpClickEvent = scroll_top => {
    current_div = whichDiv($(this).scrollTop());
    if (div_id_list.indexOf(current_div) > 0) {
        gotoDiv(div_id_list[div_id_list.indexOf(current_div) - 1]);
        disableScrollClickAndEventListeners(delay_time_for_event_listener);
    }
    setTimeout(() => { // to display the target page.
        scroll_top = $(this).scrollTop();
        current_div = whichDiv(scroll_top);
        $("#".concat(current_div, " > .hiddenSectionTitle")).css({
            "display": "none"
        });
        $(".header_class > ul li").each(function(index) {
            if ($(".header_class > ul li:nth-child(".concat((index + 1).toString(), ") a")).attr("href") == "#".concat(current_div)) {
                $(".header_class > ul li:nth-child(".concat((index + 1).toString(), ") a")).addClass("active");
                sidebar_active_href = $(".header_class > ul li:nth-child(".concat((index + 1).toString(), ") a"));
            } else {
                $(".header_class > ul li:nth-child(".concat((index + 1).toString(), ") a")).removeClass("active");
            }
        });
        changeIconForNav();
        showPageIfNotShown(div_id_list.indexOf(current_div));
    }, delay_time_for_event_listener);
}

$(() => {
    resizeBasedOnWindowForScroll();

    // Add Scroll EventListener
    $(window).on("scroll", scrollEventListener);

    //  For jquery animations

    sidebar_active_href = $(".header_class > ul li a.active");
    $("#".concat(current_div, " > .hiddenSectionTitle")).css({
        "display": "none"
    });
    showPageIfNotShown(div_id_list.indexOf(current_div));

    $(window).resize(resizeBasedOnWindowForScroll);

    $(".header_class > ul li a").click(function() { // click on sidebar links!
        $(this).parent().siblings("li").children("a").removeClass("active");
        $(this).addClass("active");
        sidebar_active_href = $(this);
        disableScrollClickAndEventListeners(delay_time_for_event_listener);
        setTimeout(() => { // to display the target page.
            current_div = whichDiv($(this).scrollTop());
            showPageIfNotShown(div_id_list.indexOf($(this).attr("href").split("#")[1]));
        }, delay_time_for_event_listener);
        $($(this).attr("href").concat(" > .hiddenSectionTitle")).css({
            "display": "none"
        });
        changeIconForNav();
        gotoDiv($(this).attr("href").split("#")[1]);
    });

    // Click functions for the up and down navigations buttons! -------------------------------------------------------------------------
    $(".scroll_down").click(scrollDownClickEvent);
    $(".scroll_up").click(scrollUpClickEvent);
    // END------------------------------------------------------------------------------------------------------------------------------
});
