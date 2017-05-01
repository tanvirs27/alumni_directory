<?php

//echo 'hello world';

$a_host= 'localhost';
$a_user= 'root';
$a_pass= '';
$a_db= 'alumni';

// Create connection
$connection = new mysqli($a_host, $a_user, $a_pass, $a_db);

// Check connection
if ($connection->connect_error) {
    die("Connection failed: " . $connection->connect_error);
}else{
	
	//echo "connected :D\n";
} 
