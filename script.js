/* =========================================================
   JobCV-SI
   Professional Resume Builder
   ========================================================= */


/* =========================================================
   HELPERS
   ========================================================= */

const $ = (selector) =>
    document.querySelector(selector);

const $$ = (selector) =>
    [...document.querySelectorAll(selector)];


const escapeHTML = (value = "") => {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

};


/* =========================================================
   DATA
   ========================================================= */

let resumeData = {

    fullName: "",
    jobTitle: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    linkedin: "",
    github: "",

    summary: "",

    photo: "",

    experience: [],

    education: [],

    skills: [],

    certifications: [],

    projects: [],

    languages: [],

    achievements: "",

    interests: "",

    template: "modern",

    color: "#2563eb"

};


/* =========================================================
   INITIAL DATA
   ========================================================= */

function createExperience() {

    return {

        position: "",
        company: "",
        location: "",
        start: "",
        end: "",
        description: ""

    };

}


function createEducation() {

    return {

        degree: "",
        school: "",
        location: "",
        start: "",
        end: "",
        description: ""

    };

}


function createSkill() {

    return {

        name: "",
        level: "Intermediate"

    };

}


function createCertification() {

    return {

        name: "",
        issuer: "",
        year: ""

    };

}


function createProject() {

    return {

        name: "",
        link: "",
        description: ""

    };

}


function createLanguage() {

    return {

        name: "",
        level: "Professional"

    };

}


/* =========================================================
   DOM VALUE HELPERS
   ========================================================= */

function setValue(id, value) {

    const element = document.getElementById(id);

    if (element) {

        element.value = value || "";

    }

}


function getValue(id) {

    const element = document.getElementById(id);

    return element ? element.value.trim() : "";

}


/* =========================================================
   RENDER EXPERIENCE EDITOR
   ========================================================= */

function renderExperienceEditor() {

    const container = $("#experienceList");

    container.innerHTML = "";

    if (!resumeData.experience.length) {

        container.innerHTML = `
            <p class="empty-preview">
                No experience added yet.
            </p>
        `;

        return;

    }


    resumeData.experience.forEach((item, index) => {

        const element = document.createElement("div");

        element.className = "dynamic-item";

        element.innerHTML = `

            <div class="dynamic-item-header">

                <strong>
                    Experience ${index + 1}
                </strong>

                <button
                    class="remove-btn"
                    data-remove-experience="${index}">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </div>


            <div class="dynamic-grid">

                <div>
                    <label>Job Title</label>

                    <input
                        data-experience="${index}"
                        data-field="position"
                        value="${escapeHTML(item.position)}"
                        placeholder="Network Engineer">
                </div>


                <div>
                    <label>Company</label>

                    <input
                        data-experience="${index}"
                        data-field="company"
                        value="${escapeHTML(item.company)}"
                        placeholder="Company Name">
                </div>


                <div>
                    <label>Location</label>

                    <input
                        data-experience="${index}"
                        data-field="location"
                        value="${escapeHTML(item.location)}"
                        placeholder="City, Country">
                </div>


                <div>
                    <label>Start Date</label>

                    <input
                        data-experience="${index}"
                        data-field="start"
                        value="${escapeHTML(item.start)}"
                        placeholder="Jan 2022">
                </div>


                <div>
                    <label>End Date</label>

                    <input
                        data-experience="${index}"
                        data-field="end"
                        value="${escapeHTML(item.end)}"
                        placeholder="Present">
                </div>


                <div class="dynamic-full">

                    <label>Description</label>

                    <textarea
                        data-experience="${index}"
                        data-field="description"
                        placeholder="Describe your responsibilities and achievements...">${escapeHTML(item.description)}</textarea>

                </div>

            </div>

        `;

        container.appendChild(element);

    });

}


/* =========================================================
   RENDER EDUCATION
   ========================================================= */

