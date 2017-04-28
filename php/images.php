<?php
include "image-db.php";

class Images {
    public static function Upload() {
        $maxsize = 2000000; // set to approx 2 MB

       // echo $_FILES['imageToUpload']['size'];

        // check associated error code
        if ($_FILES['imageToUpload']['error'] == UPLOAD_ERR_OK) {
            // check whether file is uploaded with HTTP POST
            if (is_uploaded_file($_FILES['imageToUpload']['tmp_name'])) {

                //echo "here";

                // check size of uploaded image on server side
                if ( $_FILES['imageToUpload']['size'] < $maxsize) {
                    // check whether uploaded file is of image type
                    $finfo = finfo_open(FILEINFO_MIME_TYPE);
                    if (strpos(finfo_file($finfo, $_FILES['imageToUpload']['tmp_name']), "image") === 0) {
                        // open the image file for insertion
                        $imagefp = fopen($_FILES['imageToUpload']['tmp_name'], 'rb');

                        //echo "here";
                        // put the image in the db...

                        $database = new Database();
                        $database->UploadImage($_FILES['imageToUpload']['name'], $imagefp);
                        $msg = 'Image successfully saved in database';

                    }
                    else {
                        $msg = "Uploaded file is not an image.";
                    }
                }
                else {
                    // if the file is not less than the maximum allowed, print an error
                    $msg = 'File exceeds the Maximum File limit.
                            Maximum File limit is '.$maxsize.' bytes';
                }


            }
            else
                $msg = "File not uploaded successfully. 1";
        }
        else {
            $msg = "File not uploaded successfully. 2";
        }
        return $msg;

    }

    public static function GetImage() {
        $database = new Database();
        $image = $database->FindImage();
        return $image;
    }
}
