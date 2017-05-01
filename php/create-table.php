<?php
/**
 * Created by PhpStorm.
 * User: rifat
 * Date: 4/10/17
 * Time: 1:13 PM
 */

require_once('connect.inc.php');

$create_table_user = "CREATE TABLE user( ".
    "email VARCHAR(30) PRIMARY KEY, ".
    "name VARCHAR(50), ".
    "password VARCHAR(50), ".
    "batch VARCHAR(8), ".
    "dob VARCHAR(30), ".
    "phone VARCHAR(20), ".
    "blood VARCHAR(5), ".
    "hometown VARCHAR(30), ".
    "address VARCHAR(50), ".
    "state VARCHAR(50), ".
    "country VARCHAR(50), ".
    "work VARCHAR(50), ".
    "fb VARCHAR(70), ".
    "linkedin VARCHAR(70), ".
    "pp VARCHAR(70)); ";


$result = $connection->query($create_table_user);

if ($result==TRUE) {
    echo "0\n";
}
else {
    echo mysqli_error($connection);
}

$create_table_event = "CREATE TABLE event (mday INT , mon INT , yr INT , title VARCHAR (100) , organization VARCHAR (1000) , location VARCHAR (80));";
$result = $connection->query($create_table_event);

if ($result==TRUE) {
    echo "0\n";
}
else {
    echo mysqli_error($connection);
}

$create_table_career = "CREATE TABLE career (title VARCHAR (50) , description VARCHAR (500) , poster VARCHAR (30) , joblink VARCHAR (100));";
$result = $connection->query($create_table_career);

if ($result==TRUE) {
    echo "0\n";
}
else {
    echo mysqli_error($connection);
}

$create_table_news = "CREATE TABLE news (title VARCHAR (50) , description VARCHAR (500) , pic VARCHAR (70));";
$result = $connection->query($create_table_news);

if ($result==TRUE) {
    echo "0\n";
}
else {
    echo mysqli_error($connection);
}
mysqli_close($connection);
