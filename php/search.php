<?php
/**
 * Created by PhpStorm.
 * User: rifat
 * Date: 4/23/17
 * Time: 9:09 PM
 */

require_once('connect.inc.php');


//echo "got it. thanks";

$error= 0;
$jsonData = array();

$email= $_POST['email'];

if(strcmp($email,"")==0){
    $sql_user_detail = "SELECT * FROM user WHERE UPPER(name) like UPPER('%". $_POST['name']."%') and "
        ."batch like '%". $_POST['batch']."%' and "
        ."blood like '%". $_POST['blood']."%' and "
        ."UPPER(hometown) like UPPER('%". $_POST['hometown']."%') and "
        ."UPPER(address) like UPPER('%". $_POST['address']."%') and "
        ."UPPER(state) like UPPER('%". $_POST['state']."%') and "
        ."UPPER(country) like UPPER('%". $_POST['country']."%') and "
        ."UPPER(work) like UPPER('%". $_POST['work']."%');";

}else{

    $sql_user_detail = "SELECT * FROM user WHERE email= '". $email."';";
}



if(($result_user_detail=$connection->query($sql_user_detail))==TRUE){

    while ($array = mysqli_fetch_row($result_user_detail)) {
        $jsonData[] = $array;
    }
}else{
    $error= 1;
}

if($error==0){
    echo json_encode($jsonData)."\n";
}else{
    echo "0\n";
}