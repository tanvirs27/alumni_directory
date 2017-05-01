<?php
/**
 * Created by PhpStorm.
 * User: anando
 * Date: 5/1/17
 * Time: 3:40 PM
 */
require_once('connect.inc.php');
$sql = "SELECT * FROM news;";

if(($result=$connection->query($sql))==TRUE){
    $jsonData = array();

    while ($array = mysqli_fetch_row($result)) {
        $jsonData[] = $array;
    }

    echo json_encode($jsonData);
}
?>


