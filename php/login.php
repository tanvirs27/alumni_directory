<?php
/**
 * Created by PhpStorm.
 * User: rifat
 * Date: 4/24/17
 * Time: 12:45 PM
 */
require_once('connect.inc.php');

$username = $_POST['user'];
$password = md5($_POST['pass']);
//$password = $_POST['pass'];

$sql = "SELECT * FROM user WHERE email = '". $username."' AND password= '".$password."'";
if($result = $connection->query($sql)){
    if($result->num_rows == 0)echo "wrong email or password";
    else echo "success";
}
else echo $connection->error;
?>