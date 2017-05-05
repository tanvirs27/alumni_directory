<?php
/**
 * Created by PhpStorm.
 * User: rifat
 * Date: 5/6/17
 * Time: 4:33 AM
 */

require_once('connect.inc.php');

$email = $_POST['email'];
$password = md5($_POST['password']);


$sql = "SELECT * FROM admin WHERE email = '". $email."' AND password= '".$password."'";
if($result = $connection->query($sql)){
    if($result->num_rows == 0)echo "Wrong email or password";
    else echo "success";
}
else echo $connection->error;
