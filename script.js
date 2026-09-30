/* =====================================================
   JobCV-SI Resume Builder
   Complete Script
   ===================================================== */


/* =====================================================
   HELPERS
   ===================================================== */

const $ = (selector, parent = document) =>
    parent.querySelector(selector);

const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];


function escapeHTML(value = "") {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}


function showToast(message) {

    const toast = $("#toast");

    if (!toast) return;

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2200);

}


/* =====================================================
   BASIC INPUTS
   ===================================================== */

function updatePersonalInfo() {

    const name =
        $("#fullName")?.value.trim() || "";

    const title =
        $("#jobTitle")?.value.trim() || "";

    const email =
        $("#email")?.value.trim() || "";

    const phone =
        $("#phone")?.value.trim() || "";

    const location =
        $("#location")?.value.trim() || "";

    const website =
        $("#website")?.value.trim() || "";

    const summary =
        $("#summary")?.value.trim() || "";

    $("#previewName").textContent =
        name || "Your Name";

    $("#previewTitle").textContent =
        title || "Professional Title";

    $("#previewEmail").textContent =
        email || "email@example.com";

    $("#previewPhone").textContent =
        phone || "+91 00000 00000";

    $("#previewLocation").textContent =
        location || "City, Country";

    $("#previewWebsite").textContent =
        website || "linkedin.com/in/yourname";

    $("#previewSummary").textContent =
        summary ||
        "Your professional summary will appear here.";

}


/* =====================================================
   SKILLS
   ===================================================== */

function updateSkills() {

    const value =
        $("#skills")?.value.trim() || "";

    const container =
        $("#previewSkills");

    if (!container) return;


    if (!value) {

        container.innerHTML =
            `<span class="skill-placeholder">
                Your skills will appear here.
            </span>`;

        return;

    }


    const skills =
        value
            .split(",")
            .map(skill => skill.trim())
            .filter(Boolean);


    container.innerHTML =
        skills
            .map(skill =>
                `<span class="skill">
                    ${escapeHTML(skill)}
                </span>`
            )
            .join("");

}


/* =====================================================
   EXPERIENCE
   ===================================================== */

function getExperiences() {

    return $$(".experience-item")
        .map(item => {

            return {

                title:
                    $(".exp-title", item)?.value.trim() || "",

                company:
                    $(".exp-company", item)?.value.trim() || "",

                location:
                    $(".exp-location", item)?.value.trim() || "",

                start:
                    $(".exp-start", item)?.value.trim() || "",

                end:
                    $(".exp-end", item)?.value.trim() || "",

                description:
                    $(".exp-description", item)?.value.trim() || ""

            };

        });

}


function updateExperiencePreview() {

    const experiences =
        getExperiences();

    const container =
        $("#previewExperience");

    if (!container) return;


    const valid =
        experiences.filter(item =>
            item.title ||
            item.company ||
            item.description
        );


    if (!valid.length) {

        container.innerHTML =
            `<div class="empty-state">
                Your work experience will appear here.
            </div>`;

        return;

    }


    container.innerHTML =
        valid.map(item => {

            const date =
                [item.start, item.end]
                    .filter(Boolean)
                    .join(" — ");


            const company =
                [
                    item.company,
                    item.location
                ]
                .filter(Boolean)
                .join(" · ");


            return `

                <div class="resume-item">

                    <div class="resume-item-header">

                        <div>

                            <div class="resume-item-title">
                                ${escapeHTML(
                                    item.title ||
                                    "Job Title"
                                )}
                            </div>

                            <div class="resume-item-company">
                                ${escapeHTML(company)}
                            </div>

                        </div>

                        <div class="resume-item-date">
                            ${escapeHTML(date)}
                        </div>

                    </div>


                    ${
                        item.description
                        ?
                        `<div class="resume-item-description">
                            ${escapeHTML(item.description)}
                        </div>`
                        :
                        ""
                    }

                </div>

            `;

        }).join("");

}


