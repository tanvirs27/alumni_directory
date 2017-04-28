/**
 * Created by anando on 4/27/17.
 */
function forgetPasswordCancel() {
    $('#forgot-modal').modal('hide');
}

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

function reqSuccess() {
    //document.getElementById("requestModal").innerHTML="<p class='h3'>Request Send. Please Wait till admin confirm.</p>"
    //document.getElementById("reqSend").style.display='none';
    reqCancel();
    alert("Request Send. Wait Till Admin confirms.");
}
function reqCancel() {
    document.getElementById("requestModal").style.display='none';
}

//http://bootsnipp.com/snippets/featured/clean-modal-login-form