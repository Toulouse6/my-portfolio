// Scroll Sections
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: "smooth"
                });
            }
        });
    });
});

let activeTech = null; // Track selected stack

function filterProjects(selectedTech) {
    const projects = document.querySelectorAll('.project');
    const sections = document.querySelectorAll('section');

    if (activeTech === selectedTech) {
        // Reset filter when clicked again
        activeTech = null;
        projects.forEach(project => project.classList.remove('hidden'));
        sections.forEach(section => section.classList.remove('hidden'));
    } else {
        // Apply filter
        activeTech = selectedTech;

        projects.forEach(project => {
            const techs = project.getAttribute('data-techs') || '';
            if (techs.includes(selectedTech)) {
                project.classList.remove('hidden');
            } else {
                project.classList.add('hidden');
            }
        });

        // Hide or show sections
        sections.forEach(section => {
            const visibleProjects = section.querySelectorAll('.project:not(.hidden)');
            if (visibleProjects.length === 0) {
                section.classList.add('hidden');
            } else {
                section.classList.remove('hidden');
            }
        });
    }
}

// Reset Filter
function resetFilter() {
    const projects = document.querySelectorAll('.project');
    const sections = document.querySelectorAll('section');

    // Show all projects & sections
    activeTech = null; // Reset active tech
    projects.forEach(project => project.classList.remove('hidden'));
    sections.forEach(section => section.classList.remove('hidden'));
}