/* =====================================================
   EDUCATION
   ===================================================== */

function getEducation() {

    return $$(".education-item")
        .map(item => {

            return {

                degree:
                    $(".edu-degree", item)?.value.trim() || "",

                school:
                    $(".edu-school", item)?.value.trim() || "",

                location:
                    $(".edu-location", item)?.value.trim() || "",

                start:
                    $(".edu-start", item)?.value.trim() || "",

                end:
                    $(".edu-end", item)?.value.trim() || ""

            };

        });

}


function updateEducationPreview() {

    const education =
        getEducation();

    const container =
        $("#previewEducation");

    if (!container) return;


    const valid =
        education.filter(item =>
            item.degree ||
            item.school
        );


    if (!valid.length) {

        container.innerHTML =
            `<div class="empty-state">
                Your education will appear here.
            </div>`;

        return;

    }


    container.innerHTML =
        valid.map(item => {

            const date =
                [item.start, item.end]
                    .filter(Boolean)
                    .join(" — ");


            const school =
                [
                    item.school,
                    item.location
                ]
                .filter(Boolean)
                .join(" · ");


            return `

                <div class="resume-item">

                    <div class="resume-item-header">

                        <div>

                            <div class="resume-item-title">
                                ${escapeHTML(
                                    item.degree ||
                                    "Degree / Qualification"
                                )}
                            </div>

                            <div class="resume-item-company">
                                ${escapeHTML(school)}
                            </div>

                        </div>


                        <div class="resume-item-date">
                            ${escapeHTML(date)}
                        </div>

                    </div>

                </div>

            `;

        }).join("");

}


/* =====================================================
   CERTIFICATIONS
   ===================================================== */

function updateCertifications() {

    const value =
        $("#certifications")?.value.trim() || "";

    const container =
        $("#previewCertifications");

    if (!container) return;


    if (!value) {

        container.innerHTML =
            `<div class="empty-state">
                Your certifications will appear here.
            </div>`;

        return;

    }


    const lines =
        value
            .split("\n")
            .map(line => line.trim())
            .filter(Boolean);


    container.innerHTML =
        lines.map(line => {

            return `

                <div class="resume-item">

                    <div class="resume-item-title">
                        ${escapeHTML(line)}
                    </div>

                </div>

            `;

        }).join("");

}


/* =====================================================
   VISIBILITY
   ===================================================== */

function updateVisibility() {

    const summary =
        $("#summary")?.value.trim() || "";


    const experiences =
        getExperiences()
            .filter(item =>
                item.title ||
                item.company ||
                item.description
            );


    const education =
        getEducation()
            .filter(item =>
                item.degree ||
                item.school
            );


    const skills =
        $("#skills")?.value.trim() || "";


    const certifications =
        $("#certifications")?.value.trim() || "";


    if ($("#summarySection")) {

        $("#summarySection").style.display =
            summary ? "" : "none";

    }


    if ($("#experienceSection")) {

        $("#experienceSection").style.display =
            experiences.length ? "" : "none";

    }


    if ($("#educationSection")) {

        $("#educationSection").style.display =
            education.length ? "" : "none";

    }


    if ($("#skillsSection")) {

        $("#skillsSection").style.display =
            skills ? "" : "none";

    }


    if ($("#certificationSection")) {

        $("#certificationSection").style.display =
            certifications ? "" : "none";

    }

}


/* =====================================================
   PROGRESS
   ===================================================== */

function updateProgress() {

    const fields = [

        $("#fullName")?.value.trim() || "",

        $("#jobTitle")?.value.trim() || "",

        $("#email")?.value.trim() || "",

        $("#phone")?.value.trim() || "",

        $("#location")?.value.trim() || "",

        $("#summary")?.value.trim() || "",

        $("#skills")?.value.trim() || ""

    ];


    const filled =
        fields.filter(Boolean).length;


    const percent =
        Math.round(
            (filled / fields.length) * 100
        );


    const circle =
        $("#progressCircle");


    if (!circle) return;


    circle.textContent =
        `${percent}%`;


    circle.style.background =
        `conic-gradient(
            var(--primary)
            ${percent * 3.6}deg,
            #e8eef8
            ${percent * 3.6}deg
        )`;

}


