<?php
/**
 * Created by PhpStorm.
 * User: rifat
 * Date: 5/3/17
 * Time: 2:50 AM
 */


require_once('connect.inc.php');

$id = $_POST['linkedinid'];

$sql = "SELECT email FROM user WHERE linkedin_id = '". $id."'";

if($result = $connection->query($sql)){

    if($result->num_rows == 0)echo "###ERROR1###";
    else {
        $row = $result->fetch_assoc();

        echo $row['email'];
    }
}
else echo "###ERROR###";