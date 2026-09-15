<?php

$to = "vickychoky006@gmail.com";

$subject = "Reliance Academy Test Mail";

$message = "This is a test email from relianceacademychennai.com";

$headers  = "From: Website Enquiry <info@relianceacademychennai.com>\r\n";
$headers .= "Reply-To: vickychoky006@gmail.com\r\n";

if (mail($to, $subject, $message, $headers)) {

    echo "MAIL_ACCEPTED";

} else {

    echo "MAIL_FAILED";

}

?>