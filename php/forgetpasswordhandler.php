<?php
/**
 * Created by PhpStorm.
 * User: root
 * Date: 5/6/17
 * Time: 10:44 AM
 */
require_once('connect.inc.php');

$email = $_POST['mail'];
$mode = $_POST['mode']; //1 for check 2 for set new password


if($mode == 1){
    //check if a user exists
    $sql = "SELECT * FROM user WHERE email='$email';";
    $result = $connection->query($sql);
    if($result == TRUE){
        if(mysqli_num_rows($result)>0)echo "1"."\n";
        else echo  "0"."\n";
    }
    else echo "mode1 ".$connection->error."\n";
}
else if($mode==2){
    $pass = md5($_POST['pass']);
    $sql = "UPDATE user SET password='$pass' WHERE email='$email';";
    if($result=($connection -> query($sql))==TRUE){
        echo "1"."\n";
    }
    else echo "mode2 ".$connection->error."\n";
}
?>