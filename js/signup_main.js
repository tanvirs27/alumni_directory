/****
 *	Author: Tanvir Shahriar Rifat
 *	Email: rifat.csedu20@gmail.com
 *****/


for(var i=1; i<=23; i++){
    var select = document.getElementById("batch");
    var option = document.createElement("OPTION");
    select.options.add(option);
    option.text = i;
    option.value = i;
}

/*
    Author: Md. Muhaimin Shah Pahalovi.
    Email: anandocse@gmail.com
 */



document.getElementById("uploadpic").onchange = function () {
    document.getElementById("profilePicture").src = this.previousElementSibling.value;
};

window.onscroll = function () {
    scrollFunc();
}

function scrollFunc() {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        document.getElementById("upScroll").style.display = "block";
    } else {
        document.getElementById("upScroll").style.display = "none";
    }
}

function goUp() {
    document.body.scrollTop = 0; // For Chrome, Safari and Opera
    document.documentElement.scrollTop = 0; // For IE and Firefox
}

var saved;
function ppChange() {
    saved = document.getElementById("profilePicture").getAttribute("src");
    var doc = document.getElementById("profilePicture").src = "img/up_arrow.png";
}
function ppAfterMouse() {
    document.getElementById("profilePicture").src = saved;
}