function renderEducationEditor() {

    const container = $("#educationList");

    container.innerHTML = "";

    if (!resumeData.education.length) {

        container.innerHTML = `
            <p class="empty-preview">
                No education added yet.
            </p>
        `;

        return;

    }


    resumeData.education.forEach((item, index) => {

        const element = document.createElement("div");

        element.className = "dynamic-item";

        element.innerHTML = `

            <div class="dynamic-item-header">

                <strong>
                    Education ${index + 1}
                </strong>

                <button
                    class="remove-btn"
                    data-remove-education="${index}">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </div>


            <div class="dynamic-grid">

                <div>
                    <label>Degree / Qualification</label>

                    <input
                        data-education="${index}"
                        data-field="degree"
                        value="${escapeHTML(item.degree)}"
                        placeholder="Bachelor of Information Technology">
                </div>


                <div>
                    <label>Institution</label>

                    <input
                        data-education="${index}"
                        data-field="school"
                        value="${escapeHTML(item.school)}"
                        placeholder="University Name">
                </div>


                <div>
                    <label>Location</label>

                    <input
                        data-education="${index}"
                        data-field="location"
                        value="${escapeHTML(item.location)}"
                        placeholder="City, Country">
                </div>


                <div>
                    <label>Start Year</label>

                    <input
                        data-education="${index}"
                        data-field="start"
                        value="${escapeHTML(item.start)}"
                        placeholder="2018">
                </div>


                <div>
                    <label>End Year</label>

                    <input
                        data-education="${index}"
                        data-field="end"
                        value="${escapeHTML(item.end)}"
                        placeholder="2022">
                </div>


                <div class="dynamic-full">

                    <label>Details</label>

                    <textarea
                        data-education="${index}"
                        data-field="description"
                        placeholder="Relevant subjects, achievements, etc.">${escapeHTML(item.description)}</textarea>

                </div>

            </div>

        `;

        container.appendChild(element);

    });

}


/* =========================================================
   RENDER SKILLS
   ========================================================= */

function renderSkillsEditor() {

    const container = $("#skillsList");

    container.innerHTML = "";

    if (!resumeData.skills.length) {

        container.innerHTML = `
            <p class="empty-preview">
                Add your professional skills.
            </p>
        `;

        return;

    }


    resumeData.skills.forEach((item, index) => {

        const element = document.createElement("div");

        element.className = "dynamic-item";

        element.innerHTML = `

            <div class="dynamic-grid">

                <div>

                    <label>Skill</label>

                    <input
                        data-skill="${index}"
                        data-field="name"
                        value="${escapeHTML(item.name)}"
                        placeholder="Networking">

                </div>


                <div>

                    <label>Level</label>

                    <select
                        data-skill="${index}"
                        data-field="level">

                        <option ${item.level === "Beginner" ? "selected" : ""}>
                            Beginner
                        </option>

                        <option ${item.level === "Intermediate" ? "selected" : ""}>
                            Intermediate
                        </option>

                        <option ${item.level === "Advanced" ? "selected" : ""}>
                            Advanced
                        </option>

                        <option ${item.level === "Expert" ? "selected" : ""}>
                            Expert
                        </option>

                    </select>

                </div>

            </div>


            <div style="text-align:right;margin-top:8px">

                <button
                    class="remove-btn"
                    data-remove-skill="${index}">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </div>

        `;

        container.appendChild(element);

    });

}


/* =========================================================
   CERTIFICATIONS
   ========================================================= */

function renderCertificationEditor() {

    const container = $("#certificationsList");

    container.innerHTML = "";

    resumeData.certifications.forEach((item, index) => {

        const element = document.createElement("div");

        element.className = "dynamic-item";

        element.innerHTML = `

            <div class="dynamic-item-header">

                <strong>
                    Certification ${index + 1}
                </strong>

                <button
                    class="remove-btn"
                    data-remove-certification="${index}">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </div>


            <div class="dynamic-grid">

                <div>

                    <label>Certification</label>

                    <input
                        data-certification="${index}"
                        data-field="name"
                        value="${escapeHTML(item.name)}"
                        placeholder="Cisco CCNA">

                </div>


                <div>

                    <label>Issuer</label>

                    <input
                        data-certification="${index}"
                        data-field="issuer"
                        value="${escapeHTML(item.issuer)}"
                        placeholder="Cisco">

                </div>


                <div>

                    <label>Year</label>

                    <input
                        data-certification="${index}"
                        data-field="year"
                        value="${escapeHTML(item.year)}"
                        placeholder="2026">

                </div>

            </div>

        `;

        container.appendChild(element);

    });

}


