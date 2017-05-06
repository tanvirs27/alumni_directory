/**
 * Created by anando on 4/27/17.
 */

var linkedinid="none";

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
        request_membership();
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
        //alert("clicked");
        morefirst();
    });

    $('#jobSubmission').submit(function (e) {
       e.preventDefault();
       postJob();
    });


    var email=sessionStorage.getItem("user_email_login");

    if(email==null){
        not_logged_in();
    }else{
        logged_in();
    }
});


function postJob() {
    var email=sessionStorage.getItem("user_email_login");
    var subject = document.getElementById("jobSubject").value;
    var details = document.getElementById("jobDetails").value;
    var links = document.getElementById("jobLink").value;

    $.post("php/postjob.php", {

        mail: email,
        sub : subject,
        det : details,
        lin : links
    }, function (data) {
        console.log(data);
        if(data.includes("1")){
            new PNotify({
                title: 'Success',
                text: "Successfully Posted. Reload Your Browser",
                type: 'success',
                styling: 'bootstrap3'
            });
            $('#job-modal').modal('hide');
        }else{
            new PNotify({
                title: 'Failed',
                text: data.toString(),
                type: 'warning',
                styling: 'bootstrap3'
            });
        }
    });
}

function forgetPasswordSubmit() {
    var emailID = $('#forget_pass_email').val();//document.getElementById("forget_pass_email").value ;
    console.log(emailID);
    $.post("php/forgetpasswordhandler.php", {
        mail: emailID,
        mode: "1"
    }, function (data) {
        if(data.includes("1")){
            var newPass = Math.random().toString(36).slice(-8);
            $.post("php/forgetpasswordhandler.php", {
                mail: emailID,
                mode: "2",
                pass: newPass
            },function (secdata) {
                console.log("####MY DATA INCLUDES#### "+secdata);
                if(secdata.includes("1")){
                    new PNotify({
                        title: 'Success',
                        text: "check you email",
                        type: 'success',
                        styling: 'bootstrap3'
                    });
                }else {
                    new PNotify({
                        title: 'Failed',
                        text: secdata.toString(),
                        type: 'warning',
                        styling: 'bootstrap3'
                    });
                }
            });
        }else{
            new PNotify({
                title: 'Failed',
                text: data.toString(),
                type: 'warning',
                styling: 'bootstrap3'
            });
        }
    });

    $('#forgot-modal').modal('hide');
    //document.getElementById("forgetEmailSubmission").innerHTML="<p class='h5' align='center'>Password Sent.Please Check your Email.</p><input id='forget_pass_submit' type='submit' name='login' class='login loginmodal-submit' value='DONE' onclick='forgetPasswordCancel()'>";

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

function logged_in() {
    document.getElementById("bs-example-navbar-collapse-1").innerHTML="<ul class='nav navbar-nav navbar-right'>"+
        "<li> <a href='search'>Search for Alumni</a> </li>"+
        "<li id='invite_or_request'> <a  href='#' data-target='#invite-modal' data-toggle=\"modal\">Invite Others</a> </li>"+
        "<li id='job_post'> <a  href='#' data-target='#job-modal' data-toggle=\"modal\">Post Job</a> </li>"+
        "<li> <a href='profile'>Profile</a> </li>"+
        "<li id=\"login_or_signout\"> <a href=\"javascript:signMeOut()\" >Sign Out</a> </li> </ul>";


    document.getElementById("dashboard-login").innerHTML="<a href=\"search.html\" class=\"bnt bnt-theme login-links\">SEARCH FOR ALUMNI NOW</a>";
}

function not_logged_in() {
    document.getElementById("bs-example-navbar-collapse-1").innerHTML="<ul class='nav navbar-nav navbar-right'>"+
        "<li id='invite_or_request'> <a  href='#' data-target='#request-modal' data-toggle=\"modal\">Request Membership</a> </li>"+
        "<li id=\"login_or_signout\"> <a href=\"#\" data-toggle=\"modal\" data-target=\"#login-modal\">Login</a> </li> </ul>";
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


            if (data.includes("success")) {
                //REDIRECT
                sessionStorage.setItem("user_email_login",name1);
                // $('#login_or_signout').innerHTML="<a href='index.html' onclick='signMeOut()'>Sign Out</a>";
                //window.location.href = "search.html";
                //document.getElementById("error_message").innerHTML = data;
                console.log("logged in");

                new PNotify({
                    title: 'Success',
                    text: "Successfully signed in",
                    type: 'success',
                    styling: 'bootstrap3'
                });

                logged_in();

                logInCancel();

            }
            else {

                new PNotify({
                    title: 'Error :(',
                    text: data,
                    type: 'error',
                    styling: 'bootstrap3'
                });
                //document.getElementById("loginerror_message").style.display="block"
                //document.getElementById("loginerror_message").innerHTML = data;
                console.log(data);
            }
        });

    }


}


