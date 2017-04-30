<?php
/**
 * Created by PhpStorm.
 * User: rifat
 * Date: 5/1/17
 * Time: 4:51 AM
 */

session_start();

$_SESSION['code']=$_GET['code'];

ob_start();
header('Location: signuppage');
ob_end_flush();