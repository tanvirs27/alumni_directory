<?php
/**
 * Created by PhpStorm.
 * User: rifat
 * Date: 5/6/17
 * Time: 3:22 AM
 */

require_once ("connect.inc.php");

$id= $_POST['id'];


$job_delete = "DELETE FROM career WHERE id = ". $id.";";


if($connection->query($job_delete) == TRUE){
    echo "success";
}else{

    echo "Job post can not be removed";
}