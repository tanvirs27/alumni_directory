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

        window.location.href="index.html";
    }

    var email1 = sessionStorage.getItem("user_email_login");


    $.post("php/profile.php", {

        email: email1

    }, function (data) {
        console.log(data);
        var ara= JSON.parse(data);
        //console.log(ara[0][1]);

        var count=0;
        for(var i=1;i<=14;i++){

            if(ara[0][i]==""){
                count++;
            }
        }

        var x= 14-count;

        var par= x*100.0/14.0;

        var com= Math.round(par);


        if(com==100){
            document.getElementById("completeness").style.display="none";
        }else {
            document.getElementById("completeness").innerHTML = '<p class="bg-info">Your profile is ' + com + '% complete. Complete it <a href="profile">here</a></p>';
        }


    });


    $('#jobSubmission').submit(function (e) {
        e.preventDefault();
        postJob();
    });


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

    window.location.href="index.html";
}


function invite() {
    var invite_email= document.getElementById("invite_email").value.trim();
    var from_email= sessionStorage.getItem("user_email_login");

    console.log("inside invite");

    $.post("php/invite-send.php", {

        invite_email: invite_email,
        from: from_email

    }, function (data) {

        console.log(data);

        if (data.includes("success")) {

            console.log("invite sent");

            new PNotify({
                title: 'Success',
                text: "Invitation sent!",
                type: 'success',
                styling: 'bootstrap3'
            });


        }
        else {
            console.log("error: "+data);
            new PNotify({
                title: 'Error :(',
                text: data,
                type: 'error',
                styling: 'bootstrap3'
            });
        }
    });

    $('#invite-modal').modal('hide');
}


function postJob() {
    var email=sessionStorage.getItem("user_email_login");
    var subject = document.getElementById("jobSubject").value;
    var details = document.getElementById("jobDetails").value;
    var links = document.getElementById("jobLink").value;

    $.post("php/postjob.php", {

        mail: email,
        sub : subject,
        det : details,
        lin : links
    }, function (data) {
        console.log(data);
        if(data.includes("1")){
            new PNotify({
                title: 'Success',
                text: "Successfully Posted. Reload Your Browser",
                type: 'success',
                styling: 'bootstrap3'
            });
            $('#job-modal').modal('hide');
        }else{
            new PNotify({
                title: 'Failed',
                text: data.toString(),
                type: 'warning',
                styling: 'bootstrap3'
            });
        }
    });
}
