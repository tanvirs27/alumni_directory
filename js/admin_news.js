/**
 * Created by rifat on 5/5/17.
 */

var ara;


$(document).ready(function () {

    var email=sessionStorage.getItem("admin_email");

    if(email==null){
        window.location.href="login";
    }

    get_news();
});

function logout() {

    sessionStorage.removeItem("admin_email");

    window.location.href="login";
}



function get_news() {

    var body = $("#table_body");

    body.html('');

    $.post("../php/newsFinder.php", {

        data: 'none'

    }, function (data) {
        console.log(data);
        ara= JSON.parse(data);
     //   console.log(ara[0][1]);


        for(var i in ara){


             var row = ""+
             "<tr>"+
             "<td>"+ara[i][1]+"</td>"+
             "<td>"+ara[i][2]+"</td>"+

                 "<td>"+"<a href='"+ara[i][3]+"' class='btn btn-info btn-xs'><i class='fa fa-picture-o'></i> See </a>"+"</td>"+

             "<td>"+
                 '<a href="javascript:remove(\''+i+'\')"' +" class='btn btn-danger btn-xs'><i class='fa fa-trash'></i> Delete </a>"+
             "</td>"+
             "</tr>";

            body.append(row);
        }

    });

}


function remove(idx) {
    console.log("removing news: "+idx);


    $.post("../php/news-remove.php", {

        id: ara[idx][0]

    }, function (data) {
        console.log(data);

        get_news();
    });
}


function postNews() {
    $('#newspost-modal').modal('hide');

    $.post("../php/pushnews.php",{
        tit :$('#newsTitle').val(),
        des :$('#newsDes').val(),
        pic : "alumni/uploads/18.png"
    },function (data) {
        console.log(data);

        if(data.includes("1")){
            new PNotify({
                title: 'Success',
                text: "News is posted",
                type: 'success',
                styling: 'bootstrap3'
            });
            $('#newspost-modal').modal('hide');
            get_news();
        }else{
            new PNotify({
                title: 'Failed',
                text: "News can not posted",
                type: 'warning',
                styling: 'bootstrap3'
            });
        }
    });
}