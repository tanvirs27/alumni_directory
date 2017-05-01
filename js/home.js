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