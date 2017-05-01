<?php
/**
 * Created by PhpStorm.
 * User: rifat
 * Date: 5/1/17
 * Time: 4:22 AM
 */

session_start();

require_once('connect.inc.php');

$name = $_POST['name'];
$password = md5($_POST['password']);
$email = $_POST['email'];
$linkedin_id = $_POST['linkedinid'];
$batch = $_POST['batch'];
$code = $_SESSION['code'];


$invite_delete = "DELETE FROM invite WHERE email = '". $email."';";
$signup_sql_normal = "INSERT INTO user (email, name, password, batch) VALUES ('" . $email . "','" . $name . "','" . $password . "','" . $batch . "');";
$signup_sql_linkedin = "INSERT INTO user (email, name, linkedin_id, batch) VALUES ('" . $email . "','" . $name . "','" . $linkedin_id . "','" . $batch . "');";


if(strcmp(md5($email),$code)==0){

    if(strcmp($linkedin_id,"none")==0){

        if($connection->query($signup_sql_normal) == TRUE){
            $connection->query($invite_delete);
            echo "success";
        }else{

            echo "Something bad happened!";
        }
    }else{
        if($connection->query($signup_sql_linkedin) == TRUE){
            $connection->query($invite_delete);
            echo "success";
        }else{

            echo "Something bad happened!";
        }
    }

}else{

    echo "invitation code does not match with email";
}
