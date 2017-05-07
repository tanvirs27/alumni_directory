<?php
/**
 * Created by PhpStorm.
 * User: root
 * Date: 5/7/17
 * Time: 9:53 PM
 */
require_once('connect.inc.php');
$name = $_POST['name'];
$pass = $_POST['pass'];
$batch = $_POST['batch'];
$contact = $_POST['contact'];
$blood = $_POST['blood'];
$dob = $_POST['dob'];
$home = $_POST['home'];
$reside = $_POST['resA'];
$resState=$_POST['resS'];
$resCon = $_POST['resC'];
$work = $_POST['work'];
$face = $_POST['face'];
$link = $_POST['link'];
$email = $_POST['email'];
//echo "I AM HERE";
$sql = "UPDATE user SET name='$name', password='$pass',batch='$batch',dob='$dob',phone='$contact',blood='$blood',hometown='$home',address='$reside',state='$resState',country='$resCon',work='$work',fb='$face',linkedin='$link' WHERE email='$email';";

if(($result = $connection->query($sql))==TRUE){
    echo "success";
}
else echo "Profile cannot be updated";
?>