/* =========================================================
   JobCV-SI - Professional Resume Builder Engine
   ========================================================= */

// DOM Selector Helpers
const $ = (selector) => document.querySelector(selector); const $$ = (selector) => [...document.querySelectorAll(selector)];

// Safe HTML Encoder
const escapeHTML = (value = "") => {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
};

// Application State
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

// Item Creators
const createExperience = () => ({ position: "", company: "", location: "", start: "", end: "", description: "" });
const createEducation = () => ({ degree: "", school: "", location: "", start: "", end: "", description: "" });
const createSkill = () => ({ name: "", level: "Intermediate" });
const createCertification = () => ({ name: "", issuer: "", year: "" });
const createProject = () => ({ name: "", link: "", description: "" });
const createLanguage = () => ({ name: "", level: "Professional" });

// DOM Helpers
const setValue = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.value = value || "";
};

const getValue = (id) => {
    const el = document.getElementById(id);
    return el ? el.value.trim() : "";
};

const toggleSection = (selector, visible) => {
    const el = $(selector);
    if (el) el.style.display = visible ? "" : "none";
};

/* =========================================================
   EDITORS RENDERING (LEFT PANEL)
   ========================================================= */

function renderExperienceEditor() {
    const container = $("#experienceList");
    container.innerHTML = "";

    if (!resumeData.experience.length) {
        container.innerHTML = `<p class="empty-preview">No work experience added yet.</p>`;
        return;
    }

    resumeData.experience.forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "dynamic-item";
        div.innerHTML = `
            <div class="dynamic-item-header">
                <strong>Experience ${index + 1}</strong>
                <button type="button" class="remove-btn" data-remove-experience="${index}" title="Delete">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
            <div class="dynamic-grid">
                <div>
                    <label>Job Title</label>
                    <input data-experience="${index}" data-field="position" value="${escapeHTML(item.position)}" placeholder="e.g. Software Engineer">
                </div>
                <div>
                    <label>Company</label>
                    <input data-experience="${index}" data-field="company" value="${escapeHTML(item.company)}" placeholder="e.g. Google">
                </div>
                <div>
                    <label>Location</label>
                    <input data-experience="${index}" data-field="location" value="${escapeHTML(item.location)}" placeholder="e.g. Remote / City">
                </div>
                <div>
                    <label>Start Date</label>
                    <input data-experience="${index}" data-field="start" value="${escapeHTML(item.start)}" placeholder="e.g. Jan 2022">
                </div>
                <div>
                    <label>End Date</label>
                    <input data-experience="${index}" data-field="end" value="${escapeHTML(item.end)}" placeholder="e.g. Present">
                </div>
                <div class="dynamic-full">
                    <label>Responsibilities / Impact</label>
                    <textarea data-experience="${index}" data-field="description" placeholder="Describe key accomplishments and tasks...">${escapeHTML(item.description)}</textarea>
                </div>
            </div>
        `;
        container.appendChild(div);
    });
}

function renderEducationEditor() {
    const container = $("#educationList");
    container.innerHTML = "";

    if (!resumeData.education.length) {
        container.innerHTML = `<p class="empty-preview">No education added yet.</p>`;
        return;
    }

    resumeData.education.forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "dynamic-item";
        div.innerHTML = `
            <div class="dynamic-item-header">
                <strong>Education ${index + 1}</strong>
                <button type="button" class="remove-btn" data-remove-education="${index}" title="Delete">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
            <div class="dynamic-grid">
                <div>
                    <label>Degree / Qualification</label>
                    <input data-education="${index}" data-field="degree" value="${escapeHTML(item.degree)}" placeholder="e.g. B.Tech Computer Science">
                </div>
                <div>
                    <label>Institution</label>
                    <input data-education="${index}" data-field="school" value="${escapeHTML(item.school)}" placeholder="e.g. Delhi University">
                </div>
                <div>
                    <label>Location</label>
                    <input data-education="${index}" data-field="location" value="${escapeHTML(item.location)}" placeholder="e.g. Delhi, India">
                </div>
                <div>
                    <label>Start Year</label>
                    <input data-education="${index}" data-field="start" value="${escapeHTML(item.start)}" placeholder="e.g. 2018">
                </div>
                <div>
                    <label>End Year</label>
                    <input data-education="${index}" data-field="end" value="${escapeHTML(item.end)}" placeholder="e.g. 2022">
                </div>
                <div class="dynamic-full">
                    <label>Details</label>
                    <textarea data-education="${index}" data-field="description" placeholder="Relevant coursework, honors, GPA...">${escapeHTML(item.description)}</textarea>
                </div>
            </div>
        `;
        container.appendChild(div);
    });
}

