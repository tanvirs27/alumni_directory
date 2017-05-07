<?php
/**
 * Created by PhpStorm.
 * User: root
 * Date: 5/8/17
 * Time: 12:35 AM
 */
require_once('connect.inc.php');

$day = $_POST['day'];
$mon = $_POST['mon'];
$yer = $_POST['yer'];
$tit = $_POST['tit'];
$org = $_POST['org'];
$loc = $_POST['loc'];

$sql = "INSERT INTO event (mday,mon,yr,title,organization,location) VALUES ($day,$mon,$yer,'$tit','$org','$loc');";

if(($result= $connection->query($sql))==TRUE){
    echo "1"."\n";
}else $connection->error."\n";

?>