/* =========================================================
   PROJECTS
   ========================================================= */

function renderProjectEditor() {

    const container = $("#projectsList");

    container.innerHTML = "";

    resumeData.projects.forEach((item, index) => {

        const element = document.createElement("div");

        element.className = "dynamic-item";

        element.innerHTML = `

            <div class="dynamic-item-header">

                <strong>
                    Project ${index + 1}
                </strong>

                <button
                    class="remove-btn"
                    data-remove-project="${index}">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </div>


            <div class="dynamic-grid">

                <div>

                    <label>Project Name</label>

                    <input
                        data-project="${index}"
                        data-field="name"
                        value="${escapeHTML(item.name)}"
                        placeholder="My Project">

                </div>


                <div>

                    <label>Project Link</label>

                    <input
                        data-project="${index}"
                        data-field="link"
                        value="${escapeHTML(item.link)}"
                        placeholder="https://...">

                </div>


                <div class="dynamic-full">

                    <label>Description</label>

                    <textarea
                        data-project="${index}"
                        data-field="description"
                        placeholder="Describe your project...">${escapeHTML(item.description)}</textarea>

                </div>

            </div>

        `;

        container.appendChild(element);

    });

}


/* =========================================================
   LANGUAGES
   ========================================================= */

function renderLanguageEditor() {

    const container = $("#languagesList");

    container.innerHTML = "";

    resumeData.languages.forEach((item, index) => {

        const element = document.createElement("div");

        element.className = "dynamic-item";

        element.innerHTML = `

            <div class="dynamic-grid">

                <div>

                    <label>Language</label>

                    <input
                        data-language="${index}"
                        data-field="name"
                        value="${escapeHTML(item.name)}"
                        placeholder="English">

                </div>


                <div>

                    <label>Proficiency</label>

                    <select
                        data-language="${index}"
                        data-field="level">

                        <option ${item.level === "Basic" ? "selected" : ""}>
                            Basic
                        </option>

                        <option ${item.level === "Conversational" ? "selected" : ""}>
                            Conversational
                        </option>

                        <option ${item.level === "Professional" ? "selected" : ""}>
                            Professional
                        </option>

                        <option ${item.level === "Native" ? "selected" : ""}>
                            Native
                        </option>

                    </select>

                </div>

            </div>


            <div style="text-align:right;margin-top:8px">

                <button
                    class="remove-btn"
                    data-remove-language="${index}">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </div>

        `;

        container.appendChild(element);

    });

}


/* =========================================================
   RENDER ALL EDITORS
   ========================================================= */

function renderEditors() {

    renderExperienceEditor();

    renderEducationEditor();

    renderSkillsEditor();

    renderCertificationEditor();

    renderProjectEditor();

    renderLanguageEditor();

}


/* =========================================================
   BASIC PREVIEW
   ========================================================= */

function updateBasicPreview() {

    $("#previewName").textContent =
        resumeData.fullName || "Your Name";

    $("#previewTitle").textContent =
        resumeData.jobTitle || "Professional Title";


    $("#previewContact").innerHTML = `

        <span>
            <i class="fa-solid fa-envelope"></i>
            ${escapeHTML(resumeData.email || "email@example.com")}
        </span>

        <span>
            <i class="fa-solid fa-phone"></i>
            ${escapeHTML(resumeData.phone || "+91 00000 00000")}
        </span>

        <span>
            <i class="fa-solid fa-location-dot"></i>
            ${escapeHTML(resumeData.location || "City, Country")}
        </span>

    `;


    let links = "";

    if (resumeData.website) {

        links += `
            <a href="${escapeHTML(resumeData.website)}"
               target="_blank">
                Website
            </a>
        `;

    }

    if (resumeData.linkedin) {

        links += `
            <a href="${escapeHTML(resumeData.linkedin)}"
               target="_blank">
                LinkedIn
            </a>
        `;

    }

    if (resumeData.github) {

        links += `
            <a href="${escapeHTML(resumeData.github)}"
               target="_blank">
                GitHub
            </a>
        `;

    }

    $("#previewLinks").innerHTML = links;


    $("#previewSummary").textContent =
        resumeData.summary ||
        "Your professional summary will appear here.";


    $("#previewAchievements").textContent =
        resumeData.achievements;


    $("#previewInterests").textContent =
        resumeData.interests;


    toggleSection(
        "#summarySection",
        Boolean(resumeData.summary)
    );

    toggleSection(
        "#achievementSection",
        Boolean(resumeData.achievements)
    );

    toggleSection(
        "#interestsSection",
        Boolean(resumeData.interests)
    );

}


