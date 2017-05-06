/**
 * Created by rifat on 5/5/17.
 */

$(document).ready(function () {

    var email=sessionStorage.getItem("admin_email");

    if(email==null){
        window.location.href="login";
    }

    get_member_requests();
});

function logout() {

    sessionStorage.removeItem("admin_email");

    window.location.href="login";
}



function get_member_requests() {

    var body = $("#table_body");

    body.html('');

    $.post("../php/membership.php", {

        data: 'none'

    }, function (data) {
        console.log(data);
        var ara= JSON.parse(data);
        console.log(ara[0][1]);


        for(var i in ara){


             var row = ""+
             "<tr>"+
             "<td>"+ara[i][1]+"</td>"+
             "<td>"+ara[i][2]+"</td>"+
             "<td>"+ara[i][3]+"</td>"+
                 "<td>"+"<a href='"+ara[i][4]+"' class='btn btn-info btn-xs'><i class='fa fa-check'></i> Check </a>"+"</td>"+

             "<td>"+
                 '<a href="javascript:invite(\''+ara[i][2]+'\')"' +" class='btn btn-info btn-xs'><i class='fa fa-check'></i> Accept </a>"+
                 '<a href="javascript:remove(\''+ara[i][2]+'\')"' +" class='btn btn-danger btn-xs'><i class='fa fa-remove'></i> Reject </a>"+
             "</td>"+
             "</tr>";

            body.append(row);
        }

    });

}


function remove(email) {
    console.log("removing request: "+email);


    $.post("../php/request-remove.php", {

        email: email

    }, function (data) {
        console.log(data);

        get_member_requests();
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