/* =====================================================
   UPDATE EVERYTHING
   ===================================================== */

function updateResume() {

    updatePersonalInfo();

    updateSkills();

    updateExperiencePreview();

    updateEducationPreview();

    updateCertifications();

    updateVisibility();

    updateProgress();


    /*
       Wait until browser has updated the DOM.
    */

    requestAnimationFrame(() => {

        requestAnimationFrame(() => {

            paginateResume();

        });

    });

}


/* =====================================================
   ADD EXPERIENCE
   ===================================================== */

const addExperienceButton =
    $("#addExperience");


if (addExperienceButton) {

    addExperienceButton.addEventListener(
        "click",
        () => {

            const list =
                $("#experienceList");

            if (!list) return;


            const number =
                $$(".experience-item").length + 1;


            const item =
                document.createElement("div");


            item.className =
                "repeat-card experience-item";


            item.innerHTML = `

                <div class="repeat-header">

                    <strong>
                        Experience ${number}
                    </strong>

                    <button
                        type="button"
                        class="remove-btn"
                        data-remove="experience"
                    >
                        Remove
                    </button>

                </div>


                <div class="form-grid">

                    <div class="field full">

                        <label>
                            Job title
                        </label>

                        <input
                            class="exp-title"
                            type="text"
                            placeholder="e.g. Network Engineer"
                        >

                    </div>


                    <div class="field">

                        <label>
                            Company
                        </label>

                        <input
                            class="exp-company"
                            type="text"
                            placeholder="Company name"
                        >

                    </div>


                    <div class="field">

                        <label>
                            Location
                        </label>

                        <input
                            class="exp-location"
                            type="text"
                            placeholder="City, Country"
                        >

                    </div>


                    <div class="field">

                        <label>
                            Start date
                        </label>

                        <input
                            class="exp-start"
                            type="text"
                            placeholder="Jan 2021"
                        >

                    </div>


                    <div class="field">

                        <label>
                            End date
                        </label>

                        <input
                            class="exp-end"
                            type="text"
                            placeholder="Present"
                        >

                    </div>


                    <div class="field full">

                        <label>
                            Achievements & responsibilities
                        </label>

                        <textarea
                            class="exp-description"
                            rows="5"
                            placeholder="Describe your key responsibilities and achievements..."
                        ></textarea>

                    </div>

                </div>

            `;


            list.appendChild(item);

            attachInputListeners(item);

            updateResume();

        }
    );

}


/* =====================================================
   ADD EDUCATION
   ===================================================== */

const addEducationButton =
    $("#addEducation");


if (addEducationButton) {

    addEducationButton.addEventListener(
        "click",
        () => {

            const list =
                $("#educationList");

            if (!list) return;


            const number =
                $$(".education-item").length + 1;


            const item =
                document.createElement("div");


            item.className =
                "repeat-card education-item";


            item.innerHTML = `

                <div class="repeat-header">

                    <strong>
                        Education ${number}
                    </strong>

                    <button
                        type="button"
                        class="remove-btn"
                        data-remove="education"
                    >
                        Remove
                    </button>

                </div>


                <div class="form-grid">

                    <div class="field full">

                        <label>
                            Degree / qualification
                        </label>

                        <input
                            class="edu-degree"
                            type="text"
                            placeholder="e.g. Bachelor of Information Technology"
                        >

                    </div>


                    <div class="field">

                        <label>
                            School / university
                        </label>

                        <input
                            class="edu-school"
                            type="text"
                            placeholder="University name"
                        >

                    </div>


                    <div class="field">

                        <label>
                            Location
                        </label>

                        <input
                            class="edu-location"
                            type="text"
                            placeholder="City, Country"
                        >

                    </div>


                    <div class="field">

                        <label>
                            Start date
                        </label>

                        <input
                            class="edu-start"
                            type="text"
                            placeholder="2018"
                        >

                    </div>


                    <div class="field">

                        <label>
                            End date
                        </label>

                        <input
                            class="edu-end"
                            type="text"
                            placeholder="2021"
                        >

                    </div>

                </div>

            `;


            list.appendChild(item);

            attachInputListeners(item);

            updateResume();

        }
    );

}


