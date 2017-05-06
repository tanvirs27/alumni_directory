<?php
/**
 * Created by PhpStorm.
 * User: rifat
 * Date: 5/6/17
 * Time: 3:43 AM
 */


require_once('connect.inc.php');


$name= $_POST['name'];
$email = $_POST['email'];
$batch= $_POST['batch'];
$social= $_POST['social'];


$insert_req_sql = "INSERT INTO membership (name, email, batch, social) VALUES ('" . $name . "','" . $email ."','" . $batch."','" . $social . "');";
$email_check = "SELECT * FROM user WHERE email = '". $email."';";
$req_check= "SELECT * FROM membership WHERE email = '". $email."';";

if(($result = $connection->query($email_check)) && $result->num_rows > 0){
    echo "You are already a member of CSEDU Alumni Directory";
}
else if(($result = $connection->query($req_check)) && $result->num_rows > 0) {
    echo "You have already requested for membership";
}else if ($connection->query($insert_req_sql) == TRUE) {

        echo "success";
}
else{

    echo "Request can not be sent. Try again later";
}





