/****
 *	Author: Tanvir Shahriar Rifat
 *	Email: rifat.csedu20@gmail.com
 *****/

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

$(document).ready(function(){

    $("#submit_2").click(function(){

        var name1= $("#name").val();
        var email1= $("#email").val();
        var batch1= $("#batch").val();
        var blood1= $("#blood").val();

        if(name1== ''){
            alert("Please fill the required fields");
        }else{

            $.post("php/search.php",{

                name: name1,
                email: email1,
                batch: batch1,
                blood: blood1
            },function(data){

                //alert(data);
                /*$("#returnmessage").html("");
                $("#returnmessage").append(data);

                if(data.includes("Thank you for your valuable feedback")){
                    $("#form")[0].reset();
                }
                */

                var ara= JSON.parse(data);
                //console.log(ara.size);
                var block="";
                var i;
                for(i in ara){
                    console.log('i '+i);
                    if(i%4==0){
                        console.log("here");
                        block+='<div class="row">';
                    }
                    var email= ara[i][0];
                    var name= ara[i][1];
                    var batch= ara[i][3];

                    console.log(email+" "+name+" "+batch);

                    block+='<div class="col-md-3">';
                    block+='<div class="block">';
                    block+='<div class="thumbnail">';
                    block+='<img src="img/dummy.png" alt="" class="img-responsive">';
                    block+='<div class="caption">';
                    block+='<h1>'+name+'</h1>';
                    block+='<p>Batch: '+batch+'</p>';
                    block+='<p>Email: '+email+'</p>';
                    block+='<a class="btn" href="#">more</a></div></div></div></div>';

                    if(i%4==3){
                        console.log("here 2");
                        block+='</div>';
                    }
                }
                if(i%4!=3){
                    block+='</div>';
                }

                document.getElementById("search-results").innerHTML=block;

            });

        }


    });


});


