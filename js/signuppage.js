/**
 * Created by anando on 4/30/17.
 */

var linkedinid="none";


$(document).ready(function() {

    $.post("php/check-invite.php", {

        data:"none"

    }, function (data) {

        if (data.includes("success")) {

        }
        else {
            new PNotify({
                title: 'Error in Invitation Code',
                text: data,
                type: 'error',
                styling: 'bootstrap3'
            });

            window.location.href="index.html";
        }

    });

});


//creating batch element
for(var i=1; i<=23; i++){
    var select = document.getElementById("signupbatch");
    var option = document.createElement("OPTION");
    select.options.add(option);
    option.text = i;
    option.value = ""+i+"";
}


function registerClick() {
    var name = $('#signupname').val();
    var email = $('#signupmail').val();
    var confemail = $('#signupconfmail').val();
    var pass = $('#signuppassword').val();
    var confpass = $('#signupconfpassword').val();
    var batch = $('#signupbatch').val();
    //var createMessage = "check";
    //alert("HERE");
    if(name.length == 0){
        showWaring("Enter your name");
    }
    else if(email.length == 0){
        showWaring("Enter your email address");
    }
    else if(confemail.length == 0){
        showWaring("Fill up REPEAT EMAIL BOX");
    }
    else if(email != confemail){
        showWaring("Email and REPEATED EMAIL not matched");
    }
    else if(pass.length == 0 && linkedinid=="none"){
        showWaring("Enter your password");
    }
    else if(confpass.length ==0 && linkedinid=="none"){
        showWaring("Enter your Confirm password");
    }
    else if(confpass!=pass && linkedinid=="none"){
        showWaring("Password and Confrim password not matched");
    }
    else if(batch <= 0){
        showWaring("Enter correct batch number");
    }
    else{

        NProgress.start();

        $.post("php/signup.php", {

            name:name,
            password: pass,
            email: email,
            batch: batch,
            linkedinid: linkedinid

        }, function (data) {
            NProgress.done();
            NProgress.remove();

            if (data.includes("success")) {
                new PNotify({
                    title: 'Success',
                    text: 'You have successfully joined CSEDU Alumni Directory',
                    type: 'success',
                    styling: 'bootstrap3'
                });
            }
            else {
                new PNotify({
                    title: 'Error in Signup',
                    text: data,
                    type: 'error',
                    styling: 'bootstrap3'
                });

            }

        });

    }
}



function showWaring(mess) {
    document.getElementById("signupwarning").style.display='none';
    document.getElementById("warningmessage").innerHTML=mess;
    document.getElementById("signupwarning").style.display='block';
    //$('#warningmessage').innerHTML=mess;
    //$('#signupwarning').style.display='block';
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
        .html('<a class="btn btn-block btn-social btn-linkedin"> <span class="fa fa-linkedin"><strong>in</strong></span> Sign in with LinkedIn </a> ');


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


    document.getElementById("pass-div").style.display="none";
    document.getElementById("conf-pass-div").style.display="none";
    document.getElementById("signupname").value=firstName+" "+lastName;

    linkedinid=id;
}
