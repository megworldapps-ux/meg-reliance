<?php

header('Content-Type: application/json; charset=UTF-8');


/* ==========================================================
   ONLY POST REQUEST ALLOWED
   ========================================================== */

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {

    http_response_code(405);

    echo json_encode([
        'success' => false,
        'message' => 'Method not allowed.'
    ]);

    exit;
}


/* ==========================================================
   GET FORM DATA
   ========================================================== */

$firstName = trim($_POST['first_name'] ?? '');
$lastName  = trim($_POST['last_name'] ?? '');
$email     = trim($_POST['email'] ?? '');
$phone     = trim($_POST['phone'] ?? '');
$city      = trim($_POST['city'] ?? '');
$course    = trim($_POST['course'] ?? '');


/* ==========================================================
   VALIDATION
   ========================================================== */

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


/* ==========================================================
   EMAIL VALIDATION
   ========================================================== */

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {

    http_response_code(400);

    echo json_encode([
        'success' => false,
        'message' => 'Please enter a valid email address.'
    ]);

    exit;
}


/* ==========================================================
   RECEIVER
   ========================================================== */

$to = 'vickychoky006@gmail.com';

$subject =
    'New Course Enquiry - Reliance Animation Academy';


/* ==========================================================
   EMAIL CONTENT
   ========================================================== */

$message = "


NEW COURSE ENQUIRY
==============================

First Name : {$firstName}

Last Name  : {$lastName}

Email      : {$email}

Phone      : {$phone}

City       : {$city}

Course     : {$course}


==============================
Reliance Animation Academy
";


/* ==========================================================
   EMAIL HEADERS
   ========================================================== */

$headers  = "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

/*
 * Use your domain email here.
 * Do NOT use visitor email as From.
 */

$headers .=
    "From: Reliance Animation Academy <no-reply@relianceacademychennai.com>\r\n";

/*
 * Visitor email goes to Reply-To.
 */

$headers .=
    "Reply-To: " . $email . "\r\n";


/* ==========================================================
   SEND EMAIL
   ========================================================== */

$sent = mail(
    $to,
    $subject,
    $message,
    $headers
);


/* ==========================================================
   RESPONSE
   ========================================================== */

if ($sent) {

    echo json_encode([
        'success' => true,
        'message' => 'Enquiry sent successfully.'
    ]);

    exit;

}


/* ==========================================================
   EMAIL FAILED
   ========================================================== */

http_response_code(500);

echo json_encode([
    'success' => false,
    'message' =>
        'Email could not be sent from the server.'
]);

exit;