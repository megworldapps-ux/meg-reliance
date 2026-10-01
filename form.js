const form = document.getElementById('enquiryForm');

if (form) {

    form.addEventListener('submit', async function (event) {

        event.preventDefault();

        const submitButton = form.querySelector(
            'button[type="submit"]'
        );

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
        }

        try {

            const formData = new FormData(form);

            const response = await fetch(
                'api/send-mail.php',
                {
                    method: 'POST',
                    body: formData
                }
            );

            const result = await response.json();

            console.log('Server response:', result);

            if (!response.ok || !result.success) {
                throw new Error(
                    result.message ||
                    'Email could not be sent.'
                );
            }

            /* Reset form */

            form.reset();

            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = 'Submit enquiry';
            }

            /* Success */

            alert(
                'Thank You! Your enquiry has been sent successfully.'
            );

        } catch (error) {

            console.error(
                'Form submission error:',
                error
            );

            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = 'Submit enquiry';
            }

            alert(
                error.message ||
                'Sorry! Your enquiry could not be sent.'
            );
        }

    });

}