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

