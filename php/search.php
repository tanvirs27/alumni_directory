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

$sql_user_detail = "SELECT * FROM user WHERE name like '%". $_POST['name']."%'";

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