/* =========================================================
   EXPERIENCE PREVIEW
   ========================================================= */

function updateExperiencePreview() {

    const container = $("#previewExperience");

    const items =
        resumeData.experience.filter(
            item =>
                item.position ||
                item.company ||
                item.description
        );


    if (!items.length) {

        container.innerHTML = `
            <p class="empty-preview">
                Add your work experience.
            </p>
        `;

        toggleSection("#experienceSection", false);

        return;

    }


    toggleSection("#experienceSection", true);


    container.innerHTML =
        items.map(item => `

            <div class="resume-entry">

                <div class="resume-entry-header">

                    <div>

                        <h4>
                            ${escapeHTML(item.position)}
                        </h4>

                        <div class="company">
                            ${escapeHTML(item.company)}
                            ${item.location
                                ? " · " + escapeHTML(item.location)
                                : ""}
                        </div>

                    </div>


                    <div class="date">

                        ${escapeHTML(item.start)}

                        ${item.start || item.end ? " – " : ""}

                        ${escapeHTML(item.end)}

                    </div>

                </div>


                <p class="resume-entry-description">
                    ${escapeHTML(item.description)}
                </p>

            </div>

        `).join("");

}


/* =========================================================
   EDUCATION PREVIEW
   ========================================================= */

function updateEducationPreview() {

    const container = $("#previewEducation");

    const items =
        resumeData.education.filter(
            item =>
                item.degree ||
                item.school
        );


    if (!items.length) {

        container.innerHTML = `
            <p class="empty-preview">
                Add your education.
            </p>
        `;

        toggleSection("#educationSection", false);

        return;

    }


    toggleSection("#educationSection", true);


    container.innerHTML =
        items.map(item => `

            <div class="resume-entry">

                <div class="resume-entry-header">

                    <div>

                        <h4>
                            ${escapeHTML(item.degree)}
                        </h4>

                        <div class="company">
                            ${escapeHTML(item.school)}
                            ${item.location
                                ? " · " + escapeHTML(item.location)
                                : ""}
                        </div>

                    </div>


                    <div class="date">

                        ${escapeHTML(item.start)}

                        ${item.start || item.end ? " – " : ""}

                        ${escapeHTML(item.end)}

                    </div>

                </div>


                <p class="resume-entry-description">
                    ${escapeHTML(item.description)}
                </p>

            </div>

        `).join("");

}


/* =========================================================
   SKILLS PREVIEW
   ========================================================= */

function updateSkillsPreview() {

    const container = $("#previewSkills");

    const items =
        resumeData.skills.filter(
            item => item.name
        );


    if (!items.length) {

        toggleSection("#skillsSection", false);

        container.innerHTML = "";

        return;

    }


    toggleSection("#skillsSection", true);


    container.innerHTML =
        items.map(item => `

            <span class="skill-tag">
                ${escapeHTML(item.name)}
            </span>

        `).join("");

}


/* =========================================================
   CERTIFICATIONS PREVIEW
   ========================================================= */

function updateCertificationPreview() {

    const container =
        $("#previewCertifications");


    const items =
        resumeData.certifications.filter(
            item =>
                item.name ||
                item.issuer
        );


    toggleSection(
        "#certificationSection",
        items.length > 0
    );


    container.innerHTML =
        items.map(item => `

            <div class="cert-entry">

                <strong>
                    ${escapeHTML(item.name)}
                </strong>

                <span>
                    ${escapeHTML(item.issuer)}

                    ${item.year
                        ? " · " + escapeHTML(item.year)
                        : ""}
                </span>

            </div>

        `).join("");

}


/* =========================================================
   PROJECT PREVIEW
   ========================================================= */

