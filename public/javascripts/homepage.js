$(document).ready(function(){

    var accent = "#123456";
    var dark = "#234567";
    var desaturate = "#204060";
    var navTop = "#204060";
    var topColor = "#FFFFFF";
    var font = "Roboto";
    var headerFont = "Roboto";

    $("#navigation").css("background", accent);
    $("footer").css("background", "#333");
    $("footer a").css("color", accent);
    $("#emailbox").css("font-family", font);
    $("#emailbox").css("border-color", accent);
    $(".backgroundcircle").css("background-color", accent);
    $("#backgroundcircle").css("font-family", headerFont);
    $("#icon1").html('<i class="fa fa-group"></i>');
    $("#icon2").html('<i class="fa fa-check-circle"></i>');
    $("#icon3").html('<i class="fa fa-flash"></i>');
    $("#trynow .btn-default").css("color", "#fff");
    $(".lead .btn").css("background-color", accent);





    $(".quote-row").css("background-color", desaturate);
    $("footer").css("background", accent);
    $("footer a").css("color", "#fff");
    $("#trynow .btn-default").css("background-color", dark);
    $("#emailbox").css("border-color", dark);

    $("#trynow form").css("color", accent);


    var scrollStart = 0;
    var startChange = $('#cover-heading');
    var offset = startChange.offset();

    function checkScroll() {
        scrollStart = $(this).scrollTop();
        if(scrollStart > offset.top) {
            $("#navigation").removeClass("top");
            $("#navigation").addClass("scrolled");

            //$("#navigation").css("background-color", accent.setAlpha(1).rgba());
            $("#navigation").css("background-color", accent);
            $("#navigation a").css("color", "#fff");
        } else {
            $("#navigation").removeClass("scrolled");
            $("#navigation").addClass("top");
            $("#navigation").css("background-color", navTop);
            $("#navigation a").css("color", topColor);
        }
    }

    checkScroll();

    if (startChange.length) {
        $(document).scroll(checkScroll);
    }
    $("#body").css("display", "block");
});