function renderSkillsEditor() {
    const container = $("#skillsList");
    container.innerHTML = "";

    if (!resumeData.skills.length) {
        container.innerHTML = `<p class="empty-preview">No skills added yet.</p>`;
        return;
    }

    resumeData.skills.forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "dynamic-item";
        div.innerHTML = `
            <div class="dynamic-grid">
                <div>
                    <label>Skill Name</label>
                    <input data-skill="${index}" data-field="name" value="${escapeHTML(item.name)}" placeholder="e.g. JavaScript / Python">
                </div>
                <div>
                    <label>Level</label>
                    <select data-skill="${index}" data-field="level">
                        <option ${item.level === "Beginner" ? "selected" : ""}>Beginner</option>
                        <option ${item.level === "Intermediate" ? "selected" : ""}>Intermediate</option>
                        <option ${item.level === "Advanced" ? "selected" : ""}>Advanced</option>
                        <option ${item.level === "Expert" ? "selected" : ""}>Expert</option>
                    </select>
                </div>
            </div>
            <div style="text-align:right; margin-top:8px;">
                <button type="button" class="remove-btn" data-remove-skill="${index}" style="margin-left:auto;">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `;
        container.appendChild(div);
    });
}

function renderCertificationEditor() {
    const container = $("#certificationsList");
    container.innerHTML = "";

    if (!resumeData.certifications.length) {
        container.innerHTML = `<p class="empty-preview">No certifications added yet.</p>`;
        return;
    }

    resumeData.certifications.forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "dynamic-item";
        div.innerHTML = `
            <div class="dynamic-item-header">
                <strong>Certification ${index + 1}</strong>
                <button type="button" class="remove-btn" data-remove-certification="${index}">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
            <div class="dynamic-grid">
                <div>
                    <label>Certification Name</label>
                    <input data-certification="${index}" data-field="name" value="${escapeHTML(item.name)}" placeholder="e.g. AWS Certified Developer">
                </div>
                <div>
                    <label>Issuer</label>
                    <input data-certification="${index}" data-field="issuer" value="${escapeHTML(item.issuer)}" placeholder="e.g. Amazon Web Services">
                </div>
                <div>
                    <label>Year</label>
                    <input data-certification="${index}" data-field="year" value="${escapeHTML(item.year)}" placeholder="e.g. 2025">
                </div>
            </div>
        `;
        container.appendChild(div);
    });
}

function renderProjectEditor() {
    const container = $("#projectsList");
    container.innerHTML = "";

    if (!resumeData.projects.length) {
        container.innerHTML = `<p class="empty-preview">No projects added yet.</p>`;
        return;
    }

    resumeData.projects.forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "dynamic-item";
        div.innerHTML = `
            <div class="dynamic-item-header">
                <strong>Project ${index + 1}</strong>
                <button type="button" class="remove-btn" data-remove-project="${index}">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
            <div class="dynamic-grid">
                <div>
                    <label>Project Title</label>
                    <input data-project="${index}" data-field="name" value="${escapeHTML(item.name)}" placeholder="e.g. E-Commerce Platform">
                </div>
                <div>
                    <label>Project Link / Repo</label>
                    <input data-project="${index}" data-field="link" value="${escapeHTML(item.link)}" placeholder="https://github.com/...">
                </div>
                <div class="dynamic-full">
                    <label>Project Overview</label>
                    <textarea data-project="${index}" data-field="description" placeholder="Explain technologies used, problem solved, and impact...">${escapeHTML(item.description)}</textarea>
                </div>
            </div>
        `;
        container.appendChild(div);
    });
}

