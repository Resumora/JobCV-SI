/* =====================================================
   JobCV-SI Resume Builder
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
        $("#fullName").value.trim();

    const title =
        $("#jobTitle").value.trim();

    const email =
        $("#email").value.trim();

    const phone =
        $("#phone").value.trim();

    const location =
        $("#location").value.trim();

    const website =
        $("#website").value.trim();

    const summary =
        $("#summary").value.trim();

    const skills =
        $("#skills").value.trim();

    const certifications =
        $("#certifications").value.trim();


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


    updateSkills();

    updateCertifications();

    updateVisibility();

    updateProgress();

}


/* =====================================================
   SKILLS
   ===================================================== */

function updateSkills() {

    const value =
        $("#skills").value.trim();

    const container =
        $("#previewSkills");


    if (!value) {

        container.innerHTML =
            `<span class="skill-placeholder">
                Your skills will appear here.
            </span>`;

        return;
    }


    const skills = value

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
                            ${escapeHTML(
                                item.description
                            )}
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
        $("#certifications").value.trim();


    const container =
        $("#previewCertifications");


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
        $("#summary").value.trim();

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
        $("#skills").value.trim();

    const certifications =
        $("#certifications").value.trim();


    $("#summarySection").style.display =
        summary ? "" : "none";


    $("#experienceSection").style.display =
        experiences.length ? "" : "none";


    $("#educationSection").style.display =
        education.length ? "" : "none";


    $("#skillsSection").style.display =
        skills ? "" : "none";


    $("#certificationSection").style.display =
        certifications ? "" : "none";

}


/* =====================================================
   PROGRESS
   ===================================================== */

function updateProgress() {

    const fields = [

        $("#fullName").value.trim(),

        $("#jobTitle").value.trim(),

        $("#email").value.trim(),

        $("#phone").value.trim(),

        $("#location").value.trim(),

        $("#summary").value.trim(),

        $("#skills").value.trim()

    ];


    const filled =
        fields.filter(Boolean).length;


    const percent =
        Math.round(
            (filled / fields.length) * 100
        );


    const circle =
        $("#progressCircle");


    circle.textContent =
        `${percent}%`;


    circle.style.background =
        `conic-gradient(
            var(--primary) ${percent * 3.6}deg,
            #e8eef8 ${percent * 3.6}deg
        )`;

}


/* =====================================================
   UPDATE EVERYTHING
   ===================================================== */

function updateResume() {

    updatePersonalInfo();

    updateExperiencePreview();

    updateEducationPreview();

    updateCertifications();

    updateVisibility();

    updateProgress();

}


/* =====================================================
   ADD EXPERIENCE
   ===================================================== */

$("#addExperience")
    .addEventListener("click", () => {

        const list =
            $("#experienceList");


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

    });


/* =====================================================
   ADD EDUCATION
   ===================================================== */

$("#addEducation")
    .addEventListener("click", () => {

        const list =
            $("#educationList");


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
                        placeholder="Bachelor's Degree"
                    >

                </div>


                <div class="field">

                    <label>
                        Institution
                    </label>

                    <input
                        class="edu-school"
                        type="text"
                        placeholder="University / College"
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
                        Start year
                    </label>

                    <input
                        class="edu-start"
                        type="text"
                        placeholder="2018"
                    >

                </div>


                <div class="field">

                    <label>
                        End year
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

    });


/* =====================================================
   REMOVE ITEMS
   ===================================================== */

document.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(".remove-btn");


        if (!button) return;


        const card =
            button.closest(
                ".experience-item, .education-item"
            );


        if (!card) return;


        const parent =
            card.parentElement;


        const className =
            card.classList.contains("experience-item")
                ? "experience-item"
                : "education-item";


        const count =
            parent.querySelectorAll(
                "." + className
            ).length;


        if (count <= 1) {

            showToast(
                "At least one entry is required."
            );

            return;

        }


        card.remove();

        updateResume();

    }
);


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
                        item.classList.remove("active")
                    );


                card.classList.add("active");


                const template =
                    card.dataset.template;


                const resume =
                    $("#resume");


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

            }
        );

    });


/* =====================================================
   ZOOM
   ===================================================== */

let zoom = 85;


function applyZoom() {

    $("#resume").style.transform =
        `scale(${zoom / 100})`;

    $("#zoomValue").textContent =
        `${zoom}%`;

}


$("#zoomIn")
    .addEventListener(
        "click",
        () => {

            zoom =
                Math.min(
                    zoom + 5,
                    110
                );

            applyZoom();

        }
    );


$("#zoomOut")
    .addEventListener(
        "click",
        () => {

            zoom =
                Math.max(
                    zoom - 5,
                    55
                );

            applyZoom();

        }
    );


/* =====================================================
   THEME
   ===================================================== */

