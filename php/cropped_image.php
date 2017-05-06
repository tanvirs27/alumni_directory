<?php

$data = $_POST['base64data'];
$user = $_POST['user'];

//echo $data;

list($type, $data) = explode(';', $data);
list(, $data)      = explode(',', $data);
$data = base64_decode($data);


include ('connect.inc.php');

$sql1= "INSERT INTO `images` (`id`, `email`) VALUES (NULL, '$user');";

if ($connection->query($sql1) == TRUE) {
    $filename = $connection->insert_id;

    $file_path = "../uploads/".$filename.".png";

    $url = "alumni/uploads/".$filename.".png";

    try {
        file_put_contents($file_path, $data);

        $sql = "UPDATE user SET pp = '" . $url. "' WHERE email='". $user. "';";

        if ($connection->query($sql) == TRUE) {
            echo "###".$url;
        }
        else {
            echo "ERR".$connection->error;
        }
    }
    catch (Exception $e) {
        echo "ERR".$e->getMessage();
    }
}
else {
    echo "ERR".$connection->error;
}