function renderLanguageEditor() {
    const container = $("#languagesList");
    container.innerHTML = "";

    if (!resumeData.languages.length) {
        container.innerHTML = `<p class="empty-preview">No languages added yet.</p>`;
        return;
    }

    resumeData.languages.forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "dynamic-item";
        div.innerHTML = `
            <div class="dynamic-grid">
                <div>
                    <label>Language</label>
                    <input data-language="${index}" data-field="name" value="${escapeHTML(item.name)}" placeholder="e.g. English / Hindi">
                </div>
                <div>
                    <label>Proficiency</label>
                    <select data-language="${index}" data-field="level">
                        <option ${item.level === "Basic" ? "selected" : ""}>Basic</option>
                        <option ${item.level === "Conversational" ? "selected" : ""}>Conversational</option>
                        <option ${item.level === "Professional" ? "selected" : ""}>Professional</option>
                        <option ${item.level === "Native" ? "selected" : ""}>Native</option>
                    </select>
                </div>
            </div>
            <div style="text-align:right; margin-top:8px;">
                <button type="button" class="remove-btn" data-remove-language="${index}" style="margin-left:auto;">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `;
        container.appendChild(div);
    });
}

function renderEditors() {
    renderExperienceEditor();
    renderEducationEditor();
    renderSkillsEditor();
    renderCertificationEditor();
    renderProjectEditor();
    renderLanguageEditor();
}

/* =========================================================
   PREVIEW RENDERING (RIGHT CANVAS)
   ========================================================= */

function updateBasicPreview() {
    $("#previewName").textContent = resumeData.fullName || "Your Name";
    $("#previewTitle").textContent = resumeData.jobTitle || "Professional Title";

    let contactHTML = "";
    if (resumeData.email) contactHTML += `<span><i class="fa-solid fa-envelope"></i> ${escapeHTML(resumeData.email)}</span>`;
    if (resumeData.phone) contactHTML += `<span><i class="fa-solid fa-phone"></i> ${escapeHTML(resumeData.phone)}</span>`;
    if (resumeData.location) contactHTML += `<span><i class="fa-solid fa-location-dot"></i> ${escapeHTML(resumeData.location)}</span>`;
    $("#previewContact").innerHTML = contactHTML;

    let linksHTML = "";
    if (resumeData.website) linksHTML += `<a href="${escapeHTML(resumeData.website)}" target="_blank"><i class="fa-solid fa-globe"></i> Website</a>`;
    if (resumeData.linkedin) linksHTML += `<a href="${escapeHTML(resumeData.linkedin)}" target="_blank"><i class="fa-brands fa-linkedin"></i> LinkedIn</a>`;
    if (resumeData.github) linksHTML += `<a href="${escapeHTML(resumeData.github)}" target="_blank"><i class="fa-brands fa-github"></i> GitHub</a>`;
    $("#previewLinks").innerHTML = linksHTML;

    $("#previewSummary").textContent = resumeData.summary || "Your professional summary will appear here.";
    $("#previewAchievements").textContent = resumeData.achievements;
    $("#previewInterests").textContent = resumeData.interests;

    toggleSection("#summarySection", Boolean(resumeData.summary));
    toggleSection("#achievementSection", Boolean(resumeData.achievements));
    toggleSection("#interestsSection", Boolean(resumeData.interests));
}

