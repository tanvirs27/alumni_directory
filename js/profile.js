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

function loading() {
    var block = "";
    for(i=1; i<32; i++){
        block+='<option value='+'\"'+i+'\">'+i+'</option>';
        //alert(block);
    }
    document.getElementById("profile_day").innerHTML=block;

    block="";
    for(i=1; i<13; i++){
        block+='<option value='+'\"'+i+'\">'+i+'</option>';
        //alert(block);
    }
    document.getElementById("profile_mon").innerHTML=block;

    block="";
    for(i=1970; i<2017; i++){
        block+='<option value='+'\"'+i+'\">'+i+'</option>';
        //alert(block);
    }
    document.getElementById("profile_year").innerHTML=block;

}
$(document).ready(function() {

    loading();
    var email1 = sessionStorage.getItem("user_email_login");

    console.log("from js:: "+email1);


    $.post("php/test.php", {

        email: email1

    }, function (data) {

        console.log("from php:: "+data);


    });

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


        if(ara[0][14].length>0)
            $("#avatar").attr('src', "../"+ara[0][14]);
        else
            $("#avatar").attr('src', 'img/dummy.png');


    });
});



function uploadImage(input) {

    console.log("upload image called");

    if (input.files && input.files[0]) {

        $("#avatar").attr('src', 'img/loading_spinner.gif');

        var email=sessionStorage.getItem("user_email_login");

        var data = new FormData();
        data.append('imageToUpload', input.files[0]);
        data.append('user', email);

        console.log("before ajax "+data);

        $.ajax({
            url: "php/upload-img.php",
            type: "POST",
            data: data,
            processData: false,
            contentType: false,
            success: function (res) {
                // document.getElementById("response").innerHTML = res;
                console.log(res);

                if(res.indexOf("ERR")==-1) {
                    new PNotify({
                        title: 'Success',
                        text: "Avatar updated!",
                        type: 'success',
                        styling: 'bootstrap3'
                    });

                    var splits = res.split("###");
                    console.log(splits);
                    res = splits[1];

                    if(res.length>0)
                        $("#avatar").attr('src', "../"+res);
                    else
                        $("#avatar").attr('src', 'img/dummy.png');

                }
                else {
                    new PNotify({
                        title: 'Error :(',
                        text: "Something went wrong",
                        type: 'error',
                        styling: 'bootstrap3'
                    });
                }
            }
        });

    }
}







