// main-nav desktop
//link button funnctionality
$(".n1").click(function () {
    //for background color and font color toggle
    $(".n1").not(this).removeClass("n1-active"); //remove active class from other links
    this.classList.toggle("n1-active"); //toggle active class if clicked while active

    //for icon toggle
    $(".n1").not(this).children("img").attr("src", "./images/green-dropdown.svg"); //remove close icon on other links
    $(this).children("img").attr("src", function (index, attr) {
        return attr == "./images/close-icon.svg" ? "./images/green-dropdown.svg" : "./images/close-icon.svg"; //toggle close icon if clicked while active
    });

    //for menu toggle
    $(".n1").not(this).siblings(".n1-dropdown").hide();
    $(this).siblings(".n1-dropdown").toggle();
});

// if clicked outside while link is active, deactivate link
$(document).click(function (event) {
    if ($('.n1').hasClass('n1-active') && $(event.target).closest(".n1").length == 0 && $(event.target).closest(".n1-dropdown").length == 0) {
        $('.n1').removeClass('n1-active');
        $(".n1").children("img").attr("src", "./images/green-dropdown.svg");
    }
    //for dropdown
    if ($(event.target).closest(".n1").length == 0 && $(event.target).closest(".n1-dropdown").length == 0) {
        $(".n1").siblings(".n1-dropdown").hide();
    }
});

//hide dropdown menu onScroll
$(window).scroll(function () {
    if ($(this).scrollTop() > 0) {
        $('.n1').removeClass('n1-active');
        $(".n1").children("img").attr("src", "./images/green-dropdown.svg");
        $(".n1").siblings(".n1-dropdown").hide();
    }
});

//end of main-nav desktop


//sidebar
$(".hamburger").click(function () {
    $(".hamburger").toggleClass("active");
    $(".sidebar").toggleClass("sidebar-active");
    $(".content-wrapper").toggleClass("content-pushed");
});

$(document).click(function (event) {
    if ($(".sidebar").hasClass("sidebar-active") && $(event.target).closest(".sidebar").length == 0 && $(event.target).closest(".hamburger").length == 0 ) {
        console.log($(event.target).closest(".sidebar").length);
        $(".sidebar").removeClass("sidebar-active");
        $(".content-wrapper").removeClass("content-pushed");
        $(".hamburger").removeClass("active");
    }
});

//sidebar-submenu
$(".n1-rwd").click(function(){
    $(this).siblings(".sidebar-submenu").addClass("sidebar-submenu-active");
});

$(".submenu-back").click(function(){
    $(".sidebar-submenu").removeClass("sidebar-submenu-active");
})

// animate-this elements
$(window).scroll(function(){
    $(".animate-this").each(function(){
        elementTop = $(this).offset().top;
        windowTop = $(window).scrollTop();
        if((elementTop - windowTop) < $(window).innerHeight()-200){
            $(this).addClass("in-viewport");
        }
        else{
            $(this).removeClass("in-viewport");
        }
    });
        

});
  