function updateExperiencePreview() {
    const container = $("#previewExperience");
    const items = resumeData.experience.filter(item => item.position || item.company || item.description);

    if (!items.length) {
        container.innerHTML = `<p class="empty-preview">Add your work experience.</p>`;
        toggleSection("#experienceSection", false);
        return;
    }

    toggleSection("#experienceSection", true);
    container.innerHTML = items.map(item => `
        <div class="resume-entry">
            <div class="resume-entry-header">
                <div>
                    <h4>${escapeHTML(item.position || "Position")}</h4>
                    <div class="company">${escapeHTML(item.company)}${item.location ? " · " + escapeHTML(item.location) : ""}</div>
                </div>
                <div class="date">${escapeHTML(item.start)}${item.start || item.end ? " – " : ""}${escapeHTML(item.end)}</div>
            </div>
            ${item.description ? `<p class="resume-entry-description">${escapeHTML(item.description)}</p>` : ""}
        </div>
    `).join("");
}

function updateEducationPreview() {
    const container = $("#previewEducation");
    const items = resumeData.education.filter(item => item.degree || item.school);

    if (!items.length) {
        container.innerHTML = `<p class="empty-preview">Add your education.</p>`;
        toggleSection("#educationSection", false);
        return;
    }

    toggleSection("#educationSection", true);
    container.innerHTML = items.map(item => `
        <div class="resume-entry">
            <div class="resume-entry-header">
                <div>
                    <h4>${escapeHTML(item.degree || "Degree")}</h4>
                    <div class="company">${escapeHTML(item.school)}${item.location ? " · " + escapeHTML(item.location) : ""}</div>
                </div>
                <div class="date">${escapeHTML(item.start)}${item.start || item.end ? " – " : ""}${escapeHTML(item.end)}</div>
            </div>
            ${item.description ? `<p class="resume-entry-description">${escapeHTML(item.description)}</p>` : ""}
        </div>
    `).join("");
}

function updateSkillsPreview() {
    const container = $("#previewSkills");
    const items = resumeData.skills.filter(item => item.name);

    if (!items.length) {
        toggleSection("#skillsSection", false);
        container.innerHTML = "";
        return;
    }

    toggleSection("#skillsSection", true);
    container.innerHTML = items.map(item => `<span class="skill-tag">${escapeHTML(item.name)}</span>`).join("");
}

function updateCertificationPreview() {
    const container = $("#previewCertifications");
    const items = resumeData.certifications.filter(item => item.name || item.issuer);

    toggleSection("#certificationSection", items.length > 0);
    container.innerHTML = items.map(item => `
        <div class="cert-entry">
            <strong>${escapeHTML(item.name)}</strong>
            <span>${escapeHTML(item.issuer)}${item.year ? " · " + escapeHTML(item.year) : ""}</span>
        </div>
    `).join("");
}

function updateProjectPreview() {
    const container = $("#previewProjects");
    const items = resumeData.projects.filter(item => item.name || item.description);

    toggleSection("#projectsSection", items.length > 0);
    container.innerHTML = items.map(item => `
        <div class="project-entry">
            <strong>${escapeHTML(item.name)}</strong>
            ${item.link ? `<span>${escapeHTML(item.link)}</span>` : ""}
            ${item.description ? `<p>${escapeHTML(item.description)}</p>` : ""}
        </div>
    `).join("");
}

function updateLanguagePreview() {
    const container = $("#previewLanguages");
    const items = resumeData.languages.filter(item => item.name);

    toggleSection("#languagesSection", items.length > 0);
    container.innerHTML = items.map(item => `
        <div class="language-entry">
            <strong>${escapeHTML(item.name)}</strong>
            <span>${escapeHTML(item.level)}</span>
        </div>
    `).join("");
}

function showPhoto() {
    const preview = $("#photoPreview");
    const resumePhoto = $("#resumePhoto");
    if (!resumeData.photo) {
        preview.innerHTML = `<i class="fa-solid fa-user"></i>`;
        resumePhoto.innerHTML = `<i class="fa-solid fa-user"></i>`;
        return;
    }
    preview.innerHTML = `<img src="${resumeData.photo}" alt="Profile">`;
    resumePhoto.innerHTML = `<img src="${resumeData.photo}" alt="Profile">`;
}

