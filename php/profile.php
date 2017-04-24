<?php
/**
 * Created by PhpStorm.
 * User: rifat
 * Date: 4/24/17
 * Time: 1:56 PM
 */


require_once('connect.inc.php');

$email= $_POST['email'];

$sql= "select * FROM user WHERE email='".$email."';";


if(($result=$connection->query($sql))==TRUE){

    $jsonData = array();

    while ($array = mysqli_fetch_row($result)) {
        $jsonData[] = $array;
    }

    echo json_encode($jsonData);
}
else{
    //echo mysqli_error($connection);
}