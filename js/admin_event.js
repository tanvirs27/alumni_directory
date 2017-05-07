/**
 * Created by rifat on 5/5/17.
 */

var ara;


$(document).ready(function () {

    var email=sessionStorage.getItem("admin_email");

    if(email==null){
        window.location.href="login";
    }

    get_events();
});

function logout() {

    sessionStorage.removeItem("admin_email");

    window.location.href="login";
}



function get_events() {

    var body = $("#table_body");

    body.html('');

    $.post("../php/admin-eventFinder.php", {

        data: 'none'

    }, function (data) {
        console.log(data);
        ara= JSON.parse(data);
     //   console.log(ara[0][1]);


        for(var i in ara){


             var row = ""+
             "<tr>"+
             "<td>"+ara[i][4]+"</td>"+
             "<td>"+ara[i][1]+"-"+ara[i][2]+"-"+ara[i][3]+"</td>"+

                 "<td>"+ara[i][5]+"</td>"+
                 "<td>"+ara[i][6]+"</td>"+

                 "<td>"+
                 '<a href="javascript:remove(\''+i+'\')"' +" class='btn btn-danger btn-xs'><i class='fa fa-trash'></i> Delete </a>"+
             "</td>"+
             "</tr>";

            body.append(row);
        }

    });

}


function remove(idx) {
    console.log("removing event: "+idx);


    $.post("../php/event-remove.php", {

        id: ara[idx][0]

    }, function (data) {
        console.log(data);

        get_events();
    });
}


function postEvent() {
    $('#eventpost-modal').modal('hide');

    $.post("../php/pushevent.php",{
        tit :$('#eventTitle').val(),
        day :$('#day').val(),
        mon :$('#mon').val(),
        yer :$('#year').val(),
        org :$('#org').val(),
        loc :$('#loc').val()
    },function (data) {
        console.log(data);

        if(data.includes("1")){
            new PNotify({
                title: 'Success',
                text: "Event is posted",
                type: 'success',
                styling: 'bootstrap3'
            });
            $('#eventpost-modal').modal('hide');
            get_events();
        }else{
            new PNotify({
                title: 'Failed',
                text: "Event can not posted",
                type: 'warning',
                styling: 'bootstrap3'
            });
        }
    });
}