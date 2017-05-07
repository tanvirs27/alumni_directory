/**
 * Created by rifat on 5/5/17.
 */

var ara;


$(document).ready(function () {

    var email=sessionStorage.getItem("admin_email");

    if(email==null){
        window.location.href="login";
    }

    get_job_posts();
});

function logout() {

    sessionStorage.removeItem("admin_email");

    window.location.href="login";
}



function get_job_posts() {

    var body = $("#table_body");

    body.html('');

    $.post("../php/careerFinder.php", {

        data: 'none'

    }, function (data) {
        console.log(data);
        ara= JSON.parse(data);
     //   console.log(ara[0][1]);


        for(var i in ara){


             var row = ""+
             "<tr>"+
             "<td>"+ara[i]['title']+"</td>"+
             "<td>"+ara[i]['poster']+"</td>"+

                 "<td>"+"<a href='"+ara[i]['joblink']+"' class='btn btn-info btn-xs'><i class='fa fa-check'></i> Check </a>"+"</td>"+

             "<td>"+
                 '<a href="javascript:remove(\''+i+'\')"' +" class='btn btn-danger btn-xs'><i class='fa fa-trash'></i> Delete </a>"+
             "</td>"+
             "</tr>";

            body.append(row);
        }

    });

}


function remove(idx) {
    console.log("removing request: "+idx);


    $.post("../php/job-remove.php", {

        id: ara[idx]['id']

    }, function (data) {
        console.log(data);

        get_job_posts();
    });
}


function postJob() {
    var email= "rifat.csedu20@gmail.com";
    var subject = document.getElementById("jobSubject").value;
    var details = document.getElementById("jobDetails").value;
    var links = document.getElementById("jobLink").value;

    $.post("../php/postjob.php", {

        mail: email,
        sub : subject,
        det : details,
        lin : links
    }, function (data) {
        console.log(data);
        if(data.includes("1")){
            new PNotify({
                title: 'Success',
                text: "Job is posted",
                type: 'success',
                styling: 'bootstrap3'
            });
            $('#job-modal').modal('hide');
            get_job_posts();
        }else{
            new PNotify({
                title: 'Failed',
                text: data,
                type: 'warning',
                styling: 'bootstrap3'
            });
        }
    });
}