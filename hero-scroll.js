/* ==========================================================
   WEBSITE JAVASCRIPT
   ========================================================== */


/* ==========================================================
   1. HERO SCROLL TIMELINE
   ----------------------------------------------------------
   The video never plays automatically.
   Scroll position controls video.currentTime.
   ========================================================== */

(function () {

    'use strict';


    function initHeroScroll() {

        const wrapper = document.getElementById('heroScrollWrapper');
        const video = document.getElementById('hero-scroll-video');


        // Stop if Hero elements don't exist
        if (!wrapper || !video) {
            return;
        }


        let duration = 0;
        let framePending = false;
        let lastTargetTime = -1;
        let metadataReady = false;


        /* --------------------------------------------------
           Never allow normal video playback
        -------------------------------------------------- */

        video.autoplay = false;
        video.controls = false;
        video.muted = true;
        video.pause();


        /* --------------------------------------------------
           Clamp value
        -------------------------------------------------- */

        function clamp(value, min, max) {

            return Math.min(
                Math.max(value, min),
                max
            );

        }


        /* --------------------------------------------------
           Calculate scroll progress
        -------------------------------------------------- */

        function getProgress() {

            const rect = wrapper.getBoundingClientRect();

            const scrollDistance =
                wrapper.offsetHeight - window.innerHeight;


            if (scrollDistance <= 0) {
                return 0;
            }


            return clamp(
                -rect.top / scrollDistance,
                0,
                1
            );

        }


        /* --------------------------------------------------
           Update video frame
        -------------------------------------------------- */

        function updateVideoFrame() {

            framePending = false;


            if (
                !metadataReady ||
                !duration ||
                !Number.isFinite(duration)
            ) {

                return;

            }


            const progress = getProgress();


            const targetTime = clamp(
                progress * duration,
                0,
                Math.max(
                    0,
                    duration - 0.001
                )
            );


            // Avoid unnecessary seeking
            if (
                Math.abs(
                    targetTime - lastTargetTime
                ) < 0.004
            ) {

                return;

            }


            lastTargetTime = targetTime;


            /* --------------------------------------------------
               Scroll is the only playback control
            -------------------------------------------------- */

            if (
                Math.abs(
                    video.currentTime - targetTime
                ) > 0.001
            ) {

                try {

                    video.currentTime = targetTime;

                } catch (error) {

                    // Browser may temporarily reject seeking
                    // while media is preparing.

                }

            }

        }


        /* --------------------------------------------------
           Request animation frame
        -------------------------------------------------- */

        function requestFrameUpdate() {

            if (framePending) {
                return;
            }


            framePending = true;


            window.requestAnimationFrame(
                updateVideoFrame
            );

        }


        /* --------------------------------------------------
           Video metadata loaded
        -------------------------------------------------- */

        function onMetadataLoaded() {

            if (
                !Number.isFinite(video.duration) ||
                video.duration <= 0
            ) {

                return;

            }


            duration = video.duration;

            metadataReady = true;


            video.pause();

            video.currentTime = 0;

            lastTargetTime = 0;


            requestFrameUpdate();

        }


        /* --------------------------------------------------
           Check video metadata
        -------------------------------------------------- */

        if (video.readyState >= 1) {

            onMetadataLoaded();

        } else {

            video.addEventListener(
                'loadedmetadata',
                onMetadataLoaded,
                {
                    once: true
                }
            );

        }


        /* --------------------------------------------------
           Scroll event
        -------------------------------------------------- */

        window.addEventListener(
            'scroll',
            requestFrameUpdate,
            {
                passive: true
            }
        );


        /* --------------------------------------------------
           Resize event
        -------------------------------------------------- */

        window.addEventListener(
            'resize',
            requestFrameUpdate,
            {
                passive: true
            }
        );


        /* --------------------------------------------------
           If browser tries to play video,
           immediately pause it.
        -------------------------------------------------- */

        video.addEventListener(
            'play',
            function () {

                video.pause();

            }
        );


        /* --------------------------------------------------
           Keep initial frame ready
        -------------------------------------------------- */

        video.addEventListener(
            'loadeddata',
            requestFrameUpdate,
            {
                once: true
            }
        );

    }


    /* ------------------------------------------------------
       Initialize Hero
    ------------------------------------------------------ */

    if (
        document.readyState === 'loading'
    ) {

        document.addEventListener(
            'DOMContentLoaded',
            initHeroScroll,
            {
                once: true
            }
        );

    } else {

        initHeroScroll();

    }

})();



