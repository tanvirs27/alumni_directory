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

    $url = "alumni_directory/uploads/".$filename.".png";

    try {
        file_put_contents($file_path, $data);

        $sql = "UPDATE user SET pp = '" . $url. "' WHERE username='". $user. "';";

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

