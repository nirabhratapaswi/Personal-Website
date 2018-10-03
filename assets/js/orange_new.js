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

// import * as $ from 'jquery';
var previous_top = 0,
    div_id_list = ["aboutMe", "portfolio", "projects", "workedAt", "skills"],
    current_div = div_id_list[0],
    div_range = new Object(),
    sidebar_active_href = null;

const delay_time_for_event_listener = 1000;

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

var addScrollEventListenerFunction = (scroll_top) => {
    scroll_top = $(this).scrollTop();
    if (scroll_top > previous_top) {
        // console.log("Scrolling down");
        current_div = whichDiv(scroll_top);
        if (checkIfDivEnd(current_div, scroll_top, true)) { // changing divs!!
            if (div_id_list.indexOf(current_div) < div_id_list.length - 1) {
                console.log("Scrolling down, going to next div. Current div: ", current_div, ", target: ", div_range[div_id_list[div_id_list.indexOf(current_div) + 1]][0]);
                gotoDiv(div_id_list[div_id_list.indexOf(current_div) + 1]);
                $(window).off("scroll", addScrollEventListenerFunction);
                setTimeout(() => {
                    $(window).on("scroll", addScrollEventListenerFunction);
                }, delay_time_for_event_listener);
            }
        } else {
            console.log("Scrolling down, not changing div: ", current_div);
        }
    } else if (scroll_top < previous_top) {
        // console.log("Scrolling up")
        if (checkIfDivEnd(current_div, scroll_top, false)) { // changing divs!!
            gotoDiv(div_id_list[div_id_list.indexOf(current_div) - 1]);
            $(window).off("scroll", addScrollEventListenerFunction);
            setTimeout(() => {
                $(window).on("scroll", addScrollEventListenerFunction);
            }, delay_time_for_event_listener);
            console.log("Scrolling up, going to previous div Current div: ", current_div);
        } else {
            console.log("Scrolling up, not changing div: ", current_div);
        }
        current_div = whichDiv(scroll_top);
    }
    $("#".concat(current_div, " > .hiddenSectionTitle")).css({
        "display": "none"
    });
    $(".header_class > ul li").each(function(index) {
        if ($(".header_class > ul li:nth-child(".concat((index + 1).toString(), ") a")).attr("href") == "#".concat(current_div)) {
            console.log();
            $(".header_class > ul li:nth-child(".concat((index + 1).toString(), ") a")).addClass("active");
            sidebar_active_href = $(".header_class > ul li:nth-child(".concat((index + 1).toString(), ") a"));
        } else {
            $(".header_class > ul li:nth-child(".concat((index + 1).toString(), ") a")).removeClass("active");
        }
    });
    showPage();
    previous_top = scroll_top;
}

var summation = () => {
    for (let i = 1; i < arguments.length; i++) {
        arguments[i] += arguments[i - 1];
    }
    return arguments[arguments.length - 1];
}

var checkChildrenHeights = (jqueryElementId) => {
    $("#".concat(jqueryElementId)).children("div").each(index => {
        // console.log("Index: ", index, ", height: ", $("#".concat(jqueryElementId, " div:nth-child(", (index+1).toString(), ")")).height());
    });
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
            checkChildrenHeights(div_id_list[div]);
            if (div < div_id_list.length - 1) {
                // console.log($("#".concat(div_id_list[div])), " : ", $("#".concat(div_id_list[parseInt(div)+1])));
                div_range[div_id_list[div]] = [$("#".concat(div_id_list[div])).offset().top, $("#".concat(div_id_list[parseInt(div) + 1])).offset().top];
            } else {
                // console.log($("#".concat(div_id_list[div])).offset().top, " : ", $("#".concat(div_id_list[div])).offset().top + $("#".concat(div_id_list[div])).height());
                div_range[div_id_list[div]] = [$("#".concat(div_id_list[div])).offset().top, $("#".concat(div_id_list[div])).offset().top + $("#".concat(div_id_list[div])).height()];
            }
            console.log("For index: ", div, ", ele: ", div_id_list[div], ", height: ", div_range[div_id_list[div]][1] - div_range[div_id_list[div]][0]);
        }
        console.log(div_range);
        resized = false;
    } else {
        setTimeout(resizeBasedOnWindowForScroll, 50);
    }
}

$(() => {
    resizeBasedOnWindowForScroll();
    $(window).on("scroll", addScrollEventListenerFunction);

    //  For jquery animations

    sidebar_active_href = $(".header_class > ul li a.active");
    $("#".concat(current_div, " > .hiddenSectionTitle")).css({
        "display": "none"
    });
    showPage();
    $(".header_class a").click(function(e) {
        // e.preventDefault();  // uncomment this and fix move!
        $(this).parent().siblings("li").children("a").removeClass("active");
        $(this).addClass("active");
        sidebar_active_href = $(this);
        showPage();
    });

    $(window).resize(resizeBasedOnWindowForScroll);

    $(".header_class > ul li a").click(function() {
        console.log("header class element clicked: ", $(this).attr("href"));
        $(window).off("scroll", addScrollEventListenerFunction);
        setTimeout(() => {
            $(window).on("scroll", addScrollEventListenerFunction);
        }, delay_time_for_event_listener+100);
        gotoDiv($(this).attr("href").split("#")[1]);
    });
});