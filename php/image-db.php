<?php
class Database {
    private $link;

    public function __construct() {

        $host= 'localhost';
        $user= 'root';
        $db= 'alumni';
        $pass='rifat007';

        session_start();
        try{
            $this->link = new PDO("mysql:host=".$host.";dbname=".$db, $user, $pass);
            $this->link->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        }
        catch (PDOException $e){
            echo "Error: Unable to connect to MySQL: ". $e->getMessage();
            die;
        }

    }

    public function __destruct() {
        $this->link = null;
    }

    public function UploadImage($imageName, $imageFP) {


       // $user=$_SESSION['user'];
        //$sql = $this->link->prepare("INSERT INTO images (email, name, image) VALUES (:email, :name, :image);");

        $sql = $this->link->prepare("UPDATE images SET image= :image, name= :name WHERE email= :email;");

        $sql->bindParam(":email",$_SESSION['email'] );
        $sql->bindParam(":name", $imageName);
        $sql->bindParam(":image", $imageFP, PDO::PARAM_LOB);
        $sql->execute();
        return $this->link->lastInsertId();
    }


    public function FindImage() {
        $sql = $this->link->prepare("SELECT * FROM images WHERE email = :email;");
        $sql->bindParam(":email", $_SESSION['email']);
        $sql->execute();
        $result = $sql->fetch(PDO::FETCH_OBJ);
        return $result;
    }


}