function login_with_linkedin(id) {
    $.post("php/login-linkedin.php", {


        linkedinid: id

    }, function (data) {

        if(data.includes("###ERROR1###")){

            new PNotify({
                title: 'Error :(',
                text: "This linkedin id is not registerred",
                type: 'error',
                styling: 'bootstrap3'
            });

        }
        else if(data.includes("###ERROR2###")){

            new PNotify({
                title: 'Error :(',
                text: "Could not sign in",
                type: 'error',
                styling: 'bootstrap3'
            });

        }
        else {
            //REDIRECT
            sessionStorage.setItem("user_email_login",data);
            // $('#login_or_signout').innerHTML="<a href='index.html' onclick='signMeOut()'>Sign Out</a>";
            //window.location.href = "search.html";
            //document.getElementById("error_message").innerHTML = data;
            console.log("logged in");

            new PNotify({
                title: 'Success',
                text: "Successfully signed in",
                type: 'success',
                styling: 'bootstrap3'
            });

            logged_in();

            logInCancel();

        }

    });
}


function request_membership() {
    var req_email= document.getElementById("reqemail").value;
    var req_name= document.getElementById("reqname").value;
    var req_batch= document.getElementById("reqbatch").value;
    var req_url= document.getElementById("requrl").value;

    console.log("inside invite");

    $.post("php/request-add.php", {

        name: req_name,
        email: req_email,
        batch: req_batch,
        social: req_url

    }, function (data) {

        console.log(data);

        if (data.includes("success")) {

            console.log("request added");

            new PNotify({
                title: 'Success',
                text: "Your request is sent!",
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

    $('#request-modal').modal('hide');
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

        if (data.includes("success")) {

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
        if(block == ""){
            block='<h3 class="h3">No Event Available</h3>';
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
            if(ara[i]['pp'] != ""){
                pp = "../"+ara[i]['pp'];
            }
            block+='<div class="list-group-item">';
            block+='<div class="company-item clearfix">';
            block+='<div class="company-logo">';
            block+="<img src='"+pp+"'"+"alt=''"+"style='height: 100px;width: 100px;'>";
            block+='</div>';
            block+='<div class="company-desc-wrapper">';
            block+='<div class="company-desc">';
            block+='<div class="company-title"><h6 class="heading-regular"><a href=https://"'+link+'">'+title+'</a></h6></div>';
            block+='<div class="company-excerpt">';
            var ind = i.toString();
            block+='<p id="jobdes'+ind+'">'+des.substr(0,50)+'</p>';
            if(des.length>50){
                block+='<p style="display: none" id="jobdesdetails'+ind+'">'+des+'</p>';
                block+='<p style="display: none" id="jobdlinkdetails'+ind+'">'+link+'</p>';
                block+='<p style="display: none" id="jobdtitleetails'+ind+'">'+title+'</p>';
                block+='<a href="#careerLog" style="margin-left: 110px;color: #0a568c; "';
                block+='data-count="'+ind+'" id="morejob'+ind+'"';
                block+='onclick="showjobdetails(this)">More...</a>';
            }
            block+='</div></div></div></div></div>';
        }
        if(block == ""){
            block='<h3 class="h3">No Career News Available</h3>';
        }

        document.getElementById("careerLog").innerHTML=block;
        console.log("From php::" +data);
    });
}

function showjobdetails(obj) {
    var ind = obj.getAttribute("data-count");
    console.log(ind);
    //obj.display='none';
    //document.getElementById("morejob"+ind).style.display='none';
    //document.getElementById("jobdes"+ind).style.display='none';
    var title = document.getElementById("jobdtitleetails"+ind).innerHTML;
    var link = document.getElementById("jobdlinkdetails"+ind).innerHTML;
    var details = document.getElementById("jobdesdetails"+ind).innerHTML;
    console.log(title);
    document.getElementById("jobdetailsdescription").innerHTML=details;
    document.getElementById("jobdetailslink").setAttribute("href",link);
    document.getElementById("jobdetailstitle").innerHTML = title;
    $('#jobmodal').modal('show');
}

function loadNews(){

    $.post("php/newsFinder.php", {


    }, function (data) {
        ara= JSON.parse(data);
        console.log(ara);
        var block="";
        var i;
        var cou = 0;
        for (i in ara){
            cou++;
            var img = "../"+ara[i][2];
            var title=ara[i][0];
            var des = ara[i][1];
            block+='<div class="list-group-item">'
            block+='<div class="post-item clearfix ">';
            block+='<div class="image-frame post-photo-wrapper">';
            //block+='<a href="#"> <img src="'+img+'"'+'alt="" height="100px" width="100px"></a>';
            block+='<a href="#newFeed"> <img src="'+img+'"'+'alt="" height="100px" width="100px"></a>';
            block+='</div> <div class="post-desc-wrapper"> <div class="post-desc">';
            block+='<div class="post-title"><h6 class="heading-regular"><a href="#newFeed">'+title+'</a></h6></div>';
            block+='<div class="post-excerpt">';
            var mnumb = cou.toString();
            block+='<p id="eventdes'+mnumb+'">'+des.substr(0,50)+'...</p>';
            //block+='<p id="eventdes"+i>'+des.substr(0,10)+'</p>';
            if(des.length>50){
                block+='<p style="display: none" id="eventdesdetails'+mnumb+'">'+des+'</p>';
                block+='<p style="display: none" id="eventtitledetails'+mnumb+'">'+title+'</p>';
                block+='<p style="display: none" id="eventlinkdetails'+mnumb+'">'+img+'</p>';
                //
                block+='<a href="#newFeed" style="margin-left: 110px;color: #0a568c; "';
                block+='data-count="'+mnumb+'" id="more'+mnumb+'"';
                block+='onclick="showeventdetails(this)">More...</a>';
            }
            block+='</div></div></div></div></div>';
        }
        if(block == ""){
            block='<h3 class="h3">No News Available</h3>';
        }
        console.log("LOADNEWS"+block);
        document.getElementById("newFeed").innerHTML=block;
    });

}

function showeventdetails(obj) {

    //alert(obj.getAttribute("data-count"));
    var ind = obj.getAttribute("data-count");
    //obj.display='none';
    //document.getElementById("more"+ind).style.display='none';
    var des = document.getElementById("eventdesdetails"+ind).innerHTML;
    var title = document.getElementById("eventtitledetails"+ind).innerHTML;
    var link = document.getElementById("eventlinkdetails"+ind).innerHTML;
    console.log(link+" "+des+" "+title);
    document.getElementById("mynewsdetailsdescription").innerHTML=des;
    document.getElementById("newsdetailslink").setAttribute("src",link);
    document.getElementById("newsdetailstitle").innerHTML = title;
    $('#newsmodal').modal('show');
}


//linkedin

/**
 * Created by rifat on 4/10/17.
 */

function OnLinkedInFrameworkLoad() {
    IN.Event.on(IN, "auth", OnLinkedInAuth);

    // $('a[id*=li_ui_li_gen_]').css({marginBottom:'20px'})
    //    .html('<img src="img/ln-button.jpg" height="50" width="100% border="0" />');


    $('a[id*=li_ui_li_gen_]')
        .html('<a style="background-color: #1C2833; width: 290px;" class="btn btn-block btn-social btn-linkedin" > <span class="fa fa-linkedin"></span> Sign in with LinkedIn </a> ');


}

function OnLinkedInAuth() {
    IN.API.Profile("me").result(ShowProfileData);
}

function ShowProfileData(profiles) {
    var member = profiles.values[0];
    var id=member.id;
    var firstName=member.firstName;
    var lastName=member.lastName;
    var photo=member.pictureUrl;
    var headline=member.headline;

    console.log(id+" "+firstName+" "+lastName+" "+photo+" "+headline);

    linkedinid=id;

    login_with_linkedin(id);
}



$(document).ready(function () {
    loadEvent();
    loadCareer();
    loadNews();
});