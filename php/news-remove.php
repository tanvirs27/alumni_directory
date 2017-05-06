<?php
/**
 * Created by PhpStorm.
 * User: rifat
 * Date: 5/6/17
 * Time: 3:22 AM
 */

require_once ("connect.inc.php");

$id= $_POST['id'];


$news_delete = "DELETE FROM news WHERE id = ". $id.";";


if($connection->query($news_delete) == TRUE){
    echo "success";
}else{

    echo "News can not be removed";
}