/* =====================================================
   REMOVE EXPERIENCE / EDUCATION
   ===================================================== */

document.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(
                ".remove-btn"
            );


        if (!button) return;


        const type =
            button.dataset.remove;


        const item =
            button.closest(
                type === "experience"
                    ? ".experience-item"
                    : ".education-item"
            );


        if (!item) return;


        const selector =
            type === "experience"
                ? ".experience-item"
                : ".education-item";


        const allItems =
            $$(selector);


        /*
           Keep at least one item.
        */

        if (allItems.length <= 1) {

            showToast(
                `At least one ${type} section is required.`
            );

            return;

        }


        item.remove();


        /*
           Renumber cards.
        */

        $$(selector).forEach(
            (card, index) => {

                const strong =
                    $(".repeat-header strong", card);

                if (strong) {

                    strong.textContent =
                        `${type === "experience"
                            ? "Experience"
                            : "Education"} ${index + 1}`;

                }

            }
        );


        updateResume();

    }
);


/* =====================================================
   PROFESSIONAL A4 PAGINATION
   ===================================================== */

let paginationTimer = null;


function schedulePagination() {

    clearTimeout(paginationTimer);


    paginationTimer =
        setTimeout(() => {

            paginateResume();

        }, 40);

}


function paginateResume() {

    const resume =
        $("#resume");


    if (!resume) return;


    /*
       Prevent recursive pagination.
    */

    if (
        resume.dataset.paginating === "true"
    ) {

        return;

    }


    resume.dataset.paginating = "true";


    /*
       -------------------------------------------------
       STEP 1
       Remove old page wrappers
       -------------------------------------------------
    */

    const oldPages =
        $$(".resume-page", resume);


    oldPages.forEach(page => {

        const children =
            [...page.children];


        children.forEach(child => {

            resume.appendChild(child);

        });


        page.remove();

    });


    /*
       -------------------------------------------------
       STEP 2
       Get original resume content
       -------------------------------------------------
    */

    const elements =
        [...resume.children];


    if (!elements.length) {

        resume.dataset.paginating =
            "false";

        return;

    }


    /*
       -------------------------------------------------
       STEP 3
       Create pages
       -------------------------------------------------
    */

    let currentPage =
        createResumePage();


    resume.appendChild(
        currentPage
    );


    /*
       -------------------------------------------------
       STEP 4
       Add content one element at a time
       -------------------------------------------------
    */

    elements.forEach(element => {

        /*
           The element is already inside the
           current page if it is the page itself.
        */

        if (
            element.classList.contains(
                "resume-page"
            )
        ) {

            return;

        }


        currentPage.appendChild(
            element
        );


        /*
           Force browser layout calculation.
        */

        void currentPage.offsetHeight;


        /*
           Check if current page is overflowing.
        */

        if (
            isPageOverflowing(
                currentPage
            )
        ) {

            /*
               Remove the overflowing element.
            */

            currentPage.removeChild(
                element
            );


            /*
               Create next page.
            */

            currentPage =
                createResumePage();


            resume.appendChild(
                currentPage
            );


            /*
               Add element to next page.
            */

            currentPage.appendChild(
                element
            );


            void currentPage.offsetHeight;

        }

    });


    /*
       -------------------------------------------------
       STEP 5
       Fix pages containing oversized sections
       -------------------------------------------------
    */

    repairOversizedPages(resume);


    /*
       -------------------------------------------------
       STEP 6
       Apply zoom
       -------------------------------------------------
    */

    applyZoom();


    resume.dataset.paginating =
        "false";

}


