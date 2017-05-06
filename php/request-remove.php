<?php
/**
 * Created by PhpStorm.
 * User: rifat
 * Date: 5/6/17
 * Time: 3:22 AM
 */

require_once ("connect.inc.php");

$email= $_POST['email'];


$request_delete = "DELETE FROM membership WHERE email = '". $email."';";


if($connection->query($request_delete) == TRUE){
    echo "success";
}else{

    echo "Request can not be removed";
}