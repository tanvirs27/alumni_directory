<?php
/**
 * Created by PhpStorm.
 * User: rifat
 * Date: 5/7/17
 * Time: 1:49 AM
 */

require_once('connect.inc.php');

//mailing credential
$email= 'androf4727@gmail.com';
// send the doc info
$cred_sql = "SELECT * FROM mailer WHERE email='". $email."'";
$result = $connection->query($cred_sql);
$row = $result->fetch_assoc();

$pass= $row['password'];


$type= $_POST['type'];
$to= $_POST['to'];
$subject = $_POST['subject'];
$body= $_POST['body'];

$code= md5($invite_email);

$from_email = "SELECT * FROM user WHERE email = '". $to."';";
$from_batch = "SELECT * FROM user WHERE batch like '%". $to."%';";

$ara=array();

if(strcmp($type,"1")==0){

    if(($result=$connection -> query($from_email))==TRUE && mysqli_num_rows($result)>0) {

        array_push($ara,$to);

        mailSender($email , $pass, $ara, $subject, $body);
        echo "success";
    }else{

        echo "User not found";
    }
}else{

    if(($result=$connection -> query($from_batch))==TRUE && mysqli_num_rows($result)>0){

        while ($row = $result->fetch_assoc()) {

            array_push($ara,$row['email']);
        }
        mailSender($email , $pass, $ara, $subject, $body);
        echo "success";

    }else{

        echo "No user found";
    }
}


function mailSender($email , $pass, $send_to, $subject, $body){
    //mailing credential
    //require_once('connect.inc.php');
    require_once '../lib/swiftmailer/swift_required.php';


    $transport = Swift_SmtpTransport::newInstance('smtp.gmail.com', 465, "ssl")
        ->setUsername($email)
        ->setPassword($pass)
        ->setEncryption('ssl');

    $mailer = Swift_Mailer::newInstance($transport);

    $message = Swift_Message::newInstance($subject)
        ->setFrom(array('noreply@alumni.csedu.com' => 'CSEDU Alumni Directory'))
        ->setTo($send_to)
        ->setBody($body);

    $result = $mailer->send($message);

    return "true";
}