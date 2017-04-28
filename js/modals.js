/**
 * Created by anando on 4/27/17.
 */
function forgetPasswordCancel() {
    $('#forgot-modal').modal('hide');
}

$('#forgetEmailSubmission').submit(function (e) {
    e.preventDefault();
    forgetPasswordSubmit();
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

$('#request_form').submit(function (e) {
    e.preventDefault();
    reqSuccess();
});
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

$('#loginform').submit(function (e) {
    e.preventDefault();
    login_func();
})
function login_func() {


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

            //alert(data);
            /*$("#returnmessage").html("");
             $("#returnmessage").append(data);

             if(data.includes("Thank you for your valuable feedback")){
             $("#form")[0].reset();
             }
             */
            if (data.includes("1")) {
                //REDIRECT
                sessionStorage.setItem("user_email_login",name1);
                //window.location.href = "search.html";
                //document.getElementById("error_message").innerHTML = data;
            }
            else {
                document.getElementById("error_message").innerHTML = data;
            }
        });

    }


}

//http://bootsnipp.com/snippets/featured/clean-modal-login-form