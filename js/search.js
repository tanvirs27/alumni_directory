/****
 *	Author: Tanvir Shahriar Rifat
 *	Email: rifat.csedu20@gmail.com
 *****/

var select = document.getElementById("batch");
var option = document.createElement("OPTION");
select.options.add(option);
option.text = 'any';
option.value = '';

for(var i=1; i<=23; i++){
    var select = document.getElementById("batch");
    var option = document.createElement("OPTION");
    select.options.add(option);
    option.text = i;
    option.value =""+i+"";
}

function search_it() {

    var name= $("#name").val();
    var email= $("#email").val();
    var batch= $("#batch").val();
    var blood= $("#blood").val();
    var work= $("#work").val();
    var address= $("#address").val();
    var state= $("#state").val();
    var country= $("#country").val();
    var hometown= $("#hometown").val();

    $.post("php/search.php",{

            name: name,
            email: email,
            batch: batch,
            blood: blood,
            hometown: hometown,
            address: address,
            state: state,
            country: country,
            work: work
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