/* =====================================================
   CREATE A4 PAGE
   ===================================================== */

function createResumePage() {

    const page =
        document.createElement("article");


    page.className =
        "resume-page";


    /*
       Copy the selected resume template
       to the page so template-specific
       CSS continues working.
    */

    const resume =
        $("#resume");


    if (resume) {

        if (
            resume.classList.contains(
                "modern"
            )
        ) {

            page.classList.add("modern");

        }
        else if (
            resume.classList.contains(
                "minimal"
            )
        ) {

            page.classList.add("minimal");

        }
        else {

            page.classList.add("classic");

        }

    }


    return page;

}


/* =====================================================
   CHECK PAGE OVERFLOW
   ===================================================== */

function isPageOverflowing(page) {

    if (!page) return false;


    const contentHeight =
        page.scrollHeight;


    const availableHeight =
        getPrintablePageHeight();


    return (
        contentHeight >
        availableHeight + 1
    );

}


/* =====================================================
   PRINTABLE A4 HEIGHT
   ===================================================== */

function getPrintablePageHeight() {

    /*
       A4:
       297mm × 96px / 25.4
       ≈ 1122.52px

       Page padding:
       15mm top
       15mm bottom

       Printable content:
       ≈ 1009px
    */

    const a4Height =
        297 * 96 / 25.4;


    const padding =
        15 * 2 * 96 / 25.4;


    return (
        a4Height -
        padding
    );

}


/* =====================================================
   REPAIR OVERSIZED PAGES
   ===================================================== */

function repairOversizedPages(resume) {

    const pages =
        $$(".resume-page", resume);


    pages.forEach(page => {

        /*
           A page may still be too large if
           a single section itself is large.
        */

        if (
            !isPageOverflowing(page)
        ) {

            return;

        }


        const children =
            [...page.children];


        /*
           Try moving the last suitable
           section to the next page.
        */

        while (
            isPageOverflowing(page) &&
            children.length > 1
        ) {

            const last =
                page.lastElementChild;


            if (!last) break;


            /*
               Do not move the first element.
            */

            if (
                page.children.length <= 1
            ) {

                break;

            }


            let nextPage =
                page.nextElementSibling;


            if (
                !nextPage ||
                !nextPage.classList.contains(
                    "resume-page"
                )
            ) {

                nextPage =
                    createResumePage();


                resume.insertBefore(
                    nextPage,
                    page.nextSibling
                );

            }


            nextPage.insertBefore(
                last,
                nextPage.firstChild
            );

        }

    });

}


/* =====================================================
   TEMPLATE SWITCHER
   ===================================================== */

$$(".template-card")
    .forEach(card => {

        card.addEventListener(
            "click",
            () => {

                $$(".template-card")
                    .forEach(item =>
                        item.classList.remove(
                            "active"
                        )
                    );


                card.classList.add(
                    "active"
                );


                const template =
                    card.dataset.template;


                const resume =
                    $("#resume");


                if (!resume) return;


                resume.classList.remove(
                    "classic",
                    "modern",
                    "minimal"
                );


                resume.classList.add(
                    template
                );


                localStorage.setItem(
                    "jobcv-template",
                    template
                );


                updateResume();

            }
        );

    });


/* =====================================================
   ZOOM
   ===================================================== */

let zoom = 85;


function applyZoom() {

    const pages =
        $$(".resume-page");


    pages.forEach(page => {

        page.style.transform =
            `scale(${zoom / 100})`;

        page.style.transformOrigin =
            "top center";

    });


    const zoomValue =
        $("#zoomValue");


    if (zoomValue) {

        zoomValue.textContent =
            `${zoom}%`;

    }

}


/* =====================================================
   ZOOM IN
   ===================================================== */

const zoomIn =
    $("#zoomIn");


