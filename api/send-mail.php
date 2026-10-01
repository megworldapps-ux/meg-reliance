<?php

header('Content-Type: application/json; charset=UTF-8');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/PHPMailer/src/Exception.php';
require __DIR__ . '/PHPMailer/src/PHPMailer.php';
require __DIR__ . '/PHPMailer/src/SMTP.php';


if ($_SERVER['REQUEST_METHOD'] !== 'POST') {

    http_response_code(405);

    echo json_encode([
        'success' => false,
        'message' => 'Method not allowed.'
    ]);

    exit;
}


/* =========================
   FORM DATA
========================= */

$firstName = trim($_POST['first_name'] ?? '');
$lastName  = trim($_POST['last_name'] ?? '');
$email     = trim($_POST['email'] ?? '');
$phone     = trim($_POST['phone'] ?? '');
$city      = trim($_POST['city'] ?? '');
$course    = trim($_POST['course'] ?? '');


/* =========================
   VALIDATION
========================= */

if (
    $firstName === '' ||
    $lastName === '' ||
    $email === '' ||
    $phone === '' ||
    $city === '' ||
    $course === ''
) {

    http_response_code(400);

    echo json_encode([
        'success' => false,
        'message' => 'Please fill all required fields.'
    ]);

    exit;
}


if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {

    http_response_code(400);

    echo json_encode([
        'success' => false,
        'message' => 'Invalid email address.'
    ]);

    exit;
}


/* =========================
   PHPMailer
========================= */

$mail = new PHPMailer(true);


try {

    /* SMTP */

    $mail->isSMTP();

    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;

    /* Gmail account */
    $mail->Username   = 'mv7852396@gmail.com';

    /* YOUR 16 CHARACTER APP PASSWORD */
    $mail->Password   = 'vajzepdolyhuwxzq';

    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;


    /* =========================
       FROM
    ========================= */

    $mail->setFrom(
        'mv7852396@gmail.com',
        'Reliance Animation Academy'
    );


    /* =========================
       RECEIVER
    ========================= */

    $mail->addAddress(
        'mv7852396@gmail.com',
        'Reliance Animation Academy'
    );


    /* =========================
       REPLY TO CUSTOMER
    ========================= */

    $mail->addReplyTo(
        $email,
        $firstName . ' ' . $lastName
    );


    /* =========================
       EMAIL
    ========================= */

    $mail->isHTML(true);

    $mail->Subject =
        'New Course Enquiry - Reliance Animation Academy';


    $mail->Body = '

        <h2>New Course Enquiry</h2>

        <table
            cellpadding="10"
            cellspacing="0"
            border="1"
            style="border-collapse:collapse;"
        >

            <tr>
                <td><strong>First Name</strong></td>
                <td>' . htmlspecialchars($firstName) . '</td>
            </tr>

            <tr>
                <td><strong>Last Name</strong></td>
                <td>' . htmlspecialchars($lastName) . '</td>
            </tr>

            <tr>
                <td><strong>Email</strong></td>
                <td>' . htmlspecialchars($email) . '</td>
            </tr>

            <tr>
                <td><strong>Phone</strong></td>
                <td>' . htmlspecialchars($phone) . '</td>
            </tr>

            <tr>
                <td><strong>City</strong></td>
                <td>' . htmlspecialchars($city) . '</td>
            </tr>

            <tr>
                <td><strong>Course</strong></td>
                <td>' . htmlspecialchars($course) . '</td>
            </tr>

        </table>

        <br>

        <strong>Reliance Animation Academy</strong>
    ';


    $mail->AltBody =
        "New Course Enquiry\n\n" .
        "First Name: $firstName\n" .
        "Last Name: $lastName\n" .
        "Email: $email\n" .
        "Phone: $phone\n" .
        "City: $city\n" .
        "Course: $course\n";


    /* SEND */

    $mail->send();


    echo json_encode([
        'success' => true,
        'message' => 'Email sent successfully.'
    ]);

    exit;


} catch (Exception $e) {

    http_response_code(500);

    echo json_encode([
        'success' => false,
        'message' => 'Email could not be sent.',
        'error' => $mail->ErrorInfo
    ]);

    exit;
}
?>