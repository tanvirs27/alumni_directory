/* When the user clicks on the button,
 toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}




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
                window.location.href = "search.html";
                //document.getElementById("error_message").innerHTML = data;
            }
            else {
                document.getElementById("error_message").innerHTML = data;
            }
        });

    }


}