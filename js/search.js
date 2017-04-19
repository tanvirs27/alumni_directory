/**
 * Created by rifat on 4/19/17.
 */

var select = document.getElementById("batch");
var option = document.createElement("OPTION");
select.options.add(option);
option.text = 'any';
option.value = 'any';

for(var i=1; i<=23; i++){
    var select = document.getElementById("batch");
    var option = document.createElement("OPTION");
    select.options.add(option);
    option.text = i;
    option.value = i;
}