if (zoomIn) {

    zoomIn.addEventListener(
        "click",
        () => {

            zoom =
                Math.min(
                    110,
                    zoom + 5
                );


            applyZoom();

        }
    );

}


/* =====================================================
   ZOOM OUT
   ===================================================== */

const zoomOut =
    $("#zoomOut");


if (zoomOut) {

    zoomOut.addEventListener(
        "click",
        () => {

            zoom =
                Math.max(
                    55,
                    zoom - 5
                );


            applyZoom();

        }
    );

}


/* =====================================================
   DARK MODE
   ===================================================== */

const themeToggle =
    $("#themeToggle");


if (themeToggle) {

    themeToggle.addEventListener(
        "click",
        () => {

            document.body.classList.toggle(
                "dark"
            );


            const isDark =
                document.body.classList.contains(
                    "dark"
                );


            localStorage.setItem(
                "jobcv-theme",
                isDark
                    ? "dark"
                    : "light"
            );

        }
    );

}


/* =====================================================
   DOWNLOAD / PRINT PDF
   ===================================================== */

function downloadPDF() {

    updateResume();


    setTimeout(() => {

        window.print();

    }, 500);

}


const downloadTop =
    $("#downloadTop");


if (downloadTop) {

    downloadTop.addEventListener(
        "click",
        downloadPDF
    );

}


const downloadMobile =
    $("#downloadMobile");


if (downloadMobile) {

    downloadMobile.addEventListener(
        "click",
        downloadPDF
    );

}


/* =====================================================
   SAMPLE DATA
   ===================================================== */

const sampleButton =
    $("#loadSample");


