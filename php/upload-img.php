<?php

    //echo $_FILES['imageToUpload']['name'];

    //echo $_SESSION['user'];

if (isset($_FILES['imageToUpload'])) {
    //echo "here";
    include "images.php";


    try {
        $msg = Images::Upload();  // this will upload the image
        echo $msg;  // Message showing success or failure.
    }
    catch (Exception $e) {
        echo "Sorry, could not upload file";
    }
}