function updateProjectPreview() {

    const container =
        $("#previewProjects");


    const items =
        resumeData.projects.filter(
            item =>
                item.name ||
                item.description
        );


    toggleSection(
        "#projectsSection",
        items.length > 0
    );


    container.innerHTML =
        items.map(item => `

            <div class="project-entry">

                <strong>
                    ${escapeHTML(item.name)}
                </strong>

                ${
                    item.link
                        ? `
                            <span>
                                ${escapeHTML(item.link)}
                            </span>
                          `
                        : ""
                }

                <p>
                    ${escapeHTML(item.description)}
                </p>

            </div>

        `).join("");

}


/* =========================================================
   LANGUAGE PREVIEW
   ========================================================= */

function updateLanguagePreview() {

    const container =
        $("#previewLanguages");


    const items =
        resumeData.languages.filter(
            item => item.name
        );


    toggleSection(
        "#languagesSection",
        items.length > 0
    );


    container.innerHTML =
        items.map(item => `

            <div class="language-entry">

                <strong>
                    ${escapeHTML(item.name)}
                </strong>

                <span>
                    ${escapeHTML(item.level)}
                </span>

            </div>

        `).join("");

}


/* =========================================================
   UPDATE EVERYTHING
   ========================================================= */

function updatePreview() {

    updateBasicPreview();

    updateExperiencePreview();

    updateEducationPreview();

    updateSkillsPreview();

    updateCertificationPreview();

    updateProjectPreview();

    updateLanguagePreview();

    applyTemplate();

    applyColor();

    saveData();

}


/* =========================================================
   SECTION VISIBILITY
   ========================================================= */

function toggleSection(selector, visible) {

    const element = $(selector);

    if (!element) return;

    element.style.display =
        visible ? "" : "none";

}


/* =========================================================
   COLLECT BASIC DATA
   ========================================================= */

function collectBasicData() {

    resumeData.fullName =
        getValue("fullName");

    resumeData.jobTitle =
        getValue("jobTitle");

    resumeData.email =
        getValue("email");

    resumeData.phone =
        getValue("phone");

    resumeData.location =
        getValue("location");

    resumeData.website =
        getValue("website");

    resumeData.linkedin =
        getValue("linkedin");

    resumeData.github =
        getValue("github");

    resumeData.summary =
        getValue("summary");

    resumeData.achievements =
        getValue("achievements");

    resumeData.interests =
        getValue("interests");

}


/* =========================================================
   DYNAMIC INPUT HANDLING
   ========================================================= */

document.addEventListener("input", event => {

    const target = event.target;


    if (
        target.dataset.experience !== undefined
    ) {

        const index =
            Number(target.dataset.experience);

        const field =
            target.dataset.field;

        resumeData.experience[index][field] =
            target.value;

    }


    if (
        target.dataset.education !== undefined
    ) {

        const index =
            Number(target.dataset.education);

        const field =
            target.dataset.field;

        resumeData.education[index][field] =
            target.value;

    }


    if (
        target.dataset.skill !== undefined
    ) {

        const index =
            Number(target.dataset.skill);

        const field =
            target.dataset.field;

        resumeData.skills[index][field] =
            target.value;

    }


    if (
        target.dataset.certification !== undefined
    ) {

        const index =
            Number(target.dataset.certification);

        const field =
            target.dataset.field;

        resumeData.certifications[index][field] =
            target.value;

    }


    if (
        target.dataset.project !== undefined
    ) {

        const index =
            Number(target.dataset.project);

        const field =
            target.dataset.field;

        resumeData.projects[index][field] =
            target.value;

    }


    if (
        target.dataset.language !== undefined
    ) {

        const index =
            Number(target.dataset.language);

        const field =
            target.dataset.field;

        resumeData.languages[index][field] =
            target.value;

    }


    collectBasicData();

    updatePreview();

});


/* =========================================================
   ADD BUTTONS
   ========================================================= */

$("#addExperience").addEventListener(
    "click",
    () => {

        resumeData.experience.push(
            createExperience()
        );

        renderEditors();

        updatePreview();

    }
);


$("#addEducation").addEventListener(
    "click",
    () => {

        resumeData.education.push(
            createEducation()
        );

        renderEditors();

        updatePreview();

    }
);


$("#addSkill").addEventListener(
    "click",
    () => {

        resumeData.skills.push(
            createSkill()
        );

        renderEditors();

        updatePreview();

    }
);