if (sampleButton) {

    sampleButton.addEventListener(
        "click",
        () => {

            /*
               Personal details
            */

            if ($("#fullName"))
                $("#fullName").value =
                    "Alex Morgan";


            if ($("#jobTitle"))
                $("#jobTitle").value =
                    "Senior Network Engineer";


            if ($("#email"))
                $("#email").value =
                    "alex.morgan@example.com";


            if ($("#phone"))
                $("#phone").value =
                    "+1 416 555 0198";


            if ($("#location"))
                $("#location").value =
                    "Toronto, Canada";


            if ($("#website"))
                $("#website").value =
                    "linkedin.com/in/alexmorgan";


            /*
               Summary
            */

            if ($("#summary"))
                $("#summary").value =
                    "Experienced Network Engineer with 7+ years of experience in network infrastructure, routing, switching, troubleshooting and technical support. Skilled in maintaining reliable IT environments and supporting business-critical systems.";


            /*
               Skills
            */

            if ($("#skills"))
                $("#skills").value =
                    "Network Engineering, Routing, Switching, TCP/IP, Troubleshooting, Technical Support, Microsoft 365, Azure, System Administration";


            /*
               Certifications
            */

            if ($("#certifications"))
                $("#certifications").value =
                    "Tata Cybersecurity Analyst Job Simulation\nCisco Networking Fundamentals\nMicrosoft Azure Fundamentals";


            /*
               Experience
            */

            const experienceList =
                $("#experienceList");


            if (experienceList) {

                experienceList.innerHTML = "";


                const item =
                    document.createElement("div");


                item.className =
                    "repeat-card experience-item";


                item.innerHTML = `

                    <div class="repeat-header">

                        <strong>
                            Experience 1
                        </strong>

                        <button
                            type="button"
                            class="remove-btn"
                            data-remove="experience"
                        >
                            Remove
                        </button>

                    </div>


                    <div class="form-grid">

                        <div class="field full">

                            <label>
                                Job title
                            </label>

                            <input
                                class="exp-title"
                                type="text"
                                value="Senior Network Engineer"
                            >

                        </div>


                        <div class="field">

                            <label>
                                Company
                            </label>

                            <input
                                class="exp-company"
                                type="text"
                                value="Technology Solutions Ltd."
                            >

                        </div>


                        <div class="field">

                            <label>
                                Location
                            </label>

                            <input
                                class="exp-location"
                                type="text"
                                value="Toronto, Canada"
                            >

                        </div>


                        <div class="field">

                            <label>
                                Start date
                            </label>

                            <input
                                class="exp-start"
                                type="text"
                                value="2021"
                            >

                        </div>


                        <div class="field">

                            <label>
                                End date
                            </label>

                            <input
                                class="exp-end"
                                type="text"
                                value="Present"
                            >

                        </div>


                        <div class="field full">

                            <label>
                                Achievements & responsibilities
                            </label>

                            <textarea
                                class="exp-description"
                                rows="5"
                            >Designed, configured and maintained enterprise network infrastructure.
Managed routing, switching, VLANs and network troubleshooting.
Provided technical support for business users and critical systems.
Performed network patching, hardware maintenance and infrastructure monitoring.
Worked with cross-functional teams to resolve complex technical issues and improve network reliability.</textarea>

                        </div>

                    </div>

                `;


                experienceList.appendChild(
                    item
                );


                attachInputListeners(
                    item
                );

            }


            /*
               Education
            */

            const educationList =
                $("#educationList");


            if (educationList) {

                educationList.innerHTML = "";


                const item =
                    document.createElement("div");


                item.className =
                    "repeat-card education-item";


                item.innerHTML = `

                    <div class="repeat-header">

                        <strong>
                            Education 1
                        </strong>

                        <button
                            type="button"
                            class="remove-btn"
                            data-remove="education"
                        >
                            Remove
                        </button>

                    </div>


                    <div class="form-grid">

                        <div class="field full">

                            <label>
                                Degree / qualification
                            </label>

                            <input
                                class="edu-degree"
                                type="text"
                                value="Bachelor of Information Technology"
                            >

                        </div>


                        <div class="field">

                            <label>
                                School / university
                            </label>

                            <input
                                class="edu-school"
                                type="text"
                                value="University of Technology"
                            >

                        </div>


                        <div class="field">

                            <label>
                                Location
                            </label>

                            <input
                                class="edu-location"
                                type="text"
                                value="India"
                            >

                        </div>


                        <div class="field">

                            <label>
                                Start date
                            </label>

                            <input
                                class="edu-start"
                                type="text"
                                value="2016"
                            >

                        </div>


                        <div class="field">

                            <label>
                                End date
                            </label>

                            <input
                                class="edu-end"
                                type="text"
                                value="2019"
                            >

                        </div>

                    </div>

                `;


                educationList.appendChild(
                    item
                );


                attachInputListeners(
                    item
                );

            }


            updateResume();


            showToast(
                "Sample resume loaded"
            );

        }
    );

}


/* =====================================================
   INPUT LISTENERS
   ===================================================== */

function attachInputListeners(
    parent = document
) {

    $$(
        "input, textarea",
        parent
    ).forEach(input => {

        /*
           Avoid attaching duplicate
           listeners to the same input.
        */

        if (
            input.dataset.listenerAttached ===
            "true"
        ) {

            return;

        }


        input.dataset.listenerAttached =
            "true";


        input.addEventListener(
            "input",
            () => {

                updateResume();


                if (
                    input.id === "summary"
                ) {

                    const counter =
                        $("#summaryCount");


                    if (counter) {

                        counter.textContent =
                            input.value.length;

                    }

                }

            }
        );

    });

}


/* =====================================================
   LOCAL STORAGE
   ===================================================== */

function saveData() {

    const data = {

        fullName:
            $("#fullName")?.value || "",

        jobTitle:
            $("#jobTitle")?.value || "",

        email:
            $("#email")?.value || "",

        phone:
            $("#phone")?.value || "",

        location:
            $("#location")?.value || "",

        website:
            $("#website")?.value || "",

        summary:
            $("#summary")?.value || "",

        skills:
            $("#skills")?.value || "",

        certifications:
            $("#certifications")?.value || ""

    };


    localStorage.setItem(
        "jobcv-data",
        JSON.stringify(data)
    );

}


