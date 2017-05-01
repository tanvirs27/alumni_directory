<?php
/**
 * Created by PhpStorm.
 * User: rifat
 * Date: 5/1/17
 * Time: 4:49 AM
 */

session_start();

require_once('connect.inc.php');

$code = $_SESSION['code'];


$email_check = "SELECT * FROM invite WHERE code = '". $code."';";


if(($result = $connection->query($email_check)) && $result->num_rows > 0){
    echo "success";
}else{

    echo "invalid invitation code";
}
