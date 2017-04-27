/**
 * Created by anando on 4/27/17.
 */
function forgetPasswordCancel() {
    document.getElementById("forgetPassword").style.display='none';
}

function forgetPasswordSubmit() {
    document.getElementById("forgetEmailSubmission").innerHTML="<p class='h1' align='center'>Please Check your Email.</p>";
    document.getElementById("forgetPasswordSuccess").style.display='none';
    document.getElementById("forgetPasswordC").value="Ok";
}

function logInForgetPassword() {
    //console.log("HERE I AM");
    document.getElementById("loginModal").style.display='none';
    document.getElementById("forgetPassword").style.display='block';
}

function logInCancel() {
    document.getElementById("loginModal").style.display='none';
}
function logInSuccess() {
    logInCancel();
}