$("#themeToggle")
    .addEventListener(
        "click",
        () => {

            document.body.classList.toggle(
                "dark"
            );


            const dark =
                document.body.classList.contains(
                    "dark"
                );


            localStorage.setItem(
                "jobcv-dark",
                dark ? "1" : "0"
            );


            $("#themeToggle").textContent =
                dark ? "☀" : "☾";

        }
    );


/* =====================================================
   DOWNLOAD PDF
   ===================================================== */

function downloadPDF() {

    updateResume();

    setTimeout(() => {

        window.print();

    }, 150);

}


$("#downloadTop")
    .addEventListener(
        "click",
        downloadPDF
    );


$("#downloadMobile")
    .addEventListener(
        "click",
        downloadPDF
    );


/* =====================================================
   SAMPLE DATA
   ===================================================== */

function loadSampleData() {

    $("#fullName").value =
        "Alex Morgan";


    $("#jobTitle").value =
        "Senior Network Engineer";


    $("#email").value =
        "alex.morgan@example.com";


    $("#phone").value =
        "+1 555 123 4567";


    $("#location").value =
        "Toronto, Canada";


    $("#website").value =
        "linkedin.com/in/alexmorgan";


    $("#summary").value =
        "Results-driven Network Engineer with 7+ years of experience designing, implementing and troubleshooting enterprise network infrastructure. Skilled in routing, switching, network security and technical support, with a strong focus on reliability and continuous improvement.";


    $("#skills").value =
        "Network Engineering, Routing, Switching, TCP/IP, Network Security, Troubleshooting, Cisco, Microsoft 365, Technical Support, Python";


    $("#certifications").value =
        "Cisco Certified Network Associate (CCNA) — Cisco\nCybersecurity Analyst Job Simulation — Forage";


    const experience =
        $(".experience-item");


    $(".exp-title", experience).value =
        "Senior Network Engineer";


    $(".exp-company", experience).value =
        "Technology Solutions Ltd.";


    $(".exp-location", experience).value =
        "Toronto, Canada";


    $(".exp-start", experience).value =
        "2021";


    $(".exp-end", experience).value =
        "Present";


    $(".exp-description", experience).value =
        "Designed and maintained enterprise network infrastructure across multiple locations.\nImproved network reliability through proactive monitoring and troubleshooting.\nSupported routing, switching, security and technical infrastructure projects.";


    const education =
        $(".education-item");


    $(".edu-degree", education).value =
        "Bachelor's Degree in Information Technology";


    $(".edu-school", education).value =
        "University of Technology";


    $(".edu-location", education).value =
        "Toronto, Canada";


    $(".edu-start", education).value =
        "2015";


    $(".edu-end", education).value =
        "2019";


    updateResume();

    showToast(
        "Sample resume loaded"
    );

}


/* =====================================================
   SAMPLE BUTTON
   ===================================================== */

$("#loadSample")
    .addEventListener(
        "click",
        loadSampleData
    );


/* =====================================================
   INPUT LISTENERS
   ===================================================== */

function attachInputListeners(parent = document) {

    $$(
        "input, textarea",
        parent
    )
    .forEach(input => {

        input.addEventListener(
            "input",
            () => {

                updateResume();

                if (
                    input.id === "summary"
                ) {

                    $("#summaryCount")
                        .textContent =
                        input.value.length;

                }

            }
        );

    });

}


attachInputListeners();


/* =====================================================
   LOCAL STORAGE
   ===================================================== */

function saveData() {

    const data = {

        fullName: $("#fullName").value,

        jobTitle: $("#jobTitle").value,

        email: $("#email").value,

        phone: $("#phone").value,

        location: $("#location").value,

        website: $("#website").value,

        summary: $("#summary").value,

        skills: $("#skills").value,

        certifications:
            $("#certifications").value

    };


    localStorage.setItem(
        "jobcv-data",
        JSON.stringify(data)
    );

}


function restoreData() {

    try {

        const saved =
            JSON.parse(
                localStorage.getItem(
                    "jobcv-data"
                )
            );


        if (!saved) return;


        Object.keys(saved)
            .forEach(key => {

                const field =
                    $("#" + key);


                if (field) {

                    field.value =
                        saved[key] || "";

                }

            });

    }
    catch (error) {

        console.log(
            "Could not restore saved data."
        );

    }

}


/* Save periodically */

setInterval(
    saveData,
    3000
);


/* =====================================================
   RESTORE SETTINGS
   ===================================================== */

const savedTemplate =
    localStorage.getItem(
        "jobcv-template"
    );


if (savedTemplate) {

    const card =
        $(
            `.template-card[data-template="${savedTemplate}"]`
        );


    if (card) {

        card.click();

    }

}


const savedDark =
    localStorage.getItem(
        "jobcv-dark"
    );


if (savedDark === "1") {

    document.body.classList.add(
        "dark"
    );

    $("#themeToggle").textContent =
        "☀";

}


/* =====================================================
   INITIALIZE
   ===================================================== */

restoreData();

updateResume();

applyZoom();

$("#summaryCount").textContent =
    $("#summary").value.length;