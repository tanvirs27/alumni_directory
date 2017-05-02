/* When the user clicks on the button,
 toggle between hiding and showing the dropdown content */



function login_func() {


    var name1 = $("#username").val();
    var password = $("#password").val();

    if (name1 == '') {
        document.getElementById("error_message").innerHTML = "Enter you email";
    }
    else if (password == '') {
        document.getElementById("error_message").innerHTML = "Enter you password";
    }
    else {

        $.post("php/login.php", {

            user: name1,
            pass: password

        }, function (data) {


            if (data.includes("1")) {
                //REDIRECT
                sessionStorage.setItem("user_email_login",name1);
                window.location.href = "search.html";
                //document.getElementById("error_message").innerHTML = data;
            }
            else {
                document.getElementById("error_message").innerHTML = data;
            }
        });

    }


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
        .html('<a class="btn btn-block btn-social btn-linkedin"> <span class="fa fa-linkedin"></span> Sign in with LinkedIn </a> ');


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
}