/* ==========================================================
   2. ENQUIRY FORM - FORMSUBMIT
   ----------------------------------------------------------
   Visitor submits form
          ↓
   JavaScript sends form to FormSubmit
          ↓
   FormSubmit sends email
          ↓
   vickychoky006@gmail.com
   ========================================================== */

(function () {

    'use strict';


    function initEnquiryForm() {

        const form =
            document.getElementById('enquiryForm');


        const submitButton =
            document.getElementById('submitEnquiryBtn');


        /*
         * The message element is optional.
         * Your new HTML doesn't require it,
         * but if it exists, we'll use it.
         */
        const formNote =
            document.getElementById('formNote');


        // Stop if form doesn't exist
        if (!form) {
            return;
        }


        /* --------------------------------------------------
           Form submit
        -------------------------------------------------- */

        form.addEventListener(
            'submit',
            async function (event) {

                /*
                 * IMPORTANT:
                 * Prevent normal browser navigation.
                 *
                 * Instead, we submit the form using AJAX
                 * to FormSubmit.
                 */

                event.preventDefault();


                /* --------------------------------------------------
                   Get form values
                -------------------------------------------------- */

                const firstNameInput =
                    form.querySelector(
                        '[name="first_name"]'
                    );


                const firstName =
                    firstNameInput
                        ? firstNameInput.value.trim()
                        : '';


                /* --------------------------------------------------
                   Button loading state
                -------------------------------------------------- */

                if (submitButton) {

                    submitButton.disabled = true;

                    submitButton.textContent =
                        'Sending...';

                }


                /* --------------------------------------------------
                   Show temporary message
                -------------------------------------------------- */

                if (formNote) {

                    formNote.textContent =
                        'Sending your enquiry...';

                    formNote.style.display =
                        'block';

                }


                try {

                    /* ------------------------------------------------
                       Create FormData
                    ------------------------------------------------ */

                    const formData =
                        new FormData(form);


                    /* ------------------------------------------------
                       Send to FormSubmit AJAX endpoint
                    ------------------------------------------------ */

                    const response =
                        await fetch(
                            'https://formsubmit.co/ajax/vickychoky006@gmail.com',
                            {
                                method: 'POST',

                                body: formData,

                                headers: {
                                    'Accept':
                                        'application/json'
                                }
                            }
                        );


                    /* ------------------------------------------------
                       Read response
                    ------------------------------------------------ */

                    const result =
                        await response.json();


                    /* ------------------------------------------------
                       Check FormSubmit response
                    ------------------------------------------------ */

                    if (
                        response.ok &&
                        result.success
                    ) {

                        /* --------------------------------------------
                           Success
                        -------------------------------------------- */

                        if (formNote) {

                            formNote.textContent =
                                `Thanks, ${firstName || 'there'}! An advisor will reach out shortly.`;

                            formNote.style.display =
                                'block';

                        }


                        /* --------------------------------------------
                           Reset form
                        -------------------------------------------- */

                        form.reset();


                        /* --------------------------------------------
                           Restore button
                        -------------------------------------------- */

                        if (submitButton) {

                            submitButton.disabled = false;

                            submitButton.textContent =
                                'Submit enquiry';

                        }


                    } else {

                        throw new Error(
                            result.message ||
                            'Form submission failed.'
                        );

                    }


                } catch (error) {

                    console.error(
                        'FormSubmit Error:',
                        error
                    );


                    /* ------------------------------------------------
                       Error message
                    ------------------------------------------------ */

                    if (formNote) {

                        formNote.textContent =
                            'Sorry, your enquiry could not be sent. Please try again.';

                        formNote.style.display =
                            'block';

                    }


                    /* ------------------------------------------------
                       Restore button
                    ------------------------------------------------ */

                    if (submitButton) {

                        submitButton.disabled = false;

                        submitButton.textContent =
                            'Submit enquiry';

                    }

                }

            }
        );

    }


    /* ------------------------------------------------------
       Initialize enquiry form
    ------------------------------------------------------ */

    if (
        document.readyState === 'loading'
    ) {

        document.addEventListener(
            'DOMContentLoaded',
            initEnquiryForm,
            {
                once: true
            }
        );

    } else {

        initEnquiryForm();

    }

})();
/* =========================================================
   ADMISSIONS POPUP
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const popup = document.getElementById("admissionPopup");
    const closeButton = document.getElementById("admissionPopupClose");

    if (!popup || !closeButton) {
        return;
    }


    /* =====================================================
       SHOW POPUP WHEN WEBSITE OPENS
    ===================================================== */

    // document.body.style.overflow = "hidden";


    /* =====================================================
       CLOSE BUTTON
    ===================================================== */

    closeButton.addEventListener("click", function () {

        popup.classList.add("popup-closed");

        document.body.style.overflow = "";

    });


    /* =====================================================
       CLOSE WHEN CLICKING OUTSIDE POPUP
    ===================================================== */

    popup.addEventListener("click", function (event) {

        if (event.target === popup) {

            popup.classList.add("popup-closed");

            document.body.style.overflow = "";

        }

    });

});
/* =========================================================
   B.VOC NEW PROGRAM LAUNCH POPUP
   SHOW BEFORE HOME PAGE
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const bvocPopup =
        document.getElementById("bvocLaunchPopup");

    const bvocClose =
        document.getElementById("bvocPopupClose");

    const bvocEnquire =
        document.getElementById("bvocEnquireBtn");


    /* =====================================================
       SAFETY CHECK
    ===================================================== */

    if (!bvocPopup || !bvocClose) {
        return;
    }


    /* =====================================================
       LOCK WEBSITE
       POPUP MUST BE CLOSED FIRST
    ===================================================== */

    document.body.style.overflow = "hidden";


    /* =====================================================
       SHOW POPUP IMMEDIATELY
    ===================================================== */

    requestAnimationFrame(function () {

        bvocPopup.classList.add("bvoc-show");

    });


    /* =====================================================
       CLOSE POPUP FUNCTION
    ===================================================== */

    function closeBvocPopup() {

        bvocPopup.classList.remove("bvoc-show");

        /*
         * Enable website scrolling
         */

        document.body.style.overflow = "";


        /*
         * Optional: remove popup from keyboard focus
         */

        bvocPopup.setAttribute(
            "aria-hidden",
            "true"
        );

    }


    /* =====================================================
       CLOSE BUTTON
    ===================================================== */

    bvocClose.addEventListener(
        "click",
        function () {

            closeBvocPopup();

        }
    );


    /* =====================================================
       ENQUIRE NOW
    ===================================================== */

    if (bvocEnquire) {

        bvocEnquire.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                closeBvocPopup();


                /*
                 * Wait for popup closing animation
                 */

                setTimeout(function () {

                    const contactSection =
                        document.getElementById("contact");


                    if (contactSection) {

                        contactSection.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }

                }, 350);

            }
        );

    }


    /* =====================================================
       CLICK OUTSIDE POPUP
    ===================================================== */

    bvocPopup.addEventListener(
        "click",
        function (event) {

            if (
                event.target === bvocPopup
            ) {

                closeBvocPopup();

            }

        }
    );


    /* =====================================================
       ESC KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                bvocPopup.classList.contains("bvoc-show")
            ) {

                closeBvocPopup();

            }

        }
    );

});