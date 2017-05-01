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

    /*
    for (var key in profiles.values[0]) {
        if (profiles.values[0].hasOwnProperty(key)) {
            console.log(key+"\n");
        }
    }
    */

    //use information captured above

    console.log(id+" "+firstName+" "+lastName+" "+photo+" "+headline);

//    document.getElementById("name").value=firstName+" "+lastName;
//    document.getElementById("work").value=headline;
//    document.getElementById("profilePicture").src=photo;
}
