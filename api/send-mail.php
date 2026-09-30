<?php

header("Content-Type: application/json; charset=UTF-8");


/* =========================================
   ONLY POST REQUEST
========================================= */

if ($_SERVER["REQUEST_METHOD"] !== "POST") {

    http_response_code(405);

    echo json_encode([
        "success" => false,
        "message" => "Method not allowed."
    ]);

    exit;

}


/* =========================================
   GET FORM DATA
========================================= */

$firstName = trim(
    $_POST["firstName"] ?? ""
);

$lastName = trim(
    $_POST["lastName"] ?? ""
);

$email = trim(
    $_POST["email"] ?? ""
);

$phone = trim(
    $_POST["phone"] ?? ""
);

$city = trim(
    $_POST["city"] ?? ""
);

$course = trim(
    $_POST["course"] ?? ""
);


/* =========================================
   REQUIRED VALIDATION
========================================= */

if (
    $firstName === "" ||
    $lastName === "" ||
    $email === "" ||
    $phone === "" ||
    $city === "" ||
    $course === ""
) {

    http_response_code(400);

    echo json_encode([
        "success" => false,
        "message" => "Please fill all required fields."
    ]);

    exit;

}


/* =========================================
   EMAIL VALIDATION
========================================= */

if (
    !filter_var(
        $email,
        FILTER_VALIDATE_EMAIL
    )
) {

    http_response_code(400);

    echo json_encode([
        "success" => false,
        "message" => "Invalid email address."
    ]);

    exit;

}


/* =========================================
   PHONE VALIDATION
========================================= */

if (
    !preg_match(
        "/^[0-9]{10}$/",
        $phone
    )
) {

    http_response_code(400);

    echo json_encode([
        "success" => false,
        "message" => "Invalid phone number."
    ]);

    exit;

}


/* =========================================
   SECURITY
========================================= */

$firstName =
    htmlspecialchars(
        $firstName,
        ENT_QUOTES,
        "UTF-8"
    );

$lastName =
    htmlspecialchars(
        $lastName,
        ENT_QUOTES,
        "UTF-8"
    );

$city =
    htmlspecialchars(
        $city,
        ENT_QUOTES,
        "UTF-8"
    );

$course =
    htmlspecialchars(
        $course,
        ENT_QUOTES,
        "UTF-8"
    );


/* =========================================
   EMAIL DETAILS
========================================= */

$to =
    "vickychoky006@gmail.com";


$subject =
    "New Course Enquiry - Website";


/* =========================================
   EMAIL MESSAGE
========================================= */

$message =

"New Course Enquiry
==============================

First Name:
$firstName

Last Name:
$lastName

Email:
$email

Phone Number:
$phone

City:
$city

Course:
$course

==============================
This enquiry was submitted from the website.
";


/* =========================================
   EMAIL HEADERS
========================================= */

$host =
    $_SERVER["HTTP_HOST"] ?? "yourwebsite.com";


$host =
    preg_replace(
        "/[^a-zA-Z0-9.-]/",
        "",
        $host
    );


$headers =
    "From: Website Enquiry <noreply@" . $host . ">\r\n";


$headers .=
    "Reply-To: " . $email . "\r\n";


$headers .=
    "MIME-Version: 1.0\r\n";


$headers .=
    "Content-Type: text/plain; charset=UTF-8\r\n";


/* =========================================
   SEND EMAIL
========================================= */

$mailSent = mail(
    $to,
    $subject,
    $message,
    $headers
);


/* =========================================
   RESPONSE
========================================= */

if ($mailSent) {

    echo json_encode([
        "success" => true,
        "message" =>
            "Your enquiry has been submitted successfully."
    ]);

} else {

    http_response_code(500);

    echo json_encode([
        "success" => false,
        "message" =>
            "Email could not be sent from the server."
    ]);

}

?>