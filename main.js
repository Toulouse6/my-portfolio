// Fade-in page
document.addEventListener("DOMContentLoaded", () => {
    document.body.style.opacity = "1";
});

let activeTech = null; // Track selected stack
const originalSectionMap = new Map(); // Store original sections


// Store sections: 
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".project").forEach(project => {
        originalSectionMap.set(project, project.parentElement);
    });
});


// Scroll nav links:
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: 'smooth',
                });
            }
        });
    });


    // Entrance effects:
    document.addEventListener("DOMContentLoaded", () => {
        const elements = document.querySelectorAll(".hidden");

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    observer.unobserve(entry.target);
                }
            });
        });

        elements.forEach((el) => observer.observe(el));
    });
});


// Headshot wink:
document.addEventListener("DOMContentLoaded", () => {
    const headshot = document.querySelector(".headshot");

    if (!headshot) return;

    const originalSrc = "assets/images/headshot.png";
    const winkSrc = "assets/images/wink.png";

    setInterval(() => {
        headshot.src = winkSrc;
        setTimeout(() => {
            headshot.src = originalSrc;
        }, 200); 
    }, 7000); 
});


// Filter projects:
function filterProjects(selectedTech) {
    // If clicked twice, reset filter
    if (activeTech === selectedTech) {
        resetFilter();
        return;
    }

    resetFilter(); // Reset before filtering

    const projects = document.querySelectorAll(".project");
    const sections = document.querySelectorAll("section:not(#filtered-section)");
    const sectionTitles = document.querySelectorAll("section h2");
    const techIcons = document.querySelectorAll(".tech-stack-header img, .tech-stack-header-mobile img");
    let filteredSection = document.querySelector("#filtered-section");

    // Set active tech class
    activeTech = selectedTech;

    // Remove active-tech class
    techIcons.forEach(icon => icon.classList.remove("active-tech"));

    // Highlight active-tech
    const activeIcon = document.querySelector(`[data-tech="${selectedTech}"]`);
    if (activeIcon) activeIcon.classList.add("active-tech");

    // Create / clear filtered section
    if (!filteredSection) {
        filteredSection = document.createElement("section");
        filteredSection.id = "filtered-section";
        filteredSection.classList.add("layout-container");
        document.querySelector(".projects-container").prepend(filteredSection);
    }
    filteredSection.innerHTML = `<h2>${selectedTech}</h2>`;
    const projectGallery = document.createElement("div");
    projectGallery.classList.add("project-gallery");
    filteredSection.appendChild(projectGallery);

    // Filter projects
    let anyVisible = false;
    projects.forEach(project => {
        const techs = project.getAttribute("data-techs") || "";
        if (techs.includes(selectedTech)) {
            project.classList.remove("hidden");
            projectGallery.appendChild(project);
            anyVisible = true;
        } else {
            project.classList.add("hidden");
        }
    });

    // Hide all original sections
    sections.forEach(section => section.classList.add("hidden"));
    sectionTitles.forEach(title => title.classList.add("hidden"));

    // Show filtered section
    filteredSection.classList.remove("hidden");

    // No results
    if (!anyVisible) {
        const noResults = document.createElement("p");
        noResults.textContent = "Yet to be uploaded";
        noResults.style.color = "white";
        noResults.style.marginTop = "20px";
        projectGallery.appendChild(noResults);
    }
}

// Reset Filter:
function resetFilter() {
    const projects = document.querySelectorAll(".project");
    const sections = document.querySelectorAll("section:not(#filtered-section)");
    const sectionTitles = document.querySelectorAll("section h2");
    const techIcons = document.querySelectorAll(".tech-stack-header img, .tech-stack-header-mobile img");
    const filteredSection = document.querySelector("#filtered-section");

    // Reset active tech
    activeTech = null;

    // Remove active-tech class
    techIcons.forEach(icon => icon.classList.remove("active-tech"));

    // Restore all projects
    projects.forEach(project => {
        const originalParent = originalSectionMap.get(project);
        if (originalParent) {
            originalParent.appendChild(project);
            project.classList.remove("hidden");
        }
    });

    // Restore all sections
    sections.forEach(section => section.classList.remove("hidden"));
    sectionTitles.forEach(title => title.classList.remove("hidden"));

    // Remove filtered section if exists
    if (filteredSection) {
        filteredSection.remove();
    }
}

