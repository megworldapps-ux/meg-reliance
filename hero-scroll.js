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
   2. ENQUIRY FORM - OWN PHP BACKEND
   ========================================================== */

(function () {

    'use strict';

    function initEnquiryForm() {

        const form = document.getElementById('enquiryForm');
        const submitButton =
            document.getElementById('submitEnquiryBtn');

        if (!form) {
            return;
        }

        form.addEventListener('submit', async function (event) {

            event.preventDefault();

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

                /* ==========================================
                   SUCCESS
                   ========================================== */

                form.reset();

                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.textContent = 'Submit enquiry';
                }

                showSuccessPopup();

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
                    'Sorry! Your enquiry could not be sent. Please try again.'
                );

            }

        });

    }


    /* ==========================================================
       SUCCESS POPUP
       ========================================================== */

    function showSuccessPopup() {

        const oldPopup =
            document.getElementById('formSuccessPopup');

        if (oldPopup) {
            oldPopup.remove();
        }

        const popup = document.createElement('div');

        popup.id = 'formSuccessPopup';

        popup.innerHTML = `
            <div class="success-popup-overlay">

                <div class="success-popup-box">

                    <div class="success-icon">
                        <i class="fa-solid fa-check"></i>
                    </div>

                    <h2>Thank You!</h2>

                    <p>
                        Your enquiry has been sent successfully.
                    </p>

                    <button
                        type="button"
                        id="successPopupClose"
                    >
                        OK
                    </button>

                </div>

            </div>
        `;

        document.body.appendChild(popup);

        const closeButton =
            document.getElementById('successPopupClose');

        if (closeButton) {

            closeButton.addEventListener(
                'click',
                function () {
                    popup.remove();
                }
            );

        }

        setTimeout(function () {

            if (
                document.getElementById('formSuccessPopup')
            ) {
                popup.remove();
            }

        }, 4000);

    }


    /* ==========================================================
       INITIALIZE
       ========================================================== */

    if (document.readyState === 'loading') {

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
document.addEventListener("DOMContentLoaded", function () {

    const popup = document.querySelector(".admission-popup");
    const closeBtn = document.getElementById("popupClose");

    if (!popup || !closeBtn) return;

    closeBtn.addEventListener("click", function () {
        popup.style.display = "none";
    });

});