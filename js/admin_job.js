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
                 '<a href="javascript:invite(\''+i+'\')"' +" class='btn btn-info btn-xs'><i class='fa fa-pencil'></i> Edit </a>"+
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


function invite(invite_email) {

    if(invite_email=='FROM_MODAL')
        invite_email= document.getElementById("invite_email").value;

    console.log("invite email: "+invite_email );

    $.post("../php/admin-invite-send.php", {

        invite_email: invite_email,
        from: "admin"

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
    remove(invite_email);
}
