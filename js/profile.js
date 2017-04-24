/**
 * Created by anando on 4/21/17.
 */
function makeConfirmPasswordWriteable() {
    document.getElementById("confirmpass").readOnly = false;
}


function testingPassowrd() {
    var mypass = document.getElementById("mypass").value;
    var confpass = document.getElementById("confirmpass").value;

    if(mypass != confpass){
        $('#alert_message').hide();
        $('#alert_message').html('<div class="alert alert-info alert-dismissable" id="alert_message"><a class="panel-close close" data-dismiss="alert">×</a><i class="fa fa-coffee"></i><strong>'+"password and confirm password"+'</strong>'+" missmatched"+'</div>').show();
        $('#alert_message').show();
        $('#submit_button').prop('disabled', true);
    }
    else{
        $('#alert_message').hide();
        $('#submit_button').prop('disabled', false);
    }
}

function submitCheck() {
    testingPassowrd();
}


$(document).ready(function() {

    var email1 = sessionStorage.getItem("user_email_login");

    $.post("php/profile.php", {

        email: email1

    }, function (data) {
        console.log(data);
        var ara= JSON.parse(data);
        console.log(ara[0][1]);

        document.getElementById("profile_name").value = ara[0][1];
        document.getElementById("profile_email").value = ara[0][0];
        document.getElementById("mypass").value = ara[0][2];
        document.getElementById("profile_batch").value = ara[0][3];
        document.getElementById("profile_contact_number").value = ara[0][5];
        //document.getElementById("profile_email").value = ara[0][0];
        document.getElementById("profile_blood_group").value = ara[0][6];
        document.getElementById("profile_hometown").value = ara[0][7];
        document.getElementById("profile_reside").value = ara[0][8];
        document.getElementById("profile_res_state").value = ara[0][9];
        document.getElementById("profile_resd_country").value = ara[0][10];
        //document.getElementById("profile_email").value = ara[0][0];
        //document.getElementById("profile_email").value = ara[0][0];
        //document.getElementById("profile_email").value = ara[0][0];
        //document.getElementById("profile_email").value = ara[0][0];

    });
});





