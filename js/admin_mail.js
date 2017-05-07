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

    initial_suggest();
    add_option();
});


function initial_suggest() {
    /**
     * Created by rifat on 5/8/17.
     */

    var REGEX_EMAIL = '([a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@' +
        '(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)';

    $('#mail-to').selectize({
        persist: false,
        maxItems: null,
        maxOptions: 30,
        valueField: 'email',
        labelField: 'name',
        searchField: ['name', 'email'],
        options: [

        ],
        render: {
            item: function(item, escape) {
                return '<div>' +
                    (item.name ? '<span class="name">' + escape(item.name) + '</span>' : '') +
                    (item.email ? '<span class="email">' + escape(item.email) + '</span>' : '') +
                    '</div>';
            },
            option: function(item, escape) {
                var label = item.name || item.email;
                var caption = item.name ? item.email : null;
                return '<div>' +
                    '<span class="label">' + escape(label) + '</span>' +
                    (caption ? '<span class="caption">' + escape(caption) + '</span>' : '') +
                    '</div>';
            }
        },
        createFilter: function(input) {
            var match, regex;

            // email@address.com
            regex = new RegExp('^' + REGEX_EMAIL + '$', 'i');
            match = input.match(regex);
            if (match) return !this.options.hasOwnProperty(match[0]);

            // name <email@address.com>
            regex = new RegExp('^([^<]*)\<' + REGEX_EMAIL + '\>$', 'i');
            match = input.match(regex);
            if (match) return !this.options.hasOwnProperty(match[2]);

            return false;
        },
        create: function(input) {
            if ((new RegExp('^' + REGEX_EMAIL + '$', 'i')).test(input)) {
                return {email: input};
            }
            var match = input.match(new RegExp('^([^<]*)\<' + REGEX_EMAIL + '\>$', 'i'));
            if (match) {
                return {
                    email : match[2],
                    name  : $.trim(match[1])
                };
            }

            return false;
        }
    });


}


function add_option() {


    $.post("../php/admin-get-users.php", {

        data: 'none'

    }, function (data) {
        console.log(data);
        ara= JSON.parse(data);
        //   console.log(ara[0][1]);

        var $select = $("#mail-to").selectize();
        var control = $select[0].selectize;

        for(var i in ara){

            control.addOption({

                email: ara[i]['email'],
                name: ara[i]['name']
            });
        }

    });

}


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

       // to=document.getElementById("mail-to").value;

        var $select = $("#mail-to").selectize();
        var selectize = $select[0].selectize;

        var selected_objects = $.map(selectize.items, function(value) {
            return selectize.options[value];
        });

        to=JSON.stringify(selected_objects);
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