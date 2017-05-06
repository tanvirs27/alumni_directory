<?php
/**
 * Created by PhpStorm.
 * User: anando
 * Date: 5/1/17
 * Time: 1:28 PM
 */
require_once('connect.inc.php');

$sql = "SELECT * FROM career;";
if(($result=$connection->query($sql))==TRUE){
    $jsonData = array();

    while ($row = mysqli_fetch_row($result)) {
        //$jsonData[] = $array;
        $temp['title'] = $row[1];
        $temp['description']=$row[2];
        $temp['joblink']=$row[4];
        $temp['poster']=$row[3];
        $temp['id']=$row[0];

        $sql = "SELECT * FROM user WHERE email='$row[3]'";
        if($myresult = $connection->query($sql)){
            if($row = mysqli_fetch_row($myresult)){
                $temp['pp']=$row[14];
            }else $connection->error."\n";
        }

        $jsonData[]=$temp;
    }

    echo json_encode($jsonData);
}
?>