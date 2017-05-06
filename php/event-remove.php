<?php
/**
 * Created by PhpStorm.
 * User: rifat
 * Date: 5/6/17
 * Time: 3:22 AM
 */

require_once ("connect.inc.php");

$id= $_POST['id'];


$event_delete = "DELETE FROM event WHERE id = ". $id.";";


if($connection->query($event_delete) == TRUE){
    echo "success";
}else{

    echo "Event can not be removed";
}