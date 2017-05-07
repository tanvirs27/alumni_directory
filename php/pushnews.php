<?php
/**
 * Created by PhpStorm.
 * User: root
 * Date: 5/8/17
 * Time: 12:42 AM
 */
require_once('connect.inc.php');

$tit = $_POST['tit'];
$des = $_POST['des'];
$pic = $_POST['pic'];

$sql = "INSERT INTO news (title,description,pic) VALUES ('$tit','$des','$pic');";
if(($result= $connection->query($sql))==TRUE){
    echo "1"."\n";
}else $connection->error."\n";

?>