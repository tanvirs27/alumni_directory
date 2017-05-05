<?php
/**
 * Created by PhpStorm.
 * User: rifat
 * Date: 4/8/17
 * Time: 5:16 PM
 */
require_once('connect.inc.php');
require "send-mail.php";

//mailing credential
$email= 'androf4727@gmail.com';
// send the doc info
$cred_sql = "SELECT * FROM mailer WHERE email='". $email."'";
$result = $connection->query($cred_sql);
$row = $result->fetch_assoc();

$pass= $row['password'];


$invite_email= $_POST['invite_email'];
$from= $_POST['from'];

$code= md5($invite_email);

$insert_invite_sql = "INSERT INTO invite (email, code, from_email) VALUES ('" . $invite_email . "','" . $code ."','" . $from . "');";
$email_check = "SELECT * FROM user WHERE email = '". $invite_email."';";
//$get_name= "SELECT name FROM user WHERE email = '". $from."';";
$invite_check= "SELECT * FROM invite WHERE email = '". $invite_email."';";

if(($result = $connection->query($email_check)) && $result->num_rows > 0){
    echo "This user is already a member of CSEDU Alumni Directory";
}
else if(($result = $connection->query($invite_check)) && $result->num_rows > 0) {
    echo "This email has already got an invitation";
}else if ($connection->query($insert_invite_sql) == TRUE) {

    $name="An admin";

    sendMailBySwift($name,$email,$pass,$invite_email,$code);
    echo "success";

} else {
    echo "Sorry! Invitation cannot be sent\n";
}






