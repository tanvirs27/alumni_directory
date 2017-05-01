<?php
/**
 * Created by PhpStorm.
 * User: rifat
 * Date: 5/1/17
 * Time: 4:13 PM
 */

function sendMailBySwift($name,$email,$pass,$invite_email,$code)
{
    require_once '../lib/swiftmailer/lib/swift_required.php';



    $subject = 'Invitation | CSEDU Alumni Directory'; // Give the email a subject
    $address="http://localhost/alumni_directory/invitation.php?code=".$code;
    $body = '
 
    Hello CSEDU Alumni,
    
    '.$name. ' has invited you to join CSEDU Alumni Directory. The purpose of this directory is to keep in touch of all CSEDU members. 
    
    Please follow the link below to complete your registration process and be a part of this proud family.
    ' .
        '------------------------------------------------------
 
 '.$address;

    $transport = Swift_SmtpTransport::newInstance('smtp.gmail.com', 465, "ssl")
        ->setUsername($email)
        ->setPassword($pass)
        ->setEncryption('ssl');

    $mailer = Swift_Mailer::newInstance($transport);

    $message = Swift_Message::newInstance($subject)
        ->setFrom(array('noreply@alumni.csedu.com' => 'CSEDU Alumni Directory'))
        ->setTo(array($invite_email))
        ->setBody($body);

    $result = $mailer->send($message);
}