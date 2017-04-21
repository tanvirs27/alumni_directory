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