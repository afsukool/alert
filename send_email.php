<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect and sanitize form data
    $name = htmlspecialchars(trim($_POST["name"]));
    $email = htmlspecialchars(trim($_POST["email"]));
    $message = htmlspecialchars(trim($_POST["message"]));
    $recaptchaResponse = $_POST['g-recaptcha-response'];

    // Verify reCAPTCHA
    $secretKey = 'YOUR_SECRET_KEY'; // Replace with your reCAPTCHA secret key
    $response = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=$secretKey&response=$recaptchaResponse");
    $responseKeys = json_decode($response, true);

    // Check if reCAPTCHA verification was successful
    if (intval($responseKeys["success"]) !== 1) {
        echo "Please complete the CAPTCHA.";
        exit;
    }

    // Specify your email address
    $to = "afsu@outlook.com"; // Replace with your email address
    $subject = "New Contact Form Submission from $name";

    // Construct the email body
    $body = "Name: $name\n";
    $body .= "Email: $email\n\n";
    $body .= "Message:\n$message";

    // Set the email headers
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";

    // Send the email
    if (mail($to, $subject, $body, $headers)) {
        // Redirect to a thank you page or display a success message
        echo "Message sent successfully!";
    } else {
        echo "Message could not be sent. Please try again later.";
    }
} else {
    // Redirect or display an error if accessed directly
    echo "Invalid request.";
}
?>