function restoreData() {

    const saved =
        localStorage.getItem(
            "jobcv-data"
        );


    if (!saved) return;


    try {

        const data =
            JSON.parse(saved);


        if ($("#fullName"))
            $("#fullName").value =
                data.fullName || "";


        if ($("#jobTitle"))
            $("#jobTitle").value =
                data.jobTitle || "";


        if ($("#email"))
            $("#email").value =
                data.email || "";


        if ($("#phone"))
            $("#phone").value =
                data.phone || "";


        if ($("#location"))
            $("#location").value =
                data.location || "";


        if ($("#website"))
            $("#website").value =
                data.website || "";


        if ($("#summary"))
            $("#summary").value =
                data.summary || "";


        if ($("#skills"))
            $("#skills").value =
                data.skills || "";


        if ($("#certifications"))
            $("#certifications").value =
                data.certifications || "";

    }
    catch (error) {

        console.warn(
            "Could not restore saved data.",
            error
        );

    }

}


/* =====================================================
   AUTO SAVE
   ===================================================== */

let saveTimer = null;


function scheduleSave() {

    clearTimeout(saveTimer);


    saveTimer =
        setTimeout(() => {

            saveData();

        }, 300);

}


/*
   Extend input listener with auto-save.
*/

function attachAutoSave() {

    $$(
        "input, textarea"
    ).forEach(input => {

        if (
            input.dataset.autosaveAttached ===
            "true"
        ) {

            return;

        }


        input.dataset.autosaveAttached =
            "true";


        input.addEventListener(
            "input",
            scheduleSave
        );

    });

}


/* =====================================================
   RESTORE TEMPLATE
   ===================================================== */

function restoreTemplate() {

    const savedTemplate =
        localStorage.getItem(
            "jobcv-template"
        );


    if (!savedTemplate) return;


    const resume =
        $("#resume");


    if (!resume) return;


    resume.classList.remove(
        "classic",
        "modern",
        "minimal"
    );


    resume.classList.add(
        savedTemplate
    );


    $$(".template-card")
        .forEach(card => {

            card.classList.toggle(
                "active",
                card.dataset.template ===
                savedTemplate
            );

        });

}


/* =====================================================
   RESTORE THEME
   ===================================================== */

function restoreTheme() {

    const savedTheme =
        localStorage.getItem(
            "jobcv-theme"
        );


    if (
        savedTheme === "dark"
    ) {

        document.body.classList.add(
            "dark"
        );

    }

}


/* =====================================================
   SUMMARY COUNTER
   ===================================================== */

function updateSummaryCounter() {

    const summary =
        $("#summary");


    const counter =
        $("#summaryCount");


    if (
        summary &&
        counter
    ) {

        counter.textContent =
            summary.value.length;

    }

}


/* =====================================================
   WINDOW RESIZE
   ===================================================== */

window.addEventListener(
    "resize",
    () => {

        schedulePagination();

    }
);


/* =====================================================
   PRINT EVENTS
   ===================================================== */

window.addEventListener(
    "beforeprint",
    () => {

        /*
           Make sure the latest content
           is paginated before printing.
        */

        paginateResume();

    }
);


/* =====================================================
   INITIALIZE
   ===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        /*
           Restore saved information.
        */

        restoreData();


        /*
           Restore template.
        */

        restoreTemplate();


        /*
           Restore dark mode.
        */

        restoreTheme();


        /*
           Attach input listeners.
        */

        attachInputListeners();


        /*
           Attach auto-save.
        */

        attachAutoSave();


        /*
           Update summary counter.
        */

        updateSummaryCounter();


        /*
           Build resume.
        */

        updateResume();


        /*
           Initial zoom.
        */

        setTimeout(() => {

            paginateResume();

            applyZoom();

        }, 150);

    }
);


/* =====================================================
   END OF SCRIPT
   ===================================================== */