function applyTemplate() {
    const resume = $("#resume");
    resume.classList.remove("modern-template", "professional-template", "minimal-template");
    resume.classList.add(`${resumeData.template}-template`);
}

function applyColor() {
    document.documentElement.style.setProperty("--primary", resumeData.color);
}

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
   COLLECT DATA & EVENT DELEGATION
   ========================================================= */

function collectBasicData() {
    resumeData.fullName = getValue("fullName");
    resumeData.jobTitle = getValue("jobTitle");
    resumeData.email = getValue("email");
    resumeData.phone = getValue("phone");
    resumeData.location = getValue("location");
    resumeData.website = getValue("website");
    resumeData.linkedin = getValue("linkedin");
    resumeData.github = getValue("github");
    resumeData.summary = getValue("summary");
    resumeData.achievements = getValue("achievements");
    resumeData.interests = getValue("interests");
}

function handleInputEvent(event) {
    const target = event.target;

    if (target.dataset.experience !== undefined) {
        resumeData.experience[Number(target.dataset.experience)][target.dataset.field] = target.value;
    } else if (target.dataset.education !== undefined) {
        resumeData.education[Number(target.dataset.education)][target.dataset.field] = target.value;
    } else if (target.dataset.skill !== undefined) {
        resumeData.skills[Number(target.dataset.skill)][target.dataset.field] = target.value;
    } else if (target.dataset.certification !== undefined) {
        resumeData.certifications[Number(target.dataset.certification)][target.dataset.field] = target.value;
    } else if (target.dataset.project !== undefined) {
        resumeData.projects[Number(target.dataset.project)][target.dataset.field] = target.value;
    } else if (target.dataset.language !== undefined) {
        resumeData.languages[Number(target.dataset.language)][target.dataset.field] = target.value;
    }

    collectBasicData();
    updatePreview();
}

document.addEventListener("input", handleInputEvent);
document.addEventListener("change", handleInputEvent);

// Summary length counter
$("#summary").addEventListener("input", (e) => {
    $("#summaryCount").textContent = `${e.target.value.length} / 600`;
});

// Photo upload
$("#photoInput").addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        resumeData.photo = e.target.result;
        showPhoto();
        saveData();
    };
    reader.readAsDataURL(file);
});

// Dynamic Add Buttons
$("#addExperience").addEventListener("click", () => {
    resumeData.experience.push(createExperience());
    renderExperienceEditor();
    updatePreview();
});

$("#addEducation").addEventListener("click", () => {
    resumeData.education.push(createEducation());
    renderEducationEditor();
    updatePreview();
});

$("#addSkill").addEventListener("click", () => {
    resumeData.skills.push(createSkill());
    renderSkillsEditor();
    updatePreview();
});

$("#addCertification").addEventListener("click", () => {
    resumeData.certifications.push(createCertification());
    renderCertificationEditor();
    updatePreview();
});

$("#addProject").addEventListener("click", () => {
    resumeData.projects.push(createProject());
    renderProjectEditor();
    updatePreview();
});

$("#addLanguage").addEventListener("click", () => {
    resumeData.languages.push(createLanguage());
    renderLanguageEditor();
    updatePreview();
});

// Dynamic Remove Buttons (Safe Delegation)
document.addEventListener("click", (event) => {
    const btn = event.target.closest("button");
    if (!btn) return;

    if (btn.dataset.removeExperience !== undefined) {
        resumeData.experience.splice(Number(btn.dataset.removeExperience), 1);
        renderExperienceEditor();
        updatePreview();
    } else if (btn.dataset.removeEducation !== undefined) {
        resumeData.education.splice(Number(btn.dataset.removeEducation), 1);
        renderEducationEditor();
        updatePreview();
    } else if (btn.dataset.removeSkill !== undefined) {
        resumeData.skills.splice(Number(btn.dataset.removeSkill), 1);
        renderSkillsEditor();
        updatePreview();
    } else if (btn.dataset.removeCertification !== undefined) {
        resumeData.certifications.splice(Number(btn.dataset.removeCertification), 1);
        renderCertificationEditor();
        updatePreview();
    } else if (btn.dataset.removeProject !== undefined) {
        resumeData.projects.splice(Number(btn.dataset.removeProject), 1);
        renderProjectEditor();
        updatePreview();
    } else if (btn.dataset.removeLanguage !== undefined) {
        resumeData.languages.splice(Number(btn.dataset.removeLanguage), 1);
        renderLanguageEditor();
        updatePreview();
    }
});

