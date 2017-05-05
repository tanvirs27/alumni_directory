<?php
/**
 * Created by PhpStorm.
 * User: root
 * Date: 5/5/17
 * Time: 7:50 PM
 */
require_once('connect.inc.php');
$email = $_POST['mail'];
$subject = $_POST['sub'];
$details = $_POST['det'];
$links = $_POST['lin'];


$sql = "INSERT INTO career (title,description,poster,joblink) VALUES ('$subject','$details','$email','$links')";
if(($result = $connection->query($sql))==TRUE)echo "1"."\n";
else echo $connection->error."\n";
?>