/**
 * Created by rifat on 5/7/17.
 */


$(document).ready(function () {

    var select = document.getElementById("mail-to-batch");
    var option = document.createElement("OPTION");
    select.options.add(option);
    option.text = 'any';
    option.value = '';

    for(var i=1; i<=23; i++){
        var select = document.getElementById("mail-to-batch");
        var option = document.createElement("OPTION");
        select.options.add(option);
        option.text = i;
        option.value =""+i+"";
    }


});


function mailType(){

    var val=document.getElementById("mail-type").value;

    if(val=="1"){

        document.getElementById("mail-ind-div").style.display="block";
        document.getElementById("mail-batch-div").style.display="none";
    }else{

        document.getElementById("mail-ind-div").style.display="none";
        document.getElementById("mail-batch-div").style.display="block";
    }
}


function sendMail() {

    var type=document.getElementById("mail-type").value;

    var to;

    if(type=="1"){

        to=document.getElementById("mail-to").value;
    }else{

        to=document.getElementById("mail-to-batch").value;
    }


    var subject=document.getElementById("mail-subject").value;
    var body=document.getElementById("mail-body").value;


    $.post("../php/admin-mail-send.php", {

        type: type,
        to: to,
        subject: subject,
        body: body

    }, function (data) {
        console.log(data);

        if(data.includes("success")){

            new PNotify({
                title: 'Success',
                text: "Mail sent!",
                type: 'success',
                styling: 'bootstrap3'
            });
        }else{
            new PNotify({
                title: 'Error :(',
                text: "Mail can not be sent!",
                type: 'error',
                styling: 'bootstrap3'
            });

        }

    });

}