$("#addCertification").addEventListener(
    "click",
    () => {

        resumeData.certifications.push(
            createCertification()
        );

        renderEditors();

        updatePreview();

    }
);


$("#addProject").addEventListener(
    "click",
    () => {

        resumeData.projects.push(
            createProject()
        );

        renderEditors();

        updatePreview();

    }
);


$("#addLanguage").addEventListener(
    "click",
    () => {

        resumeData.languages.push(
            createLanguage()
        );

        renderEditors();

        updatePreview();

    }
);


/* =========================================================
   REMOVE DYNAMIC ITEMS
   ========================================================= */

document.addEventListener("click", event => {

    const target =
        event.target.closest("button");

    if (!target) return;


    if (
        target.dataset.removeExperience !== undefined
    ) {

        const index =
            Number(target.dataset.removeExperience);

        resumeData.experience.splice(
            index,
            1
        );

        renderEditors();

        updatePreview();

    }


    if (
        target.dataset.removeEducation !== undefined
    ) {

        const index =
            Number(target.dataset.removeEducation);

        resumeData.education.splice(
            index,
            1
        );

        renderEditors();

        updatePreview();

    }


    if (
        target.dataset.removeSkill !== undefined
    ) {

        const index =
            Number(target.dataset.removeSkill);

        resumeData.skills.splice(
            index,
            1
        );

        renderEditors();

        updatePreview();

    }


    if (
        target.dataset.removeCertification !== undefined
    ) {

        const index =
            Number(target.dataset.removeCertification);

        resumeData.certifications.splice(
            index,
            1
        );

        renderEditors();

        updatePreview();

    }


    if (
        target.dataset.removeProject !== undefined
    ) {

        const index =
            Number(target.dataset.removeProject);

        resumeData.projects.splice(
            index,
            1
        );

        renderEditors();

        updatePreview();

    }


    if (
        target.dataset.removeLanguage !== undefined
    ) {

        const index =
            Number(target.dataset.removeLanguage);

        resumeData.languages.splice(
            index,
            1
        );

        renderEditors();

        updatePreview();

    }

});


/* =========================================================
   TEMPLATE
   ========================================================= */

$("#templateSelect").addEventListener(
    "change",
    event => {

        resumeData.template =
            event.target.value;

        applyTemplate();

        saveData();

    }
);


function applyTemplate() {

    const resume =
        $("#resume");

    resume.classList.remove(
        "modern-template",
        "professional-template",
        "minimal-template"
    );


    resume.classList.add(
        `${resumeData.template}-template`
    );

}


/* =========================================================
   COLOR
   ========================================================= */

$$(".color-choice").forEach(button => {

    button.addEventListener(
        "click",
        () => {

            resumeData.color =
                button.dataset.color;

            $$(".color-choice").forEach(
                item =>
                    item.classList.remove("active")
            );

            button.classList.add("active");

            applyColor();

            saveData();

        }
    );

});


function applyColor() {

    document.documentElement
        .style.setProperty(
            "--primary",
            resumeData.color
        );

}


/* =========================================================
   PHOTO
   ========================================================= */

$("#photoInput").addEventListener(
    "change",
    event => {

        const file =
            event.target.files[0];

        if (!file) return;


        const reader =
            new FileReader();


        reader.onload = function(e) {

            resumeData.photo =
                e.target.result;

            showPhoto();

            saveData();

        };


        reader.readAsDataURL(file);

    }
);


function showPhoto() {

    if (!resumeData.photo) return;


    $("#photoPreview").innerHTML = `

        <img src="${resumeData.photo}"
             alt="Profile photo">

    `;


    $("#resumePhoto").innerHTML = `

        <img src="${resumeData.photo}"
             alt="Profile photo">

    `;

}


/* =========================================================
   SUMMARY COUNTER
   ========================================================= */

$("#summary").addEventListener(
    "input",
    event => {

        $("#summaryCount")
            .textContent =
            `${event.target.value.length} / 600`;

    }
);


/* =========================================================
   DARK MODE
   ========================================================= */

