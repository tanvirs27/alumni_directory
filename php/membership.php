<?php
/**
 * Created by PhpStorm.
 * User: rifat
 * Date: 5/5/17
 * Time: 11:30 PM
 */

require_once('connect.inc.php');


$sql= "select * FROM membership;";


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
