document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       MAIN FEATURED NEWS - 5 NEWS
    ===================================================== */

    const featuredNews = [

        {
            image: "public/news/littleSingamAward.png",
            date: "05 OCTOBER 2023",

            title:
                "Reliance Animation’s Baby Little Singham Wins the Best Children’s Program at Asian TV Festival",

            description:
                "Reliance Entertainment's animation arm, Reliance Animation, a leading player in the Indian animation industry, bags the prestigious award for Baby Little Singham.",

            url:
                "https://www.relianceentertainment.com/reliance-animations-baby-little-singham-wins-the-best-childrens-program-at-asian-academy-creative-awards/?fbclid=IwAR0U_TlCg0D_hs6Gs0Q0K1Abfw2Xbq73AFlLO7yLKUyxH47bzAqgpDCdcN4"
        },


        {
            image: "public/news/pogaAward.png",
            date: "15 AUGUST 2023",

            title:
                "Little Singham Roars into its 6th Year – POGO Unveils a Month-Long Birthday Bash",

            description:
                "Little Singham, India’s beloved supercop kid, is all set to celebrate his birthday with exciting episodes, special showcases and fun-filled contests.",

            url:
                "https://www.mediainfoline.com/brand/little-singham-roars-into-its-6th-year-pogo-unveils-a-month-long-birthday-bash"
        },


        {
            image: "public/news/sandeepmergeRelaince.png",
            date: "20 SEPTEMBER 2023",

            title:
                "Reliance Animation Academy Ties Up with Sandip University, Allen House Group of Schools, and PIMPRI",

            description:
                "Reliance Animation Academy expands its academic partnerships and industry-focused learning opportunities through strategic educational collaborations.",

            url:
                "https://www.accessnewswire.com/769924/Reliance-Animation-Academy-Ties-Up-with-Sandip-University-Allen-House-Group-of-Schools-and-Pimpri-Chinchwad-University-to-Empower-Students-with-Animation-and-VFX-Skills-in-Todays-AI-Tech-Savvy-World"
        },


        {
            image: "public/news/ScopeUniversity.png",
            date: "28 JULY 2023",

            title:
                "Tieup with SCOPE University",

            description:
                "Agreement signed between Scope Global Skills University and Reliance Animation, helping students gain industry-relevant skills and global exposure.",

            url:
                "bhaskarhindi.com/city/bhopal/sgsu-partners-with-reliance-animation-students-to-get-industry-oriented-courses-and-internship-opportunities-1281892"
        },


        {
            image: "public/news/newlunchBihar.png",
            date: "10 JUNE 2023",

            title:
                "Reliance Animation Academy launched in Bihar",

            description:
                "New initiatives provide students with practical animation learning, creative exposure and opportunities to understand the professional animation industry.",

            url:
                "https://livekhabarnation.com/reliance-animation-academy-launch-patna-bihar-digital-creative-training-2026/"
        }

    ];


    /* =====================================================
       GET MAIN NEWS ELEMENTS
    ===================================================== */

    const featuredImage =
        document.getElementById("featuredImage");

    const featuredDate =
        document.getElementById("featuredDate");

    const featuredTitle =
        document.getElementById("featuredTitle");

    const featuredDescription =
        document.getElementById("featuredDescription");

    const featuredButton =
        document.getElementById("featuredButton");

    const prevButton =
        document.getElementById("prevNews");

    const nextButton =
        document.getElementById("nextNews");

    const dots =
        document.querySelectorAll(".news-dot");


    /* =====================================================
       CHECK ELEMENTS
       This helps identify HTML ID mistakes
    ===================================================== */

    if (!featuredImage) {
        console.error("featuredImage not found");
        return;
    }

    if (!featuredDate) {
        console.error("featuredDate not found");
        return;
    }

    if (!featuredTitle) {
        console.error("featuredTitle not found");
        return;
    }

    if (!featuredDescription) {
        console.error("featuredDescription not found");
        return;
    }

    if (!featuredButton) {
        console.error("featuredButton not found");
        return;
    }

    if (!prevButton) {
        console.error("prevNews button not found");
        return;
    }

    if (!nextButton) {
        console.error("nextNews button not found");
        return;
    }


    /* =====================================================
       CURRENT NEWS INDEX
    ===================================================== */

    let currentIndex = 0;


    /* =====================================================
       CHANGE MAIN NEWS
    ===================================================== */

    function showNews(index) {

        currentIndex = index;

        const currentNews =
            featuredNews[currentIndex];


        /* -------------------------------
           IMAGE ANIMATION
        -------------------------------- */

        featuredImage.classList.remove(
            "news-change"
        );

        /*
         Force browser to restart animation
        */

        void featuredImage.offsetWidth;


        /* -------------------------------
           UPDATE IMAGE
        -------------------------------- */

        featuredImage.src =
            currentNews.image;

        featuredImage.alt =
            currentNews.title;


        /* -------------------------------
           UPDATE DATE
        -------------------------------- */

        featuredDate.textContent =
            currentNews.date;


        /* -------------------------------
           UPDATE TITLE
        -------------------------------- */

        featuredTitle.textContent =
            currentNews.title;


        /* -------------------------------
           UPDATE DESCRIPTION
        -------------------------------- */

        featuredDescription.textContent =
            currentNews.description;


        /* -------------------------------
           UPDATE READ MORE LINK
        -------------------------------- */

        featuredButton.href =
            currentNews.url;


        /* -------------------------------
           ADD IMAGE ANIMATION
        -------------------------------- */

        featuredImage.classList.add(
            "news-change"
        );


        /* -------------------------------
           UPDATE DOTS
        -------------------------------- */

        dots.forEach(
            function (dot, dotIndex) {

                if (
                    dotIndex === currentIndex
                ) {

                    dot.classList.add(
                        "active"
                    );

                } else {

                    dot.classList.remove(
                        "active"
                    );

                }

            }
        );


        /* -------------------------------
           DEBUG
        -------------------------------- */

        console.log(
            "Showing News:",
            currentIndex + 1
        );

    }


    /* =====================================================
       NEXT ARROW
    ===================================================== */

    nextButton.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            currentIndex++;

            /*
             If last news reached,
             go back to first news
            */

            if (
                currentIndex >=
                featuredNews.length
            ) {

                currentIndex = 0;

            }

            showNews(currentIndex);

        }
    );


    /* =====================================================
       PREVIOUS ARROW
    ===================================================== */

    prevButton.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            currentIndex--;

            /*
             If first news reached,
             go to last news
            */

            if (
                currentIndex < 0
            ) {

                currentIndex =
                    featuredNews.length - 1;

            }

            showNews(currentIndex);

        }
    );


    /* =====================================================
       DOT CLICK
    ===================================================== */

    dots.forEach(
        function (dot, index) {

            dot.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    showNews(index);

                }
            );

        }
    );


    /* =====================================================
       KEYBOARD SUPPORT
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "ArrowRight") {

                currentIndex++;

                if (
                    currentIndex >=
                    featuredNews.length
                ) {

                    currentIndex = 0;

                }

                showNews(currentIndex);

            }


            if (event.key === "ArrowLeft") {

                currentIndex--;

                if (
                    currentIndex < 0
                ) {

                    currentIndex =
                        featuredNews.length - 1;

                }

                showNews(currentIndex);

            }

        }
    );


    /* =====================================================
       VIEW ALL NEWS
    ===================================================== */

    const viewAllButton =
        document.getElementById(
            "viewAllNews"
        );

    const moreNews =
        document.getElementById(
            "moreNews"
        );

    const viewAllText =
        document.getElementById(
            "viewAllText"
        );

    const viewAllArrow =
        document.getElementById(
            "viewAllArrow"
        );


    if (
        viewAllButton &&
        moreNews
    ) {

        let isMoreNewsOpen = false;


        viewAllButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                isMoreNewsOpen =
                    !isMoreNewsOpen;


                /* -------------------------------
                   OPEN
                -------------------------------- */

                if (isMoreNewsOpen) {

                    moreNews.classList.add(
                        "show"
                    );


                    if (viewAllText) {

                        viewAllText.textContent =
                            "Hide News";

                    }


                    if (viewAllArrow) {

                        viewAllArrow.textContent =
                            "↑";

                    }


                    /*
                     Scroll smoothly to
                     additional news
                    */

                    setTimeout(
                        function () {

                            moreNews.scrollIntoView({
                                behavior: "smooth",
                                block: "start"
                            });

                        },
                        200
                    );

                }


                /* -------------------------------
                   CLOSE
                -------------------------------- */

                else {

                    moreNews.classList.remove(
                        "show"
                    );


                    if (viewAllText) {

                        viewAllText.textContent =
                            "View All News";

                    }


                    if (viewAllArrow) {

                        viewAllArrow.textContent =
                            "→";

                    }

                }

            }
        );

    }


    /* =====================================================
       INITIAL NEWS
    ===================================================== */

    showNews(0);


    /* =====================================================
       SUCCESS MESSAGE
    ===================================================== */

    console.log(
        "✅ Reliance News Slider Loaded Successfully"
    );

});