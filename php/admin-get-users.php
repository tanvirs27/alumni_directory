<?php
/**
 * Created by PhpStorm.
 * User: rifat
 * Date: 5/8/17
 * Time: 4:28 AM
 */
require_once('connect.inc.php');

$sql = "SELECT email, name FROM user;";

if(($result=$connection->query($sql))==TRUE){
    $jsonData = array();

    while ($row = mysqli_fetch_row($result)) {
        //$jsonData[] = $array;
        $temp['email'] = $row[0];
        $temp['name']=$row[1];

        $jsonData[]=$temp;
    }

    echo json_encode($jsonData);
}