$("#themeToggle").addEventListener(
    "click",
    () => {

        document.body.classList.toggle("dark");

        const dark =
            document.body.classList.contains("dark");

        localStorage.setItem(
            "jobcv-theme",
            dark ? "dark" : "light"
        );


        $("#themeToggle").innerHTML =
            dark
                ? `<i class="fa-solid fa-sun"></i>`
                : `<i class="fa-solid fa-moon"></i>`;

    }
);


/* =========================================================
   SAVE DATA
   ========================================================= */

function saveData() {

    try {

        localStorage.setItem(
            "jobcv-data",
            JSON.stringify(resumeData)
        );

        $("#saveStatus").innerHTML = `
            <i class="fa-solid fa-check"></i>
            Saved
        `;

    } catch (error) {

        console.warn(
            "Could not save resume data.",
            error
        );

    }

}


/* =========================================================
   LOAD DATA
   ========================================================= */

function loadData() {

    try {

        const saved =
            localStorage.getItem(
                "jobcv-data"
            );


        if (saved) {

            const parsed =
                JSON.parse(saved);

            resumeData = {
                ...resumeData,
                ...parsed
            };

        }

    } catch (error) {

        console.warn(
            "Could not load saved data.",
            error
        );

    }


    setValue(
        "fullName",
        resumeData.fullName
    );

    setValue(
        "jobTitle",
        resumeData.jobTitle
    );

    setValue(
        "email",
        resumeData.email
    );

    setValue(
        "phone",
        resumeData.phone
    );

    setValue(
        "location",
        resumeData.location
    );

    setValue(
        "website",
        resumeData.website
    );

    setValue(
        "linkedin",
        resumeData.linkedin
    );

    setValue(
        "github",
        resumeData.github
    );

    setValue(
        "summary",
        resumeData.summary
    );

    setValue(
        "achievements",
        resumeData.achievements
    );

    setValue(
        "interests",
        resumeData.interests
    );


    $("#templateSelect").value =
        resumeData.template;


    $$(".color-choice").forEach(button => {

        button.classList.toggle(
            "active",
            button.dataset.color ===
            resumeData.color
        );

    });


    $("#summaryCount").textContent =
        `${resumeData.summary.length} / 600`;

}


/* =========================================================
   RESET
   ========================================================= */

$("#clearBtn").addEventListener(
    "click",
    () => {

        const confirmed =
            confirm(
                "Are you sure you want to reset your resume?"
            );


        if (!confirmed) return;


        localStorage.removeItem(
            "jobcv-data"
        );


        resumeData = {

            fullName: "",
            jobTitle: "",
            email: "",
            phone: "",
            location: "",
            website: "",
            linkedin: "",
            github: "",

            summary: "",

            photo: "",

            experience: [],
            education: [],
            skills: [],
            certifications: [],
            projects: [],
            languages: [],

            achievements: "",
            interests: "",

            template: "modern",
            color: "#2563eb"

        };


        location.reload();

    }
);


/* =========================================================
   DOWNLOAD PDF
   ========================================================= */

$("#downloadBtn").addEventListener(
    "click",
    () => {

        const resume =
            $("#resume");


        const options = {

            margin: 0,

            filename:
                `${resumeData.fullName || "JobCV-SI-Resume"}.pdf`,

            image: {
                type: "jpeg",
                quality: 0.98
            },

            html2canvas: {
                scale: 2,
                useCORS: true,
                backgroundColor: "#ffffff"
            },

            jsPDF: {
                unit: "mm",
                format: "a4",
                orientation: "portrait"
            }

        };


        html2pdf()
            .set(options)
            .from(resume)
            .save();

    }
);


/* =========================================================
   PRINT
   ========================================================= */

$("#printBtn").addEventListener(
    "click",
    () => {

        window.print();

    }
);


/* =========================================================
   YEAR
   ========================================================= */

$("#year").textContent =
    new Date().getFullYear();


/* =========================================================
   INITIALIZATION
   ========================================================= */

function initialize() {

    loadData();

    renderEditors();

    showPhoto();

    updatePreview();

    applyTemplate();

    applyColor();


    const savedTheme =
        localStorage.getItem(
            "jobcv-theme"
        );


    if (savedTheme === "dark") {

        document.body.classList.add("dark");

        $("#themeToggle").innerHTML =
            `<i class="fa-solid fa-sun"></i>`;

    }

}


initialize();

