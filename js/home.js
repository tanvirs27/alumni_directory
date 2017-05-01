/**
 * Created by anando on 4/27/17.
 */


(function ($) {
    "use strict";

    /*----------------------------
     One Columns Slider
     ------------------------------ */
    $(".columns1").owlCarousel({
        loop:true,
        autoPlay: true,
        items : 1,
        margin:0,
        singleItem: true,
        autoPlaySpeed: 500,
        autoplayTimeout:500
    });


})(jQuery);



function forgetPasswordCancel() {
    $('#forgot-modal').modal('hide');
}
$(document).ready(function () {
    $('#forgetEmailSubmission').submit(function (e) {
        //alert("here");
        e.preventDefault();
        forgetPasswordSubmit();
    });
    $('#request_form').submit(function (e) {
        e.preventDefault();
        reqSuccess();
    });
    $('#loginform').submit(function (e) {
        //alert("login");
        e.preventDefault();
        login_func();
    });
    $('#invitationSubmission').submit(function (e) {
        e.preventDefault();
        invitesend();
    });
    $('#firstmore').click(function () {
        alert("clicked");
        morefirst();
    });


    var email=sessionStorage.getItem("user_email_login");

    if(email==null){
        not_logged_in();
    }else{
        logged_in();
    }
});


function forgetPasswordSubmit() {
    document.getElementById("forgetEmailSubmission").innerHTML="<p class='h5' align='center'>Password Sent.Please Check your Email.</p><input id='forget_pass_submit' type='submit' name='login' class='login loginmodal-submit' value='DONE' onclick='forgetPasswordCancel()'>";

}

function logInForgetPassword() {
    $('#login-modal').modal('hide');

}

function logInCancel() {
    $('#login-modal').modal('hide');
    //document.getElementById("login-modal").style.display='none';
}
function logInSuccess() {
    logInCancel();
}

function invitesend() {
    /*
        TODO: NEED TO SEND EMAIL
     */
    var emailAdderss = $('#invitesendemail').val();
}

function logged_in() {
    document.getElementById("bs-example-navbar-collapse-1").innerHTML="<ul class='nav navbar-nav navbar-right'>"+
        "<li> <a href='search.html'>Search for Alumni</a> </li>"+
        "<li id='invite_or_request'> <a  href='#' data-target='#invite-modal' data-toggle=\"modal\">Invite Others</a> </li>"+
        "<li id=\"login_or_signout\"> <a href=\"javascript:signMeOut()\" >Sign Out</a> </li> </ul>";


    document.getElementById("dashboard-login").innerHTML="<a href=\"search.html\" class=\"bnt bnt-theme login-links\">SEARCH FOR ALUMNI NOW</a>";
}

function not_logged_in() {
    document.getElementById("bs-example-navbar-collapse-1").innerHTML="<ul class='nav navbar-nav navbar-right'>"+
        "<li id='invite_or_request'> <a  href='#' data-target='#request-modal' data-toggle=\"modal\">Request Membership</a> </li>"+
        "<li id=\"login_or_signout\"> <a href=\"#\" data-toggle=\"modal\" data-target=\"#login-modal\">Login</a> </li> </ul>";
}



function reqSuccess() {
    //document.getElementById("requestModal").innerHTML="<p class='h3'>Request Send. Please Wait till admin confirm.</p>"
    //document.getElementById("reqSend").style.display='none';

    reqCancel();
    alert("Request Send. Wait Till Admin confirms.");
}
function reqCancel() {
    //document.getElementById("requestModal").style.display='none';
    $('#request-modal').modal('hide');
}


function signMeOut() {
    sessionStorage.removeItem("user_email_login");
    not_logged_in();
}

function morefirst() {
    //alert("hello");
    //$('#firstmore').style.display='hide';
    document.getElementById('dobdiv').style.display='block';
    document.getElementById('blooddiv').style.display='block';
    document.getElementById('homediv').style.display='block';
    document.getElementById('resadddiv').style.display='block';
    document.getElementById('rescondiv').style.display='block';
    document.getElementById('resstatediv').style.display='block';
    document.getElementById('secmore').style.display='block';
}

function moresec() {
    this.parentElement.style.display='hide';
    //$('#secmore').style.display='hide';
    document.getElementById('curworkdiv').style.display='block';
    document.getElementById('fblinkdiv').style.display='block';
    document.getElementById('linkeddiv').style.display='block';
}




function login_func() {

    //$('#login-modal').style.display='block';
    //$('#login_or_signout').innerHTML="<a href='index.html' onclick='signMeOut()'>Sign Out</a>";
    //$('#invite_or_request').innerHTML="<a  href='#' data-target='#invite-modal' data-toggle='modal'>Invite Others</a>";
    var name1 = $("#loginusername").val();
    var password = $("#loginpassword").val();



    if (name1 == '') {
        document.getElementById("loginerror_message").innerHTML = "Enter you email";
        document.getElementById("loginerror_message").style.display = 'block';
    }
    else if (password == '') {
        document.getElementById("loginerror_message").innerHTML = "Enter you password";
        document.getElementById("loginerror_message").style.display = 'block';
    }
    else {

        $.post("php/login.php", {

            user: name1,
            pass: password

        }, function (data) {


            if (data.includes("1")) {
                //REDIRECT
                sessionStorage.setItem("user_email_login",name1);
               // $('#login_or_signout').innerHTML="<a href='index.html' onclick='signMeOut()'>Sign Out</a>";
                //window.location.href = "search.html";
                //document.getElementById("error_message").innerHTML = data;
                console.log("logged in");

                logged_in();

                logInCancel();

            }
            else {
                document.getElementById("loginerror_message").style.display="block"
                document.getElementById("loginerror_message").innerHTML = data;
                console.log(data);
            }
        });

    }


}



function invite() {
    var invite_email= document.getElementById("invite_email").value;
    var from_email= sessionStorage.getItem("user_email_login");

    console.log("inside invite");

    $.post("php/invite-send.php", {

        invite_email: invite_email,
        from: from_email

    }, function (data) {

        console.log(data);

        if (data=="success") {

            console.log("invite sent");

            new PNotify({
                title: 'Success',
                text: "Invitation sent!",
                type: 'success',
                styling: 'bootstrap3'
            });


        }
        else {
            console.log("error: "+data);
            new PNotify({
                title: 'Error :(',
                text: data,
                type: 'error',
                styling: 'bootstrap3'
            });
        }
    });

    $('#invite-modal').modal('hide');
}


//http://bootsnipp.com/snippets/featured/clean-modal-login-form


//event, job, calendar


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