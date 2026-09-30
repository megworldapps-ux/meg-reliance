document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("courseForm");

    const firstName = document.getElementById("firstName");

    const lastName = document.getElementById("lastName");

    const email = document.getElementById("email");

    const phone = document.getElementById("phone");

    const city = document.getElementById("city");

    const course = document.getElementById("course");

    const submitBtn = document.getElementById("submitBtn");

    const submitText = document.getElementById("submitText");

    const formMessage = document.getElementById("formMessage");


    /* =========================================
       CHECK FORM EXISTS
    ========================================= */

    if (!form) {
        return;
    }


    /* =========================================
       PHONE - ONLY NUMBERS
    ========================================= */

    if (phone) {

        phone.addEventListener("input", function () {

            this.value = this.value.replace(
                /[^0-9]/g,
                ""
            );

            if (this.value.length > 10) {

                this.value =
                    this.value.substring(0, 10);

            }

        });

    }


    /* =========================================
       REMOVE INVALID STYLE
    ========================================= */

    const fields = [
        firstName,
        lastName,
        email,
        phone,
        city,
        course
    ];


    fields.forEach(function (field) {

        if (!field) {
            return;
        }

        field.addEventListener("input", function () {

            this.classList.remove("invalid");

        });


        field.addEventListener("change", function () {

            this.classList.remove("invalid");

        });

    });


    /* =========================================
       FORM SUBMIT
    ========================================= */

    form.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            /* ---------------------------------
               Clear previous message
            --------------------------------- */

            formMessage.className =
                "course-form-message";

            formMessage.textContent = "";


            /* ---------------------------------
               Basic validation
            --------------------------------- */

            let valid = true;


            fields.forEach(function (field) {

                if (!field) {
                    return;
                }

                if (!field.value.trim()) {

                    field.classList.add("invalid");

                    valid = false;

                }

            });


            /* ---------------------------------
               Email validation
            --------------------------------- */

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (
                email.value.trim() &&
                !emailPattern.test(email.value.trim())
            ) {

                email.classList.add("invalid");

                valid = false;

            }


            /* ---------------------------------
               Phone validation
            --------------------------------- */

            if (
                phone.value.trim().length !== 10
            ) {

                phone.classList.add("invalid");

                valid = false;

            }


            /* ---------------------------------
               Stop if invalid
            --------------------------------- */

            if (!valid) {

                formMessage.textContent =
                    "Please fill all required fields correctly.";

                formMessage.classList.add("error");

                return;

            }


            /* ---------------------------------
               Loading
            --------------------------------- */

            submitBtn.disabled = true;

            submitText.textContent =
                "Submitting...";


            /* ---------------------------------
               Form Data
            --------------------------------- */

            const formData =
                new FormData(form);


            try {

                /* ---------------------------------
                   Send to YOUR PHP backend
                --------------------------------- */

                const response = await fetch(
                    "api/send-mail.php",
                    {
                        method: "POST",
                        body: formData
                    }
                );


                /* ---------------------------------
                   Read response
                --------------------------------- */

                const result =
                    await response.json();


                /* ---------------------------------
                   Success
                --------------------------------- */

                if (
                    response.ok &&
                    result.success
                ) {

                    formMessage.textContent =
                        "Thank you! Your enquiry has been submitted successfully.";

                    formMessage.classList.add(
                        "success"
                    );


                    // Clear form
                    form.reset();


                } else {

                    throw new Error(
                        result.message ||
                        "Unable to send enquiry."
                    );

                }


            } catch (error) {

                console.error(
                    "Form submission error:",
                    error
                );


                formMessage.textContent =
                    error.message ||
                    "Something went wrong. Please try again.";

                formMessage.classList.add(
                    "error"
                );

            }


            /* ---------------------------------
               Reset button
            --------------------------------- */

            submitBtn.disabled = false;

            submitText.textContent =
                "Submit Enquiry";

        }
    );

});