// Template & Color Handlers
$("#templateSelect").addEventListener("change", (e) => {
    resumeData.template = e.target.value;
    applyTemplate();
    saveData();
});

$$(".color-choice").forEach(btn => {     btn.addEventListener("click", () => {         resumeData.color = btn.dataset.color;         $$
(".color-choice").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        applyColor();
        saveData();
    });
});

// Dark Theme Toggle
$("#themeToggle").addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    localStorage.setItem("jobcv-theme", isDark ? "dark" : "light");
    $("#themeToggle").innerHTML = isDark ? `<i class="fa-solid fa-sun"></i>` : `<i class="fa-solid fa-moon"></i>`;
});

// Storage Save & Restore
function saveData() {
    try {
        localStorage.setItem("jobcv-data", JSON.stringify(resumeData));
        const status = $("#saveStatus");
        status.innerHTML = `<i class="fa-solid fa-check"></i> Saved`;
        status.style.opacity = "1";
    } catch (err) {
        console.warn("Storage quota exceeded or error saving:", err);
    }
}

function loadData() {
    try {
        const saved = localStorage.getItem("jobcv-data");
        if (saved) {
            resumeData = { ...resumeData, ...JSON.parse(saved) };
        }
    } catch (err) {
        console.warn("Error restoring saved state:", err);
    }

    setValue("fullName", resumeData.fullName);
    setValue("jobTitle", resumeData.jobTitle);
    setValue("email", resumeData.email);
    setValue("phone", resumeData.phone);
    setValue("location", resumeData.location);
    setValue("website", resumeData.website);
    setValue("linkedin", resumeData.linkedin);
    setValue("github", resumeData.github);
    setValue("summary", resumeData.summary);
    setValue("achievements", resumeData.achievements);
    setValue("interests", resumeData.interests);

    $("#templateSelect").value = resumeData.template;     $$(".color-choice").forEach(btn => {
        btn.classList.toggle("active", btn.dataset.color === resumeData.color);
    });

    $("#summaryCount").textContent = `${resumeData.summary.length} / 600`;
}

// Reset Everything
$("#clearBtn").addEventListener("click", () => {
    if (confirm("Are you sure you want to reset all data?")) {
        localStorage.removeItem("jobcv-data");
        location.reload();
    }
});

// Export PDF (Fixed 1-Page Alignment)
$("#downloadBtn").addEventListener("click", () => {
    const resume = $("#resume");
    const fileName = (resumeData.fullName.trim().replace(/\s+/g, "_") || "JobCV-Resume") + ".pdf";

    const opt = {
        margin: [5, 5, 5, 5],
        filename: fileName,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
            scale: 2,
            useCORS: true,
            scrollY: 0,
            windowWidth: 794
        },
        jsPDF: {
            unit: "mm",
            format: "a4",
            orientation: "portrait"
        },
        pagebreak: { mode: 'avoid-all' }
    };

    html2pdf().set(opt).from(resume).save();
});

// Native Print
$("#printBtn").addEventListener("click", () => {
    window.print();
});

// Set Footer Year
$("#year").textContent = new Date().getFullYear();

// Initialize App
function initialize() {
    loadData();
    renderEditors();
    showPhoto();
    updatePreview();

    const savedTheme = localStorage.getItem("jobcv-theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark");
        $("#themeToggle").innerHTML = `<i class="fa-solid fa-sun"></i>`;
    }
}

initialize();
