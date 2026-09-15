/* =========================================================
   MEET THE BOARD - MEMBER DETAILS
========================================================= */


/* =========================================================
   BOARD MEMBER DATA
========================================================= */

const boardMembers = {

    ashish: {

        name: "Upendra Naithani",

        role: "Center Head",

        company:
            "Reliance Animation Academy",

        image:
            "public/board1 (2).png",

        description:
            "After more than 28 years of experience in the corporate world, Mr. Upendra Naithani has embarked on a broader mission as an Entrepreneur, Visionary, Coach, and Analyst, driven by a passion for building ventures, inspiring transformation, and guiding the next generation through structured insight, strategic thinking, and mentorship.He currently leads the Reliance Animation Academy in Chennai, where he is helping bring the dreams and aspirations of countless young talents to life in the AVGC (Animation, VFX, Gaming, and Comics) sector. Under his leadership, the academy is evolving beyond conventional education, with a strong focus on empowering creative talent, bridging the gap between industry and academia, and creating meaningful pathways for young professionals to thrive in India’s rapidly evolving creative economy.Mr. Upendra Naithani’s vision extends beyond imparting education. He is committed to building a future-ready talent ecosystem that brings together creativity, technology, industry exposure, innovation, and entrepreneurial thinking. Through his efforts, he strives to equip young aspirants with the knowledge, confidence, skills, and opportunities needed to transform their aspirations into successful careers.His extensive corporate experience, combined with his entrepreneurial mindset and passion for mentorship, enables him to bring a unique perspective to leadership and talent development. He continues to work toward creating meaningful impact by nurturing individuals who can not only participate in emerging industries but also lead, innovate, and shape the industries of tomorrow.His journey continues with an unwavering commitment to innovation, community impact, entrepreneurship, and leadership development, guided by the belief that meaningful transformation begins with empowering people and creating opportunities for them to realize their full potential."
    },


    aashish: {

        name: "M S Ramachandran",

        role:
            "National Academic Manager",

        company:
            "Reliance Animation Academy",

        image:
            "public/board2.jpeg",

        description:
            "M. S. Ramachandran is a seasoned professional and academic leader with 20+ years of experience in the VFX and Animation industry. Throughout his illustrious career, he has contributed to 70+ domestic and international film productions, working across diverse aspects of visual effects and animation.His impressive portfolio includes acclaimed projects such as Endhiran (The Robot), Baahubali 2: The Conclusion, G.I. Joe, X-Men: Days of Future Past, and several other notable international and Indian productions.As an educator and mentor, Ramachandran has played a significant role in nurturing the next generation of VFX and animation professionals. He has trained and mentored 500+ students, equipping them with industry-relevant skills, creative expertise, and practical knowledge to build successful careers in the rapidly evolving world of animation and visual effects.With a unique combination of extensive industry experience, academic leadership, and mentorship, he continues to contribute to the growth of talent and innovation in India’s VFX and Animation ecosystem"
    },


    ankur: {

        name: "Baskar Raj Balasubramanian",

        role:
            "Mentor",

        company:
            "Reliance Animation Academy",

        image:
            "public/board3.jpeg",

        description:
            "A versatile creative professional with 7+ years of experience across Video Editing, 3D Art, 3D Generalist workflows, and Game Art education. Specializing in game-ready asset creation, digital sculpting, environment art, PBR texturing, rendering, and real-time content development, with hands-on expertise in industry-standard tools including Autodesk Maya, Blender, ZBrush, Substance Painter, and Unreal Engine.With a strong blend of industry experience and academic expertise, adept at transforming creative concepts into optimized, production-ready 3D assets for games, animation, and visualization projects. Experienced in mentoring and training aspiring game artists, helping students develop both technical proficiency and creative problem-solving skills aligned with current industry expectations.Passionate about real-time 3D, game development, and emerging technologies, with a continuous drive to explore new workflows, enhance artistic capabilities, and create high-quality, optimized assets for immersive digital experiences."
    }

};



/* =========================================================
   GET ELEMENTS
========================================================= */

const boardDetailOverlay =
    document.getElementById(
        "boardDetailOverlay"
    );

const boardDetailClose =
    document.getElementById(
        "boardDetailClose"
    );

const boardDetailImage =
    document.getElementById(
        "boardDetailImage"
    );

const boardDetailRole =
    document.getElementById(
        "boardDetailRole"
    );

const boardDetailName =
    document.getElementById(
        "boardDetailName"
    );

const boardDetailCompany =
    document.getElementById(
        "boardDetailCompany"
    );

const boardDetailDescription =
    document.getElementById(
        "boardDetailDescription"
    );



/* =========================================================
   OPEN BOARD MEMBER DETAILS
========================================================= */

function openBoardDetails(member) {

    const data =
        boardMembers[member];


    if (!data) {

        console.error(
            "Board member not found:",
            member
        );

        return;
    }


    /* IMAGE */

    boardDetailImage.src =
        data.image;

    boardDetailImage.alt =
        data.name;


    /* ROLE */

    boardDetailRole.textContent =
        data.role;


    /* NAME */

    boardDetailName.textContent =
        data.name;


    /* COMPANY */

    boardDetailCompany.textContent =
        data.company;


    /* DESCRIPTION */

    boardDetailDescription.textContent =
        data.description;


    /* SHOW MODAL */

    boardDetailOverlay.classList.add(
        "active"
    );


    /* PREVENT BACKGROUND SCROLL */

    document.body.style.overflow =
        "hidden";
}



/* =========================================================
   CLOSE BOARD DETAILS
========================================================= */

function closeBoardDetails() {

    boardDetailOverlay.classList.remove(
        "active"
    );


    /* RESTORE SCROLL */

    document.body.style.overflow =
        "";
}



/* =========================================================
   CLOSE BUTTON
========================================================= */

if (boardDetailClose) {

    boardDetailClose.addEventListener(
        "click",
        closeBoardDetails
    );

}



/* =========================================================
   CLICK OUTSIDE MODAL
========================================================= */

if (boardDetailOverlay) {

    boardDetailOverlay.addEventListener(
        "click",
        function (event) {

            if (
                event.target ===
                boardDetailOverlay
            ) {

                closeBoardDetails();

            }

        }
    );

}



/* =========================================================
   ESC KEY
========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape" &&
            boardDetailOverlay.classList.contains(
                "active"
            )
        ) {

            closeBoardDetails();

        }

    }
);