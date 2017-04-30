/**
 * Created by anando on 4/30/17.
 */
function registerClick() {
    var name = $('#singupname').val();
    var email = $('#signupmail').val();
    var confemail = $('#signupconfmail').val();
    var pass = $('#signuppassword').val();
    var confpass = $('#signupconfpassword').val();
    var batch = $('#signupbatch').val();
    //var createMessage = "check";
    //alert("HERE");
    if(email.length == 0){
        showWaring("Enter your email address");
    }
    else if(confemail.length == 0){
        showWaring("Fill up REPEAT EMAIL BOX");
    }
    else if(email != confemail){
        showWaring("Email and REPEATED EMAIL not matched");
    }
    else if(pass.length == 0){
        showWaring("Enter your password");
    }
    else if(confpass.length ==0){
        showWaring("Enter your Confirm password");
    }
    else if(confpass!=pass){
        showWaring("Password and Confrim password not matched");
    }
    else if(batch <= 0){
        showWaring("Enter correct batch number");
    }
    else{
        //TODO: REGISTER YOURSER
    }
}



function showWaring(mess) {
    document.getElementById("signupwarning").style.display='none';
    document.getElementById("warningmessage").innerHTML=mess;
    document.getElementById("signupwarning").style.display='block';
    //$('#warningmessage').innerHTML=mess;
    //$('#signupwarning').style.display='block';
}