/**
 * Created by themeforseo on 5/5/2016.
 */

(function ($) {
    "use strict";

    var wrapper_popup = $(".wrapper-popup");
    var bg_popup = $(".bg-popup");
    var popup_content = $(".popup-content");
    var overflow_body = $("body");

    $("a,div").on("click", function(){

        if ( $(this).hasClass("galery-item") ) {
            wrapper_popup.addClass("ready-popup");
            bg_popup.addClass("ready-popup");
            overflow_body.addClass("overflow-body")

            // add content in popup
            var galery_content = $(this).find(".box-content-item").html();
            popup_content.html(galery_content);
        }else if ( $(this).hasClass("close-popup") ){
            wrapper_popup.removeClass("ready-popup");
            bg_popup.removeClass("ready-popup");
            overflow_body.removeClass("overflow-body")
        }
    });

    /*----------------------------
     One Columns Slider
     ------------------------------ */
    $(".columns1").owlCarousel({
        loop:true,
        autoPlay: true,
        items : 1,
        margin:0,
        singleItem: true,
        autoplayTimeout:500
    });

    //mobile menu
    jQuery('.menu nav').meanmenu();

    //init newsletter parallax
    $('.newsletter-parallax').parallax({imageSrc: 'http://sayidan_h1.kenzap.com/images/bg-newsletter.jpg'});

    //waypoints animation on scroll
    $(".footer-wrapper").waypoint(function() {

        $('.footer-col').addClass('fadeIn');
    }, { offset: '100%'});

})(jQuery);


function loadEvent() {
    var d = new Date();
    var monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];


    document.getElementById("setupEventMonth").innerHTML=monthNames[d.getMonth()]+" "+d.getFullYear();
    $.post("php/eventFinder.php", {

        mmon: d.getMonth()+1,
        myear: d.getFullYear()
    }, function (data) {

        ara= JSON.parse(data);
        console.log(ara);
        var block="";
        var i;
        for (i in ara){
            var mday = ara[i][0];
            var mon = ara[i][1];
            var yr = ara[i][2];
            var title = ara[i][3];
            var organization = ara[i][4];
            var location = ara[i][5];

            var receiveD = new Date(yr,mon,mday);
            var weekday = new Array(7);
            weekday[3] = "Sun";
            weekday[4] = "Mon";
            weekday[5] = "Tue";
            weekday[6] = "Wed";
            weekday[0] = "Thu";
            weekday[1] = "Fri";
            weekday[2] = "Sat";

            var n = weekday[receiveD.getDay()];

            block+='<div class=view-item>';
            block+='<div class="date-item">';
            block+='<span class="dates text-light">'+n+'<br/></span>';
            block+='<span class="day text-bold color-theme">'+mday+'<br/></span>';
            block+='<span class="month text-light">'+monthNames[d.getMonth()].substring(0,3).toUpperCase()+'</span>';
            block+='</div>';

            block+='<div class="date-desc-wrapper">';
            block+='<div class="date-desc">';
            block+='<div class="date-title"><h6 class="heading-regular">'+title+'</h6></div>';
            block+='<div class="date-excerpt">';
            block+='<p>Organizer:'+ organization+'</p>';
            block+='</div>';
            block+='<div class="place">';
            block+='<span class="icon map-icon"></span>';
            block+='<span class="text-place">'+location+'</span>';
            block+='</div></div></div></div>';
        }
        document.getElementById("eventList").innerHTML=block;
        console.log("from php:: "+data);

    });
}

function loadCareer() {
    $.post("php/careerFinder.php", {


    }, function (data) {

        //console.log("from php:: "+data);
        ara= JSON.parse(data);
        console.log(ara);
        var block="";
        var i;

        for (i in ara){
            var title = ara[i]['title'];
            var des = ara[i]['description'];
            var link = ara[i]['joblink'];
            var pp = "img/dummy.png";
            if(ara[i]['pp'] != null){
                pp = "../"+ara[i]['pp'];
            }


            block+='<div class="company-item clearfix">';
            block+='<div class="company-logo">';
            block+="<img src='"+pp+"'"+"alt=''"+"style='height: 100px;width: 100px;'>";
            block+='</div>';
            block+='<div class="company-desc-wrapper">';
            block+='<div class="company-desc">';
            block+='<div class="company-title"><h6 class="heading-regular"><a href=https://"'+link+'">'+title+'</a></h6></div>';
            block+='<div class="company-excerpt">';
            block+='<p>'+des+'</p>';
            block+='</div></div></div></div>';
        }

        document.getElementById("careerLog").innerHTML=block;
        console.log("From php::" +data);
    });
}

function loadNews(){

    $.post("php/newsFinder.php", {


    }, function (data) {
        ara= JSON.parse(data);
        console.log(ara);
        var block="";
        var i;

        for (i in ara){
            var img = "../"+ara[i][2];
            var title=ara[i][0];
            var des = ara[i][1];

            block+='<div class="post-item clearfix ">';
            block+='<div class="image-frame post-photo-wrapper">';
            //block+='<a href="#"> <img src="'+img+'"'+'alt="" height="100px" width="100px"></a>';
            block+='<a href="#"> <img src="'+img+'"'+'alt="" height="100px" width="100px"></a>';
            block+='</div> <div class="post-desc-wrapper"> <div class="post-desc">';
            block+='<div class="post-title"><h6 class="heading-regular"><a href="#">'+title+'</a></h6></div>';
            block+='<div class="post-excerpt">';
            block+='<p>'+des+'</p>';
            block+='</div></div></div></div>';
        }
        console.log("LOADNEWS"+block);
        document.getElementById("newFeed").innerHTML=block;
    });

}

$(document).ready(function () {
    loadEvent();
    loadCareer();
    loadNews();
});