<?php
include "images.php";

$image = Images::GetImage();

if(is_null($image->image)){

    echo "images/avatar.png";
    exit;
}

// get the source image attributes
$srcImage = $image->image;
$srcSize = getImageSizeFromString($srcImage);
$srcWidth = $srcSize[0];
$srcHeight = $srcSize[1];
$srcType = $srcSize[2];
$srcMime = $srcSize['mime'];
$srcImageResource = imageCreateFromString($srcImage);

// set the header for the image
header("Content-type: ".$srcMime);

echo $srcImage;
