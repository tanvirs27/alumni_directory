/**
 * Created by rifat on 5/6/17.
 */

function login() {

    var email = $("#email").val();
    var password = $("#password").val();


    $.post("../php/admin-login.php", {

        email: email,
        password: password

    }, function (data) {


        if (data.includes("success")) {

            sessionStorage.setItem("admin_email",email);

            console.log("logged in as admin");

            new PNotify({
                title: 'Success',
                text: "Successfully signed in",
                type: 'success',
                styling: 'bootstrap3'
            });

            window.location.href = "index.html";

        }
        else {

            new PNotify({
                title: 'Error :(',
                text: data,
                type: 'error',
                styling: 'bootstrap3'
            });

            console.log(data);
        }
    });




}
