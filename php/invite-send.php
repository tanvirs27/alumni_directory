<?php
/**
 * Created by PhpStorm.
 * User: rifat
 * Date: 4/8/17
 * Time: 5:16 PM
 */
require_once('connect.inc.php');

$name= $_GET['name'];
$email= $_GET['email'];

$code= md5($email);

$sql = "INSERT INTO invite (email, code) VALUES ('" . $email . "','" . $code . "');";

if ($connection->query($sql) == TRUE) {
    echo "You have successfully invited ".$name."\n";
} else {
    echo "Sorry! Invitation cannot be sent\n";
}