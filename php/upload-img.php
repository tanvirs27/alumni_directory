<?php

if (isset($_FILES['imageToUpload'])) {


    $user = $_POST['user'];

    include ('connect.inc.php');

    //getting file info from the request
    $fileinfo = basename($_FILES['imageToUpload']['name']);
    //echo "fileinfo= ".$fileinfo." ".$user."\n";


    $sql1= "INSERT INTO images (email, filename) VALUES ('$user', '$fileinfo');";

    if ($connection->query($sql1) == TRUE) {
        $filename = $connection->insert_id;

        $file_path = "../uploads/".$filename.".png";

        $url = "alumni_directory/uploads/".$filename.".png";

        try {
            move_uploaded_file($_FILES['imageToUpload']['tmp_name'], $file_path);

            $sql = "UPDATE user SET pp = '" . $url. "' WHERE email='". $_POST['user']. "';";

            if ($connection->query($sql) == TRUE) {
                echo "###".$url;
            }
            else {
                echo "ERR";
            }
        }
        catch (Exception $e) {
            echo "ERR";
        }
    }
    else {
        echo "ERR";
    }






}
