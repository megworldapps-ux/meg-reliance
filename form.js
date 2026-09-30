
document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("courseForm");

    const phone = document.getElementById("phone");

    const submitBtn = document.getElementById("submitBtn");


    /* ================================
       PHONE NUMBER
    ================================= */

    phone.addEventListener("input", function () {

        // Numbers மட்டும் allow
        this.value = this.value.replace(/[^0-9]/g, "");

        // Maximum 10 digits
        if (this.value.length > 10) {

            this.value = this.value.substring(0, 10);

        }

    });


    /* ================================
       FORM SUBMIT
    ================================= */

    form.addEventListener("submit", function (event) {

        const phoneNumber = phone.value.trim();


        // Phone validation

        if (phoneNumber.length !== 10) {

            event.preventDefault();

            alert("Please enter a valid 10 digit phone number.");

            phone.focus();

            return;

        }


        /*
         * IMPORTANT:
         *
         * No fetch()
         * No AJAX
         * No XMLHttpRequest
         *
         * Browser directly submits the form
         * to FormSubmit using normal POST.
         */


        submitBtn.querySelector("span:first-child").textContent =
            "Submitting...";


        submitBtn.disabled = true;

    });

});

