<?php
/**
 * Created by PhpStorm.
 * User: root
 * Date: 5/6/17
 * Time: 10:44 AM
 */
require_once('connect.inc.php');
//require_once '../lib/swiftmailer/swift_required.php';

$email = $_POST['mail'];
$mode = $_POST['mode']; //1 for check 2 for set new password


if($mode == 1){
    //check if a user exists
    $sql = "SELECT * FROM user WHERE email='$email';";
    $result = $connection->query($sql);
    if($result == TRUE){
        if(mysqli_num_rows($result)>0)echo "1"."\n";
        else echo  "0"."\n";
    }
    else echo "mode1 ".$connection->error."\n";
}
else if($mode==2){
    $savepass = $_POST['pass'];
    $pass = md5($savepass);
    $sql = "UPDATE user SET password='$pass' WHERE email='$email';";
    if($result=($connection -> query($sql))==TRUE){
        $retdata = forgetPasswordSender($connection,$email,$savepass);
        echo $retdata." 1"."\n";
    }
    else echo "mode2 ".$connection->error."\n";
}

function forgetPasswordSender($connection , $invite_email, $invite_pass){
    //mailing credential
    //require_once('connect.inc.php');
    require_once '../lib/swiftmailer/swift_required.php';

    $email= 'androf4727@gmail.com';
    // send the doc info
    $cred_sql = "SELECT * FROM mailer WHERE email='". $email."'";
    $result = $connection->query($cred_sql);
    $row = $result->fetch_assoc();

    $pass= $row['password'];
    $subject = 'Password | CSEDU Alumni Directory';
    $body = "Hello CSEDU, Alumni.
    
            This is your new Password: $invite_pass . Please keep it safe and don't share with anyone. We will never ask you about your password.
            
            Thank You.
            ------------------------------------
            Admin panel of CSEDU ALUMNI DIRECTORY";
    $transport = Swift_SmtpTransport::newInstance('smtp.gmail.com', 465, "ssl")
        ->setUsername($email)
        ->setPassword($pass)
        ->setEncryption('ssl');

    $mailer = Swift_Mailer::newInstance($transport);

    $message = Swift_Message::newInstance($subject)
        ->setFrom(array('noreply@alumni.csedu.com' => 'CSEDU Alumni Directory'))
        ->setTo(array($invite_email))
        ->setBody($body);

    return $result = $mailer->send($message);
}
?>