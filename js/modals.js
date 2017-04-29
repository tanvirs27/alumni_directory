/**
 * Created by anando on 4/27/17.
 */
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

/*$('#loginform').submit(function (e) {
    //e.preventDefault();
    login_func();
})*/

function signMeOut() {
    sessionStorage.removeItem("user_email_login");

}

function morefirst() {
    $('#firstmore').style.display='hide';
    $('#dobdiv').style.display='block';
    $('#blooddiv').style.display='block';
    $('#homediv').style.display='block';
    $('#resadddiv').style.display='block';
    $('#rescondiv').style.display='block';
    $('#resstatediv').style.display='block';
    $('#secmore').style.display='block';
}

function moresec() {
    $('#secmore').style.display='hide';
    $('#curworkdiv').style.display='block';
    $('#fblinkdiv').style.display='block';
    $('#linkeddiv').style.display='block';
}

function login_done() {
    alert("hi");
    $('#login_or_signout').innerHTML="<a href='index.html' onclick='signMeOut()'>Sign Out</a>"
    logInCancel();
}
function login_func() {

    //$('#login-modal').style.display='block';
    //$('#login_or_signout').innerHTML="<a href='index.html' onclick='signMeOut()'>Sign Out</a>";
    //$('#invite_or_request').innerHTML="<a  href='#' data-target='#invite-modal' data-toggle='modal'>Invite Others</a>";
    var name1 = $("#loginusername").val();
    var password = $("#loginpassword").val();



    if (name1 == '') {
        document.getElementById("loginerror_message").innerHTML = "Enter you email";
    }
    else if (password == '') {
        document.getElementById("loginerror_message").innerHTML = "Enter you password";
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


                document.getElementById("bs-example-navbar-collapse-1").innerHTML="<ul class='nav navbar-nav navbar-right'>"+
                    "<li> <a href='search.html'>Search for Alumni</a> </li>"+
                    "<li id='invite_or_request'> <a  href='#' data-target='#invite-modal' data-toggle=\"modal\">Invite Others</a> </li>"+
                    "<li id=\"login_or_signout\"> <a href=\"#\" data-toggle=\"modal\" data-target=\"#login-modal\">Sign Out</a> </li> </ul>";

                logInCancel();

            }
            else {
                document.getElementById("loginerror_message").innerHTML = data;
            }
        });

    }


}

//http://bootsnipp.com/snippets/featured/clean-modal-login-form