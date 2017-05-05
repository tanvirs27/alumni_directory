/****
 *	Author: Tanvir Shahriar Rifat
 *	Email: rifat.csedu20@gmail.com
 *****/


var ara;


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


$(document).ready(function () {

    var email=sessionStorage.getItem("user_email_login");

    if(email==null){

        window.location.href="index";
    }

});

function showProfile(i) {


    console.log(ara[i][0]);
    $('#profileshow-modal').modal('show');

    if(ara[0][14].length>0)
        $("#profile-img").attr('src', "../"+ara[0][14]);
    else
        $("#profile-img").attr('src', 'img/dummy.png');

    for(var j=0;j<=13;j++){
        if(j==2){
            continue;
        }

        var element= document.getElementById("profile"+j).value=ara[i][j];


        if(!ara[i][j]){
            console.log("no data available");
            document.getElementById("profilediv"+j).style.display="none";
        }else{
            //element.style.display="hide";
            element.value=ara[i][j];
        }
    }


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

            ara= JSON.parse(data);
            //console.log(ara.size);
            var block="";
            var i;
            for(i in ara){
                console.log('i '+i);
                if(i%4==0){

                    block+='<div class="row">';
                }
                var email= ara[i][0];
                var name= ara[i][1];
                var batch= ara[i][3];

                console.log(email+" "+name+" "+batch);

                var temp="javascript:showProfile("+i+")";

                var img='./img/dummy.png';

                if(ara[i][14]!="" && ara[i][14]!=null){
                    img= "../"+ara[i][14]
                }

                block+='<div class="col-md-3">';
                block+='<div class="block">';
                block+='<div class="thumbnail">';
                block+='<img src="'+img+'" alt="" class="img-responsive" >';
                block+='<div class="caption">';
                block+='<h1>'+name+'</h1>';
                block+='<p>Batch: '+batch+'</p>';
                block+='<p>Email: '+email+'</p>';
                //block+='<a class="btn" href="#" data-toggle="modal" data-target="#profileshow-modal">more</a></div></div></div></div>';

                block+='<a class="btn" href="'+temp+'">more</a></div></div></div></div>';

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


function signout() {
    sessionStorage.removeItem("user_email_login");

    window.location.href="index";
}