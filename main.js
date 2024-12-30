let activeTech = null; // Track selected tech stack
const originalSectionMap = new Map(); // Map to store the original parent of each project

document.addEventListener("DOMContentLoaded", () => {
    // Store the original parent section for each project
    document.querySelectorAll(".project").forEach(project => {
        originalSectionMap.set(project, project.parentElement);
    });
});

function filterProjects(selectedTech) {
    // If the same icon is clicked, reset the filter
    if (activeTech === selectedTech) {
        resetFilter();
        return;
    }

    resetFilter(); // Always reset before applying a new filter

    const projects = document.querySelectorAll(".project");
    const sections = document.querySelectorAll("section:not(#filtered-section)");
    const sectionTitles = document.querySelectorAll("section h2");
    const sectionDescriptions = document.querySelectorAll("section .section-des");
    const techIcons = document.querySelectorAll(".tech-stack-header img, .tech-stack-header-mobile img");
    let filteredSection = document.querySelector("#filtered-section");

    // Set active tech
    activeTech = selectedTech;

    // Remove active-tech class from all icons
    techIcons.forEach(icon => icon.classList.remove("active-tech"));

    // Highlight the currently active tech icon
    const activeIcon = document.querySelector(`[data-tech="${selectedTech}"]`);
    if (activeIcon) activeIcon.classList.add("active-tech");

    // Create or clear the filtered section
    if (!filteredSection) {
        filteredSection = document.createElement("section");
        filteredSection.id = "filtered-section";
        document.querySelector(".projects-container").prepend(filteredSection);
    }
    filteredSection.innerHTML = `<h2>Filtered Projects: ${selectedTech}</h2>`;
    const projectGallery = document.createElement("div");
    projectGallery.classList.add("project-gallery");
    filteredSection.appendChild(projectGallery);

    // Filter projects and move them to the filtered section
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

    // Hide all original sections and their titles/descriptions
    sections.forEach(section => section.classList.add("hidden"));
    sectionTitles.forEach(title => title.classList.add("hidden"));
    sectionDescriptions.forEach(desc => desc.classList.add("hidden"));

    // Show filtered section
    filteredSection.classList.remove("hidden");

    // Add a "No results" message if no projects are visible
    if (!anyVisible) {
        const noResults = document.createElement("p");
        noResults.textContent = "No projects match the selected technology.";
        noResults.style.color = "#b0cfdf";
        noResults.style.textAlign = "center";
        noResults.style.marginTop = "20px";
        projectGallery.appendChild(noResults);
    }
}

function resetFilter() {
    const projects = document.querySelectorAll(".project");
    const sections = document.querySelectorAll("section:not(#filtered-section)");
    const sectionTitles = document.querySelectorAll("section h2");
    const sectionDescriptions = document.querySelectorAll("section .section-des");
    const techIcons = document.querySelectorAll(".tech-stack-header img, .tech-stack-header-mobile img");
    const filteredSection = document.querySelector("#filtered-section");

    // Reset active tech
    activeTech = null;

    // Remove active-tech class from all icons
    techIcons.forEach(icon => icon.classList.remove("active-tech"));

    // Restore all projects to their original sections
    projects.forEach(project => {
        const originalParent = originalSectionMap.get(project);
        if (originalParent) {
            originalParent.appendChild(project);
            project.classList.remove("hidden");
        }
    });

    // Restore all sections and their titles/descriptions
    sections.forEach(section => section.classList.remove("hidden"));
    sectionTitles.forEach(title => title.classList.remove("hidden"));
    sectionDescriptions.forEach(desc => desc.classList.remove("hidden"));

    // Remove the filtered section if it exists
    if (filteredSection) {
        filteredSection.remove();
    }
}
